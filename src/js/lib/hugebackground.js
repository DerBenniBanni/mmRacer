export class HugeBackground {
    constructor(width, height, offsetX = 0, offsetY = 0) {
        this.canvas = new OffscreenCanvas(width, height);
        this.ctx = this.canvas.getContext('2d');
        this.width = width;
        this.height = height;
        this.offsetX = offsetX;
        this.offsetY = offsetY;
    }

    render(ctx, cameraX, cameraY, viewportWidth, viewportHeight,shrink = false) {
        if(shrink) {
            ctx.drawImage(this.canvas, 0, 0, 8000, 8000, 590, 280, 800, 800);
            return;    
        }
        ctx.drawImage(this.canvas, cameraX-viewportWidth/2+this.offsetX, cameraY-viewportHeight/2+this.offsetY, viewportWidth, viewportHeight, 0, 0, viewportWidth, viewportHeight);
    }

    getCtx() {
        return this.ctx;
    }
}