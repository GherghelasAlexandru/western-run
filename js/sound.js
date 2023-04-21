/*
**************************************
**                                  **
**  Sound - work in progress......  **
**                                  **
**************************************
 */

export default class Music
{ 
    constructor()
    {
        this.sound = PIXI.sound.playMusic (
        {
            name : 'bird',
            url: 'assets/music/music.mp3' 
        });
    }

    playMusic(stage)
    {
        stage.addChild(this.sound);
        this.sound.play();
    }

    getSound()
    {
        return this.sound;
    }
}