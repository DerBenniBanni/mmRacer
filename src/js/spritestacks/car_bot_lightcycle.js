import {addBlocks, addBox, BOX} from "./stackdef.js";

const stackDefBotLightcycle = {
    width:60,
    height:30,
    layers: []
};



const col = '334';
const coldark = '003';
const glass = '0aa';
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

blocks.push([BOX, 7, 6, 5, 11, 50, 8, coldark]);
blocks.push([BOX, 13, 1, 6, 12, 48, 6, glass]);
blocks.push([BOX, 14, 1, 6, 12, 46, 6, col]);
blocks.push([BOX, 7, 3, 25, 2, 20, 26, coldark]);
blocks.push([BOX, 10, 1, 26, 3, 18, 24, col]);
/*
for(let i=0; i<10; i++) {
   blocks.push([BOX, 13+i, 1, 12-i, 13, 18, 4, col]);
}
blocks.push([BOX, 23, 1, 0, 0, 18, 30, glass]);
blocks.push([BOX, 23, 1, 0, 1, 18, 28, col]);
*/
function addTire(blocks, bottom, xCenter, yCenter, diameter, width, color) {
    // TODO: change to cylinder
    let y = yCenter - width/2;
    let piPart = Math.PI/diameter;
    for(let i = 0; i < diameter; i++) {
        let w = 2 * Math.sqrt(diameter*i - i*i);
        let x = xCenter - w/2;
        blocks.push([BOX, bottom+i, 1, x, y, w, width, color]);
    }
}

addTire(blocks, 0, 10, 25, 20, 10, tire);
addTire(blocks, 2, 10, 25, 16, 10, glass);
addTire(blocks, 4, 10, 25, 12, 11, tire);

addTire(blocks, 0, 10, 5, 20, 10, tire);
addTire(blocks, 2, 10, 5, 16, 10, glass);
addTire(blocks, 4, 10, 5, 12, 11, tire);


addTire(blocks, 0, 55, 20, 12, 4, tire);
addTire(blocks, 2, 55, 20, 8, 6, glass);
addTire(blocks, 4, 55, 20, 6, 7, tire);

addTire(blocks, 0, 55, 10, 12, 4, tire);
addTire(blocks, 2, 55, 10, 8, 6, glass);
addTire(blocks, 4, 55, 10, 6, 7, tire);


blocks.push([BOX, 8, 4, 0, 13, 2, 4, breakslight]);

blocks.push([BOX, 9, 2, 43, 1, 1, 4, light]);
blocks.push([BOX, 9, 2, 43, 25, 1, 4, light]);

/*
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

/*
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
/**/
addBlocks(stackDefBotLightcycle, blocks);
export default stackDefBotLightcycle;
export {stackDefBotLightcycle};