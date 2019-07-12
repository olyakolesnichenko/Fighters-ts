"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const view_1 = __importDefault(require("./view"));
const fighterFightView_1 = __importDefault(require("./fighterFightView"));
class FightView extends view_1.default {
    constructor(fighters) {
        super();
        this.createFightView(fighters);
    }
    createFightView(fighters) {
        const firstFighterElement = new fighterFightView_1.default(fighters[0]);
        const secondFighterElement = new fighterFightView_1.default(fighters[1]);
        const attributes = { src: '../resources/vs.png' };
        const vsImage = this.createElement({ tagName: 'img', className: 'fight-vs', attributes });
        const actionWrapper = this.createElement({ tagName: 'div', className: 'fight-actions' });
        actionWrapper.id = 'actions';
        let element = this.createElement({ tagName: 'div', className: 'fight-view' });
        element.appendChild(firstFighterElement.element);
        element.appendChild(actionWrapper);
        element.appendChild(vsImage);
        element.appendChild(secondFighterElement.element);
        this.element = element;
    }
}
exports.default = FightView;
//# sourceMappingURL=fightView.js.map