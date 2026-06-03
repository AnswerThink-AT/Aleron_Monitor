"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.apiEnterpriseProject0002 = apiEnterpriseProject0002;
/*
 * Copyright (c) 2025 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
const EnterpriseProjBlkFuncApi_1 = require("./EnterpriseProjBlkFuncApi");
const EnterpriseProjectElementApi_1 = require("./EnterpriseProjectElementApi");
const EnterpriseProjectJvaApi_1 = require("./EnterpriseProjectJvaApi");
const EnterpriseProjectRoleApi_1 = require("./EnterpriseProjectRoleApi");
const EnterpriseProjectTeamMemberApi_1 = require("./EnterpriseProjectTeamMemberApi");
const EnterpriseProjectApi_1 = require("./EnterpriseProjectApi");
const EntProjectElementJvaApi_1 = require("./EntProjectElementJvaApi");
const EntProjectPublicSectorApi_1 = require("./EntProjectPublicSectorApi");
const EntProjElmntBlockFuncApi_1 = require("./EntProjElmntBlockFuncApi");
const EntProjElmntCnfgrdWrkItmTxtApi_1 = require("./EntProjElmntCnfgrdWrkItmTxtApi");
const EntProjElmntDlvbrlApi_1 = require("./EntProjElmntDlvbrlApi");
const EntProjElmntDlvbrlDistrApi_1 = require("./EntProjElmntDlvbrlDistrApi");
const EntProjectElmntPublicSectorApi_1 = require("./EntProjectElmntPublicSectorApi");
const EntProjElmntWorkItemApi_1 = require("./EntProjElmntWorkItemApi");
const EntTeamMemberEntitlementApi_1 = require("./EntTeamMemberEntitlementApi");
const operations_1 = require("./operations");
const odata_v2_1 = require("@sap-cloud-sdk/odata-v2");
const BatchRequest_1 = require("./BatchRequest");
function apiEnterpriseProject0002(deSerializers = odata_v2_1.defaultDeSerializers) {
    return new ApiEnterpriseProject0002((0, odata_v2_1.mergeDefaultDeSerializersWith)(deSerializers));
}
class ApiEnterpriseProject0002 {
    constructor(deSerializers) {
        this.apis = {};
        this.deSerializers = deSerializers;
    }
    initApi(key, entityApi) {
        if (!this.apis[key]) {
            this.apis[key] = entityApi._privateFactory(this.deSerializers);
        }
        return this.apis[key];
    }
    get enterpriseProjBlkFuncApi() {
        const api = this.initApi('enterpriseProjBlkFuncApi', EnterpriseProjBlkFuncApi_1.EnterpriseProjBlkFuncApi);
        const linkedApis = [
            this.initApi('enterpriseProjectApi', EnterpriseProjectApi_1.EnterpriseProjectApi)
        ];
        api._addNavigationProperties(linkedApis);
        return api;
    }
    get enterpriseProjectElementApi() {
        const api = this.initApi('enterpriseProjectElementApi', EnterpriseProjectElementApi_1.EnterpriseProjectElementApi);
        const linkedApis = [
            this.initApi('entProjectElementJvaApi', EntProjectElementJvaApi_1.EntProjectElementJvaApi),
            this.initApi('entProjectElmntPublicSectorApi', EntProjectElmntPublicSectorApi_1.EntProjectElmntPublicSectorApi),
            this.initApi('entProjElmntBlockFuncApi', EntProjElmntBlockFuncApi_1.EntProjElmntBlockFuncApi),
            this.initApi('entProjElmntDlvbrlApi', EntProjElmntDlvbrlApi_1.EntProjElmntDlvbrlApi),
            this.initApi('entProjElmntWorkItemApi', EntProjElmntWorkItemApi_1.EntProjElmntWorkItemApi),
            this.initApi('enterpriseProjectElementApi', EnterpriseProjectElementApi_1.EnterpriseProjectElementApi),
            this.initApi('enterpriseProjectElementApi', EnterpriseProjectElementApi_1.EnterpriseProjectElementApi),
            this.initApi('enterpriseProjectApi', EnterpriseProjectApi_1.EnterpriseProjectApi)
        ];
        api._addNavigationProperties(linkedApis);
        return api;
    }
    get enterpriseProjectJvaApi() {
        const api = this.initApi('enterpriseProjectJvaApi', EnterpriseProjectJvaApi_1.EnterpriseProjectJvaApi);
        const linkedApis = [
            this.initApi('enterpriseProjectApi', EnterpriseProjectApi_1.EnterpriseProjectApi)
        ];
        api._addNavigationProperties(linkedApis);
        return api;
    }
    get enterpriseProjectRoleApi() {
        const api = this.initApi('enterpriseProjectRoleApi', EnterpriseProjectRoleApi_1.EnterpriseProjectRoleApi);
        const linkedApis = [
            this.initApi('enterpriseProjectApi', EnterpriseProjectApi_1.EnterpriseProjectApi)
        ];
        api._addNavigationProperties(linkedApis);
        return api;
    }
    get enterpriseProjectTeamMemberApi() {
        const api = this.initApi('enterpriseProjectTeamMemberApi', EnterpriseProjectTeamMemberApi_1.EnterpriseProjectTeamMemberApi);
        const linkedApis = [
            this.initApi('entTeamMemberEntitlementApi', EntTeamMemberEntitlementApi_1.EntTeamMemberEntitlementApi),
            this.initApi('enterpriseProjectApi', EnterpriseProjectApi_1.EnterpriseProjectApi)
        ];
        api._addNavigationProperties(linkedApis);
        return api;
    }
    get enterpriseProjectApi() {
        const api = this.initApi('enterpriseProjectApi', EnterpriseProjectApi_1.EnterpriseProjectApi);
        const linkedApis = [
            this.initApi('enterpriseProjectElementApi', EnterpriseProjectElementApi_1.EnterpriseProjectElementApi),
            this.initApi('enterpriseProjectJvaApi', EnterpriseProjectJvaApi_1.EnterpriseProjectJvaApi),
            this.initApi('enterpriseProjBlkFuncApi', EnterpriseProjBlkFuncApi_1.EnterpriseProjBlkFuncApi),
            this.initApi('entProjectPublicSectorApi', EntProjectPublicSectorApi_1.EntProjectPublicSectorApi),
            this.initApi('enterpriseProjectRoleApi', EnterpriseProjectRoleApi_1.EnterpriseProjectRoleApi),
            this.initApi('enterpriseProjectTeamMemberApi', EnterpriseProjectTeamMemberApi_1.EnterpriseProjectTeamMemberApi)
        ];
        api._addNavigationProperties(linkedApis);
        return api;
    }
    get entProjectElementJvaApi() {
        const api = this.initApi('entProjectElementJvaApi', EntProjectElementJvaApi_1.EntProjectElementJvaApi);
        const linkedApis = [
            this.initApi('enterpriseProjectElementApi', EnterpriseProjectElementApi_1.EnterpriseProjectElementApi),
            this.initApi('enterpriseProjectApi', EnterpriseProjectApi_1.EnterpriseProjectApi)
        ];
        api._addNavigationProperties(linkedApis);
        return api;
    }
    get entProjectPublicSectorApi() {
        const api = this.initApi('entProjectPublicSectorApi', EntProjectPublicSectorApi_1.EntProjectPublicSectorApi);
        const linkedApis = [
            this.initApi('enterpriseProjectApi', EnterpriseProjectApi_1.EnterpriseProjectApi)
        ];
        api._addNavigationProperties(linkedApis);
        return api;
    }
    get entProjElmntBlockFuncApi() {
        const api = this.initApi('entProjElmntBlockFuncApi', EntProjElmntBlockFuncApi_1.EntProjElmntBlockFuncApi);
        const linkedApis = [
            this.initApi('enterpriseProjectElementApi', EnterpriseProjectElementApi_1.EnterpriseProjectElementApi),
            this.initApi('enterpriseProjectApi', EnterpriseProjectApi_1.EnterpriseProjectApi)
        ];
        api._addNavigationProperties(linkedApis);
        return api;
    }
    get entProjElmntCnfgrdWrkItmTxtApi() {
        return this.initApi('entProjElmntCnfgrdWrkItmTxtApi', EntProjElmntCnfgrdWrkItmTxtApi_1.EntProjElmntCnfgrdWrkItmTxtApi);
    }
    get entProjElmntDlvbrlApi() {
        const api = this.initApi('entProjElmntDlvbrlApi', EntProjElmntDlvbrlApi_1.EntProjElmntDlvbrlApi);
        const linkedApis = [
            this.initApi('enterpriseProjectElementApi', EnterpriseProjectElementApi_1.EnterpriseProjectElementApi),
            this.initApi('entProjElmntDlvbrlDistrApi', EntProjElmntDlvbrlDistrApi_1.EntProjElmntDlvbrlDistrApi)
        ];
        api._addNavigationProperties(linkedApis);
        return api;
    }
    get entProjElmntDlvbrlDistrApi() {
        const api = this.initApi('entProjElmntDlvbrlDistrApi', EntProjElmntDlvbrlDistrApi_1.EntProjElmntDlvbrlDistrApi);
        const linkedApis = [
            this.initApi('entProjElmntDlvbrlApi', EntProjElmntDlvbrlApi_1.EntProjElmntDlvbrlApi)
        ];
        api._addNavigationProperties(linkedApis);
        return api;
    }
    get entProjectElmntPublicSectorApi() {
        const api = this.initApi('entProjectElmntPublicSectorApi', EntProjectElmntPublicSectorApi_1.EntProjectElmntPublicSectorApi);
        const linkedApis = [
            this.initApi('enterpriseProjectElementApi', EnterpriseProjectElementApi_1.EnterpriseProjectElementApi),
            this.initApi('enterpriseProjectApi', EnterpriseProjectApi_1.EnterpriseProjectApi)
        ];
        api._addNavigationProperties(linkedApis);
        return api;
    }
    get entProjElmntWorkItemApi() {
        const api = this.initApi('entProjElmntWorkItemApi', EntProjElmntWorkItemApi_1.EntProjElmntWorkItemApi);
        const linkedApis = [
            this.initApi('enterpriseProjectElementApi', EnterpriseProjectElementApi_1.EnterpriseProjectElementApi),
            this.initApi('entProjElmntCnfgrdWrkItmTxtApi', EntProjElmntCnfgrdWrkItmTxtApi_1.EntProjElmntCnfgrdWrkItmTxtApi),
            this.initApi('enterpriseProjectApi', EnterpriseProjectApi_1.EnterpriseProjectApi)
        ];
        api._addNavigationProperties(linkedApis);
        return api;
    }
    get entTeamMemberEntitlementApi() {
        const api = this.initApi('entTeamMemberEntitlementApi', EntTeamMemberEntitlementApi_1.EntTeamMemberEntitlementApi);
        const linkedApis = [
            this.initApi('enterpriseProjectTeamMemberApi', EnterpriseProjectTeamMemberApi_1.EnterpriseProjectTeamMemberApi),
            this.initApi('enterpriseProjectApi', EnterpriseProjectApi_1.EnterpriseProjectApi),
            this.initApi('enterpriseProjectRoleApi', EnterpriseProjectRoleApi_1.EnterpriseProjectRoleApi)
        ];
        api._addNavigationProperties(linkedApis);
        return api;
    }
    get operations() {
        return {
            changeEntProjElmntPosition: (parameter) => (0, operations_1.changeEntProjElmntPosition)(parameter, this.deSerializers),
            changeEntProjElmntProcgStatus: (parameter) => (0, operations_1.changeEntProjElmntProcgStatus)(parameter, this.deSerializers),
            changeEntProjProcgStatus: (parameter) => (0, operations_1.changeEntProjProcgStatus)(parameter, this.deSerializers),
            copyToActiveDocument: (parameter) => (0, operations_1.copyToActiveDocument)(parameter, this.deSerializers)
        };
    }
    get batch() {
        return BatchRequest_1.batch;
    }
    get changeset() {
        return BatchRequest_1.changeset;
    }
}
//# sourceMappingURL=service.js.map