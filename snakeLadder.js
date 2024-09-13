
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
function createboard() {
    let rightToLeft = true
    for(let i = 10; i > 0; i--) {

        for(let j = 1; j <= 10; j++) {
            const div = document.createElement('div');
            const fillVal = `cell${i%2 === 0 ? j%2==0 ? ' fill' : '' : j%2!=0 ? ' fill' : ''}`;
            div.className += fillVal;     
            div.innerText = rightToLeft ? `${(i*10+1 - j)}` : `${((i*10)-10 + j)}`;

            board.append(div);
        }

        rightToLeft = !rightToLeft;
    }
}

createboard();

