

let canvas = document.querySelector('canvas');
let ctx = canvas.getContext('2d');

let cellSize = 50;
let snakeCells = [[0,0]]; //2d array to  store starting point of snake
let direction = 'right';

let gameOver = false;

let foodCells = genrateFood();

let score = 0;

let id = setInterval(function(){
    update();
    draw();
 },200)

//keydown event is triggered
document.addEventListener('keydown', function(event){
    if(event.key === 'ArrowDown'){direction = 'down'}
    else if(event.key === 'ArrowUp'){direction = 'up'}
    else if(event.key === 'ArrowLeft'){direction = 'left'}
    else{direction = 'right'}

})

// function to draw snake
function draw(){

    if(gameOver)
    {
       clearInterval(id);
       ctx.fillStyle = 'red';
       ctx.font = '50px monospace'
       ctx.fillText(`Game Over: ${score}`,300,300)
       return;
    }  
    ctx.clearRect(0,0,1000,600);
    for(let cell of snakeCells){
        ctx.fillStyle = 'blue';
        ctx.fillRect(cell[0],cell[1],cellSize,cellSize);
        ctx.strokeStyle = 'orange';
        ctx.strokeRect(cell[0],cell[1],cellSize,cellSize);
    }

    // draw food
    ctx.fillStyle = 'green';
    ctx.fillRect(foodCells[0],foodCells[1],cellSize,cellSize);

    // draw score
    ctx.font = '24px monospace'
    ctx.fillText(`Score: ${score}`,20,25)

}

// function to  update snake
function update(){
    let headX = snakeCells[snakeCells.length-1][0];
    let headY = snakeCells[snakeCells.length-1][1];


    // let newHeadX = headX+cellSize;
    // let newHeadY = headY;

    let newHeadX;
    let newHeadY;

    if(direction === 'right')
    {
         newHeadX = headX+cellSize;
         newHeadY = headY;
         khagyaKhudko(newHeadX,newHeadY);
         if(newHeadX == 1000)
           gameOver = true;
    }
    else if(direction === 'up')
    {
         newHeadX = headX;
         newHeadY = headY - cellSize;
         khagyaKhudko(newHeadX,newHeadY);
         if(newHeadY <0)
           gameOver = true;
    }
    else if(direction === 'left')
    {
         newHeadX = headX - cellSize;
         newHeadY = headY;
         khagyaKhudko(newHeadX,newHeadY);
         if(newHeadX <0)
           gameOver = true;
    }
    else
    {
         newHeadX = headX;
         newHeadY = headY + cellSize;
         khagyaKhudko(newHeadX,newHeadY);
         if(newHeadY == 600)
           gameOver = true;
    }

    snakeCells.push([newHeadX,newHeadY]);
    if(newHeadX === foodCells[0] && newHeadY === foodCells[1]){
        foodCells = genrateFood();
        score+=1;
    }
    
    else
    snakeCells.shift();

}


function genrateFood(){
    return [
        Math.round((Math.random()*950)/cellSize)*cellSize ,
        Math.round((Math.random()*550)/cellSize)*cellSize 
    ];
}

function khagyaKhudko(newHeadX,newHeadY){
    for(let item of snakeCells)
    {
        if(item[0] === newHeadX && item[1] === newHeadY)
        {
            gameOver= true;
        }
    }
}
