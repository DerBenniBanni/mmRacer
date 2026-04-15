import {GameObject} from "../gameobject.js";
import {SpriteBuffer} from "../lib/spritebuffer.js";
import StackedSprite from "../renderer/stackedsprite.js";
import stackDefCarMini from "../spritestacks/car_mini.js";

export class Car extends GameObject{
    constructor({x, y, maxspeed, stackdef, rot=0}) {
        super({x,y});
        this.rot = rot; // rotation in radians
        this.w = 60;
        this.h = 30;
        this.speed = 0; // pixels per second
        this.maxSpeed = maxspeed;

        this.type = 'Car';
        this.spriteBuffer = new SpriteBuffer(64, 64, 360);
        this.renderer = new StackedSprite(stackdef);
    }

    render(ctx) {
        this.renderer.render(ctx, this.x, this.y, this.rot);
        return;
    }
}