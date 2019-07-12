import View from './view';
import FighterFightView from './fighterFightView';
import Fighter from './fighter';

class FightView extends View {
    fighter: Fighter;

    constructor(fighters: Fighter[]) {
        super();

        this.createFightView(fighters);
    }

    createFightView(fighters: Fighter[]) {

        const firstFighterElement = new FighterFightView(fighters[0]);
        const secondFighterElement = new FighterFightView(fighters[1]);

        const attributes = {src: '../resources/vs.png'};
        const vsImage = this.createElement({tagName: 'img', className: 'fight-vs', attributes});
        const actionWrapper = this.createElement({tagName: 'div', className: 'fight-actions'});
        actionWrapper.id = 'actions';
        let element = this.createElement({tagName: 'div', className: 'fight-view'});
        element.appendChild(firstFighterElement.element);
        element.appendChild(actionWrapper);
        element.appendChild(vsImage);
        element.appendChild(secondFighterElement.element);

        this.element = element;
    }

}

export default FightView;