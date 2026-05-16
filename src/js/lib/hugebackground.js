const TILESIZE = 200;

const round = (value) => Math.round(value);
const floor = (value) => Math.floor(value);
const ceil = (value) => Math.ceil(value);
const min = (values) => Math.min(values);
const max = (values) => Math.max(values);

export class HugeBackground {
    constructor(width, height, offsetX = 0, offsetY = 0) {
        this.canvas = new OffscreenCanvas(width, height);
        this.ctx = this.canvas.getContext('2d');
        this.width = width;
        this.height = height;
        this.offsetX = offsetX;
        this.offsetY = offsetY;
        this.canvases = [];
        this.maxTilesX = ceil(this.width / TILESIZE);
        this.maxTilesY = ceil(this.height / TILESIZE);
        this.baked = false;
        this.dummyCanvas = new OffscreenCanvas(1,1);
        this.dummyCtx = this.dummyCanvas.getContext("2d");
    }

    bake() {
        this.canvases = [];
        for(let x = 0; x < this.maxTilesX; x++) {
            let row = [];
            for(let y = 0; y < this.maxTilesY; y++) {
                let canvas = new OffscreenCanvas(TILESIZE, TILESIZE);
                let ctx = canvas.getContext("2d");
                ctx.drawImage(this.canvas, x*TILESIZE, y*TILESIZE, TILESIZE, TILESIZE, 0, 0, TILESIZE, TILESIZE);
                ctx.translate(-x*TILESIZE, -y*TILESIZE);
                row.push({canvas, ctx});
            }
            this.canvases.push(row);
        }
        this.baked = true;
    }

    render(ctx, cameraX, cameraY, viewportWidth, viewportHeight,shrink = false) {
        if(!this.baked) {
            return;
        }
        let viewportMinX = (cameraX - viewportWidth/2);
        let viewportMinY = (cameraY - viewportHeight/2);
        let viewportMaxX = viewportMinX + viewportWidth;
        let viewportMaxY = viewportMinY + viewportHeight;
        let tileMinX = max(floor(viewportMinX / TILESIZE), 0);
        let tileMinY = max(floor(viewportMinY / TILESIZE), 0);
        let tileMaxX = min(floor(viewportMaxX / TILESIZE), this.maxTilesX);
        let tileMaxY = min(floor(viewportMaxY / TILESIZE), this.maxTilesY);

        for(let tx = tileMinX; tx <= tileMaxX; tx++) {
            for(let ty = tileMinY; ty <= tileMaxY; ty++) {
                let canvasContainer = this.canvases[tx][ty];
                let x = tx*TILESIZE-viewportMinX;
                ctx.drawImage(canvasContainer.canvas, 
                    0, 0, TILESIZE, TILESIZE, 
                    tx*TILESIZE-viewportMinX, 
                    ty*TILESIZE-viewportMinY, TILESIZE, TILESIZE);
            }
        }
    }

    getMainCtx() {
        return this.ctx;
    }

    getCtx(x,y) {
        if(!this.baked) {
            return this.dummyCtx;
        }
        let tileX = min(max(floor(x/TILESIZE), this.maxTilesX), 0);
        let tileY = min(max(floor(y/TILESIZE), this.maxTilesY), 0);
        return this.canvases[tileX][tileY].ctx;
    }
}