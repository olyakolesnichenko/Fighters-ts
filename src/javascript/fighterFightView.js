"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const view_1 = __importDefault(require("./view"));
class FighterFightView extends view_1.default {
    constructor(fighter) {
        super();
        this.fighter = fighter;
        this.createFighter(fighter);
    }
    createFighter(fighter) {
        const { name, source } = fighter;
        const nameElement = this.createName(name);
        const imageElement = this.createImage(source);
        const progressElement = this.createProgress(fighter.getHealth());
        let element = this.createElement({ tagName: 'div', className: 'fighter' });
        element.id = fighter.getFighterId();
        element.appendChild(progressElement);
        element.appendChild(nameElement);
        element.appendChild(imageElement);
        this.element = element;
    }
    createProgress(health) {
        const progressElement = this.createElement({ tagName: 'progress', className: 'progress' });
        progressElement.setAttribute('max', String(health));
        progressElement.setAttribute('value', String(health));
        return progressElement;
    }
    createName(name) {
        const nameElement = this.createElement({ tagName: 'span', className: 'name' });
        nameElement.innerText = name;
        return nameElement;
    }
    createImage(source) {
        const attributes = { src: source };
        const imgElement = this.createElement({
            tagName: 'img',
            className: 'fighter-image',
            attributes
        });
        return imgElement;
    }
}
exports.default = FighterFightView;
//# sourceMappingURL=fighterFightView.js.map