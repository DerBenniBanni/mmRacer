import {addBlocks, addBox, BOX} from "./stackdef.js";

const stackDefBotA = {
    width:60,
    height:30,
    layers: []
};



const col = '666';
const coldark = '555';
const glass = 'f00';
const tire = '000';
const bumper = '222';
const rim = '844';
const light = 'ffc';
const breakslight = 'f00';
const shadow = '00000005';

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

// chassis
//blocks.push([BOX, 4, 3, 0, 3, 60, 30, coldark]);
blocks.push([BOX, 7, 6, 0, 8, 57, 14, coldark]);
blocks.push([BOX, 7, 6, 0, 9, 60, 12, col]);
blocks.push([BOX, 7, 5, 0, 7, 54, 16, col]);
blocks.push([BOX, 7, 5, 0, 6, 51, 18, coldark]);
blocks.push([BOX, 7, 4, 0, 5, 48, 20, col]);

// back tires
blocks.push([BOX, 0, 10, 8, -2, 6, 34, tire]);
blocks.push([BOX, 1, 8, 7, -2, 8, 34, tire]);
blocks.push([BOX, 2, 6, 6, -2, 10, 34, tire]);
blocks.push([BOX, 2, 6, 9, -2, 4, 34, rim]);
blocks.push([BOX, 3, 4, 8, -2, 6, 34, rim]);

// front tires
blocks.push([BOX, 0, 10, 46, 0, 6, 30, tire]);
blocks.push([BOX, 1, 8, 45, 0, 8, 30, tire]);
blocks.push([BOX, 2, 6, 44, 0, 10, 30, tire]);
blocks.push([BOX, 2, 6, 47, 0, 4, 30, rim]);
blocks.push([BOX, 3, 4, 46, 0, 6, 30, rim]);


// lights
blocks.push([BOX, 13, 6, -3, 1, 20, 7, col]);
blocks.push([BOX, 14, 4,-4, 2, 2, 5, breakslight]);
blocks.push([BOX, 14, 4, 18, 2, 4, 5, coldark]);
blocks.push([BOX, 13, 6, -3, 22, 20, 7, col]);
blocks.push([BOX, 14, 4,-4, 23, 2, 5, breakslight]);
blocks.push([BOX, 14, 4, 18, 23, 4, 5, coldark]);

blocks.push([BOX, 10, 2, 60, 8, 1, 5, light]);
blocks.push([BOX, 10, 2, 60, 17, 1, 5, light]);

// spoiler
blocks.push([BOX, 16, 1, 0, -5, 13, 40, coldark]);
blocks.push([BOX, 16, 1, 0, -7, 10, 44, coldark]);

// cockpit
blocks.push([BOX, 12, 2, 10, 10, 30, 10, glass]);
blocks.push([BOX, 12, 3, 9, 9, 30, 12, coldark]);
blocks.push([BOX, 12, 3, 8, 10, 30, 10, col]);

addBlocks(stackDefBotA, blocks);
export default stackDefBotA;
export {stackDefBotA};