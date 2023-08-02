class Floor {
    private widthAmbient: number;
    private heightAmbient: number;
    private wFTiles: number;
    private hFTiles: number;
    private pathFloor: string;
    private floorTiles: Rectangle[] = [];
    constructor(widthAmbient: number, heightAmbient: number,pathFloor: string, widthFloor: number, heightFloor: number ) {
        this.widthAmbient = widthAmbient;
        this.heightAmbient = heightAmbient;
        this.wFTiles = widthFloor;
        this.hFTiles = heightFloor;
        this.pathFloor = pathFloor;
        this.generateFloor();
    }
    public getHTiles() {
        return this.hFTiles;
    }
    public getWTiles() {
        return this.wFTiles;
    }
    public draw(context: CanvasRenderingContext2D) {
        for (let i = 0; i < this.floorTiles.length; i++) {
            this.floorTiles[i].draw(context, i);
        }
    }
    public generateFloor() {
        let totFT: number = this.widthAmbient / this.wFTiles;
        for (let i = 0; i < totFT; i++) {
            let originX = i * this.wFTiles;
            let originY = this.heightAmbient - this.hFTiles;
            let rectFT: Rectangle = new Rectangle(this.hFTiles, this.wFTiles, new Pt2D(originX, originY));
            rectFT.setImage(this.pathFloor);
            this.floorTiles.push(rectFT);
        }
    }
    static floorFromJson(h: number, w: number, json: any): Floor {
        let floor = new Floor(w, h, json.floorBackground, MyMath.compare01(json.floorTiles.w, w), MyMath.compare01(json.floorTiles.h, h));
        return floor;
    }
}