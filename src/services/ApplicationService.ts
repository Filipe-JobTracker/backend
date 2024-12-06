import {db} from "@/utils/db";
import {
    CreateApplicationForm,
    ExtendedApplication,
    ImportApplicationForm,
    UpdateApplicationForm
} from "@/types/api.d";
import {ApplicationStatus} from "@prisma/client";
import {NotFoundError} from "@/types/errors";
import {CompanyService} from "@/services/CompanyService";

export class ApplicationService {
    private static dbService = db.application;

    public static async all(): Promise<ExtendedApplication[]> {
        const data = await this.dbService.findMany({
            include: {
                company: true, statusHistory: true,
            }
        });
        return data.map(app => {
            const {companyId, statusHistory, ...rest} = app;
            return {
                ...rest, statusHistory: statusHistory.map((status) => {
                    const {applicationId, ...rest} = status;
                    return rest;
                })
            };
        });
    }

    public static async findByName(name: string): Promise<ExtendedApplication | ExtendedApplication[]> {
        const data = await this.dbService.findMany({
            where: {
                name,
            }, include: {
                company: true, statusHistory: true,
            }
        });
        const cleanData = data.map((app) => {
            const {companyId, ...rest} = app;
            return rest;
        })
        if (!cleanData || cleanData.length === 0) {
            throw new NotFoundError('Application not found');
        }
        if (cleanData.length === 1) {
            return cleanData[0];
        }
        return cleanData;
    }

    public static async findById(id: string): Promise<ExtendedApplication> {
        const data = await this.dbService.findUnique({
            where: {id},
            include: {
                company: true,
                statusHistory: true,
            }
        });
        if (!data) {
            throw new NotFoundError('Application not found');
        }
        // const {companyId, ...rest} = data;
        return data;
    }

    public static async import(body: ImportApplicationForm): Promise<ExtendedApplication> {
        let company = await CompanyService.findByName(body.company.name);
        if (!company) {
            company = await CompanyService.create({name: body.company.name});
        }
        const {company: companyObj, ...rest} = body;
        let {status} = rest;
        if (!status)
            status = ApplicationStatus.APPLIED;
        const data = {status, ...rest};

        const application = await this.dbService.create({
            data: {
                companyId: company.id, ...data,
            },
        });
        await db.applicationStatusHistory.create({
            data: {
                applicationId: application.id,
                status: application.status,
            }
        })
        return ApplicationService.findById(application.id);
    }

    public static async create(data: CreateApplicationForm): Promise<ExtendedApplication> {
        let company = await CompanyService.findByName(data.company.name);
        if (!company) {
            company = await CompanyService.create({name: data.company.name});
        }
        const {company: companyObj, ...rest} = data;
        const application = await this.dbService.create({
            data: {
                companyId: company.id, ...rest
            },
        });
        await db.applicationStatusHistory.create({
            data: {
                applicationId: application.id,
                status: application.status,
            }
        })
        return ApplicationService.findById(application.id);
    }

    public static async delete(id: string): Promise<ExtendedApplication> {
        return new Promise(async (resolve, reject) => {
            const data = await this.dbService.findUnique({
                where: {
                    id,
                },
            });
            if (!data) reject(new NotFoundError('Application not found'));
            const removed = await this.dbService.delete({
                where: {
                    id,
                },
            });
            const {companyId, ...rest} = removed;
            return resolve(rest as ExtendedApplication);
        });
    }

    public static async update(id: string, data: UpdateApplicationForm): Promise<ExtendedApplication> {
            const existing = await this.findById(id);
            if (!existing) {
                throw new NotFoundError('Application not found')
            }

            switch (data.status) {
                case ApplicationStatus.GHOSTED:
                case ApplicationStatus.REJECTED:
                    data.active = false;
                    break;
                default:
                    data.active = true;
                    break;
            }
            await db.applicationStatusHistory.create({
                data: {
                    applicationId: id, status: data.status,
                }
            });
            return this.dbService.update({
                where: {
                    id,
                }, data: {
                    lastUpdate: new Date(Date.now()), ...data
                }, include: {
                    company: true, statusHistory: true,
                }
            });
    }
}

