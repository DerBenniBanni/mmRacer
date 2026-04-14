const stackDefCarMini = {
    width:60,
    height:30,
    layers: []
};

function addBox(def, startlayer, thickness,x, y, w, h, color) {
    for(let l = def.layers.length -1; l < startlayer + thickness; l++) {
        def.layers.push([]);
    }
    for(let l = startlayer; l < startlayer + thickness; l++) {
        let layer = def.layers[l];
        layer.push(['#',color]);
        layer.push(['R',x,y,w,h]);
    }
}

const col = 'f00';
const glass = '0af';
const tire = '000';
const rim = '444';
const light = 'ff8';

addBox(stackDefCarMini, 4, 10,0, 0, 60, 30, col);
// back tires
addBox(stackDefCarMini, 0, 10,8, 0, 6, 30, tire);
addBox(stackDefCarMini, 1, 8,7, 0, 8, 30, tire);
addBox(stackDefCarMini, 2, 6,6, 0, 10, 30, tire);
addBox(stackDefCarMini, 2, 6,9, 0, 4, 30, rim);
addBox(stackDefCarMini, 3, 4,8, 0, 6, 30, rim);
// front tires
addBox(stackDefCarMini, 0, 10,46, 0, 6, 30, tire);
addBox(stackDefCarMini, 1, 8,45, 0, 8, 30, tire);
addBox(stackDefCarMini, 2, 6,44, 0, 10, 30, tire);
addBox(stackDefCarMini, 2, 6,47, 0, 4, 30, rim);
addBox(stackDefCarMini, 3, 4,46, 0, 6, 30, rim);
// glass
for(let i=0; i <=3; i++) {
    let x = i;
    let y = i/2;
    let w = 45-3*i;
    let h = 30-i;
    // glass
    addBox(stackDefCarMini, 14+i, 1,x,y,w,h, glass);
    // beams
    addBox(stackDefCarMini, 14+i, 1,x,y,2,2, col);
    addBox(stackDefCarMini, 14+i, 1,x,y+h-2,2,2, col);
    addBox(stackDefCarMini, 14+i, 1,x+w-2,y,2,2, col);
    addBox(stackDefCarMini, 14+i, 1,x+w-2,y+h-2,2,2, col);
}
// roof
addBox(stackDefCarMini, 18, 1,3, 2, 36, 26, col);
//grill
addBox(stackDefCarMini, 6, 6,60, 2, 1, 26, rim);
// lights
addBox(stackDefCarMini, 8, 4,60, 2, 1, 5, light);
addBox(stackDefCarMini, 8, 4,60, 23, 1, 5, light);

export default stackDefCarMini;
export {stackDefCarMini};