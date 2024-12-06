import {
    Get,
    Route,
    Post,
    SuccessResponse,
    Tags,
    Response,
    Body,
} from "tsoa";
import {BadRequestError, ExistingError} from '@/types/errors';
import {CreateCompanyForm} from "@/types/api"
import {Company} from "@prisma/client";
import {CompanyService} from "@/services/CompanyService";

const EXISTING_COMPANY_ERR = 'Company already exists';
const MISSING_NAME_COMPANY_ERR = 'Company name is required';

@Route("/api/company")
@Tags('Company')
export class CompanyController {
    /**
     * Get all Company data
     */
    @Get('/')
    @SuccessResponse(200, 'Company')
    public async getAllCompanies(): Promise<Company[]> {
            return  CompanyService.all();
    }

    @Post('/')
    @SuccessResponse(201, 'Company created')
    @Response(400, MISSING_NAME_COMPANY_ERR)
    public async createCompany(@Body() createConfigBody: CreateCompanyForm): Promise<Company> {
        const {name} = createConfigBody;
        if (!name) {
            throw new BadRequestError(MISSING_NAME_COMPANY_ERR);
        }
        // const existingCompany = await CompanyService.findByName(name);
        // if (existingCompany) {
        //     throw new BadRequestError(EXISTING_COMPANY_ERR);
        // }
        try {
            return CompanyService.create(createConfigBody);
        } catch (e) {
            console.error(e);
            return CompanyService.findByName(createConfigBody.name);
        }
    }
    // public async createCompany(@Body() createConfigBody: CreateCompanyForm): Promise<Company> {
    //     return new Promise(async (resolve, reject) => {
    //         const {name} = createConfigBody;
    //         if (!name)
    //             return reject(new BadRequestError(MISSING_NAME_COMPANY_ERR));
    //         try {
    //             if (await CompanyService.findByName(name) !== null)
    //                 return reject(new BadRequestError(EXISTING_COMPANY_ERR));
    //         } catch (e) {
    //             console.error(e);
    //         }
    //         try {
    //             return resolve(await CompanyService.create(createConfigBody) as Company);
    //         } catch (e) {
    //             if (e instanceof ExistingError) {
    //                 return reject(new BadRequestError(EXISTING_COMPANY_ERR));
    //             }
    //         }
    //     })
    // }
}

