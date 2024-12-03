/* tslint:disable */
/* eslint-disable */
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import type { TsoaRoute } from '@tsoa/runtime';
import {  fetchMiddlewares, ExpressTemplateService } from '@tsoa/runtime';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { StatisticsController } from './../controllers/StatisticsController';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { CompanyController } from './../controllers/CompanyController';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { ApplicationController } from './../controllers/ApplicationController';
import type { Request as ExRequest, Response as ExResponse, RequestHandler, Router } from 'express';



// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

const models: TsoaRoute.Models = {
    "DefaultSelection_Prisma._36_CompanyPayload_": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"id":{"dataType":"string","required":true},"name":{"dataType":"string","required":true}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Company": {
        "dataType": "refAlias",
        "type": {"ref":"DefaultSelection_Prisma._36_CompanyPayload_","validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "_36_Enums.ApplicationStatus": {
        "dataType": "refAlias",
        "type": {"dataType":"union","subSchemas":[{"dataType":"enum","enums":["GHOSTED"]},{"dataType":"enum","enums":["REJECTED"]},{"dataType":"enum","enums":["APPLIED"]},{"dataType":"enum","enums":["INTERVIEW"]},{"dataType":"enum","enums":["OFFER"]},{"dataType":"enum","enums":["CALLED"]},{"dataType":"enum","enums":["ACCEPTED"]}],"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Pick_ApplicationStatusHistory.Exclude_keyofApplicationStatusHistory.applicationId__": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"id":{"dataType":"string","required":true},"status":{"ref":"_36_Enums.ApplicationStatus","required":true},"changedAt":{"dataType":"datetime","required":true}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Omit_ApplicationStatusHistory.applicationId_": {
        "dataType": "refAlias",
        "type": {"ref":"Pick_ApplicationStatusHistory.Exclude_keyofApplicationStatusHistory.applicationId__","validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Pick_Application.Exclude_keyofApplication.companyId__": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"name":{"dataType":"string","required":true},"id":{"dataType":"string","required":true},"link":{"dataType":"string","required":true},"active":{"dataType":"boolean","required":true},"status":{"ref":"_36_Enums.ApplicationStatus","required":true},"appliedAt":{"dataType":"datetime","required":true},"lastUpdate":{"dataType":"datetime","required":true}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ExtendedApplication": {
        "dataType": "refObject",
        "properties": {
            "name": {"dataType":"string","required":true},
            "id": {"dataType":"string","required":true},
            "link": {"dataType":"string","required":true},
            "active": {"dataType":"boolean","required":true},
            "status": {"ref":"_36_Enums.ApplicationStatus","required":true},
            "appliedAt": {"dataType":"datetime","required":true},
            "lastUpdate": {"dataType":"datetime","required":true},
            "company": {"ref":"Company","required":true},
            "statusHistory": {"dataType":"array","array":{"dataType":"refAlias","ref":"Omit_ApplicationStatusHistory.applicationId_"},"required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "CompanyInfo": {
        "dataType": "refObject",
        "properties": {
            "name": {"dataType":"string","required":true},
            "applications": {"dataType":"array","array":{"dataType":"refObject","ref":"ExtendedApplication"},"required":true},
            "count": {"dataType":"double","required":true},
            "id": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Statistics": {
        "dataType": "refObject",
        "properties": {
            "companies": {"dataType":"array","array":{"dataType":"refObject","ref":"CompanyInfo"},"required":true},
            "applications": {"dataType":"array","array":{"dataType":"refObject","ref":"ExtendedApplication"},"required":true},
            "active": {"dataType":"double","required":true},
            "rejected": {"dataType":"double","required":true},
            "accepted": {"dataType":"double","required":true},
            "offers": {"dataType":"double","required":true},
            "interviews": {"dataType":"double","required":true},
            "applicationsCounter": {"dataType":"double","required":true},
            "ghosted": {"dataType":"double","required":true},
            "called": {"dataType":"double","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "CreateCompanyForm": {
        "dataType": "refObject",
        "properties": {
            "name": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "CreateApplicationForm": {
        "dataType": "refObject",
        "properties": {
            "company": {"ref":"Company","required":true},
            "name": {"dataType":"string","required":true},
            "link": {"dataType":"string","required":true},
            "appliedAt": {"dataType":"datetime","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ApplicationStatus": {
        "dataType": "refAlias",
        "type": {"ref":"_36_Enums.ApplicationStatus","validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "UpdateApplicationForm": {
        "dataType": "refObject",
        "properties": {
            "active": {"dataType":"boolean","required":true},
            "status": {"ref":"ApplicationStatus","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
};
const templateService = new ExpressTemplateService(models, {"noImplicitAdditionalProperties":"throw-on-extras","bodyCoercion":true});

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa




export function RegisterRoutes(app: Router) {

    // ###########################################################################################################
    //  NOTE: If you do not see routes for all of your controllers in this file, then you might not have informed tsoa of where to look
    //      Please look into the "controllerPathGlobs" config option described in the readme: https://github.com/lukeautry/tsoa
    // ###########################################################################################################


    
        app.get('/api/statistics',
            ...(fetchMiddlewares<RequestHandler>(StatisticsController)),
            ...(fetchMiddlewares<RequestHandler>(StatisticsController.prototype.getAllStatisticss)),

            async function StatisticsController_getAllStatisticss(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const controller = new StatisticsController();

              await templateService.apiHandler({
                methodName: 'getAllStatisticss',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 200,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/api/company',
            ...(fetchMiddlewares<RequestHandler>(CompanyController)),
            ...(fetchMiddlewares<RequestHandler>(CompanyController.prototype.getAllCompanys)),

            async function CompanyController_getAllCompanys(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const controller = new CompanyController();

              await templateService.apiHandler({
                methodName: 'getAllCompanys',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 200,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/api/company/:id',
            ...(fetchMiddlewares<RequestHandler>(CompanyController)),
            ...(fetchMiddlewares<RequestHandler>(CompanyController.prototype.getCompanyById)),

            async function CompanyController_getCompanyById(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    id: {"in":"path","name":"id","required":true,"dataType":"string"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const controller = new CompanyController();

              await templateService.apiHandler({
                methodName: 'getCompanyById',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 200,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/api/company',
            ...(fetchMiddlewares<RequestHandler>(CompanyController)),
            ...(fetchMiddlewares<RequestHandler>(CompanyController.prototype.createCompany)),

            async function CompanyController_createCompany(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    createConfigBody: {"in":"body","name":"createConfigBody","required":true,"ref":"CreateCompanyForm"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const controller = new CompanyController();

              await templateService.apiHandler({
                methodName: 'createCompany',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 201,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.delete('/api/company/:id',
            ...(fetchMiddlewares<RequestHandler>(CompanyController)),
            ...(fetchMiddlewares<RequestHandler>(CompanyController.prototype.deleteCompany)),

            async function CompanyController_deleteCompany(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    id: {"in":"path","name":"id","required":true,"dataType":"string"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const controller = new CompanyController();

              await templateService.apiHandler({
                methodName: 'deleteCompany',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 204,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.put('/api/company/:id',
            ...(fetchMiddlewares<RequestHandler>(CompanyController)),
            ...(fetchMiddlewares<RequestHandler>(CompanyController.prototype.updateCompany)),

            async function CompanyController_updateCompany(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    id: {"in":"path","name":"id","required":true,"dataType":"string"},
                    updateConfigBody: {"in":"body","name":"updateConfigBody","required":true,"ref":"CreateCompanyForm"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const controller = new CompanyController();

              await templateService.apiHandler({
                methodName: 'updateCompany',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 202,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/api/application',
            ...(fetchMiddlewares<RequestHandler>(ApplicationController)),
            ...(fetchMiddlewares<RequestHandler>(ApplicationController.prototype.getAllApplications)),

            async function ApplicationController_getAllApplications(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const controller = new ApplicationController();

              await templateService.apiHandler({
                methodName: 'getAllApplications',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 200,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/api/application/:id',
            ...(fetchMiddlewares<RequestHandler>(ApplicationController)),
            ...(fetchMiddlewares<RequestHandler>(ApplicationController.prototype.getApplicationById)),

            async function ApplicationController_getApplicationById(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    id: {"in":"path","name":"id","required":true,"dataType":"string"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const controller = new ApplicationController();

              await templateService.apiHandler({
                methodName: 'getApplicationById',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 200,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/api/application',
            ...(fetchMiddlewares<RequestHandler>(ApplicationController)),
            ...(fetchMiddlewares<RequestHandler>(ApplicationController.prototype.createApplication)),

            async function ApplicationController_createApplication(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    createConfigBody: {"in":"body","name":"createConfigBody","required":true,"ref":"CreateApplicationForm"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const controller = new ApplicationController();

              await templateService.apiHandler({
                methodName: 'createApplication',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 201,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.delete('/api/application/:id',
            ...(fetchMiddlewares<RequestHandler>(ApplicationController)),
            ...(fetchMiddlewares<RequestHandler>(ApplicationController.prototype.deleteApplication)),

            async function ApplicationController_deleteApplication(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    id: {"in":"path","name":"id","required":true,"dataType":"string"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const controller = new ApplicationController();

              await templateService.apiHandler({
                methodName: 'deleteApplication',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 204,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.put('/api/application/:id',
            ...(fetchMiddlewares<RequestHandler>(ApplicationController)),
            ...(fetchMiddlewares<RequestHandler>(ApplicationController.prototype.updateApplication)),

            async function ApplicationController_updateApplication(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    id: {"in":"path","name":"id","required":true,"dataType":"string"},
                    updateConfigBody: {"in":"body","name":"updateConfigBody","required":true,"ref":"UpdateApplicationForm"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const controller = new ApplicationController();

              await templateService.apiHandler({
                methodName: 'updateApplication',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 202,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa


    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
}

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
