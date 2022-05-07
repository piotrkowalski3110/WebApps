//const content = document.getElementById('container');
//console.log(content);
/*
function init(event)
{
    const content = document.getElementById('container');
    console.log(content);
    console.log("Document loaded in: " + event.timeStamp);
}

window.addEventListener('DOMContentLoaded', init);
*/


//const add = (x, y) => x + y;

/*
window.addEventListener('DOMContentLoaded', event => {
    const content = document.getElementById('calc');
    const buttons = content.children;
    for(let i = 1; i < buttons.length; ++i)
    {
        buttons[i].addEventListener('click', ev => {
            document.getElementById('screen').textContent += ev.target.textContent;
        });
    }
});
*/

const buffer ={
    value: 0,
    op: 0//-1: odejmowanie, 1: dodawanie, 0:nic
};

function MoveToBuffer(){
    const screen = document.getElementById('screen');

    switch(buffer.op)
    {
        case -1:
            buffer.value -= parseFloat(screen.textContent);
            break;
        case 0:
            buffer.value = parseFloat(screen.textContent);
            break;
        case 1:
            buffer.value += parseFloat(screen.textContent);
            break;
    }
}

function mouseClick(event) {
    const key = event.target.textContent;
    const screen = document.getElementById('screen');


    switch(key)
    {
        case '+':
            MoveToBuffer();
            buffer.op = 1;
            screen.textContent = '0';
            break;

        case '-':
            MoveToBuffer();
            buffer.op = -1;
            screen.textContent = '0';
            break;

        case '=':
            MoveToBuffer();
            buffer.op = 0;
            screen.textContent = buffer.value;
            break;

        case 'C':
            screen.textContent = '0';
            buffer.op = 0;
            buffer.value = 0;
            break;

        case '.':
            if(!screen.textContent.includes('.'))
            {
                screen.textContent += key;
            }
            break;

        default:
            if(screen.textContent === '0')
            {
                screen.textContent = key;
            }
            else
            {
                screen.textContent += key;
            }
            break;
    }


}

const init = event => {
    const content = document.getElementById('calc');
    const buttons = content.children;

    for (let i = 0; i < buttons.length; ++i) {
        buttons[i].addEventListener('click', mouseClick);
    }
};

window.addEventListener('DOMContentLoaded', init);