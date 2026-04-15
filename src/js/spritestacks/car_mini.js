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
const coldark = 'a00';
const glass = '07a';
const tire = '000';
const bumper = '222';
const rim = '444';
const light = 'ffc';
const shadow = '00000011';

for(let i = 0; i<5; i++) {
    let x = -4+i;
    let y = -4+i;
    let w = 68-2*i;
    let h = 38-2*i;
    addBox(stackDefCarMini, 0, 1, x, y+2, w, h-4, shadow);
    addBox(stackDefCarMini, 0, 1, x+2, y, w-4, h, shadow);
}

// chassis
addBox(stackDefCarMini, 4, 3, 0, 0, 60, 30, coldark);
addBox(stackDefCarMini, 7, 4, 0, 0, 60, 30, col);
addBox(stackDefCarMini, 5, 6, 1, 1, 58, 28, col);
addBox(stackDefCarMini, 12, 1, 0, 1, 57, 28, col);
addBox(stackDefCarMini, 14, 1, 0, 2, 54, 26, col);

// door-seams
addBox(stackDefCarMini, 4, 10, 25, 0, 1, 30, coldark);
addBox(stackDefCarMini, 4, 10, 39, 0, 1, 30, coldark);
addBox(stackDefCarMini, 4, 10, 12, 0, 1, 30, coldark);

// mirrors
addBox(stackDefCarMini, 13, 1, 39, -3, 2, 36, coldark);
addBox(stackDefCarMini, 14, 1, 39, -3, 2, 36, col);

// bumper
addBox(stackDefCarMini, 6, 2, -0.5, -1, 3.5, 32, bumper);
addBox(stackDefCarMini, 6, 2, 58, -1, 3.5, 32, bumper);

// back tires
addBox(stackDefCarMini, 0, 10, 8, 0, 6, 30, tire);
addBox(stackDefCarMini, 1, 8, 7, 0, 8, 30, tire);
addBox(stackDefCarMini, 2, 6, 6, 0, 10, 30, tire);
addBox(stackDefCarMini, 2, 6, 9, 0, 4, 30, rim);
addBox(stackDefCarMini, 3, 4, 8, 0, 6, 30, rim);

// front tires
addBox(stackDefCarMini, 0, 10, 46, 0, 6, 30, tire);
addBox(stackDefCarMini, 1, 8, 45, 0, 8, 30, tire);
addBox(stackDefCarMini, 2, 6, 44, 0, 10, 30, tire);
addBox(stackDefCarMini, 2, 6, 47, 0, 4, 30, rim);
addBox(stackDefCarMini, 3, 4, 46, 0, 6, 30, rim);

// upper chassis
for(let i=0; i <=3; i++) {
    let x = i+2;
    let y = 2+i/2;
    let w = 40-3*i;
    let h = 26-i;
    // glass
    addBox(stackDefCarMini, 14+i, 1, x, y, w, h, glass);
    // beams back
    addBox(stackDefCarMini, 14+i, 1, x, y, 2, 2, col);
    addBox(stackDefCarMini, 14+i, 1, x, y+h-2, 2, 2, col);
    // beams front
    addBox(stackDefCarMini, 14+i, 1, x+w-2, y, 2, 2, col);
    addBox(stackDefCarMini, 14+i, 1, x+w-2, y+h-2, 2, 2, col);
    // beams middle
    addBox(stackDefCarMini, 14+i, 1, 10, y, 2, 2, col);
    addBox(stackDefCarMini, 14+i, 1, 10, y+h-2, 2, 2, col);
    addBox(stackDefCarMini, 14+i, 1, 24, y, 2, 2, col);
    addBox(stackDefCarMini, 14+i, 1, 24, y+h-2, 2, 2, col);
}
// roof
addBox(stackDefCarMini, 19, 1,5, 4, 30, 22, col);
// grill
addBox(stackDefCarMini, 10, 2,60, 2, 1, 26, rim);
// lights
addBox(stackDefCarMini, 7, 4,59, 2, 2, 5, light);
addBox(stackDefCarMini, 7, 4,59, 23, 2, 5, light);
/*
// lightbeams
for(let i = 0; i < 15; i++) {
    let x = 61 + 5*i;
    let y1 = 2 - 3*i;
    let y2 = 20 - 3*i;
    let w = 5;
    let h = 8 + 6*i;
    let alpha = 15 - i;
    let lightcol = 'ffffaa' + (alpha >= 10 ? alpha : '0'+alpha); 
    addBox(stackDefCarMini, 10, 1, x, y1, w, h, lightcol);
    addBox(stackDefCarMini, 10, 1, x, y2, w, h, lightcol);
}
*/
export default stackDefCarMini;
export {stackDefCarMini};