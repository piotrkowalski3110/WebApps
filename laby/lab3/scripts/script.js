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

window.addEventListener('DOMContentLoaded', event => {
    const content = document.getElementById('calc');
    //console.log(content);
    const buttons = content.children;
    for(let i = 1; i < buttons.length; ++i)
    {
        buttons[i].addEventListener('click', ev => {
            document.getElementById('screen').textContent += ev.target.textContent;
        });
    }
});


