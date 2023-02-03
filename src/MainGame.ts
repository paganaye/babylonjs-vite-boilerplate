const INITIAL_ENERGY = 1000;

export class MainGame {
    maxEnergy = INITIAL_ENERGY;
    currentEnergy = 0;
    energyPerTick = 1;

    constructor() {

    }

    get energyRatio() {
        return this.currentEnergy / this.maxEnergy;
    }

    updateEnergy = () => {
        this.currentEnergy += this.energyPerTick;
        if (this.currentEnergy > this.maxEnergy) {
            this.currentEnergy = this.maxEnergy;
        }
    }

}