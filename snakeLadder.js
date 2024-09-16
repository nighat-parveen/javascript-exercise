
const board = document.querySelector('.board');
const totalCells = 100;
let snake = {
    23: 2,
    36: 6,
    49: 11,
    57: 19,
    63: 18,
    64: 60,
    87: 24
}

let ladder = {
    4: 14,
    9: 31,
    40: 42,
    43: 77,
    48: 53,
    68: 84,
    70: 91,
    75: 80
}
function createboard() {
    let rightToLeft = true
    for(let i = 10; i > 0; i--) {

        for(let j = 1; j <= 10; j++) {
            const div = document.createElement('div');
            const fillVal = `cell${i%2 === 0 ? j%2==0 ? ' fill' : '' : j%2!=0 ? ' fill' : ''}`;
            div.className += fillVal; 
            const val =  rightToLeft ? `${(i*10+1 - j)}` : `${((i*10)-10 + j)}`;   
            div.innerText = val;

            if(snake[val]){
                div.innerText+=`🐍`;
            }
            else if(ladder[val]){
                div.innerText+=`🪜`;
            }
            board.append(div);
        }

        rightToLeft = !rightToLeft;
    }
}

createboard();

