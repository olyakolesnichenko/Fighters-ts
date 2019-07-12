import View from './view';
import Fighter from './fighter';

class FighterFightView extends View {

    fighter: Fighter;

    constructor(fighter: Fighter) {
        super();

        this.fighter = fighter;

        this.createFighter(fighter);
    }


    createFighter(fighter: Fighter) {
        const {name, source} = fighter;

        const nameElement = this.createName(name);
        const imageElement = this.createImage(source);
        const progressElement = this.createProgress(fighter.getHealth());
        let element = this.createElement({tagName: 'div', className: 'fighter'});
        element.id = fighter.getFighterId();
        element.appendChild(progressElement);
        element.appendChild(nameElement);
        element.appendChild(imageElement);
        this.element = element;
    }

    createProgress(health: number) {
        const progressElement = this.createElement({tagName: 'progress', className: 'progress'});
        progressElement.setAttribute('max', String(health));
        progressElement.setAttribute('value', String(health));

        return progressElement;
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

}

export default FighterFightView;