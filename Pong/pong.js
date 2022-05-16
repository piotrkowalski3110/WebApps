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
        ctx.moveTo(10, 40);
        ctx.lineTo(this.width - 10, 40);
        ctx.moveTo(10, this.height - 10);
        ctx.lineTo(this.width - 10, this.height - 10);
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

class Pong {
    constructor(width, height) {
        this.background = new Background(width, height);
        this.canvas = document.createElement('CANVAS');
        this.canvas.setAttribute("width", width);
        this.canvas.setAttribute("height", height);
        this.ctx = this.canvas.getContext('2d');
        this.width = width;
        this.height = height;
    }

    init() {
        document.body.appendChild(this.canvas);
        this.draw();
    }

    draw() {
        this.background.draw(this.ctx);
    }
}

const game = new Pong(800, 600);
window.addEventListener('DOMContentLoaded', () => game.init());