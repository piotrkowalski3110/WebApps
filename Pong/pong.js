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
        ctx.lineWidth = 4;

        ctx.beginPath();
        ctx.moveTo(0, 40);
        ctx.lineTo(this.width - 0, 40);
        ctx.moveTo(0, this.height - 10);
        ctx.lineTo(this.width - 0, this.height - 10);
        ctx.stroke();

        ctx.beginPath();
        ctx.setLineDash([6, 6]);
        ctx.moveTo(this.width / 2, 40);
        ctx.lineTo(this.width / 2, this.height - 10);
        ctx.stroke();
    }

    draw(ctx) {
        ctx.drawImage(this.canvas, 0, 0);
    }
}

class Player {
    constructor(x){
        this.canvas = document.createElement("CANVAS");
        this.canvas.setAttribute("width", 8);
        this.canvas.setAttribute("height", 60);
        this.x = x;
        const ctx = this.canvas.getContext('2d');
        ctx.fillStyle = "white";
        ctx.fillRect(0,0,8,60);
    }
    draw(ctx){
        ctx.drawImage(this.canvas, this.x, this.y);
    }
}

class Pong {
    constructor(width, height) {
        this.background = new Background(width, height);
        this.player = new Player(15);
        this.canvas = document.createElement('CANVAS');
        this.canvas.setAttribute("width", width);
        this.canvas.setAttribute("height", height);
        this.ctx = this.canvas.getContext('2d');
        this.width = width;
        this.height = height;
        this.player
        this.canvas.addEventListener('mousemove', e=>{
        this.player.y = e.offsetY;
        this.draw();
        });

    }

    init() {
        document.body.appendChild(this.canvas);
        this.draw();
    }

    draw() {
        this.background.draw(this.ctx);
        this.player.draw(this.ctx, 100);
        window.requestAnimationFrame(()=>this.draw());
    }
}

const game = new Pong(1000, 600);
window.addEventListener('DOMContentLoaded', () => game.init());