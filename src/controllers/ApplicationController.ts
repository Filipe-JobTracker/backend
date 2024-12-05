import {
    Get,
    Route,
    Post,
    SuccessResponse,
    Tags,
    Response,
    Put,
    Body,
} from "tsoa";
import {BadRequestError} from '@/types/errors';
import {
    CreateApplicationForm,
    ExtendedApplication,
    ImportApplicationForm,
    UpdateApplicationForm
} from "@/types/api"
import {ApplicationService} from "@/services/ApplicationService";

const NAME_REQUIRED_ERR = '\'name\' is required';

@Route("/api/application")
@Tags('Application')
export class ApplicationController {
    /**
     * Get all Application data
     */
    @Get('/')
    @SuccessResponse(200, 'Application')
    public async getAllApplications(): Promise<ExtendedApplication[]> {
        return new Promise(async (resolve, _reject) => {
            return resolve(await ApplicationService.all() as ExtendedApplication[]);
        })
    }

    /**
     * Get a Application by ID
     * @param id Application ID
     */
    @Get('/{id}')
    @SuccessResponse(200, 'Application found')
    @Response(404, 'Application not found')
    public async getApplicationById(id: string): Promise<ExtendedApplication> {
        return new Promise(async (resolve, _reject) => {
            return resolve(await ApplicationService.findById(id) as ExtendedApplication);
        })
    }

    @Post('/')
    @SuccessResponse(201, 'Application created')
    @Response(400, NAME_REQUIRED_ERR)
    public async createApplication(@Body() createConfigBody: CreateApplicationForm): Promise<ExtendedApplication> {
        return new Promise(async (resolve, reject) => {
            const {name} = createConfigBody;
            if (!name)
                return reject(new BadRequestError(NAME_REQUIRED_ERR));
            return resolve(await ApplicationService.create(createConfigBody) as ExtendedApplication);
        })
    }

    /**
     * Import an application directly from an CSV file
     * @param body
     */
    @Post('/import')
    public async importApplication(@Body() body: ImportApplicationForm): Promise<ExtendedApplication> {
        return new Promise(async (resolve, _reject) => {
            return resolve(await ApplicationService.import(body) as ExtendedApplication);
        })
    }

    /**
     * update a Application
     * @param id
     * @param updateConfigBody
     */
    @Put('/{id}')
    @SuccessResponse(202, 'Success')
    @Response(404, 'Application not found')
    @Response(400, NAME_REQUIRED_ERR)
    public async updateApplication(id: string, @Body() updateConfigBody: UpdateApplicationForm): Promise<ExtendedApplication> {
        return new Promise(async (resolve, reject) => {
            const {status} = updateConfigBody;
            if (!status)
                return reject(new BadRequestError("Status is required"));
            return resolve(await ApplicationService.update(id, updateConfigBody) as ExtendedApplication);
        })
    }
}

