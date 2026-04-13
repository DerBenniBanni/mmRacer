export class SpriteBuffer {
    constructor(width, height, instanceCount = 1) {
        this.width = width;
        this.height = height;
        this.instanceCount = instanceCount;
        this.canvases = new Map();
        for (let i = 0; i < instanceCount; i++) {
            const canvas = new OffscreenCanvas(width, height);
            this.canvases.set(i, {
                canvas,
                ctx: canvas.getContext('2d'),
                finshed: false
            });
        }
    }

    getCanvas(instanceIndex = 0) {
        return this.canvases.get(instanceIndex).canvas;
    }

    getCtx(instanceIndex = 0) {
        const canvas = this.getCanvas(instanceIndex);
        return canvas.getContext('2d');
    }
    
    setFinished(instanceIndex = 0) {
        this.canvases.get(instanceIndex).finshed = true;
    }

    isFinished(instanceIndex = 0) {
        return this.canvases.get(instanceIndex).finshed;
    }
}