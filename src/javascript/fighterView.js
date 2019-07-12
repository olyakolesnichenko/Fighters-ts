"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const view_1 = __importDefault(require("./view"));
const fighter_1 = __importDefault(require("./fighter"));
class FighterView extends view_1.default {
    constructor(fighter, handleClick) {
        super();
        fighter = new fighter_1.default(fighter);
        this.fighter = fighter;
        const { name, source } = fighter;
        const nameElement = this.createName(name);
        const imageElement = this.createImage(source);
        const buttonElement = this.createButton(fighter.getFighterId());
        const buttonDeleteElement = this.createButtonDelete();
        let element = this.createElement({ tagName: 'div', className: 'fighter' });
        element.appendChild(imageElement);
        element.appendChild(nameElement);
        element.appendChild(buttonElement);
        element.appendChild(buttonDeleteElement);
        element.addEventListener('click', event => handleClick(event, fighter));
        this.element = element;
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
    createButton(id) {
        const buttonElement = this.createElement({
            tagName: 'button',
            className: 'fighter-choose',
        });
        buttonElement.innerText = "Choose";
        buttonElement.id = id;
        return buttonElement;
    }
    createButtonDelete() {
        const buttonDeleteElement = this.createElement({
            tagName: 'i',
            className: 'fighter-delete',
        });
        buttonDeleteElement.innerText = "X";
        return buttonDeleteElement;
    }
}
exports.default = FighterView;
//# sourceMappingURL=fighterView.js.map