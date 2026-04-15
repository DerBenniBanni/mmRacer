import { HugeBackground } from "./lib/hugebackground.js";

export class Game {
    constructor() {
        this.canvas = document.getElementById('maincanvas');
        this.ctx = this.canvas.getContext('2d');

        this.gameobjects = [];

        this.camera = { 
            x: this.canvas.width / 2, 
            y: this.canvas.height / 2,
            target:null,
            offsetX:0,
            offsetY:0 //this.canvas.height / 4
        };

        this.inputActions = {
            turnLeft: false,
            turnRight: false,
            accelerate: false,
            brake: false
        }

        this.hugeBackground = new HugeBackground(8000, 8000, 2000, 500);
        

        this.registerKeyboardListeners();

        this.lastUpdateTime = performance.now();
        requestAnimationFrame(this.gameLoop.bind(this));
    }

    registerKeyboardListeners() {
        const keyActions = {
            'ArrowLeft': 'turnLeft',
            'KeyA': 'turnLeft',
            'ArrowRight': 'turnRight',
            'KeyD': 'turnRight',
            'ArrowUp': 'accelerate',
            'KeyW': 'accelerate',
            'ArrowDown': 'brake',
            'KeyS': 'brake'
        };
        window.addEventListener('keydown', (e) => {
            if(keyActions[e.code] !== undefined) {
                this.inputActions[keyActions[e.code]] = true;
            }
        });
        window.addEventListener('keyup', (e) => {
            if(keyActions[e.code] !== undefined) {
                this.inputActions[keyActions[e.code]] = false;
            }
        });
    }

    generateBackground() {
        let ctx = this.hugeBackground.getCtx();
        ctx.fillStyle = '#333333';
        ctx.fillRect(0, 0, this.hugeBackground.width, this.hugeBackground.height);


        // Add some random details to the background
        for (let i = 0; i < 100000; i++) {
            let x = Math.random() * this.hugeBackground.width;
            let y = Math.random() * this.hugeBackground.height;
            let size = Math.random() * 5 + 25;
            ctx.fillStyle = '#444444' + Math.floor(0 + Math.random() * 30).toString(16);
            ctx.beginPath();
            ctx.arc(x, y, size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    gameLoop(currentTime) {
        let deltaTime = (currentTime - this.lastUpdateTime) / 1000; // in seconds
        if(deltaTime > 0.1) deltaTime = 0.1; // cap deltaTime to avoid big jumps
        this.lastUpdateTime = currentTime;
        this.update(deltaTime);
        this.render();
        this.updateBackground();
        requestAnimationFrame(this.gameLoop.bind(this));
    }

    updateBackground() {
        this.hugeBackground.getCtx().save();
        this.hugeBackground.getCtx().translate(this.hugeBackground.offsetX, this.hugeBackground.offsetY);
        this.gameobjects.find(obj => obj.updateBackground)?.updateBackground(this.hugeBackground.getCtx());
        this.hugeBackground.getCtx().restore();
    }

    update(deltaTime) {
        for (let obj of this.gameobjects) {
            if (obj.update) {
                obj.update(deltaTime);
            }
        }
        this.gameobjects = this.gameobjects.filter(obj => obj.ttl > 0);
        if(this.camera.target) {
            this.camera.x = this.camera.target.x + this.camera.offsetX;
            this.camera.y = this.camera.target.y + this.camera.offsetY;
        }
    }

    render() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.hugeBackground.render(this.ctx, this.camera.x, this.camera.y, this.canvas.width, this.canvas.height);
        this.ctx.save();
        this.ctx.translate(this.canvas.width / 2 - this.camera.x, this.canvas.height / 2 - this.camera.y);
        this.gameobjects.sort((a, b) => a.y - b.y); // sort by y position
        for (let obj of this.gameobjects) {
            if (obj.render) {
                obj.render(this.ctx);
            }
        }
        this.ctx.restore();
        
    }

    addGameObject(gameObject) {
        gameObject.setGame(this);
        this.gameobjects.push(gameObject);
        return gameObject;
    }

    setCameraTarget(gameObject) {
        this.camera.target = gameObject;
    }
}