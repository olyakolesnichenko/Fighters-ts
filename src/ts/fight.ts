import View from './view';
import Fighter from './fighter';
import FightView from './fightView';

function fight(firstFighter: Fighter, secondFighter: Fighter) {

    let fighters = [];
    fighters[0] = firstFighter;
    fighters[1] = secondFighter;
    const fightView = new FightView(fighters);
    const fightersElement = fightView.element;
    const root = document.getElementById('root');
    (root as HTMLElement).appendChild(fightersElement);
    const actionsWrapper = document.getElementById('actions');

    //who strikes
    function randomInteger() {
        let rand = 1 + Math.random() * 2;
        rand = Math.floor(rand);
        return rand;
    }

    function changeHealth(defender:Fighter) {
        const defenderElement = document.getElementById(defender.getId());
        const progressBar = (defenderElement as HTMLElement).getElementsByTagName('progress');
        progressBar[0].value = defender.getHealth();
    }

    function showActions(attacker:Fighter, defender:Fighter, hit:number, block:number) {
        (actionsWrapper as HTMLElement).innerText = "";
        const actionHit = createText(`${attacker.getName()} attacks with damage ${hit.toFixed(2)}`);
        const actionBlock = createText(`${defender.getName()} defended with block ${block.toFixed(2)}`);
        const damageResult = (block < hit) ? `${attacker.getName()} caused damage ${(hit - block).toFixed(2)}` : `${attacker.getName()} attacked unsuccessfully`;
        const actionDamage = createText(damageResult);
        const hitResult = (block < hit) ? `${defender.getName()}'s health is ${(defender.getHealth()).toFixed(2)}` : `${defender.getName()} defended successfully`;
        const actionResult = createText(hitResult);

        const fightHistoryBlock = View.createElement({tagName: 'div', className: 'fight-history'});
        if (attacker === firstFighter) {
            fightHistoryBlock.classList.add('left');
        }

        fightHistoryBlock.appendChild(actionHit);
        fightHistoryBlock.appendChild(actionBlock);
        fightHistoryBlock.appendChild(actionDamage);
        fightHistoryBlock.appendChild(actionResult);
        (actionsWrapper as HTMLElement).appendChild(fightHistoryBlock);

    }

    function createText(text: string) {
        const textElement = View.createElement({tagName: 'p', className: 'action'});
        textElement.innerText = text;
        return textElement;
    }

    function viewWinner(attacker: Fighter, defender: Fighter) {

        const attackerElement = document.getElementById(attacker.getId());
        const defenderElement = document.getElementById(defender.getId());
        const imageVs = document.getElementsByClassName('fight-vs')[0];
        fightersElement.removeChild(defenderElement as HTMLElement);
        fightersElement.removeChild(imageVs);
        fightersElement.removeChild(actionsWrapper as HTMLElement);

        const winText = View.createElement({tagName: 'p', className: 'winner'});
        winText.innerText = `${attacker.getName()} WINS!!!`;
        (attackerElement as any).prepend(winText);
    }

    function doHit(attacker: Fighter, defender: Fighter) {
        const hit = attacker.getHitPower();
        const block = defender.getBlockPower();

        if (block < hit) {
            const damage = hit - block;
            defender.setHealth(defender.getHealth() - damage);
            changeHealth(defender);
        }
        showActions(attacker, defender, hit, block);
    }

    function hit() {
        setTimeout(function () {
            (actionsWrapper as HTMLElement).style.display = 'block';
            const attacker = randomInteger() === 1 ? firstFighter : secondFighter;
            const defender = attacker === firstFighter ? secondFighter : firstFighter;
            doHit(attacker, defender);

            if (defender.getHealth() <= 0) {
                viewWinner(attacker, defender);
            } else {

                hit();
            }
        }, 3000);
    }

    hit();


}


export default fight;
