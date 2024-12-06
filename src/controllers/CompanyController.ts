import {
    Get,
    Route,
    Post,
    SuccessResponse,
    Tags,
    Response,
    Body,
} from "tsoa";
import {BadRequestError} from '@/types/errors';
import {CreateCompanyForm} from "@/types/api"
import {Company} from "@prisma/client";
import {CompanyService} from "@/services/CompanyService";
import logger from "@/utils/logger";

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
        try {
            return CompanyService.create(createConfigBody);
        } catch (e) {
            logger.error(e);
            return CompanyService.findByName(createConfigBody.name);
        }
    }
}

