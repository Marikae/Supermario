class Sky {
    private widthAmbient: number;
    private heightAmbient: number;
    private pathSky: string;
    private sky: Rectangle;
    constructor(widthAmbient: number, heightAmbient: number, heightFloor: number, pathSky: string) {
        this.widthAmbient = widthAmbient;
        this.heightAmbient = heightAmbient - heightFloor;
        this.pathSky = pathSky;
        this.generateSky();
    }
    public getHeightSky(): number {
        return this.heightAmbient;
    }
    public draw(context: CanvasRenderingContext2D): void {
        this.sky.draw(context, 1);
    }
    public generateSky() {
        this.sky = new Rectangle(this.heightAmbient, this.widthAmbient, new Pt2D(0, 0));
        this.sky.setImage(this.pathSky);
    }
    static skyFromJson(w: number, h: number, heightFloor: number, json: any): Sky {
        let path = json.skyBackground;
        let sky = new Sky(w, h, heightFloor, path);
        return sky
    }
}