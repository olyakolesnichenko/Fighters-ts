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
const view_1 = __importDefault(require("./view"));
const fight_1 = __importDefault(require("./fight"));
const fighter_1 = __importDefault(require("./fighter"));
const fighterView_1 = __importDefault(require("./fighterView"));
const fighterDetailsView_1 = __importDefault(require("./fighterDetailsView"));
const fightersService_1 = require("./services/fightersService");
class FightersView extends view_1.default {
    constructor(fighters) {
        super();
        this.fightersDetailsMap = new Map();
        this.countFighters = 0;
        const handleClick = this.handleFighterClick.bind(this);
        this.handleSaveData = this.handleSaveData.bind(this);
        this.element = this.createElement({ tagName: 'div', className: 'fighters' });
        fighters.forEach(fighter => {
            const fighterView = new fighterView_1.default(fighter, handleClick);
            this.element.appendChild(fighterView.element);
        });
    }
    handleFighterClick(event, fighter) {
        return __awaiter(this, void 0, void 0, function* () {
            event.stopPropagation();
            if (event.target.tagName === 'BUTTON') {
                this.chooseForFight(event.target);
                return;
            }
            if (event.target.tagName === 'I') {
                this.deleteFighter(fighter);
                return;
            }
            const fighterDataModal = new fighterDetailsView_1.default(yield this.getDetailsInfo(fighter._id), this.handleSaveData);
            this.element.appendChild(fighterDataModal.element);
        });
    }
    getDetailsInfo(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let fighterData;
            if (!this.fightersDetailsMap.has(id)) {
                fighterData = yield fightersService_1.fighterService.getFighterDetails(id);
                this.fightersDetailsMap.set(id, fighterData);
            }
            else {
                fighterData = this.fightersDetailsMap.get(id);
            }
            return fighterData;
        });
    }
    handleSaveData(event, fighter, elem) {
        return __awaiter(this, void 0, void 0, function* () {
            const health = document.getElementById('health').value;
            const attack = document.getElementById('attack').value;
            const defense = document.getElementById('defense').value;
            this.fightersDetailsMap.set(fighter._id, Object.assign({}, fighter, { health, attack, defense }));
            yield fightersService_1.fighterService.updateFighter(fighter._id, Object.assign({}, fighter, { health, attack, defense }));
            elem.parentElement.removeChild(elem);
        });
    }
    chooseForFight(elem) {
        if (elem.classList.contains('choosen')) {
            elem.classList.remove('choosen');
            this.countFighters--;
            this.isReadyToFight();
        }
        else {
            if (this.countFighters < 2) {
                elem.classList.add('choosen');
                this.countFighters++;
                this.isReadyToFight();
            }
        }
    }
    deleteFighter(fighter) {
        return __awaiter(this, void 0, void 0, function* () {
            const isDelete = yield fightersService_1.fighterService.deleteFighter(fighter._id);
            if (isDelete) {
                const root = document.getElementById('root');
                const fighterElem = document.getElementById(fighter._id).parentElement;
                fighterElem.parentElement.removeChild(fighterElem);
            }
        });
    }
    isReadyToFight() {
        const root = document.getElementById('root');
        if (this.countFighters === 2) {
            const buttonElement = this.createElement({
                tagName: 'button',
                className: 'fight',
            });
            buttonElement.id = 'start_fight';
            buttonElement.innerText = 'FIGHT';
            buttonElement.addEventListener("click", event => this.startFight(event));
            root.appendChild(buttonElement);
        }
        else {
            const button = document.getElementById('start_fight');
            if (button) {
                root.removeChild(button);
            }
        }
    }
    startFight(event) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.countFighters === 2) {
                const choosen = document.getElementsByClassName('choosen');
                const fighterFirstFullInfo = yield this.getDetailsInfo(choosen[0].id);
                const fighterSecondFullInfo = yield this.getDetailsInfo(choosen[1].id);
                fight_1.default(new fighter_1.default(fighterFirstFullInfo), new fighter_1.default(fighterSecondFullInfo));
                const button = document.getElementById('start_fight');
                const fighters = document.getElementsByClassName('fighters')[0];
                const root = document.getElementById('root');
                root.removeChild(button);
                root.removeChild(fighters);
            }
        });
    }
}
exports.default = FightersView;
//# sourceMappingURL=fightersView.js.map