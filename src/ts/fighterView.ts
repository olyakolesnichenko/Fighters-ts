import View from './view';
import Fighter from './fighter';

class FighterView extends View {

    fighter: Fighter;

    constructor(fighter: Fighter, handleClick: any) {
        super();

        fighter = new Fighter(fighter);

        this.fighter = fighter;

        const {name, source} = fighter;
        const nameElement = this.createName(name);
        const imageElement = this.createImage(source);

        const buttonElement = this.createButton(fighter.getFighterId());
        const buttonDeleteElement = this.createButtonDelete();
        let element = this.createElement({tagName: 'div', className: 'fighter'});
        element.appendChild(imageElement);
        element.appendChild(nameElement);
        element.appendChild(buttonElement);
        element.appendChild(buttonDeleteElement);
        element.addEventListener('click', event => handleClick(event, fighter));

        this.element = element;
    }

    createName(name: string) {
        const nameElement = this.createElement({tagName: 'span', className: 'name'});
        nameElement.innerText = name;

        return nameElement;
    }

    createImage(source: string) {
        const attributes = {src: source};
        const imgElement = this.createElement({
            tagName: 'img',
            className: 'fighter-image',
            attributes
        });

        return imgElement;
    }

    createButton(id: string) {

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

export default FighterView;