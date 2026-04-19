import {Car} from "./car.js";
import stackDefCarMini from "../spritestacks/car_mini.js";
import stackDefCarCoupe from "../spritestacks/car_coupe.js";
import stackDefCarCabrio from "../spritestacks/car_cabrio.js";
import { checkVec2dRectangleCollision } from "../lib/collisions.js";
import { Vec2d } from "../lib/geometric.js";

export const MINI = 0;
export const COUPE = 1;
export const CABRIO = 2;

const stackdefs = [
    stackDefCarMini,
    stackDefCarCoupe,
    stackDefCarCabrio
];

export class Player extends Car {
    constructor({x,y,rot=0, cartype=MINI}) {
        super({x,y,rot, stackdef: stackdefs[cartype], maxspeed:600});
        this.type = 'Player';

        this.vx = 0;
        this.vy = 0;
        this.vr = 0;
        this.vrMax = 2;
        this.vrRate = 10;

        this.skidmarks = 0;
    }

    update(deltaTime) {
        super.update(deltaTime);
        this.skidmarks = 0;
        // handle input for rotation and acceleration
        let turningPressed = false;
        if(this.speed > 20) {
            if(this.game.inputActions.turnLeft) {
                this.vr -= this.vrRate * deltaTime;
                turningPressed = true;
                //this.rot -= Math.PI * deltaTime; // rotate left
            } 
            if(this.game.inputActions.turnRight) {
                this.vr += this.vrRate * deltaTime;
                turningPressed = true;
                //this.rot += Math.PI * deltaTime; // rotate right
            }
            if(!turningPressed) {
                this.vr *= 0.9;
            } else {
                this.skidmarks = 20;
            }

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
        }
        
        if(this.rot > Math.PI) {
            this.rot -= 2 * Math.PI;
        } else if(this.rot < -Math.PI) {
            this.rot += 2 * Math.PI;
        }
        
        if(this.game.inputActions.accelerate) {
            this.speed += 200 * deltaTime; // accelerate
            if(this.speed > this.maxSpeed) {
                this.speed = this.maxSpeed;
            } else {
                this.skidmarks = 20;
            }
        }
        if(this.game.inputActions.brake) {
            this.speed -= 300 * deltaTime; // brake
            if(this.speed < 0) this.speed = 0;
            this.skidmarks = 20;
        }
        this.vx = Math.cos(this.rot) * this.speed;
        this.vy = Math.sin(this.rot) * this.speed;
        let nextX = this.x + this.vx * deltaTime;
        let nextY = this.y + this.vy * deltaTime;


        // check for collisions with track boundaries
        let nearbyBoundaries = this.game.positionGrid.getNearby(nextX, nextY, 50);
        for(let boundary of nearbyBoundaries) {
            if(boundary.type === 'Boundary') {
                let collision = checkVec2dRectangleCollision(new Vec2d(nextX, nextY), boundary);
                if(collision) {
                    // reflect the velocity vector based on the boundary normal
                    let velocity = new Vec2d(this.vx, this.vy);
                    let normal = boundary.normal;
                    let dot = velocity.dot(normal);
                    let reflected = velocity.sub(normal.multiply(2 * dot));
                    this.vx = reflected.x * 0.5; // reduce speed on collision
                    this.vy = reflected.y * 0.5;
                    this.speed = Math.sqrt(this.vx * this.vx + this.vy * this.vy);
                    // update the rotation based on the new velocity vector, rotate only abit towards the new velocity direction to avoid sudden flips
                    let newRot = Math.atan2(this.vy, this.vx);
                    let rotDiff = newRot - this.rot;
                    if(rotDiff > Math.PI) {
                        rotDiff -= 2 * Math.PI;
                    }
                    if(rotDiff < -Math.PI) {
                        rotDiff += 2 * Math.PI;
                    }
                    this.rot += rotDiff * 0.6; // 0.5 would rotate the car alongside the boundary

                    this.skidmarks = 20;    
                    // move the player out of the boundary to prevent sticking base on the boundary normal
                    nextX = nextX + Math.cos(boundary.normalAngle) * 5;
                    nextY = nextY + Math.sin(boundary.normalAngle) * 5;
                    break;
                }
            }
        }
        this.x = nextX;
        this.y = nextY;

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
        let alpha = this.skidmarks > 0 ? this.skidmarks.toString(16) : '03';
        ctx.fillStyle = '#000000' + alpha;
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