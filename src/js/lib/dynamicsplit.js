import {Vec2d} from "./geometric.js";

export default class DynamicSplitRenderer {
    constructor(canvas) {
        this.canvas = canvas;
        this.width = this.canvas.width;
        this.height = this.canvas.height;
        // the distance of the split line (essentially the diameter of the circle that encloses the canvas cornerpoints)
        this.diameter = Math.sqrt(this.width * this.width + this.height * this.height);
        // the angle between player1 and player2
        this.angle = 0.0 * Math.PI;
        // The startingPoint for the split line
        this.splitFrom = new Vec2d(0, 0);
        // The endingPoint for the split line
        this.splitTo = new Vec2d(this.width, this.height);

        this.clipPoints1 = [];
        this.clipPoints2 = [];
        this.setAngle(this.angleBottomRight-0.2);
    }

    // Normalize angle to [0, 2π)
    normalizeAngle(angle) {
        return ((angle % (2 * Math.PI)) + (2 * Math.PI)) % (2 * Math.PI);
    }

    // Sets the angle and update the from/to points and clipping paths
    setAngle(angle) {
        // Normalize the angle to be within [0, 2π)
        this.angle = this.normalizeAngle(angle);
        // Calculate the split line points based on the angle and diameter
        this.splitFrom = Vec2d.fromPolar(this.angle, this.diameter/2);
        this.splitTo = Vec2d.fromPolar(this.angle + Math.PI, this.diameter/2);
        // Calculate the points for clipping paths based on the angle and diameter
        let p1 = Vec2d.fromPolar(this.angle, this.diameter);
        let p2 = Vec2d.fromPolar(this.angle + Math.PI/2, this.diameter);
        let p3 = Vec2d.fromPolar(this.angle + Math.PI, this.diameter);
        let p4 = Vec2d.fromPolar(this.angle + Math.PI*1.5, this.diameter);
        // Define the clipping paths for player 1 and player 2
        this.clipPoints1 = [p1,p2,p3];
        this.clipPoints2 = [p1,p3,p4];
        
    }

    // Create a clipping path based on the provided points    
    createClippingPath(ctx, points) {
        ctx.beginPath();
        ctx.moveTo(points[0].x + this.width/2, points[0].y + this.height/2);
        for (let i = 1; i < points.length; i++) {
            ctx.lineTo(points[i].x + this.width/2, points[i].y + this.height/2);
        }
        ctx.closePath();
        ctx.clip();
    }

    // Render the split screen with clipping paths for two players
    // and call an optional split line rendering function
    render(ctx, distanceFactor, render1, render2, renderSplit = null) {
        // clip for player 1
        ctx.save();
        this.createClippingPath(ctx, this.clipPoints1);
        render1(ctx);
        ctx.restore();

        // clip for player 2
        ctx.save();
        this.createClippingPath(ctx, this.clipPoints2);
        render2(ctx);
        ctx.restore();

        if(renderSplit) {
            renderSplit(ctx, this.splitFrom, this.splitTo, distanceFactor);
        } else {
            this.renderSplit(ctx, distanceFactor);
        }
    }

    // Render the split line (a flash) with a distance factor to create a visual effect
    renderSplit(ctx, distanceFactor) {
        // draw the split lines
        ctx.save();
        ctx.translate(this.width/2, this.height/2);
        
        this.drawFlashLine(ctx, 30, 7, [
            [4*distanceFactor + 8, "rgba(234, 235, 170, 0.29)"],
            [4*distanceFactor, "rgb(255, 255, 255)"],
        ]);
        
        this.drawFlashLine(ctx, 80, 30, [
            [3*distanceFactor, "rgba(255, 230, 0, 0.17)"],
            [1*distanceFactor, "rgb(255, 255, 255)"],
        ]);

        ctx.restore();
    }

    // Draw a flash line with random offsets to create a dynamic effect
    drawFlashLine(ctx, steps, randValue, strokes) {
        ctx.beginPath();
        ctx.moveTo(this.splitFrom.x, this.splitFrom.y);
        let dx = this.splitTo.x - this.splitFrom.x;
        let dy = this.splitTo.y - this.splitFrom.y;
        for (let i = 0; i <= steps; i += 1) {
            let d = i / steps;
            let x = this.splitFrom.x + d * dx + Math.random() * randValue - randValue/2;
            let y = this.splitFrom.y + d * dy + Math.random() * randValue - randValue/2
            ctx.lineTo(x, y);
        }
        for (let i = 0; i < strokes.length; i++) {
            ctx.lineWidth = strokes[i][0];
            ctx.strokeStyle = strokes[i][1];
            ctx.stroke();
        }
        ctx.closePath();
        ctx.lineWidth = 1;
    }
}