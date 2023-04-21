/*
*****************************************
**                                     **
**  Class for lives with switch cases  **
**                                     **
*****************************************
 */

export default class Lives
{
    constructor()
    {
        this.ZeroHeart = new PIXI.Sprite.from("assets/images/heart00.png");
        this.OneHeart = new PIXI.Sprite.from("assets/images/heart11.png");
        this.TwoHearts = new PIXI.Sprite.from("assets/images/heart22.png");
        this.ThreeHearts = new PIXI.Sprite.from("assets/images/heart33.png");
        this.nrLives = 3;
    }

    setRemainingLives()
    {
        this.nrLives -= 1;
    }

    getRemainingLives()
    {
        return this.nrLives;
    }
    
    getZero(stage)
    {
        stage.addChild(this.ZeroHeart);
    }

    getOne(stage)
    {   
        stage.addChild(this.OneHeart);
    }

    getTwo(stage)
    {
        stage.addChild(this.TwoHearts);
    }

    getThree(stage)
    {
        stage.addChild(this.ThreeHearts);
    }

    getOutThree(stage)
    {
        stage.removeChild(this.ThreeHearts);
    }

    getOutTwo(stage)
    {
        stage.removeChild(this.TwoHearts);
    }

    getOutOne(stage)
    {
        stage.removeChild(this.OneHeart);
    }

    spawnLifes(stage,nrLives)
    {
        switch(nrLives)
        {
            case 0:
                stage.removeChild(this.OneHeart);
                stage.addChild(this.ZeroHeart);
                break;
            case 1:
                stage.removeChild(this.TwoHearts);
                stage.addChild(this.OneHeart);
                break;
            case 2:
                stage.removeChild(this.ThreeHearts);
                stage.addChild(this.TwoHearts);
                break;
            default:
                stage.addChild(this.ThreeHearts);
        }
    }
}

