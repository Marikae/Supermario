class CoinsManager {
    private wAmbient: number;
    private hAmbient: number;
    private coins: Coin[] = [];
    private wCoin: number;
    private hCoin: number;
    private wFloor: number;
    private hFloor: number;
    private keepImage: number;
    private coinSoundObj: HTMLAudioElement;
    constructor(wAmbient: number, hAmbient: number, wFloor: number, hFloor: number, wCoin: number, hCoin: number) {
        this.wAmbient = wAmbient;
        this.hAmbient = hAmbient;
        this.wFloor = wFloor;
        this.hFloor = hFloor;
        this.wCoin = wCoin;
        this.hCoin = hCoin;
        this.keepImage =20;
        this.generateCoin();
        this.coinSoundObj = new Audio("../supermario/Resources/Audio/coinSound.mp3");
    }

    public draw(context: CanvasRenderingContext2D) {
        for (let i = 0; i < this.coins.length; i++) {
            this.coins[i].draw(context);
        }
    }
    public generateCoin(): any {
        for (let i = 0; i < 50; i++) {
            let minX = 0;
            let maxX = this.wAmbient - this.wCoin - this.wFloor;
            let minY = 0;
            let maxY = this.hAmbient - this.hCoin - this.hFloor;
            let originX = this.getRandomCoin(minX, maxX);
            let originY = this.getRandomCoin(minY, maxY);
            let step: number = 45;
            let y = (originY % step);
            let coin: Coin = new Coin(this.wAmbient,this.hAmbient, this.wFloor,this.hFloor,this.wCoin,this.hCoin, originX, originY);
            coin.setCoinImage("../supermario/Resources/Img/flipCoin.png");
            this.coins.push(coin);
        }
    }
    public deletCoinByIndex(index: number): void {
        this.coins.splice(index, 1);
    }
    public coinSound(){
        let clonedAudio = this.coinSoundObj.cloneNode() as HTMLAudioElement;
        clonedAudio.play();
    }
 public getCoinsRect(): Rectangle[] {
        let coinsRects: Rectangle[] = [];
        for (let i = 0; i < this.coins.length; i++) {
            let coin = this.coins[i].getCoinRect();
            coinsRects.push(coin);
        }
        return coinsRects;
    }
    public getRandomCoin(min: number, max: number): number {
        min = Math.ceil(min)
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    public static fromJson(json: any,wFloor:number, hFloor: number, heightAmbient: number, widthAmbient: number,wCoin:number,hCoin:number): CoinsManager {
        let coins = new CoinsManager(widthAmbient,heightAmbient,wFloor,hFloor,wCoin,hCoin);
        for (let i = 0; i < json.length; i++) {
            let coin = Coin.fromJson(json[i],widthAmbient,heightAmbient,wFloor,hFloor,wCoin,hCoin);
            coins.coins.push(coin);
        }
        return coins;
    }
}