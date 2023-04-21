/*
***************************************
**                                   **
**  Class used for Game over message **
**                                   **
***************************************
 */

export default class GameOver
{
    constructor()
    {
        this.style = new PIXI.TextStyle(
            {
                fill: [
                    "#1b3bda",
                    "#79bde6"
                ], 
                fontFamily: "ARCADECLASSIC",
                fontSize: 300,
                fontWeight: "bolder",
                lineJoin: "round",
                strokeThickness: 20
            });

        this.gameOver = new PIXI.Text("GAME OVER", this.style);
        this.gameOverScore = new PIXI.Text(this.finalScore, this.style);

        this.gameOver.x = window.innerWidth /4 - 250;
        this.gameOver.y = window.innerHeight /4 + 100;
    }

    score()
    {
        this.finalScore = box.getFinalScore();
    }

    getChild(stage)
    {
        stage.addChild(this.gameOver);
    }
 
    getState()
    {
        return this.gameOver;
    }
/*
    resize()
    {
        //this.gameOver.x = window.innerWidth /2 + 100 ;
        //this.gameOver.y = window.innerHeight /4;
    }
*/
}