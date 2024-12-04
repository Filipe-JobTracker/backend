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

@Route("/api/company")
@Tags('Company')
export class CompanyController {
    /**
     * Get all Company data
     */
    @Get('/')
    @SuccessResponse(200, 'Company')
    public async getAllCompanies(): Promise<Company[]> {
        return new Promise(async (resolve, _reject) => {
            return resolve(await CompanyService.all() as Company[]);
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
}

