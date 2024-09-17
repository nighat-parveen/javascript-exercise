
const board = document.querySelector('.board');
const playButton =document.querySelector('.play');
const dice = document.querySelector('.dice');
const player1 = '👦🏻';
const player2 = '👨🏼‍🎤';

let play1Score = 0;
let play2Score = 0;


let player1Turn = true;
let player2Turn = false;



const totalCells = 100;
let snake = {
    23: 2,
    36: 6,
    49: 11,
    57: 19,
    63: 18,
    64: 60,
    87: 24
};

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

function togglePlayers() {
    player1Turn = !player1Turn;
    player2Turn = !player2Turn;
}

function setPlayer(playScore, player){
    const element = document.querySelector(`[data-cell="${playScore}"]`);
    const isSnake = element.getAttribute('data-snake');
    const isLadder = element.getAttribute('data-ladder');
    let score = 0;
    if(isSnake?.length) {
        score = snake[Number(isSnake)];
    }
    else if(isLadder?.length) {
        score = ladder[Number(isLadder)];
    }
    if(score>0) {
        const ele = document.querySelector(`[data-cell="${score}"]`);
        ele.innerText += player;
        ele.setAttribute('data-player', player);
    }else {
        element.innerText += player;
        element.setAttribute('data-player', player);
    }
    
}

function updatescore(classname, scoreValue) {
    document.querySelector(classname).innerText = scoreValue;
}

function updateBoard() {

    if(player1Turn){
        resetPlayerPosition()
        play1Score += Number(dice.innerText);
        updatescore('.p1_score', play1Score);
        setPlayer(play1Score, player1);
    }else if(player2Turn){
        resetPlayerPosition()
        play2Score += Number(dice.innerText);
        updatescore('.p2_score', play2Score);
        setPlayer(play2Score, player2)
    }
}  

function setAttributeData(score, player) {
    const ele = document.querySelector(`[data-cell="${score}"]`);
    if (ele.getAttribute('data-player') === player) {
        // Remove the player's emoji from this cell
        ele.innerText = ele.innerText.replace(player, '');
        ele.removeAttribute('data-player');
    }
}

function resetPlayerPosition () {
    if (player1Turn && play1Score > 0) {
        setAttributeData(play1Score, player1);
    } else if (player2Turn && play2Score > 0) {
        setAttributeData(play2Score, player2);
    }
    
}

function rollDice() {
    const randomNumber = Math.trunc(Math.random() * 6 + 1);
    dice.innerText = randomNumber;
    // resetBoard
    // resetPlayerPosition();
    updateBoard()
    togglePlayers();
    playerTurn();

}

function reset(){}

function playerTurn() {
    if(player1Turn) {
        document.querySelector('.p1_name').className += ' active';
        document.querySelector('.p2_name').classList.remove('active');

    }else if(player2Turn){
        document.querySelector('.p2_name').className += ' active';
        document.querySelector('.p1_name').classList.remove('active');

    }
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
            div.setAttribute('data-cell', val);

           

            // place snake and ladder in cell
            if(snake[val]){
                div.innerText+=`🐍`;
                div.setAttribute('data-snake',val);
            }
            else if(ladder[val]){
                div.innerText+=`🪜`;
                div.setAttribute('data-ladder',val);
            }

            playerTurn();
            board.append(div);
        }

        rightToLeft = !rightToLeft;
    }
}

playButton.addEventListener('click', rollDice);

createboard();

