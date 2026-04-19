import { Rectangle, Vec2d } from "../lib/geometric.js";

export class Boundary extends Rectangle {
    constructor(x, y, width, height, rotation = 0, normalAngle = 0) {
        super({x, y, width, height, rotation});
        this.type = 'Boundary';
        this.normalAngle = normalAngle;
        this.normal = new Vec2d(Math.cos(normalAngle), Math.sin(normalAngle));
        this.dbgColor = '#ffff0066';
    }

    // for debugging only...
    render(ctx) {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.strokeStyle = this.dbgColor;
        ctx.lineWidth = 8;
        ctx.save();
        ctx.rotate(this.rotation);
        ctx.strokeRect(-this.width*this.originX, -this.height*this.originY, this.width, this.height);
        ctx.restore();
        ctx.beginPath();
        ctx.moveTo(0,0);
        ctx.lineTo(this.normal.x*80, this.normal.y*80);
        ctx.stroke();
        ctx.restore();
    }
}