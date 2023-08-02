class Explosion {
    private enemy: Rectangle;
    private indiceColumn: number = 0;
    private indiceRow: number = 0;
    private keepImage: number;
    constructor(enemy: Rectangle) {
        this.enemy = enemy;
        this.enemy.setImage("../supermario/Resources/Img/explosion.png");
        this.keepImage =20;
    }
    public draw(context: CanvasRenderingContext2D) {
        let sX = this.indiceColumn * 127;
        let sY = this.indiceRow * 125;
        if (this.keepImage == 0) {        
            if (this.indiceColumn == 3 && this.indiceRow == 3) {
                this.indiceRow = 0;
                this.indiceColumn = 0;
            } else if (this.indiceColumn == 3) {
                this.indiceColumn = 0;
                this.indiceRow++;
            } else {
                this.indiceColumn++;
            }
            if(this.keepImage==0) this.keepImage=20;
        } else {
            this.keepImage--;
        }
        context.drawImage(this.enemy.getImage(), sX, sY, 127, 125, this.enemy.getOrigin().getX(), this.enemy.getOrigin().getY(), this.enemy.getWidth(), this.enemy.getHeight());
    }
}