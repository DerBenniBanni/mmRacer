export class GameObject {
    constructor({x, y, ttl = Infinity}) {
        this.type = 'GameObject';
        this.x = x;
        this.y = y;
        this.ttl = ttl; // time to live in seconds
        this.game = null; // reference to the game instance
    }
    setGame(game) {
        this.game = game;
        return this;
    }
    update(deltaTime) {
        this.ttl -= deltaTime;
    }
    render(ctx) {
    }
}