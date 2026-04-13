import { Game } from "./js/game.js";
import {Player} from "./js/gameobjects/player.js";

document.addEventListener('DOMContentLoaded', () => {
    const game = new Game();
    game.generateBackground();
    let player = game.addGameObject(new Player({x:100, y:100}));
    game.setCameraTarget(player);
});