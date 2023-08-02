class Bullet {
    private bullet: Rectangle;
    private directionMove: boolean;
    private posActual: Pt2D;
    private xMax: number;
    private wBullet: number;
    private hBullet: number;
    private heightAmbient: number;
    private bulletSoundObj: HTMLAudioElement;
    private widthAmbient: number;
    constructor(directionMove: boolean, posStart: Pt2D, xMax: number) {
        this.directionMove = directionMove;
        this.posActual = posStart.clone();
        this.wBullet = 80;
        this.hBullet = 20;
        this.bullet = new Rectangle(this.hBullet, this.wBullet,this.posActual);
        this.bulletSoundObj = new Audio("../supermario/Resources/Audio/bulletSound.mp3");
        //this.bullet.setImage("../supermario/Resources/Img/bullet.png");
    }
    public getWidthAmbient(): number {
        return this.widthAmbient;
    }
    public getX(): number {
        return this.posActual.getX();
    }
    public getBulletRect(): Rectangle {
        return this.bullet;
    }
    public move(): void {
        if (this.directionMove == true) {
            this.moveRight();
        } else if (this.directionMove == false) {
            this.moveLeft();
        }
    }
    private moveRight(): void {
        let delta: Pt2D = new Pt2D(20, 0);
        this.bullet.moveDelta(delta);
        this.posActual = this.bullet.getOrigin();
        this.bullet = new Rectangle(this.hBullet, this.wBullet, this.posActual);
        this.bullet.setImage("../supermario/Resources/Img/bullet.png");
        this.bulletSound();
    }
    private moveLeft(): void {
        let delta: Pt2D = new Pt2D(-20, 0);
        this.bullet.moveDelta(delta);
        this.posActual = this.bullet.getOrigin();
        this.bullet = new Rectangle(this.hBullet, this.wBullet, this.posActual);
        this.bullet.setImage("../supermario/Resources/Img/leftBullet.png");
        this.bulletSound();
    }
    public draw(context: CanvasRenderingContext2D): void {
        this.bullet.draw(context, 1);
    }
    public bulletSound(): void {
        this.bulletSoundObj.play();
    }
    public isOut(): boolean {
        let out: boolean = false;
        if (this.posActual.getX() < 0 || this.posActual.getX() > this.getWidthAmbient()) {
            out = true;
        }
        return out;
    }
}