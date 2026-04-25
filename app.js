let gameSeq=[];
let userSeq=[];
let btns=["yellow" , "red", "purple", "green"];

let started = false;
let level=0;
let highScore = 0;

let h2=document.querySelector("h2");
let highScoreDisplay = document.querySelector(".high-score");

document.addEventListener("keydown", function() {
    if(started == false) {
        console.log("game is started");
        started = true;
        levelUp(); 
    }
});

function gameFlash(btn){
    btn.classList.add("flash");
    let color = btn.getAttribute("class").split(" ")[1];
    
    let audio = new Audio("forpc.wav");
    audio.play();
    
    setTimeout(function(){
        btn.classList.remove("flash");
    }, 250);
}

function userFlash(btn){
    btn.classList.add("userflash");
    setTimeout(function(){
        btn.classList.remove("userflash");
    }, 250);
}

function levelUp() {
    userSeq= [];
    level++;
    h2.innerText = `Level ${level}`;

    let randIdx = Math.floor(Math.random() * 4);
    let randColor = btns[randIdx];
    let randBtn = document.querySelector(`.${randColor}`);
    gameSeq.push(randColor);
    console.log(gameSeq);
    gameFlash(randBtn);
}

function checkAns(idx){
    if(userSeq[idx] === gameSeq[idx]){
        if(userSeq.length === gameSeq.length){
            setTimeout(levelUp, 1000);
        }
    } else {
        if(level > highScore){
            highScore = level;
            highScoreDisplay.innerText = `Highest Score: ${highScore}`;
        }
        
        let audio = new Audio("afterloose.wav");
        audio.play();
        
        h2.innerHTML = `Game Over, Your score was <b>${level}</b><br>Press any key to Restart`;
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(function(){
            document.querySelector("body").style.backgroundColor = "white";
        }, 150);
        reset();
    }
}

function btnPress(){
  
  let btn = this;
  userFlash(btn);

  let color = btn.getAttribute("class").split(" ")[1];
  let audio = new Audio("audio.wav");
  audio.play();
  
  userSeq.push(color);
  console.log(userSeq);
  checkAns(userSeq.length - 1);
}

let allBtns = document.querySelectorAll(".btn");
for(let btn of allBtns){
    btn.addEventListener("click", btnPress);
}

function reset(){
    started = false;
    gameSeq = [];
    userSeq = [];
    level= 0;
}