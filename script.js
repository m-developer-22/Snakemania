// Variables and constants

let direction = {x:0, y:0};

const foodSound =new Audio('food.mp3');
const gameOverSound =new Audio('gameover.mp3');
const moveSound =new Audio('move.mp3');
const musicSound =new Audio('music.mp3');
let speed=10;
let score=0;

let a = 2;
let b = 16;

let lastPaintTime=0;
let snakeArr=[{x:13, y:15}]
food={x:6, y:7};



// Game functions 

function main(ctime){
    window.requestAnimationFrame(main);
    if((ctime - lastPaintTime)/1000 < 1/speed)
    {
        return;
    }
    lastPaintTime= ctime;
    gameEngine();
}



function isCollide(snake) {
    // If you hit in body
    for (let i = 1; i < snakeArr.length; i++) {
        if(snake[i].x === snake[0].x && snake[i].y === snake[0].y){
            return true;
        }
    }
    // If you hit in wall
    if(snake[0].x >= 18 || snake[0].x <=0 || snake[0].y >= 18 || snake[0].y <=0){
        return true;
    }
        
    return false;
}



function gameEngine(){
    //Updating the snake array and food
    if(isCollide(snakeArr)){
        gameOverSound.play();
        musicSound.pause();
        direction={x:0, y:0};
        alert("Game over, press any key to restart");
        snakeArr=[{x:13, y:15}];
        musicSound.play();
        score=0;
    }

    // Moving the snake
    for (let i = snakeArr.length - 2; i>=0; i--) { 
        snakeArr[i+1] = {...snakeArr[i]};
    }

    snakeArr[0].x += direction.x;
    snakeArr[0].y += direction.y;



    //  If snake have eaten the food
    if(snakeArr[0].y===food.y && snakeArr[0].x===food.x){
        score += 1;
        if(score>hiscoreval){
            hiscoreval = score;
            localStorage.setItem("highScore", JSON.stringify(hiscoreval));
            hiscoreBox.innerHTML = "High Score: " + hiscoreval;
        }
        scoreBox.innerHTML = "Score: " + score;
        snakeArr.unshift({x: snakeArr[0].x + direction.x, y: snakeArr[0].y + direction.y});
        food = {x: Math.round(a + (b-a)* Math.random()), y: Math.round(a + (b-a)* Math.random())}
        foodSound.play();
    }


    // Display the snake
    board.innerHTML="";
    snakeArr.forEach((elem, index)=>{
        snakeElem=document.createElement('div');
        snakeElem.style.gridRowStart=elem.y;
        snakeElem.style.gridColumnStart=elem.x;
        // snakeElem.classList.add('food');
        if(index === 0){
            snakeElem.classList.add('head');
        }
        else{
            snakeElem.classList.add('snake');
        }
        board.appendChild(snakeElem);
    });

    // Display the food
    foodElem=document.createElement('div');
    foodElem.style.gridRowStart=food.y;
    foodElem.style.gridColumnStart=food.x;
    foodElem.classList.add('food');
    board.appendChild(foodElem);
}





// Main Logic
let highScore = localStorage.getItem("highScore");
if(highScore === null){
    hiscoreval = 0;
    localStorage.setItem("highScore", JSON.stringify(hiscoreval))
}
else{
    hiscoreval = JSON.parse(highScore);
    hiscoreBox.innerHTML = "High Score: " + highScore;
}
window.requestAnimationFrame(main);
window.addEventListener('keydown',e =>{
    musicSound.play();
    direction = {x:0, y:1}//Game start
    moveSound.play();
    switch(e.key)
    {
        case "ArrowUp":
            // console.log("Upper arrow")
            direction.x = 0;
            direction.y = -1;
            break;

        case "ArrowDown":
            // console.log("Down arrow")
            direction.x = 0;
            direction.y = 1;
            break;  

        case "ArrowLeft":
            // console.log("Left arrow")
            direction.x = -1;
            direction.y = 0;
            break;   

        case "ArrowRight":
            // console.log("Right arrow")
            direction.x = 1;
            direction.y = 0;
            break;

        default:
            break;
    }
})