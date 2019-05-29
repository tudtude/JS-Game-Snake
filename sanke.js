let display, displayContext, food, gameInterval, snake
let scale = 10
let score = 0

// Setup display
display = document.getElementById('display')
display.width = 300
display.height = 300
displayContext = display.getContext('2d')

// Recive input from keyboard
document.addEventListener('keydown', updateDirection )

// Setup snake object
snake = {
    x: 50,
    y: 50,
    show : snakeShow,
    direction: null,
    update: snakeUpdate,
    body : [
        { x: 50, y: 50 }
    ]
}

// Setup food object
food = {
    location: foodPosition(),
    show : foodShow
}

function draw(){
    if( checkGameOver() ) {
        return false
    }
    

    // fill background
    displayContext.fillStyle = 'gray'
    displayContext.fillRect( 0, 0, 300, 300 )

    //draw Snake && Food
    food.show()
    snake.show()
    snake.update()
}

draw()
gameInterval = setInterval( draw, 100 )

function snakeShow(){
    displayContext.fillStyle = 'darkred'
    for( let i = 0; i < snake.body.length; i ++ ){
        displayContext.fillRect( snake.body[i].x, snake.body[i].y, scale, scale )
    }
}

function updateDirection( event ){
    if( event.keyCode == 38 && snake.direction != 'down' ){
        snake.direction = 'up'
    } else if( event.keyCode == 40 && snake.direction != 'up' ){
        snake.direction = 'down'
    } else if( event.keyCode == 37 && snake.direction != 'right' ){
        snake.direction = 'left'
    } else if( event.keyCode == 39 && snake.direction != 'left' ){
        snake.direction = 'right'
    }
}

function snakeUpdate(){
    if( snake.direction == 'up' ){
        snake.y = snake.y - scale
    } else if( snake.direction == 'down'){
        snake.y = snake.y + scale
    } else if( snake.direction == 'left'){
        snake.x = snake.x - scale
    } else if( snake.direction == 'right'){
        snake.x = snake.x + scale
    }

    if( snake.x == food.location.x && snake.y == food.location.y ){
        food.location = foodPosition()
        updateScore()
    } else {
        snake.body.pop()
    }
    snake.body.unshift({ x: snake.x, y: snake.y })
}

function checkGameOver(){
    if( snake.body[0].x < 0 ||
        snake.body[0].x > display.width - scale ||
        snake.body[0].y < 0 ||
        snake.body[0].y > display.height - scale ){
        return true
    } else {
        return false
    }
}

function foodPosition(){
    return {
        x : Math.floor( Math.random() * display.width/scale ) * 10,
        y : Math.floor( Math.random() * display.width/scale ) * 10
    }
}

function foodShow(){
    displayContext.fillStyle = 'red'
    displayContext.fillRect( food.location.x, food.location.y, scale, scale )
}

function updateScore(){
    score ++
    document.getElementById('score').innerHTML = 'Your score ' + score
}

function reStartGame(){
    snake.x = 50
    snake.y = 50
    snake.body = [
        { x: 50, y: 50 }
    ]
    snake.direction = null
    score = -1
    updateScore()
}