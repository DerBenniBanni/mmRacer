export class TrackRenderer {
    constructor(trackdef) {
        this.trackdef = trackdef;
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
        [{c:pattern,w:440, bulbs:true},{c:'#222222',w:400}].forEach(linedef => {
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
        ctx.restore();

    }
}