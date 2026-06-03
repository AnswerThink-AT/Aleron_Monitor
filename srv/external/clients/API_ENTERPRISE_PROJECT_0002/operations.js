"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.operations = void 0;
exports.changeEntProjElmntPosition = changeEntProjElmntPosition;
exports.changeEntProjElmntProcgStatus = changeEntProjElmntProcgStatus;
exports.changeEntProjProcgStatus = changeEntProjProcgStatus;
exports.copyToActiveDocument = copyToActiveDocument;
const odata_v2_1 = require("@sap-cloud-sdk/odata-v2");
const service_1 = require("./service");
/**
 * Change Ent Proj Elmnt Position.
 * @param parameters - Object containing all parameters for the function.
 * @returns A request builder that allows to overwrite some of the values and execute the resulting request.
 */
function changeEntProjElmntPosition(parameters, deSerializers = odata_v2_1.defaultDeSerializers) {
    const params = {
        projectElementUuid: new odata_v2_1.OperationParameter('ProjectElementUUID', 'Edm.Guid', parameters.projectElementUuid),
        parentObjectUuid: new odata_v2_1.OperationParameter('ParentObjectUUID', 'Edm.Guid', parameters.parentObjectUuid),
        leftSiblingUuid: new odata_v2_1.OperationParameter('LeftSiblingUUID', 'Edm.Guid', parameters.leftSiblingUuid)
    };
    return new odata_v2_1.OperationRequestBuilder('post', '/sap/opu/odata/sap/API_ENTERPRISE_PROJECT_SRV;v=0002', 'ChangeEntProjElmntPosition', data => (0, odata_v2_1.transformReturnValueForEntity)(data, (0, service_1.apiEnterpriseProject0002)(deSerializers).enterpriseProjectElementApi), params, deSerializers);
}
/**
 * Change Ent Proj Elmnt Procg Status.
 * @param parameters - Object containing all parameters for the function.
 * @returns A request builder that allows to overwrite some of the values and execute the resulting request.
 */
function changeEntProjElmntProcgStatus(parameters, deSerializers = odata_v2_1.defaultDeSerializers) {
    const params = {
        projectElementUuid: new odata_v2_1.OperationParameter('ProjectElementUUID', 'Edm.Guid', parameters.projectElementUuid),
        processingStatus: new odata_v2_1.OperationParameter('ProcessingStatus', 'Edm.String', parameters.processingStatus)
    };
    return new odata_v2_1.OperationRequestBuilder('post', '/sap/opu/odata/sap/API_ENTERPRISE_PROJECT_SRV;v=0002', 'ChangeEntProjElmntProcgStatus', data => (0, odata_v2_1.transformReturnValueForEntity)(data, (0, service_1.apiEnterpriseProject0002)(deSerializers).enterpriseProjectElementApi), params, deSerializers);
}
/**
 * Change Ent Proj Procg Status.
 * @param parameters - Object containing all parameters for the function.
 * @returns A request builder that allows to overwrite some of the values and execute the resulting request.
 */
function changeEntProjProcgStatus(parameters, deSerializers = odata_v2_1.defaultDeSerializers) {
    const params = {
        projectUuid: new odata_v2_1.OperationParameter('ProjectUUID', 'Edm.Guid', parameters.projectUuid),
        processingStatus: new odata_v2_1.OperationParameter('ProcessingStatus', 'Edm.String', parameters.processingStatus)
    };
    return new odata_v2_1.OperationRequestBuilder('post', '/sap/opu/odata/sap/API_ENTERPRISE_PROJECT_SRV;v=0002', 'ChangeEntProjProcgStatus', data => (0, odata_v2_1.transformReturnValueForEntity)(data, (0, service_1.apiEnterpriseProject0002)(deSerializers).enterpriseProjectApi), params, deSerializers);
}
/**
 * Copy To Active Document.
 * @param parameters - Object containing all parameters for the function.
 * @returns A request builder that allows to overwrite some of the values and execute the resulting request.
 */
function copyToActiveDocument(parameters, deSerializers = odata_v2_1.defaultDeSerializers) {
    const params = {
        projectUuid: new odata_v2_1.OperationParameter('ProjectUUID', 'Edm.Guid', parameters.projectUuid),
        entProjDemandCopyIsRequested: new odata_v2_1.OperationParameter('EntProjDemandCopyIsRequested', 'Edm.Boolean', parameters.entProjDemandCopyIsRequested),
        entProjSettlmtRuleCpyIsReqd: new odata_v2_1.OperationParameter('EntProjSettlmtRuleCpyIsReqd', 'Edm.Boolean', parameters.entProjSettlmtRuleCpyIsReqd),
        project: new odata_v2_1.OperationParameter('Project', 'Edm.String', parameters.project),
        projectName: new odata_v2_1.OperationParameter('ProjectName', 'Edm.String', parameters.projectName),
        projectStartDate: new odata_v2_1.OperationParameter('ProjectStartDate', 'Edm.DateTime', parameters.projectStartDate),
        projectEndDate: new odata_v2_1.OperationParameter('ProjectEndDate', 'Edm.DateTime', parameters.projectEndDate),
        customerUuid: new odata_v2_1.OperationParameter('CustomerUUID', 'Edm.Guid', parameters.customerUuid),
        enterpriseProjectServiceOrg: new odata_v2_1.OperationParameter('EnterpriseProjectServiceOrg', 'Edm.String', parameters.enterpriseProjectServiceOrg),
        responsibleCostCenter: new odata_v2_1.OperationParameter('ResponsibleCostCenter', 'Edm.String', parameters.responsibleCostCenter),
        projectManagerUuid: new odata_v2_1.OperationParameter('ProjectManagerUUID', 'Edm.Guid', parameters.projectManagerUuid),
        projectCurrency: new odata_v2_1.OperationParameter('ProjectCurrency', 'Edm.String', parameters.projectCurrency),
        entProjectIsConfidential: new odata_v2_1.OperationParameter('EntProjectIsConfidential', 'Edm.Boolean', parameters.entProjectIsConfidential),
        restrictedTimePosting: new odata_v2_1.OperationParameter('RestrictedTimePosting', 'Edm.String', parameters.restrictedTimePosting)
    };
    return new odata_v2_1.OperationRequestBuilder('post', '/sap/opu/odata/sap/API_ENTERPRISE_PROJECT_SRV;v=0002', 'CopyToActiveDocument', data => (0, odata_v2_1.transformReturnValueForEntity)(data, (0, service_1.apiEnterpriseProject0002)(deSerializers).enterpriseProjectApi), params, deSerializers);
}
exports.operations = {
    changeEntProjElmntPosition,
    changeEntProjElmntProcgStatus,
    changeEntProjProcgStatus,
    copyToActiveDocument
};
//# sourceMappingURL=operations.js.map