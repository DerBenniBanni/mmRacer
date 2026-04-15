export function addBox(def, startlayer, thickness,x, y, w, h, color) {
    for(let l = def.layers.length -1; l < startlayer + thickness; l++) {
        def.layers.push([]);
    }
    for(let l = startlayer; l < startlayer + thickness; l++) {
        let layer = def.layers[l];
        layer.push(['#',color]);
        layer.push(['R',x,y,w,h]);
    }
}

export function addBlocks(stackdef, blocks) {
    blocks.forEach(block => {
        if(block[0] == BOX) {
            let [type, startlayer, thickness,x, y, w, h, color] = block;
            addBox(stackdef, startlayer, thickness,x, y, w, h, color);
        }
    });
}

export const BOX = 1;