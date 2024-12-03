import {db} from "@/utils/db";
import {NotFoundError} from "@/types/errors";
import {CompanyInfo, Statistics} from "@/types/api";
import {ApplicationStatus} from "@prisma/client";
import {ApplicationService} from "@/services/ApplicationService";

export class StatisticsService {

    public static async all(): Promise<Statistics> {
        const CompanyData = await db.company.findMany();
        const ApplicationData = await ApplicationService.all();
        let activeCounter: number = 0;
        let rejectionCounter: number = 0;
        let ghostedCounter: number = 0;
        let interviewCounter: number = 0;
        let calledCounter: number = 0;
        let acceptedCounter: number = 0;
        let applicationsCounter: number = 0;
        let offerCounter: number = 0;
        const parsedCompanyData: CompanyInfo[] = CompanyData.map(company => {
            let count: number = 0;
            const applications = ApplicationData
                .filter(application => application.company.id === company.id)
                .map(application => {
                    count++;
                    return application;
                })
            return {id: company.id, name: company.name, applications, count};
        });
        ApplicationData.forEach(application => {
            if (application.active)
                activeCounter++;
            application.statusHistory.forEach(status => {
                switch (status.status) {
                    case ApplicationStatus.REJECTED:
                        rejectionCounter++;
                        break;
                    case ApplicationStatus.GHOSTED:
                        ghostedCounter++;
                        break;
                    case ApplicationStatus.CALLED:
                        calledCounter++;
                        break;
                    case ApplicationStatus.INTERVIEW:
                        interviewCounter++;
                        break;
                    case ApplicationStatus.APPLIED:
                        applicationsCounter++;
                        break;
                    case ApplicationStatus.OFFER:
                        offerCounter++;
                        break;
                    case ApplicationStatus.ACCEPTED:
                        acceptedCounter++;
                        break;
                }
            });
        });
        return {
            companies: parsedCompanyData,
            applications: ApplicationData,
            active: activeCounter,
            rejected: rejectionCounter,
            accepted: acceptedCounter,
            offers: offerCounter,
            interviews: interviewCounter,
            applicationsCounter,
            ghosted: ghostedCounter,
            called: calledCounter,
        };
    }


}

