import {addBlocks, addBox, addTire, BOX} from "./stackdef.js";

const stackDefCarCabrio = {
    width:60,
    height:30,
    layers: [],
    init: function(col = '0a0', coldark = '070') {
        const glass = '0077aa88';
        const tire = '000';
        const bumper = '222';
        const rim = '444';
        const light = 'ffc';
        const breakslight = 'f00';
        const shadow = '00000011';
        const seat = '333';
        
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
        blocks.push([BOX, 4, 3, 0, 0, 60, 30, coldark]);
        // trunk
        blocks.push([BOX, 7, 4, 0, 0, 16, 30, col]);
        blocks.push([BOX, 12, 1, 0, 1, 16, 28, col]);
        blocks.push([BOX, 13, 1, 0, 2, 15, 26, coldark]);
        blocks.push([BOX, 13, 1, 1, 3, 13, 24, col]);
        // front chassis
        blocks.push([BOX, 7, 4, 40, 0, 20, 30, col]);
        blocks.push([BOX, 12, 1, 40, 1, 20, 28, col]);
        blocks.push([BOX, 13, 1, 40, 2, 19, 26, coldark]);
        blocks.push([BOX, 13, 1, 40, 3, 19, 24, col]);

        blocks.push([BOX, 7, 6, 39, 1, 2, 28, bumper]);
        blocks.push([BOX, 7, 7, 0, -1, 60, 2, col]);
        blocks.push([BOX, 7, 7, 0, 29, 60, 2, col]);

        /// seats
        blocks.push([BOX, 7, 1, 23, 2, 13, 11, bumper]);
        blocks.push([BOX, 7, 1, 24, 3, 11, 9, seat]);
        blocks.push([BOX, 7, 3, 21, 2, 4, 11, seat]);
        blocks.push([BOX, 10, 4, 19, 2, 3, 11, seat]);
        blocks.push([BOX, 14, 2, 19, 5, 3, 5, bumper]);

        blocks.push([BOX, 7, 1, 23, 17, 13, 11, seat]);
        blocks.push([BOX, 7, 3, 21, 17, 3, 11, seat]);
        blocks.push([BOX, 10, 4, 19, 17, 3, 11, seat]);
        blocks.push([BOX, 14, 2, 19, 20, 3, 5, bumper]);

        // door-seams 
        /*
        blocks.push([BOX, 4, 10, 25, 0, 1, 1, coldark]);
        blocks.push([BOX, 4, 10, 39, 0, 1, 1, coldark]);
        blocks.push([BOX, 4, 10, 12, 0, 1, 1, coldark]);
        blocks.push([BOX, 4, 10, 25, 29, 1, 1, coldark]);
        blocks.push([BOX, 4, 10, 39, 29, 1, 1, coldark]);
        blocks.push([BOX, 4, 10, 12, 29, 1, 1, coldark]);
        */

        // mirrors
        blocks.push([BOX, 13, 1, 39, -3, 2, 36, coldark]);
        blocks.push([BOX, 14, 1, 39, -3, 2, 36, col]);

        // bumper
        blocks.push([BOX, 6, 2, -0.5, -1, 3.5, 32, bumper]);
        blocks.push([BOX, 6, 2, 58, -1, 3.5, 32, bumper]);

        // back tires
        addTire(blocks, 0, 11, 30, 12, 3, tire);
        addTire(blocks, 2, 11, 30, 8, 4, rim);

        addTire(blocks, 0, 11, 0, 12, 3, tire);
        addTire(blocks, 2, 11, 0, 8, 4, rim);
        

        // front tires
        addTire(blocks, 0, 49, 30, 12, 3, tire);
        addTire(blocks, 2, 49, 30, 8, 4, rim);

        addTire(blocks, 0, 49, 0, 12, 3, tire);
        addTire(blocks, 2, 49, 0, 8, 4, rim);

        // upper chassis
        //blocks.push([BOX, 14, 1, 40, 1, 3, 28, coldark]);
        //blocks.push([BOX, 14, 1, 10, 3, 30, 24, tire]);
        for(let i=0; i <=4; i++) {
            let x = 40-i*2;
            let y = 2+i/2;
            let w = 3;
            let h = 26-i;
            // glass
            blocks.push([BOX, 14+i, 1, x, y, w, h, glass]);
            // beams front
            blocks.push([BOX, 14+i, 1, x+w-2, y, 2, 2, col]);
            blocks.push([BOX, 14+i, 1, x+w-2, y+h-2, 2, 2, col]);
        }
        // roof
        blocks.push([BOX, 19, 1, 32, 5, 2, 20, col]);
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

stackDefCarCabrio.init();

export default stackDefCarCabrio;
export {stackDefCarCabrio};