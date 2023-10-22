score = 0;
cross = true;//so that score doesn't increase rapidly and only increase when dino cross  dragon
// to detect the keyboard press and to make dino jump we use this logic of onekeydown

audio=new Audio('music.mp3');
audiogo=new Audio('gameover.mp3');
setTimeout(() =>{
audio.play();
},1000);

document.onkeydown = function (e) {
    console.log("key code is :", e.keyCode);

    if (e.keyCode == 38) {
        dino = document.querySelector('.dino');
        dino.classList.add('animateDino');
        setTimeout(() => {
            dino.classList.remove('animateDino')
        }, 700);
    }
    //to give some space to dino on left we will use this logic
    if (e.keyCode == 39) {
        dino = document.querySelector('.dino');
        dinoX = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'))
        dino.style.left = dinoX + 112 + "px";//dino will move forward


    }

    if (e.keyCode == 37) {
        dino = document.querySelector('.dino');
        dinoX = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'))
        dino.style.left = (dinoX - 112) + "px";//dino will move backward
    }
}

setInterval(() => {
    dino = document.querySelector('.dino');
    gameOver = document.querySelector('.gameOver');
    obstacle = document.querySelector('.obstacle');
    //to detect collsion we will take x and y value of dino and dragon , values will come in pixel so we have to parse them into an integer
    dx = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'));//gives dino computed left value
    dy = parseInt(window.getComputedStyle(dino, null).getPropertyValue('top'));//gives dino computed top value when it jumps

    ox = parseInt(window.getComputedStyle(obstacle, null).getPropertyValue('left'));//gives dragon computed left value
    oy = parseInt(window.getComputedStyle(obstacle, null).getPropertyValue('top'));//gives dragon top computed value

    //calculate 

    offsetX = Math.abs(dx - ox);
    offsetY = Math.abs(dy - oy);

    if (offsetX < 73 && offsetY < 52) {
        gameOver.innerHTML= 'Game over-please Reload to play again';
        obstacle.classList.remove('obstacleAni');
        audiogo.play();
        setTimeout(()=>{
            audiogo.pause();
        },1000)
    }
    else if (offsetX < 145 && cross) {
        score = (score + 1)*100;
        updateScore(score);
        cross = false;
        setTimeout(() => {
            cross = true;
        }, 1000);
//increases speed of the dragon animation 
        setTimeout(() => {
            aniDur = parseFloat(window.getComputedStyle(obstacle, null).getPropertyValue('animation-duration'));
            newDur = aniDur - 0.1;
            obstacle.style.animationDuration = newDur + 's';
        }, 500);


    }

}, 10);

function updateScore(score) {
    ServiceWorkerContainer.innerHTML = "your score:" + score;
}