import {BOX} from "./stackdef.js";

export class StackDefinition {
    constructor(width, height, spriteSize = 64) {
        this.width = width;
        this.height = height;
        this.layers = [];
        this.spriteSize = spriteSize;
    }
    addBox(startlayer, thickness,x, y, w, h, color) {
        for(let l = this.layers.length -1; l < startlayer + thickness; l++) {
            this.layers.push([]);
        }
        for(let l = startlayer; l < startlayer + thickness; l++) {
            let layer = this.layers[l];
            layer.push(['#',color]);
            layer.push(['R',x,y,w,h]);
        }
    }

    addBlocks(blocks) {
        blocks.forEach(block => {
            if(block[0] == BOX) {
                let [type, startlayer, thickness,x, y, w, h, color] = block;
                this.addBox(startlayer, thickness,x, y, w, h, color);
            }
        });
    }
    init(...colors) {
        // override method
    }
}