import { Game, STATE_MENU } from "./js/game.js";
import {Player, CABRIO} from "./js/gameobjects/player.js";
import {tracks} from "./js/tracks/desktrack.js";
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
    game.generateBackground();
    tracks.forEach(track => game.tracks.push(track));
    game.setTrack(0);
    game.sfxPlayer.add("gamemusic", musicGame, true);

    $addClass("#prerender", "hidden");
    $removeClass("#start", "hidden");
    document.body.addEventListener("click", () => {
        $addClass("#start", "hidden");
        $addClass("#title", "hidden");
        $removeClass("#ui", "hidden");
        $removeClass("#info", "hidden");
        let x = game.track.points[0][0]-200;
        let y = game.track.points[0][1];
        
        game.setPlayer1(new Player({x, y, cartype:CABRIO}));
        game.sfxPlayer.playAudio("gamemusic");

        game.state = STATE_MENU;
    }, {once: true});
    
});