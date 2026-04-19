import { Game } from "./js/game.js";
import {Player} from "./js/gameobjects/player.js";
import {desktrack} from "./js/tracks/desktrack.js";
import {BOT_A, CABRIO, COUPE, MINI, Npc} from "./js/gameobjects/npc.js";

document.addEventListener('DOMContentLoaded', () => {
    const game = new Game();
    //game.debug = true;
    game.setTrack(desktrack);
    let x = desktrack.points[0][0]-200;
    let y = desktrack.points[0][1];
    
    game.setPlayer1(new Player({x, y, cartype:CABRIO}));
    
    game.setPlayer2(new Npc({x:x-100, y:y+20, cartype:BOT_A}));
    //game.addGameObject(new Npc({x:x-200, y:y+40, cartype:COUPE}));
    //game.addGameObject(new Npc({x:x-200, y:y-40, cartype:COUPE}));
});