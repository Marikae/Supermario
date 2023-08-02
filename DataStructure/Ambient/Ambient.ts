class Ambient {
    private floor: Floor;
    private sky: Sky;
    private randomAmbient: RandomAmbient;
    private heightAmbient: number;
    private widthAmbient: number;
    constructor(heightAmbient: number, weightAmbient: number, floorPath: string, skyPath: string, blocksPath: string) {
        this.heightAmbient = heightAmbient;
        this.widthAmbient = weightAmbient;
        this.floor = new Floor(this.widthAmbient, this.heightAmbient, floorPath, 45, 45);
        this.sky = new Sky(this.widthAmbient, this.heightAmbient, this.floor.getWTiles(), skyPath);
        this.randomAmbient = new RandomAmbient(this.widthAmbient, this.heightAmbient, this.floor.getWTiles(), this.floor.getHTiles(), blocksPath);
    }
    public getHeightAmbient() {
        return this.heightAmbient;
    }
    public getwidthAmbient() {
        return this.widthAmbient;
    }

    public getHFloorTiles() {
        return this.floor.getHTiles();
    }
    public getWidthFloorTiles() {
        return this.floor.getWTiles();
    }
    public getRandomAmbient() {
        return this.randomAmbient;
    }
    public setSky(sky: Sky): void {
        this.sky = sky;
    }
    public setFloor(floor: Floor): void {
        this.floor = floor;
    }
    public setRandomAmbient(randomAmbient: RandomAmbient): void {
        this.randomAmbient = randomAmbient;
    }

    public draw(context: CanvasRenderingContext2D): void {
        this.floor.draw(context);
        this.sky.draw(context);
        this.randomAmbient.draw(context);
    }
    public static fromJson(h: number, w: number, json: any): Ambient {
        let floor = Floor.floorFromJson(h, w, json.floor);
        let heightFloor = floor.getHTiles();
        let sky = Sky.skyFromJson(w, h, heightFloor, json.sky);
        let randomAmbient = RandomAmbient.randomAmbientFromJson(w, h, floor.getWTiles(),floor.getHTiles(), json.obstacles);
        let ambient = new Ambient(h, w, "", "", "");
        ambient.setSky(sky);
        ambient.setFloor(floor);
        ambient.setRandomAmbient(randomAmbient);
        return ambient;
    }
}