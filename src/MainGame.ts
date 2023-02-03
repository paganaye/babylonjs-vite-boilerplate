const INITIAL_ENERGY = 1000;
const ENERGY_USAGE = 7;
const INITIAL_ENERGY_PER_TICK = 2;

export class MainGame {
  maxEnergy = INITIAL_ENERGY;
  currentEnergy = INITIAL_ENERGY;
  energyPerTick = INITIAL_ENERGY_PER_TICK;

  constructor() {}

  get energyRatio() {
    return this.currentEnergy / this.maxEnergy;
  }

  updateEnergy = () => {
    this.currentEnergy += this.energyPerTick;
    if (this.currentEnergy > this.maxEnergy) {
      this.currentEnergy = this.maxEnergy;
    }
  };

  useEnergy = () => {
    this.currentEnergy -= ENERGY_USAGE;
    if (this.currentEnergy < 0) {
      this.currentEnergy = 0;
    }
  };
}
