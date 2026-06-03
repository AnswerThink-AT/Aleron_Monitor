"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.operations = void 0;
exports.yy1EmployeeCustomerInfoSapUpsert = yy1EmployeeCustomerInfoSapUpsert;
const odata_v2_1 = require("@sap-cloud-sdk/odata-v2");
const service_1 = require("./service");
/**
 * Yy 1 Employee Customer Info Sap Upsert.
 * @param parameters - Object containing all parameters for the function.
 * @returns A request builder that allows to overwrite some of the values and execute the resulting request.
 */
function yy1EmployeeCustomerInfoSapUpsert(parameters, deSerializers = odata_v2_1.defaultDeSerializers) {
    const params = {
        workerId: new odata_v2_1.OperationParameter('WORKER_ID', 'Edm.String', parameters.workerId),
        name: new odata_v2_1.OperationParameter('Name', 'Edm.String', parameters.name),
        ssn: new odata_v2_1.OperationParameter('SSN', 'Edm.String', parameters.ssn),
        empGrp: new odata_v2_1.OperationParameter('EMP_GRP', 'Edm.String', parameters.empGrp),
        empSubgrp: new odata_v2_1.OperationParameter('EMP_SUBGRP', 'Edm.String', parameters.empSubgrp),
        startDate: new odata_v2_1.OperationParameter('START_DATE', 'Edm.DateTime', parameters.startDate),
        endDate: new odata_v2_1.OperationParameter('END_DATE', 'Edm.DateTime', parameters.endDate),
        contratSap: new odata_v2_1.OperationParameter('CONTRAT_SAP', 'Edm.String', parameters.contratSap),
        salesOrdSap: new odata_v2_1.OperationParameter('SALES_ORD_SAP', 'Edm.String', parameters.salesOrdSap),
        projectId: new odata_v2_1.OperationParameter('PROJECT_ID', 'Edm.String', parameters.projectId),
        projectName: new odata_v2_1.OperationParameter('PROJECT_NAME', 'Edm.String', parameters.projectName),
        customerId: new odata_v2_1.OperationParameter('CUSTOMER_ID', 'Edm.String', parameters.customerId),
        ssOrder: new odata_v2_1.OperationParameter('SS_ORDER', 'Edm.String', parameters.ssOrder),
        wnOrder: new odata_v2_1.OperationParameter('WN_ORDER', 'Edm.String', parameters.wnOrder),
        positionId: new odata_v2_1.OperationParameter('POSITION_ID', 'Edm.Decimal', parameters.positionId),
        jobId: new odata_v2_1.OperationParameter('JOB_ID', 'Edm.Decimal', parameters.jobId),
        zpayroll: new odata_v2_1.OperationParameter('ZPAYROLL', 'Edm.String', parameters.zpayroll),
        recrid: new odata_v2_1.OperationParameter('RECRID', 'Edm.Decimal', parameters.recrid),
        ztimeInd: new odata_v2_1.OperationParameter('ZTIME_IND', 'Edm.String', parameters.ztimeInd),
        zhireAction: new odata_v2_1.OperationParameter('ZHIRE_ACTION', 'Edm.String', parameters.zhireAction),
        actionType: new odata_v2_1.OperationParameter('ACTION_TYPE', 'Edm.String', parameters.actionType),
        tReason: new odata_v2_1.OperationParameter('T_REASON', 'Edm.String', parameters.tReason),
        zhrrept: new odata_v2_1.OperationParameter('ZHRREPT', 'Edm.String', parameters.zhrrept)
    };
    return new odata_v2_1.OperationRequestBuilder('post', '/sap/opu/odata/sap/YY1_EMPLOYEE_CUSTOMER_INFO_CDS', 'YY1_EMPLOYEE_CUSTOMER_INFOSap_upsert', data => (0, odata_v2_1.transformReturnValueForEntity)(data, (0, service_1.yy1EmployeeCustomerInfoCds)(deSerializers).yy1_Employee_Customer_InfoApi), params, deSerializers);
}
exports.operations = {
    yy1EmployeeCustomerInfoSapUpsert
};
//# sourceMappingURL=operations.js.map