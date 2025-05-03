import { Scene } from 'phaser';

const WIDTH = 1024;
const HEIGHT = 768;

export class Game extends Scene {
    constructor() {
        super('Game');
        // Initialise necessary variables
        this.ball = null;
        this.leftPaddle = null;
        this.rightPaddle = null;
        this.wasd = null;
        this.cursors = null;
        
        // Points logic this.leftScore = 0;
        this.rightScore = 0;
        this.leftScoreText = null; 
        this.rightScoreText = null;
    }

    preload() {
        // Load necessary assets from the assets directory 
        this.load.image('background', 'assets/background.png');
        this.load.image('ball', 'assets/ball.png');
        this.load.image('paddle', 'assets/paddle.png');
    }

    create() {
        // Add background, ball, and paddles to the scene
        this.add.image(WIDTH / 2, HEIGHT / 2, 'background').setScale(0.8, 0.8);
        this.ball = this.add.image(WIDTH / 2, HEIGHT / 2, 'ball').setScale(0.05, 0.05);
        this.leftPaddle = this.physics.add.image(50, 384, "paddle");
        this.leftPaddle.setImmovable(true);
        this.rightPaddle = this.physics.add.image(974, 384, "paddle");
        this.rightPaddle.setImmovable(true);
        this.ball = this.physics.add.image(WIDTH / 2, HEIGHT / 2, 'ball').setScale(0.05, 0.05).refreshBody();
        this.ball.setCollideWorldBounds(true);
        this.ball.setBounce(1, 1);
        
        this.physics.add.collider(this.ball, this.leftPaddle, this.hitPaddle, null, this); 
        this.physics.add.collider(this.ball, this.rightPaddle, this.hitPaddle, null, this);

        // Listen for "keyspace down" event, calling startBall function upon press
        this.input.keyboard.on('keydown-SPACE', this.startBall, this);
        // Assigns U/D/L/R keys to the cursors variable 
        this.cursors = this.input.keyboard.createCursorKeys(); // Assigns W/S keys to the wasd variable 
        this.wasd = this.input.keyboard.addKeys({
            up: Phaser.Input.Keyboard.KeyCodes.W,
            down: Phaser.Input.Keyboard.KeyCodes.S
        });
        this.leftScoreText = this.add.text(100, 50, '0', { fontSize: '50px' }); 
        this.rightScoreText = this.add.text(924, 50, '0', { fontSize: '50px' });
    }

    update() {
        // leftPaddle movement logic
        if (this.wasd.up.isDown && this.leftPaddle.y > 0) {
            this.leftPaddle.y -= 5;
        }
        else if (this.wasd.down.isDown && this.leftPaddle.y < HEIGHT) {
            this.leftPaddle.y += 5;
        }

        // rightPaddle movement logic
        if (this.cursors.up.isDown && this.rightPaddle.y > 0) {
            this.rightPaddle.y -= 5;
        }
        else if (this.cursors.down.isDown && this.rightPaddle.y < HEIGHT) {
            this.rightPaddle.y += 5;
        }

        const margin = 30;
        if (this.ball.x < margin) { // ball hits left wall
            this.rightScore += 1;
            this.rightScoreText.setText(this.rightScore);
            this.resetBall();
        } 
        else if (this.ball.x > WIDTH - margin) { // ball hits right wall
            this.leftScore += 1;
            this.leftScoreText.setText(this.leftScore);
            this.resetBall();
        }
    }
    
    startBall() {
        if (!this.ballInMotion) { // checks flag to determine if ball is NOT in motion // ... (code to set ball in motion)
            this.ball.setVelocity(200, 200);
            this.ballInMotion = true; // sets flag to ball is in motion
        }

    }

    hitPaddle() {

    }
    
    resetBall() {
        // clear and restart
        this.ball.setPosition(WIDTH/2, 384); this.ball.setVelocity(0, 0);
        this.ballInMotion = false;
        this.startBall()
    }
}