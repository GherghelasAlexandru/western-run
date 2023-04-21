/*
************************************
**                                **
**  Wester run - main controller  **
**                                **
************************************
 */

import Actor from "./actor.js";
import Background from "./background.js";
import Box from "./box.js";
import Score from "./score.js"; 
import GameOver from "./gameOver.js";
import Button from "./button.js";
import Lives from "./lives.js"
import Music from "./sound.js"



const app = new PIXI.Application();
document.body.appendChild(app.view);
const stage = new PIXI.Container();
const loader = new PIXI.Loader();
let actor;
let background;
let box;
let button;
let lives;
let text;
let score;
let gameOver;
let keys = {32:false}; ;
let keysDiv;

loader
    .add('assets/images/bg_01.png')
    .add('assets/images/bg_02.png')
    .add('assets/images/bg_03.png')
    .add('assets/images/bg_04.png')
    .add('assets/images/bg_05.png')
    .add('assets/images/bg_06.png')
    .add('assets/images/bg_07.png')
    .add('assets/images/bg_08.png')
    .add('assets/images/bg_09.png')
    .add('assets/images/box.png')
    .add('assets/images/hero.png')
    .add('assets/images/hero.json')
    .add('assets/fonts/ARCADECLASSIC.ttf')
    //.add('bird', 'assets/music/music.mp3')
    .load(start);

function start()
{
    const frames = [];
    for (var i = 0; i < 10; i++)
    {
        frames.push(PIXI.Texture.from(`0${i}.png`));
    }
    
    //sound = new Music();
    actor = new Actor(frames);
    box = new Box(app.renderer.width,app.renderer.height);
    background = new Background(app.renderer.width,app.renderer.height);
    
    const array = background.getChild();
    for(let j = 0 ; j < array.length; j++)
    {
        app.stage.addChild(array[j]);
    }

    //Tried to implement music, failed, maybe a future improvement
    //sound = new Music();
    //sound.playMusic(app.stage);
    //sound.sound.play('bird');

    actor.play();
    app.stage.addChild(actor.getOnStageMf());
    box.getOnStage(app.stage);
  
    score = new Score(app.stage);
    text = new Text(app.stage);
    gameOver = new GameOver(app.stage);
    button = new Button(app.stage);
    lives = new Lives(app.stage);

    window.addEventListener('resize', resize);
    window.addEventListener('orientationchange', resize);
    window.addEventListener("keydown",keysDown,true);
    window.addEventListener("keyup",keysUp,true);

    resize();
    app.ticker.add(update); 
    keysDiv = document.querySelector("#keys");
}

function keysDown(e)
{
    keys[e.keyCode] = true;
    //console.log(e.keyCode);
}

function keysUp(e)
{
    keys[e.keyCode] = false;
    //console.log(e.keyCode);
}

function resize() 
{
    // get window size (not for all tho)
    const width = window.innerWidth;
    const height = window.innerHeight;

    app.renderer.resize(width, height);
    background.resizeBy(width,height);
    actor.resizeBy(width,height);
    score.resize();

}

// best function ever
function checkCollision(actor,obstacle)
{
    let playerRect = actor.getBounds();
    let boxRect = obstacle.getBounds();

    return playerRect.x + playerRect.width - 150 > boxRect.x &&
           playerRect.x < boxRect.x + boxRect.width - 150 &&
           playerRect.y + playerRect.height - 100 > boxRect.y &&
           playerRect.y < boxRect.y + boxRect.height - 100;
}


//you can see
function keyState()
{
    if(keys["32"] == true && actor.canJump() == true) // big problem over here
    {  
        //console.log("Flybby");
        actor.jumpBroPls();
        actor.resetJump();
    }
    else if(keys["32"] == false && actor.canJump() == false )
    {  
        //function which stops the animation during descending
        actor.freeze();
        //console.log("Coming back");
    }else 
    {
        actor.play();
        //console.log("I am on the ground");
    }
}

function theHappening(deltaTime)
{
    keyState();
    box.moveBox(deltaTime);
    button.getOnStageButton();
    score.getText();
    score.updateScore(box.getFinalScore());
    box.increaseLevel();
    actor.checkGravity();
    actor.checkLocation();
    lives.setRemainingLives()
}

function theEnd()
{
    //console.log("Hit!!");
    gameOver.getChild(app.stage);
    lives.getOutThree(app.stage);
    lives.getZero(app.stage);
    box.getOutTheStage(app.stage);
    actor.getOutBro(app.stage);
    score.getOn(app.stage);
}

function playGame(deltaTime)
{
    //sound.playMusic(app.stage);
    keyState();
    box.moveBox(deltaTime);
    button.getOnStageButton();
    score.getText();
    score.updateScore(box.getFinalScore());
    box.increaseLevel();
    actor.checkGravity();
    actor.checkLocation();
}

function update(deltaTime)
{   
    //check for keyboard input
    keysDiv.innerHTML = JSON.stringify(keys);

    lives.spawnLifes(app.stage,lives.getRemainingLives());
    background.update(deltaTime);
    //console.log(lives.getRemainingLives())

    if(checkCollision(actor,box))
    {   
        //console.log(lives.getRemainingLives());
        if(lives.getRemainingLives() == 3)
        {
            actor.afterHit()
            lives.getThree(app.stage);

            theHappening();
        }
        else if(lives.getRemainingLives() == 2)
        {
            actor.afterHit();
            lives.getOutThree(app.stage);
            lives.getTwo(app.stage);

            theHappening();
        }
        else if(lives.getRemainingLives() == 1)
        {
            lives.getOutTwo(app.stage);
            lives.getOne(app.stage);

            theHappening();
        }else
        {
            theEnd();
        }
    } else 
    {
        playGame();
    } 
}