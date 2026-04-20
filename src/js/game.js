import DynamicSplitRenderer from "./lib/dynamicsplit.js";
import { Vec2d } from "./lib/geometric.js";
import { HugeBackground } from "./lib/hugebackground.js";
import { PositionGrid } from "./lib/positiongrid.js";
import {TrackRenderer} from "./tracks/trackrenderer.js";

export const STATE_MENU = 0;
export const STATE_PLAYING = 1;

export class Game {
    constructor() {
        this.bgWidth = 8000;
        this.bgHeight = 8000;
        this.debug = false;
        this.canvas = document.getElementById('maincanvas');
        this.ctx = this.canvas.getContext('2d');

        this.state = STATE_MENU;
        this.gameobjects = [];

        this.positionGrid = new PositionGrid(150, this.bgWidth, this.bgHeight);

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
        this.trackBounds = [];

        this.hugeBackground = new HugeBackground(this.bgWidth, this.bgHeight, 0, 0);
        

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
            'KeyS': 'brake',
            'Space': 'start'
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
        let trackrenderer = new TrackRenderer(this.track);
        this.generateBackground(trackrenderer);
        this.trackBounds = trackrenderer.generateTrackBounds();
        this.positionGrid.clear();
        this.trackBounds.forEach(boundary => {
            this.positionGrid.addByRectangle(boundary);
        });
    }

    generateBackground(trackrenderer) {
        let ctx = this.hugeBackground.getCtx();
        this.createWoodTexture(ctx, this.hugeBackground.width, this.hugeBackground.height);
        //ctx.fillStyle = '#333333';
        //ctx.fillRect(0, 0, this.hugeBackground.width, this.hugeBackground.height);

        if(!!this.track) {
            trackrenderer.render(ctx);
        }
        // Add some random details to the background
        /*
        for (let i = 0; i < 100000; i++) {
            let x = Math.random() * this.hugeBackground.width;
            let y = Math.random() * this.hugeBackground.height;
            let size = Math.random() * 25 + 10;
            ctx.fillStyle = '#444444' + Math.floor(Math.random() * 20).toString(16);
            ctx.beginPath();
            ctx.arc(x, y, size, 0, Math.PI * 2);
            ctx.fill();
        }
        */
    }

    createWoodTexture(ctx, width, height) {
        const imageData = ctx.createImageData(width, height);
        const data = imageData.data;

        const color1 = [139, 69, 19]; // Dark Brown
        const color2 = [160, 90, 25]; // Light Brown

        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
                // Generate procedural noise based on sine/cosine waves and random math
                // Stretching the noise to create a "grain"
                let grain = 
                    Math.sin((x+y) * 0.15 + Math.sin(y * 0.01) * 2) * 0.5 
                    + Math.sin((x+y) * 0.1 + Math.sin(y * 0.05) * 2) * 0.5
                    + Math.cos((x+y) * 1.1 + Math.cos(y * 0.05) * 2) * 0.5;
                let noise = Math.random() * 3.5; // Add some random variation
                
                let mix = grain + noise;
                mix = Math.max(0, Math.min(1, mix)); // Clamp between 0 and 1

                // Linearly interpolate between the two wood colors
                const r = color1[0] * mix + color2[0] * (1 - mix);
                const g = color1[1] * mix + color2[1] * (1 - mix);
                const b = color1[2] * mix + color2[2] * (1 - mix);

                const index = (y * width + x) * 4;
                data[index] = r;
                data[index + 1] = g;
                data[index + 2] = b;
                data[index + 3] = 255; // Alpha
            }
        }
        ctx.putImageData(imageData, 0, 0);
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
        if(this.state === STATE_MENU && this.inputActions.start) {
            this.state = STATE_PLAYING;
            $addClass("#info", "hidden");
        }
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

    debugRender(ctx) {
        if(!this.debug) return;
        this.positionGrid.getNearby(this.player1.x, this.player1.y, 70).forEach(obj => {
            obj.render(ctx);
        });
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
        this.debugRender(ctx);
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
                    game.debugRender(ctx);
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
                    game.debugRender(ctx);
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
            game.debugRender(ctx);
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