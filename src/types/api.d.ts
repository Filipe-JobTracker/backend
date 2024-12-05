import {
    Company,
    ApplicationStatus,
    Application,
    ApplicationStatusHistory
} from "@prisma/client";

export interface ConfigCreationRequest {
    key: string;
    value: Record<string, unknown>;
}

export interface CreateCompanyForm {
    name: string;
}

export interface CreateApplicationForm {
    company: Company;
    name: string;
    link: string;
    appliedAt: Date;
}

export interface UpdateApplicationForm {
    active: boolean,
    status: ApplicationStatus,
}

export interface CompanyInfo {
    name: string;
    applications: ExtendedApplication[];
    count: number;
    id: string;
}

export interface Statistics {
    companies: CompanyInfo[];
    applications: ExtendedApplication[];
    active: number;
    rejected: number;
    accepted: number;
    offers: number;
    interviews: number;
    applicationsCounter: number;
    ghosted: number;
    called: number;
}

export interface ExtendedApplication extends Omit<Application, 'companyId'> {
    company: Company;
    statusHistory: Omit<ApplicationStatusHistory, 'applicationId'>[];
}

export interface ImportApplicationForm extends CreateCompanyForm{
    company: Company;
    name: string;
    link: string;
    appliedAt: Date;
    status?: ApplicationStatus;
}