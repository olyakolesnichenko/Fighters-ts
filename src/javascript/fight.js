"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const view_1 = __importDefault(require("./view"));
const fightView_1 = __importDefault(require("./fightView"));
function fight(firstFighter, secondFighter) {
    let fighters = [];
    fighters[0] = firstFighter;
    fighters[1] = secondFighter;
    const fightView = new fightView_1.default(fighters);
    const fightersElement = fightView.element;
    const root = document.getElementById('root');
    root.appendChild(fightersElement);
    const actionsWrapper = document.getElementById('actions');
    //who strikes
    function randomInteger() {
        let rand = 1 + Math.random() * 2;
        rand = Math.floor(rand);
        return rand;
    }
    function changeHealth(defender) {
        const defenderElement = document.getElementById(defender.getId());
        const progressBar = defenderElement.getElementsByTagName('progress');
        progressBar[0].value = defender.getHealth();
    }
    function showActions(attacker, defender, hit, block) {
        actionsWrapper.innerText = "";
        const actionHit = createText(`${attacker.getName()} attacks with damage ${hit.toFixed(2)}`);
        const actionBlock = createText(`${defender.getName()} defended with block ${block.toFixed(2)}`);
        const damageResult = (block < hit) ? `${attacker.getName()} caused damage ${(hit - block).toFixed(2)}` : `${attacker.getName()} attacked unsuccessfully`;
        const actionDamage = createText(damageResult);
        const hitResult = (block < hit) ? `${defender.getName()}'s health is ${(defender.getHealth()).toFixed(2)}` : `${defender.getName()} defended successfully`;
        const actionResult = createText(hitResult);
        const fightHistoryBlock = view_1.default.createElement({ tagName: 'div', className: 'fight-history' });
        if (attacker === firstFighter) {
            fightHistoryBlock.classList.add('left');
        }
        fightHistoryBlock.appendChild(actionHit);
        fightHistoryBlock.appendChild(actionBlock);
        fightHistoryBlock.appendChild(actionDamage);
        fightHistoryBlock.appendChild(actionResult);
        actionsWrapper.appendChild(fightHistoryBlock);
    }
    function createText(text) {
        const textElement = view_1.default.createElement({ tagName: 'p', className: 'action' });
        textElement.innerText = text;
        return textElement;
    }
    function viewWinner(attacker, defender) {
        const attackerElement = document.getElementById(attacker.getId());
        const defenderElement = document.getElementById(defender.getId());
        const imageVs = document.getElementsByClassName('fight-vs')[0];
        fightersElement.removeChild(defenderElement);
        fightersElement.removeChild(imageVs);
        fightersElement.removeChild(actionsWrapper);
        const winText = view_1.default.createElement({ tagName: 'p', className: 'winner' });
        winText.innerText = `${attacker.getName()} WINS!!!`;
        attackerElement.prepend(winText);
    }
    function doHit(attacker, defender) {
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
            actionsWrapper.style.display = 'block';
            const attacker = randomInteger() === 1 ? firstFighter : secondFighter;
            const defender = attacker === firstFighter ? secondFighter : firstFighter;
            doHit(attacker, defender);
            if (defender.getHealth() <= 0) {
                viewWinner(attacker, defender);
            }
            else {
                hit();
            }
        }, 3000);
    }
    hit();
}
exports.default = fight;
//# sourceMappingURL=fight.js.map