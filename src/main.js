import { Game } from "./js/game.js";
import {Player} from "./js/gameobjects/player.js";
import {desktrack} from "./js/tracks/desktrack.js";
import {CABRIO, MINI, Npc} from "./js/gameobjects/npc.js";

document.addEventListener('DOMContentLoaded', () => {
    const game = new Game();
    game.generateBackground(desktrack);
    let x = desktrack.points[0][0];
    let y = desktrack.points[0][1];
    let player = game.addGameObject(new Player({x, y}));
    let cabrio = game.addGameObject(new Npc({x:x-100, y:y+20, cartype:CABRIO}));
    let mini = game.addGameObject(new Npc({x:x+100, y:y-30, cartype:MINI}));
    game.setCameraTarget(player);
});