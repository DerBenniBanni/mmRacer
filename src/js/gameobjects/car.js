import { checkVec2dRectangleCollision } from "../lib/collisions.js";
import {GameObject} from "../lib/gameobject.js";
import { Rectangle, Vec2d } from "../lib/geometric.js";
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

        
        this.laps = 0;
        this.checkpoint = null;
        this.checkpointIndex = -1;
    }
    
    getRectangle() {
        return new Rectangle({x:this.x, y:this.y, width:this.w, height:this.h, rotation:this.rot});
    }

    setSpriteStackDef(stackDefInstance) {
        this.spriteSize = stackDefInstance.spriteSize;
        this.spriteBuffer = new SpriteBuffer(this.spriteSize, this.spriteSize, 360);
        this.stackDefInstance = stackDefInstance;
        this.renderer = new StackedSprite(this.stackDefInstance);
    }

    update(deltaTime) {
        super.update(deltaTime);
        this.handleCheckpoints();
        this.handleDust(deltaTime);
    }

    handleDust(deltaTime) {
        this.dustTimer += deltaTime;
        if (this.dustTimer > 1 / this.dustRate) {
            this.dustTimer = 0;
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
    updatePlayerInfo() {
        // override in implementation
    }

    handleCheckpoints() {
        if (!!this.game.track) {
            if (!!this.checkpoint) {
                let collision = checkVec2dRectangleCollision(new Vec2d(this.x, this.y), this.checkpoint);
                if (collision) {
                    if (this.checkpointIndex === 0) {
                        this.laps++;
                        this.updatePlayerInfo();
                    }
                    this.checkpoint = null;
                }
            }
            if (!!!this.checkpoint) {
                let trackpoints = this.game.track.points;
                this.checkpointIndex++;
                if (this.checkpointIndex >= trackpoints.length) {
                    this.checkpointIndex = 0;
                }
                let p = trackpoints[this.checkpointIndex];
                let p2 = trackpoints[(this.checkpointIndex + 1) % trackpoints.length];
                let angle = Math.atan2(p2[1] - p[1], p2[0] - p[0]);
                this.checkpoint = new Rectangle({
                    x: p[0],
                    y: p[1],
                    width: 50,
                    height: 600,
                    rotation: angle
                });

            }
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