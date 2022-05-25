const GAME_HEIGHT = 600;
const GAME_WIDTH = 800;

const PLAYER_WIDTH = 8;
const PLAYER_HEIGHT = 60;
const MARGIN_TOP = 40;
const MARGIN_BOTTOM = 10;
const FIELD_LINE_WIDTH = 4;
const MOVE_MIN = MARGIN_TOP + FIELD_LINE_WIDTH * 0.5 + 1;
const MOVE_MAX = GAME_HEIGHT - PLAYER_HEIGHT - MARGIN_BOTTOM - FIELD_LINE_WIDTH * 0.5 - 1;
const PLAYER_INITIAL_Y = Math.round((GAME_HEIGHT - MARGIN_TOP - MARGIN_BOTTOM - PLAYER_HEIGHT) * 0.5 + MARGIN_TOP);
const CENTER_X = GAME_WIDTH * 0.5;
const CENTER_Y = Math.round((GAME_HEIGHT + MARGIN_TOP - MARGIN_BOTTOM) * 0.5);
const BALL_SIZE = 12;

class Ball {
    constructor() {
        this.canvas = document.createElement('CANVAS');
        this.canvas.setAttribute("width", BALL_SIZE);
        this.canvas.setAttribute("height", BALL_SIZE);
        this.x = CENTER_X - BALL_SIZE * 0.5;
        this.y = CENTER_Y - BALL_SIZE * 0.5;
        this.m = {x: -1, y: -1};
        this.speed = 2;
        this.over = false;

        const ctx = this.canvas.getContext('2d');
        ctx.fillStyle = "white";
        ctx.fillRect(0, 0, BALL_SIZE, BALL_SIZE);
    }

    draw(ctx) {
        ctx.drawImage(this.canvas, this.x, this.y)
    }

    move(leftPlayerY, rightPlayerY) {
        if (this.y <= MOVE_MIN && this.m.y < 0) {
            this.m.y = 1;
        }
        if (this.y >= (MOVE_MAX + PLAYER_HEIGHT - BALL_SIZE) && this.m.y > 0) {
            this.m.y = -1;
        }
        if(!this.over && this.x <= (15+PLAYER_WIDTH) && this.m.x < 0){
            if((this.y + BALL_SIZE) >= leftPlayerY && this.y <= (leftPlayerY + PLAYER_HEIGHT)){
                this.m.x=1;
            }
            else {
                this.over = true;
            }
        }
        if (this.x <= 0 && this.m.x < 0) {
            this.m.x = 1;
        }
        if (this.x >= (GAME_WIDTH - BALL_SIZE) && this.m.x > 0) {
            this.m.x = -1;
        }
        if(this.x <= 15 + PLAYER_WIDTH && this.m.x < 0)
        {
            this.m.x = 1;
        }

        this.x += this.m.x * this.speed;
        this.y += this.m.y * this.speed;
    }
}

class Background {
    constructor(width, height) {
        this.canvas = document.createElement('CANVAS');
        this.canvas.setAttribute("width", width);
        this.canvas.setAttribute("height", height);
        this.width = width;
        this.height = height;
        this.create();
    }

    create() {
        const ctx = this.canvas.getContext('2d');
        ctx.fillRect(0, 0, this.width, this.height);

        ctx.strokeStyle = "white";
        ctx.lineWidth = FIELD_LINE_WIDTH;

        ctx.beginPath();
        ctx.moveTo(MARGIN_BOTTOM, MARGIN_TOP);
        ctx.lineTo(this.width - MARGIN_BOTTOM, MARGIN_TOP);
        ctx.moveTo(10, this.height - MARGIN_BOTTOM);
        ctx.lineTo(this.width - MARGIN_BOTTOM, this.height - MARGIN_BOTTOM);
        ctx.stroke();

        ctx.beginPath();
        ctx.setLineDash([6, 6]);
        ctx.moveTo(this.width / 2, MARGIN_TOP);
        ctx.lineTo(this.width / 2, this.height - MARGIN_BOTTOM);
        ctx.stroke();
    }

    draw(ctx) {
        ctx.drawImage(this.canvas, 0, 0);
    }
}

class Pong {
    constructor(width, height) {
        this.background = new Background(width, height);
        this.ball = new Ball();
        this.canvas = document.createElement('CANVAS');
        this.canvas.setAttribute("width", width);
        this.canvas.setAttribute("height", height);
        this.ctx = this.canvas.getContext('2d');
        this.width = width;
        this.height = height;

        this.playerA = new Player(15, this.ctx);
        this.playerB = new Player(785 - PLAYER_WIDTH, this.ctx);


        // this.canvas.addEventListener('mousemove', e=>{
        //     this.playerA.move(e.offsetY);
        //     this.playerB.move(e.offsetY)
        //     this.draw();
        //     })

    }

    init() {
        document.body.appendChild(this.canvas);
        this.draw();
    }

    draw() {
        this.background.draw(this.ctx);
        this.playerA.draw(this.ctx, 100);
        this.playerB.draw(this.ctx, 100);
        this.ball.draw(this.ctx);
        this.ball.move(this.playerA.y);
        window.requestAnimationFrame(() => this.draw());
    }

    handlekey(state, event) {
        console.log(`${event.code} is ${state} (${event.repeat})`);
        const keyPressed = state === 'down';

        switch (event.code) {
            case 'KeyW':
                keyPressed ? this.playerA.moveUp() : this.playerA.stop();
                break;
            case 'KeyS':
                keyPressed ? this.playerA.moveDown() : this.playerA.stop();
                break;
            case 'ArrowUp':
                keyPressed ? this.playerB.moveUp() : this.playerB.stop();
                break;
            case 'ArrowDown':
                keyPressed ? this.playerB.moveDown() : this.playerB.stop();
                break;
        }
    }
}

class Player {
    constructor(x, parentCTX) {
        this.canvas = document.createElement('CANVAS');
        this.canvas.setAttribute("width", PLAYER_WIDTH);
        this.canvas.setAttribute("height", PLAYER_HEIGHT);
        this.x = x;
        this.y = PLAYER_INITIAL_Y;
        this.isMoving = false;
        this.speed = 0;
        this.parentCTX = parentCTX;

        const ctx = this.canvas.getContext('2d');
        ctx.fillStyle = "white";
        ctx.fillRect(0, 0, PLAYER_WIDTH, PLAYER_HEIGHT);
    }

    draw() {
        this.parentCTX.drawImage(this.canvas, this.x, this.y)
    }

    move() {
        this.y += this.speed;

        if (this.y > MOVE_MAX) {
            this.y = MOVE_MAX;
            this.stop();
        } else if (this.y < MOVE_MIN) {
            this.y = MOVE_MIN;
            this.stop();
        }
        if (this.isMoving) {
            setTimeout(() => this.move(), 20);
        }
    }

    stop() {
        this.speed = 0;
        this.isMoving = false;

    }

    moveDown() {
        if (this.isMoving) return;
        this.speed = 8;
        this.isMoving = true;
        this.move();
    }

    moveUp() {
        if (this.isMoving) return;
        this.speed = -8;
        this.isMoving = true;
        this.move();
    }
}

const game = new Pong(GAME_WIDTH, GAME_HEIGHT);

window.addEventListener('keydown', event => !event.repeat && game.handlekey('down', event));
window.addEventListener('keyup', event => !event.repeat && game.handlekey('up', event));
window.addEventListener('DOMContentLoaded', () => game.init());