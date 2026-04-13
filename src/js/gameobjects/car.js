import {GameObject} from "../gameobject.js";
import {SpriteBuffer} from "../lib/spritebuffer.js";

export class Car extends GameObject{
    constructor({x,y,rot=0}) {
        super({x,y});
        this.rot = rot; // rotation in radians
        this.w = 50;
        this.h = 20;

        this.type = 'Car';
        this.spriteBuffer = new SpriteBuffer(64, 64, 360);
    }

    render(ctx) {

        for(let i = 0 ; i < 3 ; i++) {
            ctx.save();
            ctx.translate(this.x, this.y-i);
            ctx.rotate(this.rot);
            ctx.fillStyle = "black";
            ctx.fillRect(-this.w / 3-3, -this.h / 2, 6, this.h);
            ctx.fillRect(this.w / 3-3, -this.h / 2, 6, this.h);
            ctx.restore();
        }
        for(let i = 3 ; i < 8 ; i++) {
            ctx.save();
            ctx.translate(this.x, this.y-i);
            ctx.rotate(this.rot);
            ctx.fillStyle = "red";
            ctx.fillRect(-this.w / 2, -this.h / 2, this.w, this.h);
            if(i < 6) {
                ctx.fillStyle = "black";
                ctx.fillRect(-this.w / 3-3, -this.h / 2, 6, this.h);
                ctx.fillRect(this.w / 3-3, -this.h / 2, 6, this.h);
            }
            if(i >= 4 && i <7) {
                ctx.fillStyle = "white";
                ctx.fillRect(this.w/2, -this.h / 2 + 1, 1, 3 );
                ctx.fillRect(this.w/2, this.h / 2 - 4, 1, 3 );
            }
            ctx.restore();
        }
        for(let i = 8; i < 15; i++) {
            ctx.save();
            ctx.translate(this.x, this.y-i);
            ctx.rotate(this.rot);
            ctx.fillStyle = "blue";
            ctx.fillRect(-this.w / 2 +(i-8), -this.h / 2, this.w -10 -(i-8)*2, this.h);
            ctx.restore();
        }

        for(let i = 15; i < 16; i++) {
            ctx.save();
            ctx.translate(this.x, this.y-i);
            ctx.rotate(this.rot);
            ctx.fillStyle = "red";
            ctx.fillRect(-this.w / 2 +(i-8), -this.h / 2, this.w -10 -(i-8)*2, this.h);
            ctx.restore();
        }
    }
}