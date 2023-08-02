class Enemies {
    private hFloor: number;
    private coins: Enemy[] = [];
    private wPlayer: number;
    private hPlayer: number;
    private heightAmbient: number;
    private widthAmbient: number;
    constructor(hFloor: number, hEnemy: number, wEnemy: number, heightAmbient: number, widthAmbient: number) {
        this.hPlayer = hEnemy;
        this.wPlayer = wEnemy;
        this.heightAmbient = heightAmbient - hFloor;
        this.widthAmbient = widthAmbient;
        this.hFloor = hFloor;
    }
    public setHFloor(hFloor: number): void {
        this.hFloor = hFloor;
    }
    public getEnemyRect(): Rectangle[] {
        let rectArray: Rectangle[] = [];
        for (let i = 0; i < this.coins.length; i++) {
            let rectEnemies = this.coins[i].getEnemyRect();
            rectArray.push(rectEnemies);
        }
        return rectArray;
    }
    public deleteEnemyesByIndex(index: number): void {
        this.coins.splice(index, 1);
    }
    public draw(context: CanvasRenderingContext2D): void {
        for (let i = 0; i < this.coins.length; i++) {
            this.coins[i].draw(context);
        }
    }
    public generateEnemys(): any {
        this.coins = [];
        for (let i = 0; i < 1; i++) {
            let minX = 400;
            let maxX = this.widthAmbient - this.wPlayer;
            let startPosX = this.getRandomEnemys(minX, maxX);
            let startPosY = this.heightAmbient-this.hPlayer;
            let enemy = new Enemy(this.wPlayer, this.hPlayer, this.heightAmbient,this.widthAmbient, startPosX, startPosY);
            this.coins.push(enemy);
        }
    }
    public getRandomEnemys(min: number, max: number): number {
        min = Math.ceil(min)
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    public executeMove(): void {
        for (let i = 0; i < this.coins.length; i++) {
            this.coins[i].executeMove();
        }
    }
    public static fromJson(json: any, hFloor: number, heightAmbient: number, widthAmbient: number): Enemies {
        let enemies = new Enemies(hFloor, 0, 0, heightAmbient, widthAmbient);
        for (let i = 0; i < json.length; i++) {
            let enemy = Enemy.fromJson(json[i], heightAmbient, widthAmbient);
            enemies.coins.push(enemy);
        }
        return enemies;
    }
}