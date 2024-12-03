import {
    Get,
    Route,
    SuccessResponse,
    Tags,
} from "tsoa";
import {BadRequestError} from '@/types/errors';
import {StatisticsService} from "@/services/StatisticsService";
import {Statistics} from "@/types/api";

@Route("/api/statistics")
@Tags('Statistics')
export class StatisticsController {
    /**
     * Get all Statistics data
     */
    @Get('/')
    @SuccessResponse(200, 'Statistics')
    public async getAllStatisticss(): Promise<Statistics> {
        return new Promise(async (resolve, reject) => {
            return resolve(await StatisticsService.all() as Statistics);
        })
    }


}

