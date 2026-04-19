import { Boundary } from "../obstacles/boundary.js";

export class TrackRenderer {
    constructor(trackdef,) {
        this.trackdef = trackdef;
        this.trackwidth = 400;
    }

    render(ctx) {
        let points = this.trackdef.points.map(p => {
            return {x:p[0], y:p[1]};
        });
        if(points.length < 2) {
            return;
        }

        let patternCanvas = new OffscreenCanvas(200,200);
        let patternCtx = patternCanvas.getContext("2d");
        for(let i = 0; i < 6000; i++) {
            let x = Math.random()*patternCanvas.width;
            let y = Math.random()*patternCanvas.height;
            patternCtx.fillStyle = "#ffffff" + Math.round(Math.random()*100 + 50).toString(16);
            patternCtx.save();
            patternCtx.translate(x,y);
            patternCtx.rotate(Math.random());
            patternCtx.fillRect(0,0,3,1);
            patternCtx.restore();
        }
        let pattern = ctx.createPattern(patternCanvas, 'repeat')
        ctx.save();
        [{c:pattern,w:this.trackwidth+40, bulbs:true},{c:'#222222',w:this.trackwidth}].forEach(linedef => {
            ctx.lineWidth = linedef.w;
            ctx.lineCap = 'round';
            ctx.lineJoin = 'round';
            ctx.miterLimit = 10;
            ctx.strokeStyle = linedef.c;
            ctx.beginPath();
            ctx.moveTo(points[0].x, points[0].y);
            for(let i = 1; i < points.length; i++) {
                ctx.lineTo(points[i].x, points[i].y);
            }
            ctx.lineTo(points[0].x, points[0].y);
            ctx.stroke();
            ctx.closePath();

            if(linedef.bulbs) {
                points.forEach(p => {
                    ctx.beginPath();
                    ctx.arc(p.x, p.y, 10, 0, 2*Math.PI);
                    ctx.stroke();
                    ctx.closePath();
                });
            }
        });
        // start/finish line
        //calculate angel of the fisrt segment
        let angle = Math.atan2(points[1].y - points[0].y, points[1].x - points[0].x);
        ctx.save();
        ctx.translate(points[0].x, points[0].y);
        ctx.rotate(angle);
        ctx.lineWidth = 30;
        ctx.strokeStyle = pattern;
        ctx.beginPath();
        ctx.moveTo(-0,-250);
        ctx.lineTo(0, 250);
        ctx.stroke();
        ctx.closePath();    
        ctx.restore();

    }

    // returns an array of Boundary objects representing the track boundaries
    generateTrackBounds() {

        let boundaries = [];

        let leftBoundaryPoints = [];
        let rightBoundaryPoints = [];

        // for each trackpoint calculate the left and right boundary points 
        // and add a boundary there, 
        // the angle has to be calculated based on the previous and next segment 
        // to make sure the boundaries are correctly oriented
        for(let i = 0; i < this.trackdef.points.length; i++) {
            let p = this.trackdef.points[i];
            let prev = this.trackdef.points[(i-1+this.trackdef.points.length)%this.trackdef.points.length];
            let next = this.trackdef.points[(i+1) % this.trackdef.points.length];
            let angle = Math.atan2(next[1] - prev[1], next[0] - prev[0]);
            let leftAngle = angle - Math.PI/2;
            let rightAngle = angle + Math.PI/2;

            let currentTrackwidth = this.trackwidth+60;
            // add a bit to the currentTrackwidth, when the angle changes a lot to avoid gaps in the boundaries
            let prevAngle = Math.atan2(p[1] - prev[1], p[0] - prev[0]);
            let nextAngle = Math.atan2(next[1] - p[1], next[0] - p[0]);
            let angleDiff = Math.abs(nextAngle - prevAngle);
            if(angleDiff > Math.PI) {
                angleDiff = 2*Math.PI - angleDiff;
            }
            currentTrackwidth += angleDiff * 90; // Adjust track width based on angle change


            let leftX = p[0] + Math.cos(leftAngle) * currentTrackwidth/2;
            let leftY = p[1] + Math.sin(leftAngle) * currentTrackwidth/2;
            let rightX = p[0] + Math.cos(rightAngle) * currentTrackwidth/2;
            let rightY = p[1] + Math.sin(rightAngle) * currentTrackwidth/2;
            leftBoundaryPoints.push({x:leftX, y:leftY});
            rightBoundaryPoints.push({x:rightX, y:rightY});
        }
        // create boundaries for the left and right boundary points, connect them to each other and add them to the boundaries array
        let overlap = 20; // how much the boundaries should overlap to avoid gaps
        for(let i = 0; i < this.trackdef.points.length; i++) {
            let nextIndex = (i+1) % this.trackdef.points.length;
            let leftAngle = Math.atan2(leftBoundaryPoints[nextIndex].y - leftBoundaryPoints[i].y, leftBoundaryPoints[nextIndex].x - leftBoundaryPoints[i].x);
            let leftLength = Math.hypot(leftBoundaryPoints[nextIndex].x - leftBoundaryPoints[i].x, leftBoundaryPoints[nextIndex].y - leftBoundaryPoints[i].y);
            let leftNormalAngle = leftAngle + Math.PI/2;
            let leftBoundary = new Boundary(
                (leftBoundaryPoints[i].x + leftBoundaryPoints[nextIndex].x)/2,
                (leftBoundaryPoints[i].y + leftBoundaryPoints[nextIndex].y)/2,
                leftLength+overlap,
                50,
                leftAngle,
                leftNormalAngle
            );
            let rightAngle = Math.atan2(rightBoundaryPoints[nextIndex].y - rightBoundaryPoints[i].y, rightBoundaryPoints[nextIndex].x - rightBoundaryPoints[i].x);
            let rightLength = Math.hypot(rightBoundaryPoints[nextIndex].x - rightBoundaryPoints[i].x, rightBoundaryPoints[nextIndex].y - rightBoundaryPoints[i].y);
            let rightNormalAngle = rightAngle - Math.PI/2;
            let rightBoundary = new Boundary(
                (rightBoundaryPoints[i].x + rightBoundaryPoints[nextIndex].x)/2,
                (rightBoundaryPoints[i].y + rightBoundaryPoints[nextIndex].y)/2,
                rightLength+overlap,
                50,
                rightAngle,
                rightNormalAngle
            );
            boundaries.push(leftBoundary);
            boundaries.push(rightBoundary);
        }


        return boundaries;  

    }
}