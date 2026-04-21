import { GameObject } from "../lib/gameobject.js";

export class Particle extends GameObject {
    constructor({x, y, vx=0, vy=0, ttl, color, alpha, size, endSize = 0}) {
        super({x, y, ttl});
        this.type = 'Particle';
        this.color = color; // rgb hex string WITHOUT alpha!
        this.alpha = alpha; // numeric 0-1
        this.initAlpha = alpha;
        this.endAlpha = 0;
        this.alphaDecayRate = alpha / ttl; // alpha decay per second
        this.size = size;
        this.initSize = size;
        this.endSize = endSize;
        this.shrinkRate = (size - endSize) / ttl; // shrink per second
        this.vx = vx;
        this.vy = vy;
    }

    update(deltaTime) {
        super.update(deltaTime);
        this.size -= deltaTime * this.shrinkRate;
        this.alpha -= deltaTime * this.alphaDecayRate;
        if(this.alpha < 0) {
            this.alpha = 0;
        }
        if(this.size < 0) {
            this.size = 0;
            this.ttl = 0; // kill the particle when it has reached its end size
        }
        this.x += this.vx * deltaTime;
        this.y += this.vy * deltaTime;
    }

    render(ctx) {
        ctx.fillStyle = this.color;
        ctx.globalAlpha = this.alpha;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1; // Reset global alpha
    }
}