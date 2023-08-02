class ScoreManager {
    private wAmbient: number;
    private hAmbient: number;
    private actualScore: number;
    constructor(wAmbient: number, hAmbient: number) {
        this.wAmbient = wAmbient;
        this.hAmbient = hAmbient;
        this.actualScore = 0;        
    }
    public deleteEnemies(): void {
        this.actualScore += 100;
    }
    public takeCoin():void{
    this.actualScore+=200;
    }
    public draw(context: CanvasRenderingContext2D) {
        let fontSize = 22;
        context.font = fontSize + "px Courier New";
        context.fillText(this.actualScore.toString(), this.wAmbient-100, fontSize);
    }
}