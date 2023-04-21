/*
***************************
**                       **
**  Restart game button  **
**                       **
***************************
 */

export default class Button
{
    constructor(stage)
    {   
        this.button = new PIXI.Sprite.from("assets/images/button.png");
        this.button.anchor.set(0.04,-0.8);
        this.button.interactive = true;
        this.button.buttonMode = true;
        this.button.on('mousedown',this.refresh);

        stage.addChild(this.button);
    }

    getOnStageButton()
    {
        return this.button;
    }

    refresh()
    {
        window.location.reload();
    }
}


