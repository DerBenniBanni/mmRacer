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
        [{c:'#aaaa99',w:420},{c:'#222222',w:400}].forEach(linedef => {
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
        });

    }
}