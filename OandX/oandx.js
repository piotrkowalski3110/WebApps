let xo = 0;

const init = event => {
    const game = document.getElementById('game');
    const field = game.children;

    for (let i = 0; i < field.length; ++i) {
        field[i].addEventListener('click', event => {

            if(xo == 0 && field[i].textContent.length == 0)
            {
                field[i].textContent = 'O';
                field[i].setAttribute("style", "color: orange");
                xo = 1;
            }
            if(xo == 1 && field[i].textContent.length == 0)
            {
                field[i].textContent = 'X';
                field[i].setAttribute("style", "color: green");
                xo = 0;
            }
        });
    }
};

window.addEventListener('DOMContentLoaded', init);