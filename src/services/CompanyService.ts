import {db} from "@/utils/db";
import {CreateCompanyForm} from "@/types/api.d";
import {Company} from "@prisma/client";
import {ExistingError, NotFoundError} from "@/types/errors";

export class CompanyService {
    private static dbService = db.company;

    public static async all(): Promise<Company[]> {
        return this.dbService.findMany();
    }

    public static async findByName(name: string): Promise<Company> {
        return new Promise(async (resolve, reject) => {
            const data = await this.dbService.findUnique({
                where: {
                    name,
                },
            });
            return resolve(data as Company);
        });
    }

    public static async findById(id: string): Promise<Company> {
        return new Promise(async (resolve, reject) => {
            const data = await this.dbService.findUnique({
                where: {
                    id,
                },
            });
            if (!data)
                reject(new NotFoundError('Company not found'));
            return resolve(data as Company);
        });
    }

    public static async create(data: CreateCompanyForm): Promise<Company> {
        return new Promise(async (resolve, reject) => {
            if (await this.dbService.findUnique({
                where: {
                    name: data.name,
                }
            })) {
                return (reject(new ExistingError('Company already exists')));
            }
            return resolve(this.dbService.create({
                data: {
                    ...data
                },
            }));
        });
    }

    public static async delete(id: string): Promise<Company> {
        return new Promise(async (resolve, reject) => {
            const data = await this.dbService.findUnique({
                where: {
                    id,
                },
            });
            if (!data)
                reject(new NotFoundError('Company not found'));
            return resolve(this.dbService.delete({
                where: {
                    id,
                },
            }));
        });
    }

    public static async update(id: string, data: CreateCompanyForm): Promise<Company> {
        return new Promise(async (resolve, reject) => {
            const existing = await this.findById(id);
            if (!existing)
                reject(new NotFoundError('Company not found'));
            return resolve(this.dbService.update({
                where: {
                    id,
                },
                data: {
                    ...data
                },
            }));
        });
    }
}

