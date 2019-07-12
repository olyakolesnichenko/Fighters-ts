"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fightersView_1 = __importDefault(require("./fightersView"));
const fightersService_1 = require("./services/fightersService");
class App {
    constructor() {
        this.startApp();
    }
    startApp() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                App.loadingElement.style.visibility = 'visible';
                const fighters = yield fightersService_1.fighterService.getFighters();
                const fightersView = new fightersView_1.default(fighters);
                const fightersElement = fightersView.element;
                App.rootElement.appendChild(fightersElement);
            }
            catch (error) {
                console.warn(error);
                App.rootElement.innerText = 'Failed to load data';
            }
            finally {
                App.loadingElement.style.visibility = 'hidden';
            }
        });
    }
}
App.rootElement = document.getElementById('root');
App.loadingElement = document.getElementById('loading-overlay');
exports.default = App;
//# sourceMappingURL=app.js.map