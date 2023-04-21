/*
*********************************************************************
**                                                                 **
**  Class used for the parallax scrolig effect in the background.  **
**                                                                 **
*********************************************************************
 */

export default class Background
{
    tilingSprites

    constructor(width,height)
    { 
        this.tilingSprites = [];

        for (let i = 0; i < 9; i++) 
        {
            this.tilingSprites.push(new PIXI.TilingSprite.from(`assets/images/bg_0${i+1}.png`, width, height));
        }    
    }

getChild()
{
    return this.tilingSprites;
}

update(deltaTime)
{
    // changes 'x' tile position (parallax scrolling effect)
    for (let i = 0; i < this.tilingSprites.length; i++)
    {
        // to make the sun static
        if( i == 3)
        {
            this.tilingSprites[i].tilePosition.x -= 0 ;
        }
        else
        {
            const speed = deltaTime * this.tilingSprites[i].tileScale.x;
            this.tilingSprites[i].tilePosition.x -= (i + 1) * speed;
        }
    }
}

resizeBy(width,height)
{
    for (let i = 0; i < this.tilingSprites.length; i++) 
    {
        // change tiling sprites sizes
        this.tilingSprites[i].width = width;
        this.tilingSprites[i].height = height;

        // and scale it based on window height
        const scale = height / this.tilingSprites[i].texture.height;
        this.tilingSprites[i].tileScale.set(scale, scale);
        }
    }
}