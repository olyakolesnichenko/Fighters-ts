interface FighterInterface {
    _id: string;
    name: string;
    health: number;
    attack: number;
    defense: number;
    source: string;

}

class Fighter implements FighterInterface{

    _id: string;
    attack: number;
    defense: number;
    name: string;
    health: number;
    source: string;
    initialHealth: number;

    constructor(fighter: FighterInterface) {
        this._id = fighter._id;
        this.attack = fighter.attack;
        this.defense = fighter.defense;
        this.name = fighter.name;
        this.health = fighter.health;
        this.source= fighter.source;
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

    setHealth(newHealth: number) {
        this.health = newHealth;
    }

    //random number from 1 to 2
    private _getRandomValue() {
        return Math.random() + 1;
    }
}

export default Fighter;
