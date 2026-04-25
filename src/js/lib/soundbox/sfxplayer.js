import SoundBoxPlayer from "./soundboxplayer.js";

export default class SFXPlayer {
    constructor() {
        this.sfx = {};
    }
    add(name, data, loop = false) {
        let musicplayer = new SoundBoxPlayer();
        musicplayer.init(data);
        while(musicplayer.generate() < 1) {}
        this.sfx[name] = {};
        this.sfx[name].actx = new AudioContext();
        this.sfx[name].loaded = false;
        let self = this;
        this.sfx[name].actx.decodeAudioData(musicplayer.createWave().buffer, (audioBuffer) => {
            self.sfx[name].srcNode = self.sfx[name].actx.createBufferSource();
            self.sfx[name].srcNode.buffer = audioBuffer;
            self.sfx[name].srcNode.connect(self.sfx[name].actx.destination);
            self.sfx[name].srcNode.loop = loop;
            self.sfx[name].loaded = true;
        });
    }

    playAudio(audioname) {
        let audio = this.sfx[audioname];
        if(audio) {
            if(!audio.loaded) {
                let self = this;
                window.setTimeout(()=>self.playAudio(audioname),100);
                return;
            }
            audio.srcNode.start(0);
        }
    }
    
}

