class Coin {
    private wAmbient: number;
    private hAmbient: number;
    private wCoin: number;
    private hCoin: number;
    private wFloor: number;
    private hFloor: number;
    private coinRect: Rectangle;
    private img: HTMLImageElement;
    private keepImage: number;
    private indiceColumn: number;
    constructor(wAmbient: number, hAmbient: number, wFloor: number, hFloor: number, wCoin: number, hCoin: number, xCoin: number, yCoin: number) {
        this.keepImage = 0;
        this.indiceColumn = 0;
        this.coinRect = new Rectangle(hCoin, wCoin, new Pt2D(xCoin, yCoin));
        this.wAmbient = wAmbient;
        this.hAmbient = hAmbient;
        this.wFloor = wFloor;
        this.hFloor = hFloor;
        this.wCoin = wCoin;
        this.hCoin = hCoin;
    }
    public draw(context: CanvasRenderingContext2D) {
        let sX = this.indiceColumn * 57;
        if (this.keepImage == 0) {        
            if (this.indiceColumn == 5) {
                this.indiceColumn = 0;
            } else {
                this.indiceColumn++;
            }
            this.keepImage = 20;
        } else {
            this.keepImage--;
        }
        context.drawImage(this.coinRect.getImage(), sX, 0, 57, 57, this.coinRect.getOrigin().getX(), this.coinRect.getOrigin().getY(), this.coinRect.getWidth(), this.coinRect.getHeight());
    }
    public getCoinRect() {
        return this.coinRect;
    }
    public setCoinImage(path: string): void {
        this.coinRect.setImage(path);
    }
    public static fromJson(json: any,wAmbient: number, hAmbient: number, wFloor: number, hFloor: number,wCoin: number, hCoin:number): Coin {
        let coin: Coin= new Coin(wAmbient,hAmbient,wFloor,hFloor,wCoin,hAmbient,json.x,json.y); 
        return coin;
    }
}