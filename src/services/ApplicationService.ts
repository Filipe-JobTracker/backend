import {db} from "@/utils/db";
import {
    CreateApplicationForm, ExtendedApplication, UpdateApplicationForm
} from "@/types/api.d";
import {Application, ApplicationStatus} from "@prisma/client";
import {NotFoundError} from "@/types/errors";
import {CompanyService} from "@/services/CompanyService";

export class ApplicationService {
    private static dbService = db.application;

    public static async all(): Promise<ExtendedApplication[]> {
        return new Promise(async (resolve, _reject) => {
            const data = await this.dbService.findMany({
                include: {
                    company: true, statusHistory: true,
                }
            });
            const filteredData = data.map(app => {
                const {companyId, statusHistory, ...rest} = app;
                return {...rest, statusHistory: statusHistory.map((status) => {
                    const {applicationId, ...rest} = status;
                    return rest;
                    })};
            });
            return resolve(filteredData as ExtendedApplication[]);
        });
    }

    public static async findByName(name: string): Promise<ExtendedApplication | ExtendedApplication[]> {
        return new Promise(async (resolve, reject) => {
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
            if (!cleanData || cleanData.length === 0) reject(new NotFoundError('Application not found'));
            if (cleanData.length === 1) return resolve(cleanData[0] as ExtendedApplication);
            return resolve(cleanData as ExtendedApplication[]);
        });
    }

    public static async findById(id: string): Promise<ExtendedApplication> {
        return new Promise(async (resolve, reject) => {
            const data = await this.dbService.findUnique({
                where: { id },
                include: {
                    company: true,
                    statusHistory: true,
                }
            });
            if (!data) reject(new NotFoundError('Application not found'));
            // const {companyId, ...rest} = data;
            return resolve(data as ExtendedApplication);
        });
    }

    public static async create(data: CreateApplicationForm): Promise<ExtendedApplication> {
        return new Promise(async (resolve, reject) => {
            try {
                let company = await CompanyService.findByName(data.company.name);
                if (!company) {
                    company = await CompanyService.create({name: data.company.name});
                }
                const {company:companyObj, ...rest} = data;
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
                return resolve(await ApplicationService.findById(application.id));
            } catch (e) {
                reject(e);
            }
        });


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
        return new Promise(async (resolve, reject) => {
            const existing = await this.findById(id);
            if (!existing) return reject(new NotFoundError('Application not found'));

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
            return resolve(this.dbService.update({
                where: {
                    id,
                }, data: {
                    lastUpdate: new Date(Date.now()), ...data
                }, include: {
                    company: true, statusHistory: true,
                }
            }));
        });
    }
}

