"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Fighter {
    constructor(fighter) {
        this._id = fighter._id;
        this.attack = fighter.attack;
        this.defense = fighter.defense;
        this.name = fighter.name;
        this.health = fighter.health;
        this.source = fighter.source;
        this.initialHealth = fighter.health;
    }
    getId() {
        return this._id;
    }
    getFighterId() {
        return this._id;
    }
    getHitPower() {
        return this.attack * this._getRandomValue();
    }
    getBlockPower() {
        return this.defense * this._getRandomValue();
    }
    getName() {
        return this.name;
    }
    getHealth() {
        return this.health;
    }
    getInitialHealth() {
        return this.initialHealth;
    }
    setHealth(newHealth) {
        this.health = newHealth;
    }
    //random number from 1 to 2
    _getRandomValue() {
        return Math.random() + 1;
    }
}
exports.default = Fighter;
//# sourceMappingURL=fighter.js.map