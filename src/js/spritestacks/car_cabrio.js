import {addBlocks, addBox, BOX} from "./stackdef.js";

const stackDefCarCabrio = {
    width:60,
    height:30,
    layers: []
};



const col = '0a0';
const coldark = '070';
const glass = '07a';
const tire = '000';
const bumper = '222';
const rim = '444';
const light = 'ffc';
const breakslight = 'f00';
const shadow = '00000011';

let blocks = [];

/** Shadows */
for(let i = 0; i<5; i++) {
    let x = -4+i;
    let y = -4+i;
    let w = 68-2*i;
    let h = 38-2*i;
    blocks.push([BOX, 0, 1, x, y+2, w, h-4, shadow]);
    blocks.push([BOX, 0, 1, x+2, y, w-4, h, shadow]);
}

/** chassis */
blocks.push([BOX, 4, 3, 0, 0, 60, 30, coldark]);
blocks.push([BOX, 7, 4, 0, 0, 60, 30, col]);
blocks.push([BOX, 12, 1, 1, 2, 60, 26, col]);
blocks.push([BOX, 12, 1, 0, 1, 57, 28, col]);
blocks.push([BOX, 14, 1, 0, 2, 54, 26, col]);

// door-seams
blocks.push([BOX, 4, 10, 25, 0, 1, 30, coldark]);
blocks.push([BOX, 4, 10, 39, 0, 1, 30, coldark]);
blocks.push([BOX, 4, 10, 12, 0, 1, 30, coldark]);

// mirrors
blocks.push([BOX, 13, 1, 39, -3, 2, 36, coldark]);
blocks.push([BOX, 14, 1, 39, -3, 2, 36, col]);

// bumper
blocks.push([BOX, 6, 2, -0.5, -1, 3.5, 32, bumper]);
blocks.push([BOX, 6, 2, 58, -1, 3.5, 32, bumper]);

// back tires
blocks.push([BOX, 0, 10, 8, 0, 6, 30, tire]);
blocks.push([BOX, 1, 8, 7, 0, 8, 30, tire]);
blocks.push([BOX, 2, 6, 6, 0, 10, 30, tire]);
blocks.push([BOX, 2, 6, 9, 0, 4, 30, rim]);
blocks.push([BOX, 3, 4, 8, 0, 6, 30, rim]);

// front tires
blocks.push([BOX, 0, 10, 46, 0, 6, 30, tire]);
blocks.push([BOX, 1, 8, 45, 0, 8, 30, tire]);
blocks.push([BOX, 2, 6, 44, 0, 10, 30, tire]);
blocks.push([BOX, 2, 6, 47, 0, 4, 30, rim]);
blocks.push([BOX, 3, 4, 46, 0, 6, 30, rim]);

// upper chassis
blocks.push([BOX, 14, 1, 40, 1, 3, 28, coldark]);
blocks.push([BOX, 14, 1, 10, 3, 30, 24, tire]);
for(let i=0; i <=3; i++) {
    let x = 40-i;
    let y = 2+i/2;
    let w = 2;
    let h = 26-i;
    // glass
    blocks.push([BOX, 14+i, 1, x, y, w, h, glass]);
    // beams front
    blocks.push([BOX, 14+i, 1, x+w-2, y, 2, 2, coldark]);
    blocks.push([BOX, 14+i, 1, x+w-2, y+h-2, 2, 2, coldark]);
}
// roof
//blocks.push([BOX, 19, 1, 15, 4, 20, 22, coldark]);
//blocks.push([BOX, 19, 1, 16, 5, 18, 20, col]);
// grill
blocks.push([BOX, 10, 2,60, 2, 1, 26, rim]);
// lights
blocks.push([BOX, 7, 4,59, 2, 2, 5, light]);
blocks.push([BOX, 7, 4,59, 23, 2, 5, light]);
blocks.push([BOX, 7, 4,-1, 2, 2, 5, breakslight]);
blocks.push([BOX, 7, 4,-1, 23, 2, 5, breakslight]);
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
    blocks.push([BOX, 10, 1, x, y1, w, h, lightcol]);
    blocks.push([BOX, 10, 1, x, y2, w, h, lightcol]);
}
*/

addBlocks(stackDefCarCabrio, blocks);
export default stackDefCarCabrio;
export {stackDefCarCabrio};