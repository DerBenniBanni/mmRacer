import DynamicSplitRenderer from "./lib/dynamicsplit.js";
import { Vec2d } from "./lib/geometric.js";
import { HugeBackground } from "./lib/hugebackground.js";
import {TrackRenderer} from "./tracks/trackrenderer.js";

export class Game {
    constructor() {
        this.canvas = document.getElementById('maincanvas');
        this.ctx = this.canvas.getContext('2d');

        this.gameobjects = [];

        this.player1 = null;
        this.player2 = null;
        this.splitRenderer = new DynamicSplitRenderer(this.canvas);
        this.splitEnabled = false;

        this.camera1 = { 
            x: this.canvas.width / 2, 
            y: this.canvas.height / 2,
            target:null,
            offsetX:0,
            offsetY:0 //this.canvas.height / 4
        };
        this.camera2 = { 
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

        this.track = null;

        this.hugeBackground = new HugeBackground(8000, 8000, 0, 0);
        

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

    setTrack(track) {
        this.track = track;
        this.generateBackground();
    }
    generateBackground() {
        let ctx = this.hugeBackground.getCtx();
        ctx.fillStyle = '#333333';
        ctx.fillRect(0, 0, this.hugeBackground.width, this.hugeBackground.height);

        if(!!this.track) {
            let trackrenderer = new TrackRenderer(this.track);
            trackrenderer.render(ctx);
        }
        // Add some random details to the background
        for (let i = 0; i < 100000; i++) {
            let x = Math.random() * this.hugeBackground.width;
            let y = Math.random() * this.hugeBackground.height;
            let size = Math.random() * 25 + 10;
            ctx.fillStyle = '#444444' + Math.floor(Math.random() * 20).toString(16);
            ctx.beginPath();
            ctx.arc(x, y, size, 0, Math.PI * 2);
            ctx.fill();
        }
    }
    setPlayer1(player) {
        this.player1 = player;
        this.addGameObject(player);
        this.camera1.target = player;
        this.splitEnabled = !!this.player2;
    }
    setPlayer2(player) {
        this.player2 = player;
        this.addGameObject(player);
        this.camera2.target = player;
        this.splitEnabled = !!this.player1;
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
        this.gameobjects.filter(obj => obj.updateBackground)
            .forEach(obj => obj.updateBackground(this.hugeBackground.getCtx()));
        this.hugeBackground.getCtx().restore();
    }

    update(deltaTime) {
        for (let obj of this.gameobjects) {
            if (obj.update) {
                obj.update(deltaTime);
            }
        }
        this.gameobjects = this.gameobjects.filter(obj => obj.ttl > 0);
        [this.camera1, this.camera2].forEach(camera => {
            if(!!camera && camera.target) {
                camera.x = camera.target.x + camera.offsetX;
                camera.y = camera.target.y + camera.offsetY;
            }
        });
    }

    render() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.gameobjects.sort((a, b) => a.y - b.y); // sort by y position
        if(!this.splitEnabled) {
            // only render player 1 view if player 2 is not set
            this.renderCameraView(this.ctx, this.camera1);
            return;
        }
        this.renderSplitView(this.ctx);
    }

    renderCameraView(ctx, camera) {
        this.hugeBackground.render(ctx, camera.x, camera.y, this.canvas.width, this.canvas.height);
        ctx.save();
        ctx.translate(this.canvas.width / 2 - camera.x, this.canvas.height / 2 - camera.y);
        for (let obj of this.gameobjects) {
            if (obj.render) {
                obj.render(ctx);
            }
        }
        ctx.restore();
    }

    renderSplitView(ctx) {
        let angleBetweenPlayers = Math.atan2(this.player2.y - this.player1.y, this.player2.x - this.player1.x);
        let distanceBetweenPlayers = new Vec2d(this.player1.x, this.player1.y).distance(new Vec2d(this.player2.x, this.player2.y));
        let centerPoint = new Vec2d((this.player1.x + this.player2.x)/2,(this.player1.y + this.player2.y)/2);
        let center = new Vec2d(ctx.canvas.width / 2, ctx.canvas.height / 2);
        let player1ScreenPos = center.add(Vec2d.fromPolarElipse(angleBetweenPlayers - Math.PI,ctx.canvas.width / 4, ctx.canvas.height / 4));
        let player2ScreenPos = center.add(Vec2d.fromPolarElipse(angleBetweenPlayers, ctx.canvas.width / 4, ctx.canvas.height / 4));
        let distanceBetweenScreenPositions = player1ScreenPos.distance(player2ScreenPos);
        
        this.splitRenderer.setAngle(angleBetweenPlayers+Math.PI/2);
        let renderObjects = this.gameobjects.filter(obj => obj.render);
        let hugeBackground = this.hugeBackground;
        let camera1 = this.camera1;
        let camera2 = this.camera2;
        let canvasWidth = this.canvas.width;
        let canvasHeight = this.canvas.height;
        let game = this;
        if(distanceBetweenScreenPositions < distanceBetweenPlayers) {
            let distanceFactor = (distanceBetweenPlayers - distanceBetweenScreenPositions) / 200;
            distanceFactor = distanceFactor < 0 ? 0 : distanceFactor;
            distanceFactor =distanceFactor > 4 ? 4 : distanceFactor;
            this.splitRenderer.render(ctx, distanceFactor,
                (ctx) => {
                    // Render the player 1 side
                    hugeBackground.render(ctx, 
                        game.player1.x-player1ScreenPos.x + canvasWidth/2, 
                        game.player1.y-player1ScreenPos.y + canvasHeight/2, 
                        canvasWidth, canvasHeight);
                    ctx.save();
                    ctx.translate(player1ScreenPos.x - game.player1.x, player1ScreenPos.y - game.player1.y);
                    renderObjects.forEach((gameObject) => {
                        gameObject.render(ctx);
                    });
                    ctx.restore();
                },
                (ctx) => {
                    // Render the player 2 side
                    
                    hugeBackground.render(ctx, 
                        game.player2.x-player2ScreenPos.x + canvasWidth/2, 
                        game.player2.y-player2ScreenPos.y + canvasHeight/2, 
                        canvasWidth, canvasHeight);
                    ctx.save();
                    ctx.translate(player2ScreenPos.x - game.player2.x, player2ScreenPos.y - game.player2.y);
                    renderObjects.forEach((gameObject) => {
                        gameObject.render(ctx);
                    });
                    ctx.restore();
                }
            );
        } else {
            hugeBackground.render(ctx, 
                        centerPoint.x + canvasWidth/2 - center.x, 
                        centerPoint.y + canvasHeight/2 - center.y, 
                        canvasWidth, canvasHeight);
            ctx.save();
            ctx.translate(-centerPoint.x + ctx.canvas.width/2, -centerPoint.y + ctx.canvas.height/2);
            renderObjects.forEach((gameObject) => {
                gameObject.render(ctx);
            });
            ctx.restore();
        }
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