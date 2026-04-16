import {Car} from "./car.js";
import stackDefCarMini from "../spritestacks/car_mini.js";
import stackDefCarCoupe from "../spritestacks/car_coupe.js";
import stackDefCarCabrio from "../spritestacks/car_cabrio.js";

export const MINI = 0;
export const COUPE = 1;
export const CABRIO = 2;

const stackdefs = [
    stackDefCarMini,
    stackDefCarCoupe,
    stackDefCarCabrio
];


export class Npc extends Car {
    constructor({x, y, rot=0, cartype=MINI}) {
        super({x,y,rot, stackdef: stackdefs[cartype], maxspeed:600});
        this.type = 'Player';

        this.vx = 0;
        this.vy = 0;

        this.follow = null;
    }

    follow(obj) {
        this.follow = obj;
    }

    update(deltaTime) {
        super.update(deltaTime);
        // handle input for rotation and acceleration
        if(this.game.inputActions.turnLeft) {
            this.rot -= Math.PI * deltaTime; // rotate left
        }
        if(this.game.inputActions.turnRight) {
            this.rot += Math.PI * deltaTime; // rotate right
        }
        if(this.game.inputActions.accelerate) {
            this.speed += 200 * deltaTime; // accelerate
            if(this.speed > this.maxSpeed) this.speed = this.maxSpeed;
        }
        if(this.game.inputActions.brake) {
            this.speed -= 300 * deltaTime; // brake
            if(this.speed < 0) this.speed = 0;
        }
        this.vx = Math.cos(this.rot) * this.speed;
        this.vy = Math.sin(this.rot) * this.speed;
        this.x += this.vx * deltaTime;
        this.y += this.vy * deltaTime;
    }

    updateBackground(ctx) {
        if(this.speed < this.maxSpeed /10) {
            return;
        }
        let len = this.speed/10;
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rot);
        ctx.beginPath();
        ctx.fillStyle = '#00000009';
        let x1 = (Math.random() * 4 - 2) - len/2;
        let y1 = 15 + (Math.random() * 4 - 2);
        let size1 = Math.random() * 2 + 1;
        ctx.fillRect(x1, y1, len, 2);
        let x2 = (Math.random() * 4 - 2) - len/2;
        let y2 = -15 + (Math.random() * 4 - 2);
        let size2 = Math.random() * 2 + 1;
        ctx.fillRect(x2, y2, len, 2);
        ctx.restore();
    }
}