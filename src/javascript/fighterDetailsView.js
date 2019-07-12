"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const view_1 = __importDefault(require("./view"));
class FighterDetailsView extends view_1.default {
    constructor(fighter, handleSaveData) {
        super();
        this.fighter = fighter;
        this.createFighterModal(fighter, handleSaveData);
        this.handleRemoveModal = this.handleRemoveModal.bind(this);
        this.handleChangeProperty = this.handleChangeProperty.bind(this);
    }
    createFighterModal(fighter, handleSaveData) {
        const { name, health, attack, defense } = fighter;
        const nameElement = this.createName(name);
        const healthElement = this.createPropertyEditor('health', String(health));
        const attackElement = this.createPropertyEditor('attack', String(attack));
        const defenseElement = this.createPropertyEditor('defense', String(defense));
        const closeElement = this.createElement({ tagName: 'span', className: 'close' });
        const saveButton = this.createElement({ tagName: 'button', className: 'save' });
        const contentElement = this.createElement({ tagName: 'div', className: 'modal-content' });
        closeElement.innerText = 'X';
        saveButton.innerText = 'Save';
        let element = this.createElement({ tagName: 'div', className: 'modal' });
        contentElement.appendChild(closeElement);
        contentElement.appendChild(nameElement);
        contentElement.appendChild(healthElement);
        contentElement.appendChild(attackElement);
        contentElement.appendChild(defenseElement);
        contentElement.appendChild(saveButton);
        this.element = element;
        element.appendChild(contentElement);
        closeElement.addEventListener("click", event => this.handleRemoveModal(event, element));
        saveButton.addEventListener("click", event => handleSaveData(event, fighter, element));
    }
    createName(name) {
        const nameElement = this.createElement({ tagName: 'span', className: 'name' });
        nameElement.innerText = name;
        return nameElement;
    }
    createPropertyEditor(property, data) {
        const propertyElement = this.createElement({ tagName: 'div', className: 'property' });
        const valueElement = this.createElement({ tagName: 'input', className: 'value' });
        const incrementButton = this.createElement({ tagName: 'button', className: 'button-sign' });
        const decrementButton = this.createElement({ tagName: 'button', className: 'button-sign' });
        valueElement.id = property;
        valueElement.setAttribute("type", "number");
        valueElement.setAttribute("min", "0");
        valueElement.setAttribute("readonly", 'true');
        incrementButton.innerText = "+";
        decrementButton.innerText = "-";
        incrementButton.addEventListener("click", event => this.handleChangeProperty(event));
        decrementButton.addEventListener("click", event => this.handleChangeProperty(event));
        valueElement.value = data;
        propertyElement.appendChild(decrementButton);
        propertyElement.appendChild(valueElement);
        propertyElement.appendChild(incrementButton);
        return propertyElement;
    }
    handleRemoveModal(event, elem) {
        elem.parentElement.removeChild(elem);
    }
    ;
    handleChangeProperty(event) {
        const inputProperty = event.target.parentElement.getElementsByTagName('input')[0];
        if (event.target.innerText === '-') {
            if (parseInt(inputProperty.value) > inputProperty.getAttribute("min")) {
                inputProperty.value--;
            }
        }
        else {
            inputProperty.value++;
        }
    }
    ;
}
exports.default = FighterDetailsView;
//# sourceMappingURL=fighterDetailsView.js.map