/*
******************************************************
**                                                  **
**  Class used for spawn box and count final score  **
**                                                  **
******************************************************
 */

export default class Box
{
    //score;
    finalScore = 0;

    constructor(width,height)
    {
        this.box = new PIXI.Sprite.from("assets/images/box2.png");
        this.box.x = width * 2 + 100;
        this.box.y = height + 100;
        // -1 because i want to add the score when the box gets 
        //out of the screen, meaning that the player jump over it and got 1 point
        this.box.score = -1;
        this.speed = 4 ;
        this.box.isMoving = true;
    }

    getBoxState()
    {
        return this.box.isMoving;
    }

    getOnStage(stage)
    {
        this.respawn(this.box);
        stage.addChild(this.box);
        //console.log(this.box.getBounds());
        //console.log(window.innerHeight);
    }

    getOutTheStage(stage)
    {
        //this.box.destroy(); - this stop everything
        stage.removeChild(this.box);
    }

    getBounds()
    {
        return this.box.getBounds();
    }

    increaseLevel()
    {
       if(this.box.score % 5   == 0)
       {
           this.speed += 0.02;
           //console.log(this.speed);
       }  
    }

    moveBox()
    {
        this.box.x -= this.speed;
        if (this.box.position.x < -this.box.width) 
        {
            this.respawn(this.box);
        }
    }

    //used to spawn boxex
    //also used to calc the score which is 
    //based on how many boxex has been spawned 

    respawn(box)
    {
        box.x = window.innerWidth;
        box.y = window.innerHeight * 0.81;
        this.box.score++;
    }

    getFinalScore()
    {
        return this.box.score;
    }

    resizeBy(width,height)
    {
        this.box.x = window.innerWidth;;
        this.box.y =  window.innerHeight * 0.77;

        const scale = height  /  this.box.texture.height * 2;
        this.box.scale.set(scale, scale );
    }
}