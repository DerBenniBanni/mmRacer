export default class StackedSprite {
    constructor(stackDef) {
        this.layers = [...stackDef.layers]; // bottom to top

        this.width = stackDef.width;
        this.height = stackDef.height;

        this.layerThickness = 1; // thickness of each layer

        this.fillStyle = "#fff";
        this.strokeStyle = "#fff";
        this.yDelta = 0;
    }

    render(ctx, x, y, rotation) {
        this.yDelta = 0;
        this.fillStyle = "#fff";
        this.layers.forEach(layer => {
            if(layer[0] === "l") {
                this.layerThickness = layer[1];
                return;
            }
            for(let i = 0; i < this.layerThickness; i++) {
                ctx.save();
                ctx.translate(x, y - this.yDelta);
                //ctx.scale(1, 0.5);
                ctx.rotate(rotation);
                ctx.fillStyle = this.fillStyle;
                layer.forEach(layerPart => {
                    this.renderLayer(ctx, layerPart, x, y, rotation);
                });
                ctx.restore();
                this.yDelta++;  
            }
        });
    }

    renderLayer(ctx, layer, x, y, rotation) {
        if (layer[0] === "#") {
            this.fillStyle = "#" + layer[1];
            ctx.fillStyle = this.fillStyle;
        } else if (layer[0] === "#S") {
            this.strokeStyle = "#" + layer[1];
            ctx.strokeStyle = this.fillStyle;
        } else {
            if (layer[0] === "R") {
                ctx.fillRect(layer[1]-this.width/2, layer[2]-this.height/2, layer[3], layer[4]);
            }
        }
    }
}