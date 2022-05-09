class Calc {
    constructor() {
        this.value = 0;
        this.opCode = 0;

        this.container = document.createElement('DIV');
        this.container.id = 'calc';

        this.screen = document.createElement('DIV');
        this.screen.id = 'screen';
        this.screen.textContent = 0;
        this.container.appendChild(this.screen);

        [7,8,9,'C',4,5,6,'+',1,2,3,'-',0,'.','='].forEach(item => {
            const button = document.createElement('DIV');
            button.textContent = item;
            if(item===0) {
                button.className = 'double';
            }
            button.addEventListener('click', event => this.mouseClick(event));
            this.container.appendChild(button);
        });
    }

    mouseClick(event) {
        const key = event.target.textContent;
        const screen = document.getElementById('screen');
        switch (key) {
            case '+':
                this.MoveToBuffer();
                this.opCode = 1;
                screen.textContent = '0';
                break;

            case '-':
                this.MoveToBuffer();
                this.opCode = -1;
                screen.textContent = '0';
                break;

            case '=':
                this.MoveToBuffer();
                this.opCode = 0;
                screen.textContent = this.value;
                break;

            case 'C':
                screen.textContent = '0';
                this.opCode = 0;
                this.value = 0;
                break;

            case '.':
                if (!screen.textContent.includes('.')) {
                    screen.textContent += key;
                }
                break;

            default:
                if (screen.textContent === '0') {
                    screen.textContent = key;
                } else {
                    screen.textContent += key;
                }
                break;
        }
    }

    MoveToBuffer() {
        const screen = document.getElementById('screen');

        switch (this.opCode) {
            case -1:
                this.value -= parseFloat(screen.textContent);
                break;
            case 0:
                this.value = parseFloat(screen.textContent);
                break;
            case 1:
                this.value += parseFloat(screen.textContent);
                break;
        }
    }

    init() {
        document.body.appendChild(this.container);
    };
}

const calc = new Calc();
window.addEventListener('DOMContentLoaded', () => calc.init());