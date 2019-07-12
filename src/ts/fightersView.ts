import View from './view';
import fight from './fight';
import Fighter from './fighter';
import FighterView from './fighterView';
import FighterDetailsView from './fighterDetailsView';
import {fighterService} from './services/fightersService';

class FightersView extends View {

    fighter: Fighter;

    constructor(fighters: Fighter[]) {
        super();

        const handleClick = this.handleFighterClick.bind(this);
        this.handleSaveData = this.handleSaveData.bind(this);

        this.element = this.createElement({tagName: 'div', className: 'fighters'});
        fighters.forEach(fighter => {
            const fighterView = new FighterView(fighter, handleClick);

            this.element.appendChild(fighterView.element as HTMLElement);
        });

    }

    fightersDetailsMap = new Map();
    countFighters = 0;

    async handleFighterClick(event: any, fighter: Fighter) {
        event.stopPropagation();

        if (event.target.tagName === 'BUTTON') {
            this.chooseForFight(event.target);
            return;
        }
        if (event.target.tagName === 'I') {
            this.deleteFighter(fighter);
            return;
        }

        const fighterDataModal = new FighterDetailsView(await this.getDetailsInfo(fighter._id), this.handleSaveData);
        this.element.appendChild(fighterDataModal.element);
    }

    async getDetailsInfo(id: string) {
        let fighterData;
        if (!this.fightersDetailsMap.has(id)) {
            fighterData = await fighterService.getFighterDetails(id);
            this.fightersDetailsMap.set(id, fighterData);
        } else {
            fighterData = this.fightersDetailsMap.get(id);
        }
        return fighterData;
    }

    async handleSaveData(event: any, fighter: Fighter, elem: HTMLElement) {
        const health = (document.getElementById('health') as HTMLInputElement).value;
        const attack = (document.getElementById('attack') as HTMLInputElement).value;
        const defense = (document.getElementById('defense') as HTMLInputElement).value;

        this.fightersDetailsMap.set(fighter._id, {...fighter, health, attack, defense});
        await fighterService.updateFighter(fighter._id, {...fighter, health, attack, defense});
        (elem.parentElement as HTMLElement).removeChild(elem);
    }

    chooseForFight(elem: HTMLElement) {
        if (elem.classList.contains('choosen')) {
            elem.classList.remove('choosen');
            this.countFighters--;
            this.isReadyToFight();
        } else {
            if (this.countFighters < 2) {
                elem.classList.add('choosen');
                this.countFighters++;
                this.isReadyToFight();
            }
        }
    }

    async deleteFighter(fighter: Fighter) {
        const isDelete = await fighterService.deleteFighter(fighter._id);
        if (isDelete) {
            const root = document.getElementById('root');
            const fighterElem = (document.getElementById(fighter._id) as HTMLElement).parentElement;
            ((fighterElem as HTMLElement).parentElement as HTMLElement).removeChild(fighterElem as HTMLElement);

        }
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
            (root as HTMLElement).appendChild(buttonElement);
        } else {
            const button = document.getElementById('start_fight');
            if (button) {
                (root as HTMLElement).removeChild(button);
            }
        }
    }

    async startFight(event: any) {
        if (this.countFighters === 2) {
            const choosen = document.getElementsByClassName('choosen');
            const fighterFirstFullInfo = await this.getDetailsInfo(choosen[0].id);
            const fighterSecondFullInfo = await this.getDetailsInfo(choosen[1].id);
            fight(new Fighter(fighterFirstFullInfo), new Fighter(fighterSecondFullInfo));
            const button = document.getElementById('start_fight');
            const fighters = document.getElementsByClassName('fighters')[0];
            const root = document.getElementById('root');
            (root as HTMLElement).removeChild(button as HTMLButtonElement);
            (root as HTMLElement).removeChild(fighters);
        }
    }

}

export default FightersView;