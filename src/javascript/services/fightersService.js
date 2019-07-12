"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const apiHelper_1 = require("../helpers/apiHelper");
class FighterService {
    getFighters() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const endpoint = '/user';
                const apiResult = yield apiHelper_1.callApi(endpoint, 'GET');
                return apiResult;
            }
            catch (error) {
                throw error;
            }
        });
    }
    getFighterDetails(_id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const endpoint = `/user/${_id}`;
                return yield apiHelper_1.callApi(endpoint, 'GET');
            }
            catch (error) {
                throw error;
            }
        });
    }
    updateFighter(_id, user) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const endpoint = `/user/${_id}`;
                const apiResult = yield apiHelper_1.callApi(endpoint, 'PUT', user);
                return apiResult;
            }
            catch (error) {
                throw error;
            }
        });
    }
    deleteFighter(_id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const endpoint = `/user/${_id}`;
                const apiResult = yield apiHelper_1.callApi(endpoint, 'DELETE');
                return apiResult;
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.fighterService = new FighterService();
//# sourceMappingURL=fightersService.js.map