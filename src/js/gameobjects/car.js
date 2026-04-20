import {GameObject} from "../gameobject.js";
import {SpriteBuffer} from "../lib/spritebuffer.js";
import StackedSprite from "../renderer/stackedsprite.js";

export class Car extends GameObject{
    constructor({x, y, maxspeed, stackdef, rot=0}) {
        super({x,y});
        this.rot = rot; // rotation in radians
        this.w = 60;
        this.h = 30;
        this.speed = 0; // pixels per second
        this.maxSpeed = maxspeed;

        this.type = 'Car';
        this.spriteSize = 64;
        this.spriteBuffer = new SpriteBuffer(this.spriteSize, this.spriteSize, 360);
        this.renderer = new StackedSprite(stackdef);
    }

    setSpriteStackDef(stackdef) {
        this.spriteBuffer = new SpriteBuffer(this.spriteSize, this.spriteSize, 360);
        this.renderer = new StackedSprite(stackdef);
    }

    render(ctx) {
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