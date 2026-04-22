import {addBlocks, addBox, addTire, BOX} from "./stackdef.js";

const stackDefCarMini = {
    width:60,
    height:30,
    layers: [],
    init: function(col = 'd30', coldark = 'a00') {
        const glass = '0077aa55';
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
        blocks.push([BOX, 13, 1, 0, 2, 54, 26, coldark]);
        blocks.push([BOX, 13, 1, 0, 3, 54, 24, col]);

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
        addTire(blocks, 0, 11, 29, 10, 3, tire);
        addTire(blocks, 2, 11, 29, 6, 4, rim);

        addTire(blocks, 0, 11, 1, 10, 3, tire);
        addTire(blocks, 2, 11, 1, 6, 4, rim);
        
        // front tires
        addTire(blocks, 0, 49, 29, 10, 3, tire);
        addTire(blocks, 2, 49, 29, 6, 4, rim);

        addTire(blocks, 0, 49, 1, 10, 3, tire);
        addTire(blocks, 2, 49, 1, 6, 4, rim);

        // upper chassis
        blocks.push([BOX, 14, 1, 40, 0, 4, 26, coldark]);
        for(let i=0; i <=3; i++) {
            let x = i+2;
            let y = 2+i/2;
            let w = 40-3*i;
            let h = 26-i;
            // glass
            blocks.push([BOX, 14+i, 1, x, y, w, h, glass]);
            // beams back
            blocks.push([BOX, 14+i, 1, x, y, 2, 2, col]);
            blocks.push([BOX, 14+i, 1, x, y+h-2, 2, 2, col]);
            // beams front
            blocks.push([BOX, 14+i, 1, x+w-2, y, 2, 2, col]);
            blocks.push([BOX, 14+i, 1, x+w-2, y+h-2, 2, 2, col]);
            // beams middle
            blocks.push([BOX, 14+i, 1, 10, y, 2, 2, col]);
            blocks.push([BOX, 14+i, 1, 10, y+h-2, 2, 2, col]);
            blocks.push([BOX, 14+i, 1, 24, y, 2, 2, col]);
            blocks.push([BOX, 14+i, 1, 24, y+h-2, 2, 2, col]);
        }
        // roof
        blocks.push([BOX, 19, 1,5, 4, 30, 22, col]);
        // grill
        blocks.push([BOX, 10, 2,60, 2, 1, 26, rim]);
        // lights
        blocks.push([BOX, 7, 4,59, 2, 2, 5, light]);
        blocks.push([BOX, 7, 4,59, 23, 2, 5, light]);
        blocks.push([BOX, 7, 4,-1, 2, 2, 5, breakslight]);
        blocks.push([BOX, 7, 4,-1, 23, 2, 5, breakslight]);

        addBlocks(this, blocks);
    }
};



const col = 'd30';
const coldark = 'a00';

stackDefCarMini.init(col, coldark);


export default stackDefCarMini;
export {stackDefCarMini};