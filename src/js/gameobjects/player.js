import {Car} from "./car.js";

export class Player extends Car {
    constructor({x,y,rot=0}) {
        super({x,y,rot});
        this.type = 'Player';
        this.speed = 0; // pixels per second
        this.maxSpeed = 300;
        this.vx = 0;
        this.vy = 0;
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
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rot);
        ctx.beginPath();
        ctx.fillStyle = '#0002';
        let x1 = (Math.random() * 4 - 2);
        let y1 = 15 + (Math.random() * 4 - 2);
        let size1 = Math.random() * 2 + 1;
        ctx.arc(x1, y1, size1, 0, Math.PI * 2);
        let x2 = (Math.random() * 4 - 2);
        let y2 = -15 + (Math.random() * 4 - 2);
        let size2 = Math.random() * 2 + 1;
        ctx.arc(x2, y2, size2, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.fillStyle = '#0002';
        ctx.arc(x1, y1, size1-1, 0, Math.PI * 2);
        ctx.arc(x2, y2, size2-1, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
    }
}