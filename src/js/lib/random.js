export class Random {
    constructor(seed) {
        this.seed = seed >>> 0;
        this.initialSeed = this.seed;
        this.steps = 0;
    }

    //use mullberry32
    nextRandom() {
        var t = this.seed += 0x6D2B79F5;
        t = Math.imul(t ^ t >>> 15, t | 1);
        t ^= t + Math.imul(t ^ t >>> 7, t | 61);
        this.steps++;
        return ((t ^ t >>> 14) >>> 0) / 4294967296;
    }

    next(min = 0, max = 1) {
        return this.nextRandom() * (max - min) + min;
    }

    nextInt(min = 0, max = 1) {
        return Math.floor(this.nextRandom() * (max - min + 1)) + min;
    }
}

export class RandomPool {
    constructor(initialSeed) {
        this.seedRandomizer = new Random(initialSeed);
        this.pool = {};
    }

    add(name, seed) {
        this.pool[name] = new Random(seed ? seed : this.seedRandomizer.nextInt(0, 4294967296));
    }

    get(name) {
        return this.pool[name];
    }

    init(...poolnames) {
        for (let poolname of poolnames) {
            this.addPool(poolname);
        }
    }
}