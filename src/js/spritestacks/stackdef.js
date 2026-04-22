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

export function addTire(blocks, bottom, xCenter, yCenter, diameter, width, color) {
    let y = yCenter - width/2;
    let piPart = Math.PI/diameter;
    for(let i = 0; i < diameter; i++) {
        let w = 2 * Math.sqrt(diameter*i - i*i);
        let x = xCenter - w/2;
        blocks.push([BOX, bottom+i, 1, x, y, w, width, color]);
    }
}