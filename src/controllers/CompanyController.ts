import {
    Get,
    Route,
    Post,
    SuccessResponse,
    Tags,
    Response,
    Put,
    Body,
    Delete
} from "tsoa";
import {BadRequestError, ExistingError} from '@/types/errors';
import {CreateCompanyForm} from "@/types/api"
import {Company} from "@prisma/client";
import {CompanyService} from "@/services/CompanyService";

@Route("/api/company")
@Tags('Company')
export class CompanyController {
    /**
     * Get all Company data
     */
    @Get('/')
    @SuccessResponse(200, 'Company')
    public async getAllCompanys(): Promise<Company[]> {
        return new Promise(async (resolve, reject) => {
            return resolve(await CompanyService.all() as Company[]);
        })
    }

    /**
     * Get a Company by ID
     * @param id Company ID
     */
    @Get('/{id}')
    @SuccessResponse(200, 'Company found')
    @Response(404, 'Company not found')
    public async getCompanyById(id: string): Promise<Company> {
        return new Promise(async (resolve, reject) => {
            return resolve(await CompanyService.findById(id) as Company);
        })
    }

    @Post('/')
    @SuccessResponse(201, 'Company created')
    @Response(400, 'Description is required')
    public async createCompany(@Body() createConfigBody: CreateCompanyForm): Promise<Company> {
        return new Promise(async (resolve, reject) => {
            const {name} = createConfigBody;
            if (!name)
                return reject(new BadRequestError("Company name is required"));
            try {
                if (await CompanyService.findByName(name) !== null)
                    return reject(new BadRequestError("Company already exists"));
            } catch (e) {
                console.error(e);
            }
            try {
                return resolve(await CompanyService.create(createConfigBody) as Company);
            } catch (e) {
                if (e instanceof ExistingError) {
                    return reject(new BadRequestError("Company already exists"));
                }
            }
        })
    }

    @Delete('/{id}')
    @SuccessResponse(204, 'Company deleted')
    @Response(404, 'Company not found')
    public async deleteCompany(id: string): Promise<Company> {
        return new Promise(async (resolve, reject) => {
            return resolve(await CompanyService.delete(id) as Company);
        })
    }

    /**
     * update a Company
     * @param id
     * @param updateConfigBody
     */
    @Put('/{id}')
    @SuccessResponse(202, 'Success')
    @Response(404, 'Company not found')
    @Response(400, 'Description is required')
    public async updateCompany(id: string, @Body() updateConfigBody: CreateCompanyForm): Promise<Company> {
        return new Promise(async (resolve, reject) => {
            const {name} = updateConfigBody;
            if (!name)
                return reject(new BadRequestError("Description is required"));
            return resolve(await CompanyService.update(id, updateConfigBody) as Company);
        })
    }
}

