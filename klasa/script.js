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

    get screenValue(){
        return parseFloat(this.screen.textContent);
    }

    set screenValue(value){
        this.screen.textContent = value;
    }

    mouseClick(event) {
        const key = event.target.textContent;
        switch (key) {
            case '+':
                this.MoveToBuffer();
                this.opCode = 1;
                this.screen.textContent = '0';
                break;

            case '-':
                this.MoveToBuffer();
                this.opCode = -1;
                this.screen.textContent = '0';
                break;

            case '=':
                this.MoveToBuffer();
                this.opCode = 0;
                this.screen.textContent = this.value;
                break;

            case 'C':
                this.screen.textContent = '0';
                this.opCode = 0;
                this.value = 0;
                break;

            case '.':
                if (!this.screen.textContent.includes('.')) {
                    this.screen.textContent += key;
                }
                break;

            default:
                if (this.screen.textContent === '0') {
                    this.screen.textContent = key;
                } else {
                    this.screen.textContent += key;
                }
                break;
        }
    }

    MoveToBuffer() {
        switch (this.opCode) {
            case -1:
                this.value -= this.screenValue;
                break;
            case 0:
                this.value = this.screenValue;
                break;
            case 1:
                this.value += this.screenValue;
                break;
        }
    }

    init() {
        document.body.appendChild(this.container);
    };
}

const calc = new Calc();
window.addEventListener('DOMContentLoaded', () => calc.init());