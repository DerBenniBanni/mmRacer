import { Game } from "./js/game.js";
import {Player} from "./js/gameobjects/player.js";
import {desktrack} from "./js/tracks/desktrack.js";
import {Npc} from "./js/gameobjects/npc.js";

document.addEventListener('DOMContentLoaded', () => {
    const game = new Game();
    game.generateBackground(desktrack);
    let x = desktrack.points[0][0];
    let y = desktrack.points[0][1];
    let player = game.addGameObject(new Player({x, y}));
    let npc = game.addGameObject(new Npc({x:x-100, y:y+20}));
    game.setCameraTarget(player);
});