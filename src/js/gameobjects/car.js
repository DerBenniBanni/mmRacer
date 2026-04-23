import {GameObject} from "../lib/gameobject.js";
import {SpriteBuffer} from "../lib/spritebuffer.js";
import StackedSprite from "../renderer/stackedsprite.js";
import { Particle } from "./particle.js";

export class Car extends GameObject{
    constructor({x, y, maxspeed, rot=0}) {
        super({x,y});
        this.rot = rot; // rotation in radians
        this.w = 60;
        this.h = 30;
        this.speed = 0; // pixels per second
        this.maxSpeed = maxspeed;

        this.type = 'Car';
        this.spriteSize = 1;
        this.spriteBuffer = null;
        this.stackDefInstance = null;
        this.renderer = null;
        this.dustRate = 30; // particles per second at max speed
        this.dustTimer = 0;
    }

    setSpriteStackDef(stackDefInstance) {
        this.spriteSize = stackDefInstance.spriteSize;
        this.spriteBuffer = new SpriteBuffer(this.spriteSize, this.spriteSize, 360);
        this.stackDefInstance = stackDefInstance;
        this.renderer = new StackedSprite(this.stackDefInstance);
    }

    update(deltaTime) {
        super.update(deltaTime);
        this.dustTimer += deltaTime;
        if(this.dustTimer > 1 / this.dustRate) {
            this.dustTimer = 0;
            /*
            let dustSpeed = this.speed * 0.5;
            let angle = this.rot + Math.PI + (Math.random() - 0.5) * 0.5;
            let vx = Math.cos(angle) * dustSpeed;
            let vy = Math.sin(angle) * dustSpeed;*/
            this.game.addGameObject(new Particle({
                x: this.x + Math.random() * 10 - 5 + Math.cos(this.rot) * -20,
                y: this.y + Math.random() * 10 - 15 + Math.sin(this.rot) * -20,
                vx: Math.random() * 100 - 10,
                vy: Math.random() * 100 - 80,
                ttl: 0.5,
                color: '#aaaaaa',
                alpha: 0.2 * (this.speed / this.maxSpeed),
                size: 10,
                endSize: 40
            }));
        }
    }

    render(ctx) {
        if(!this.renderer) {
            return;
        }
        let degree = Math.round(this.rot * 180 / Math.PI) % 360;
        if(degree < 0) {
            degree += 360;
        }
        let spriteOffset = this.spriteSize / 2;
        if(!this.spriteBuffer.isFinished(degree)) {
            let spriteCtx = this.spriteBuffer.getCtx(degree);
            this.renderer.render(spriteCtx, spriteOffset, spriteOffset, this.rot);
            this.spriteBuffer.setFinished(degree);
        }
        ctx.drawImage(this.spriteBuffer.get(degree), this.x - spriteOffset, this.y - spriteOffset);

        this.renderer.render(ctx, this.x, this.y, this.rot);
    }
}