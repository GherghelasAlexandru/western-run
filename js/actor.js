/*
*************************************
**                                 **
**  Class used for our character.  **
**                                 **
*************************************
 */

export default class Actor
{
    inititalPoz;

    constructor(frames)
    {
        this.actor = new PIXI.AnimatedSprite(frames);
        this.actor.position.x = window.innerWidth * 0.01; 
        this.actor.position.y = window.innerHeight * 0.47; 

        this.actor.inititalPoz = this.actor.position.y;
        this.actor.inititalLoc = this.actor.position.x;
 
        this.actor.animationSpeed = 0.15;
        this.actor.canJump = true;

        // Delay between jumps in milliseconds
        this.jumpDelay = 1100;  

        this.gravity = 10;
        this.actor.speed = 0.2;
       
        this.actor.x_velocity = 0;
        this.actor.y_velocity = 0;
    }

    getBounds()
    {
        return this.actor.getBounds();
    }

    getStatus()
    {
        return this.actor.isJumping;
    }

    play()
    {
       this.actor.play();
    }

    freeze()
    {
        this.actor.stop();
    }

    getOutBro(stage)
    {
        stage.removeChild(this.actor);
    }

    getOnStageMf()
    {
        return this.actor;
    }

    getSpeed()
    {
        return this.actor.speed;
    }

    canJump()
    {
        return this.actor.canJump;
    }
    
    jumpBroPls()
    {   
        // bassicaly i am changeing the position to a different one upfront 
        this.actor.animationSpeed = 0.15;
        this.actor.position.set(this.actor.x + 400,this.actor.y - 600);
    }

    afterHit()
    {
        // same principe as jump but with different location
        this.actor.position.set(this.actor.x + 50, this.actor.y - 600);
        this.mathScore();
    }

    // when you hit a box score - 1
    mathScore()
    {
        this.actor.score = this.actor.score - 1;
    }

    flyingBack()
    {
        this.animationSpeed = 0.4;
    }

    resetJump()
    {
        this.actor.canJump = false;
        
        setTimeout(() => this.actor.canJump = true, this.jumpDelay);
    }

    checkGravity()
    {
        if(this.actor.y >=this.actor.inititalPoz)
        {
            this.gravity = 0;
        }
        else
        {
            //this.actor.animationSpeed = 0.15;
            this.gravity = 10 ;
            this.actor.y += this.gravity;
        }
    }

    checkLocation()
    {   
        //console.log(this.actor.x);
        if(this.actor.x > window.innerWidth * 0.01 - 75 )
            //this.actor.x < window.innerWidth * 0.5 - 200)
        {
            this.x_velocity = 6;
            this.actor.x -= this.x_velocity;
        }
        else if(this.actor.x > window.innerWidth * 0.5 - 100)
            {
                for(this.x_velocity = 2; this.x_velocity<=4; this.x_velocity++ )
                {
                    this.actor.x -= this.x_velocity;
                }
            }
        else
        {
            this.x_velocity = 0  ;
            this.actor.x -= this.x_velocity;
        }
    }

    resizeBy(width,height)
    {
        this.actor.x = width * 0.01 - 75;
        this.actor.y = height * 0.34;

        const scale = (height * 0.55 ) / this.actor.texture.height;
        this.actor.scale.set(scale, scale);
    }
    
/*

    jumpBro()
    {   this.actor.isJumping = true; 
        this.actor.animationSpeed = 0.02;
       // this.actor.setX += 30;
        this.actor.position.set(this.actor.x,this.actor.y - 50);
        this.actor.y += this.gravity;

        //this.freeze();
        //this.actor.position.y = this.actor.position.y - 350;
        //this.actor.vy -= 20;
        //this.actor.position.y -= this.actor.vy;
        //this.actor.accelerationY = -this.actor.speed;
    }

    jumpA()
    {
        this.actor.y = this.actor.y - 10;
        console.log(this.actor.y);
    }

    comeBackBro()
    {
        this.actor.animationSpeed = 0.15;
        this.actor.position.y = this.actor.position.y - 350;
        this.actor.isJumping = false;
    }

    normalPoz()
    {
        return this.inititalPoz;
    }

    checkBottom()
    {
       if(this.actor.y > window.innerHeight * 0.34)
       {
           this.actor.y = window.innerHeight * 0.34;
           this.gravity = 0;
       }
       this.actor.isJumping = false;
    }
/*
    resizeBy(width,height)
    {
        this.actor.x = width * 0.01 - 75;
        this.actor.y = height * 0.34;
        const scale = (height * 0.7) / this.actor.texture.height;
        this.actor.scale.set(scale, scale);
    }
*/
    
}