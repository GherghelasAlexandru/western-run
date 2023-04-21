/*
*******************************************************
**                                                   **
**  Used to display the current score and highscore  **
**                                                   **
*******************************************************
 */

export default class Score
{
    constructor(stage)
    {
        this.style = new PIXI.TextStyle(
            {
                fill: [
                    "#1b3bda",
                    "#79bde6"
                ],
                align: "center",  
                fontFamily: "ARCADECLASSIC",
                fontSize: 60,
                fontWeight: "bolder",
                lineJoin: "round",
                strokeThickness: 6
            }
        );
        this.score = new PIXI.Text(this.score, this.style);
        this.text = new PIXI.Text("YOUR SCORE", this.style);
        this.high = new PIXI.Text("HIGH SCORE", this.style);
        this.highScore = new PIXI.Text("34562", this.style);

        stage.addChild(this.text);
        stage.addChild(this.score); 
    }

    getOn(stage)
    {
        stage.addChild(this.high);
        stage.addChild(this.highScore);
    }

    updateScore(box)
    {
        this.score.text = box; 
    }

    getText()
    {
        return this.text;
    }

    resize()
    { 
        this.score.x = window.innerWidth * 0.85 + 50 ;
        this.score.y = window.innerHeight * 0.1 + 20;

        this.text.x = window.innerWidth * 0.74 + 100;
        this.text.y = window.innerHeight * 0.1 - 50;

        this.high.x = window.innerWidth * 0.24 + 100;
        this.high.y = window.innerHeight * 0.1 - 50;

        this.highScore.x = window.innerWidth * 0.24 + 170;
        this.highScore.y = window.innerHeight * 0.1 + 20;
    }
}