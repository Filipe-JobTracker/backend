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
        const data = await this.dbService.findUnique({
            where: {
                name,
            },
        });
        return data as Company;
    }

    public static async create(data: CreateCompanyForm): Promise<Company> {
        const existingCompany = await this.dbService.findUnique({
            where: {name: data.name},
        });
        if (existingCompany) {
            return existingCompany;
        }

        console.log("data: ", data.name);
        return this.dbService.create({
            data: {...data},
        });
    }
}

