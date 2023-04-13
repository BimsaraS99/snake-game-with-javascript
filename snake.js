const playBoard = document.querySelector(".play-area");
const scoreElement = document.querySelector('.score');
const hscoreElement = document.querySelector('.highest-score');
const gameOverElement = document.querySelector('.game-over');
const restartButton = document.querySelector('.restart-button');
gameOverElement.classList.add('hidden');

let foodX, foodY;
let snakeX = 10, snakeY = 13;
let velocityX = 0, velocityY = 0;
let score = 0;
let snakeBody = [];
const hscore = [0];
let gameOn = true;
let htmlMarkup;
let gameOverDisplay = true;


const initGame = () => {
    if (gameOn) {
        if (foodX === snakeX && foodY === snakeY) {
            changeFoodPosition();
            snakeBody.push([foodX, foodY]);
            score += 1;
            scoreElement.textContent = `Score: ${score}`;
        }
    
        for(let i = snakeBody.length - 1; i > 0; i--){
            snakeBody[i] = snakeBody[i - 1];
        }
    
        snakeBody[0] = [snakeX, snakeY]
    
        snakeX  += velocityX;
        snakeY  += velocityY;
    
        htmlMarkup = `<div class="food" style="grid-area: ${foodY} / ${foodX}"></div>`;
    
        for (let i = 0; i < snakeBody.length; i++) {
            htmlMarkup += `<div class="body" style="grid-area: ${snakeBody[i][1]} / ${snakeBody[i][0]}"></div>`;
        }
        playBoard.innerHTML = htmlMarkup;
        gameOverCheck();
    }
    else{
        gameOverElement.classList.remove('hidden');
    }
}

const changeDirection = (e) => { //getting keyboard input and chnage the direction of the snake
    if (e.key === "ArrowUp" && velocityY === 0){
        velocityX = 0;
        velocityY = -1;
    } else if (e.key ==="ArrowDown" && velocityY === 0){
        velocityX = 0;
        velocityY = 1;
    } else if (e.key === "ArrowRight" && velocityX === 0){
        velocityX = 1;
        velocityY = 0;
    } else if (e.key === "ArrowLeft" && velocityX === 0){
        velocityX = -1;
        velocityY = 0;
    }
}

const changeFoodPosition = () => {
    foodX = Math.floor(Math.random() * 30) + 1;
    foodY = Math.floor(Math.random() * 30) + 1;
}

function gameOverCheck() {
    if (snakeX > 30) {
        snakeX = 1;
      } else if (snakeY > 30) {
        snakeY = 1;
      } else if (snakeX < 1) {
        snakeX = 30;
      } else if (snakeY < 1) {
        snakeY = 30;
      } 
      
    for(let i = snakeBody.length - 1; i > 0; i--){
            if (snakeX === snakeBody[i][0] && snakeY === snakeBody[i][1]){
                velocityX = 0;
                velocityY = 0;
                gameOn = false;
                return 0;
            }
    }
}

function resetGame() {
    gameOverElement.classList.add('hidden');
    snakeX = 10, snakeY = 13;
    velocityX = 0, velocityY = 0;
    hscore.push(score);
    score = 0;
    snakeBody = [];
    gameOn = true;
    gameOverDisplay = true;
    hscoreElement.textContent = `Highest score: ${Math.max(...hscore)}`;
    scoreElement.textContent = `Score: ${score}`;

    changeFoodPosition();

}

//---------------------------------------------------------------------------------

document.addEventListener("keydown", changeDirection);
restartButton.addEventListener('click', resetGame);
changeFoodPosition();
setInterval(initGame, 100);
