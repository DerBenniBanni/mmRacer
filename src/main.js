import { Game } from "./js/game.js";
import {Player, CABRIO} from "./js/gameobjects/player.js";
import {desktrack} from "./js/tracks/desktrack.js";
import {Npc, BOT_A, BOT_LIGHTCYCLE} from "./js/gameobjects/npc.js";
import musicGame from "./js/lib/soundbox/music.js";

window.$ = (selector) => document.querySelector(selector);
window.$removeClass = (selector, className) => $(selector).classList.remove(className);
window.$addClass = (selector, className) => $(selector).classList.add(className);
window.$setText = (selector, text) => {$(selector).innerText = text;}

let game = null;
document.addEventListener('DOMContentLoaded', () => {
    game = new Game();
    //game.debug = true;
    game.setTrack(desktrack);
    game.sfxPlayer.add("gamemusic", musicGame, true);
    $addClass("#prerender", "hidden");
    $removeClass("#start", "hidden");
    document.body.addEventListener("click", () => {
        $addClass("#start", "hidden");
        $addClass("#title", "hidden");
        $removeClass("#ui", "hidden");
        $removeClass("#info", "hidden");
        let x = desktrack.points[0][0]-200;
        let y = desktrack.points[0][1];
        
        game.setPlayer1(new Player({x, y, cartype:CABRIO}));
        game.sfxPlayer.playAudio("gamemusic");
        //game.setPlayer2(new Npc({x:x-100, y:y+20, cartype:BOT_A}));
        game.createNpcs = () => {
            game.addGameObject(new Npc({x:x+20, y:y+80, cartype:BOT_A}));
            game.addGameObject(new Npc({x:x+200, y:y-40, cartype:BOT_LIGHTCYCLE}));
        };
    }, {once: true});
    
});