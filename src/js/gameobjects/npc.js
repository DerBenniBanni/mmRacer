import {Car} from "./car.js";
import { Circle } from "../lib/geometric.js";
import { checkCirclesCollision } from "../lib/collisions.js";
import {StackDefBotA} from "../spritestacks/car_bot_a.js";
import {StackDefBotLightcycle} from "../spritestacks/car_bot_lightcycle.js";

export const BOT_A = 0;
export const BOT_LIGHTCYCLE = 1;

const stackdefs = [
    StackDefBotA,
    StackDefBotLightcycle
];


export class Npc extends Car {
    constructor({x, y, rot=0, cartype=BOT_A}) {
        super({x,y,rot, stackdef: stackdefs[cartype], maxspeed:620});
        this.type = 'Npc';

        this.vx = 0;
        this.vy = 0;
        
        this.vr = 0;
        this.vrMax = 3;
        this.vrRate = 8;

        this.target = null;
        this.cartype = cartype;
        this.refreshSprite();
    }

    refreshSprite() {
        let stackDefInstance = new stackdefs[this.cartype]();
        stackDefInstance.init();
        this.setSpriteStackDef(stackDefInstance);
    }

    update(deltaTime) {
        super.update(deltaTime);
        this.updateTarget();
        //this.rot += deltaTime;
        //return;

        let targetVec2 = {
            x: this.target.point[0] - this.x,
            y: this.target.point[1] - this.y
        };
        let targetAngle = Math.atan2(targetVec2.y, targetVec2.x);
        let angleDiff = targetAngle - this.rot;
        if(angleDiff > Math.PI) {
            angleDiff -= 2 * Math.PI;
        }
        if(angleDiff < -Math.PI) {
            angleDiff += 2 * Math.PI;
        }
        if(angleDiff > 0.1) {
            this.vr += this.vrRate * deltaTime;
        } else if(angleDiff < -0.1) {
            this.vr -= this.vrRate * deltaTime;
        } else {
            this.vr = 0;
        }
        this.speed += 200 * deltaTime; // accelerate
        if(this.speed > this.maxSpeed) this.speed = this.maxSpeed;

        if(this.vr > this.vrMax) {
            this.vr = this.vrMax;
        }
        if(this.vr < -this.vrMax) {
            this.vr = -this.vrMax;
        }
        if(this.vr < 0.01 && this.vr > -0.01) {
            this.vr = 0;
        } else {
            this.rot += this.vr * deltaTime;
        }
        if(this.rot > Math.PI) {
            this.rot -= 2 * Math.PI;
        } else if(this.rot < -Math.PI) {
            this.rot += 2 * Math.PI;
        }


        this.vx = Math.cos(this.rot) * this.speed;
        this.vy = Math.sin(this.rot) * this.speed;
        this.x += this.vx * deltaTime;
        this.y += this.vy * deltaTime;
    }

    getFuzzyTargetPoint(idx, fuzzyness=60) {
        const point = this.game.track.points[idx];
        return [
            point[0] + Math.random() * fuzzyness - fuzzyness / 2,
            point[1] + Math.random() * fuzzyness - fuzzyness / 2
        ];
    }

    updateTarget() {
        if(!this.game.track) {
            return;
        }
        if(!this.target) {
            this.target = {
                idx:0,
                point:this.getFuzzyTargetPoint(0)
            };
        }
        let targetCircle = new Circle(this.target.point[0], this.target.point[1], 200);
        let carCircle = new Circle(this.x, this.y, 50);
        if(checkCirclesCollision(targetCircle, carCircle)) {
            this.target.idx = (this.target.idx + 1) % this.game.track.points.length;
            this.target.point = this.getFuzzyTargetPoint(this.target.idx);
            this.maxSpeed = Math.random()*100 + 520;
        }

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

    render(ctx) {
        if(!!this.target) {
            /*
            ctx.beginPath();
            ctx.strokeStyle = "#ff0";
            ctx.lineWidth = 1;
            ctx.moveTo(this.x, this.y);
            ctx.lineTo(this.target.point[0], this.target.point[1]);
            ctx.stroke();
            */
        }
        super.render(ctx);
    }
}