class Mario extends Player {
    private bullets: Bullet[];
    private startPosY: number;
    private jumpAudioObj: HTMLAudioElement;
    constructor(wPlayer: number, hPlayer: number, heightAmbient: number, widthAmbient: number, hfloor: number, startPosY: number) {
        super(wPlayer, hPlayer, heightAmbient, widthAmbient, hfloor, startPosY);
        this.startPosY = startPosY;
        this.bullets = [];
        this.jumpAudioObj = new Audio("../supermario/Resources/Audio/jump.mp3");
        this.generatePlayer();
    }
    public getMarioRect(): Rectangle {
        return this.playerRect;
    }
    public getMarioPosActual(): Pt2D {
        return this.posActual;
    }
    public getStartPosY(): number {
        return this.startPosY;
    }
    public setMarioPosActual(newPosAcual: Pt2D): void {
        this.posActual = newPosAcual;
        this.playerRect.moveOnPoint(this.posActual.clone());
    }
    public getMarioW(): number {
        return this.wPlayer;
    }
    public getMarioH(): number {
        return this.hPlayer;
    }
    public getBullets(): Rectangle[] {
        let rectBullets: Rectangle[] = [];
        for (let i = 0; i < this.bullets.length; i++) {
            rectBullets.push(this.bullets[i].getBulletRect());
        }
        return rectBullets;
    }
    public draw(context: CanvasRenderingContext2D): void {
        super.draw(context);
        for (let i = 0; i < this.bullets.length; i++) {
            this.bullets[i].draw(context);
        }
    }
    public deleteBulletsByIndex(index: number): void {
        this.bullets.splice(index, 1);
    }
    public executeMove(blockRectangles: Rectangle[]): void {
        let deleteBullets: Bullet[] = [];
        for (let i = 0; i < this.bullets.length; i++) {
            this.bullets[i].move();
            if (this.bullets[i].isOut()) {
                deleteBullets.push(this.bullets[i]);
            }
        }
        for (let i = 0; i < deleteBullets.length; i++) {
            let index = this.bullets.indexOf(deleteBullets[i])
            this.bullets.splice(index, 1);
        }
        if (this.pressedSpace == true && this.pressedRight == true) {
            this.moveJumpRight(blockRectangles);
        } else if (this.pressedSpace == true && this.pressedLeft == true) {
            this.moveJumpLeft(blockRectangles);
        } else if (this.pressedSpace == true) {
            this.moveJumpUp(blockRectangles);
        } else if (this.pressedLeft == true) {
            this.moveLeft(blockRectangles);
        } else if (this.pressedRight == true) {
            this.moveRight(blockRectangles);
        } else {
            if (this.posActual.getY() < this.posStart.getY())
                this.moveDown(blockRectangles);
        }
    }
    public moveRight(blockRectangles: Rectangle[]) {
        let delta: Pt2D = new Pt2D(10, 0);
        let clonedRect = this.playerRect.clone();
        let dx: number = delta.getX();
        let willCollide = true;
        for (let i = dx; i >= 0 && willCollide; i--) {
            dx = i;
            willCollide = this.willCollide(clonedRect.clone(), new Pt2D(dx, 0), blockRectangles);
        }
        delta = new Pt2D(dx, 0);
        this.playerRect.moveDelta(delta);
        this.posActual = this.playerRect.getOrigin();
        this.playerRect.setImage(this.getPathRightImg());
        this.actualMoveType = Moves.Right;
        this.moveDown(blockRectangles);
        this.lastPressedLeft = false;
    }
    public moveLeft(blockRectangles: Rectangle[]) {
        let delta: Pt2D = new Pt2D(-10, 0);
        let clonedRect = this.playerRect.clone();
        let dx: number = delta.getX();
        let dy: number = delta.getY();
        let willCollide = true;
        for (let i = dx; i <= 0 && willCollide; i++) {
            dx = i;
            willCollide = this.willCollide(clonedRect.clone(), new Pt2D(dx, dy), blockRectangles);
        }
        delta = new Pt2D(dx, dy);
        if (true) {
            this.playerRect.moveDelta(delta);
            this.posActual = this.playerRect.getOrigin();
            this.playerRect.setImage(this.getPathLeftImg());
            this.actualMoveType = Moves.Left;
            this.moveDown(blockRectangles);
            this.lastPressedLeft = true;
        }
    }
    public moveJumpLeft(blockRectangles: Rectangle[]) {
        let delta: Pt2D = new Pt2D(-10, -10);
        let clonedRect = this.playerRect.clone();
        let dx: number = delta.getX();
        let dy: number = delta.getY();
        let willCollide = true;
        for (let i = dx; i <= 0 && willCollide; i++) {
            dx = i;
            willCollide = this.willCollide(clonedRect.clone(), new Pt2D(dx, 0), blockRectangles);
        }
        delta = new Pt2D(dx, 0);
        this.playerRect.moveDelta(delta);
        this.posActual = this.playerRect.getOrigin();
        this.playerRect.setImage(this.getPathJumpLeftImg());
        this.actualMoveType = Moves.JumpLeft;
        this.lastPressedLeft = true;
        willCollide = true;
        for (let i = dy; i <= 0 && willCollide; i++) {
            dy = i;
            willCollide = this.willCollide(clonedRect.clone(), new Pt2D(0, dy), blockRectangles);
        }
        delta = new Pt2D(0, dy);
        this.playerRect.moveDelta(delta);
        this.posActual = this.playerRect.getOrigin();
        this.playerRect.setImage(this.getPathJumpLeftImg());
        this.actualMoveType = Moves.JumpLeft;
        this.lastPressedLeft = true;
        this.jumpAudio(); 
    }
    public moveJumpRight(blockRectangles: Rectangle[]) {
        let delta: Pt2D = new Pt2D(10, -10);
        let clonedRect = this.playerRect.clone();
        let dx: number = delta.getX();
        let dy: number = delta.getY();
        let willCollide = true;
        for (let i = dx; i >= 0 && willCollide; i--) {
            dx = i;
            willCollide = this.willCollide(clonedRect.clone(), new Pt2D(dx, 0), blockRectangles);
        }
        delta = new Pt2D(dx, 0);
        this.playerRect.moveDelta(delta);
        this.posActual = this.playerRect.getOrigin();
        this.playerRect.setImage(this.getPathJumpRightImg());
        this.actualMoveType = Moves.JumpRight;
        willCollide = true;
        for (let i = dy; i <= 0 && willCollide; i++) {
            dy = i;
            willCollide = this.willCollide(clonedRect.clone(), new Pt2D(0, dy), blockRectangles);
        }
        delta = new Pt2D(0, dy);
        this.playerRect.moveDelta(delta);
        this.posActual = this.playerRect.getOrigin();
        this.playerRect.setImage(this.getPathJumpRightImg());
        this.actualMoveType = Moves.JumpRight;
        this.lastPressedLeft = false;
        this.jumpAudio();
    }
    public moveJumpUp(blockRectangles: Rectangle[]) {
        let delta: Pt2D = new Pt2D(0, -30);
        let clonedRect = this.playerRect.clone();
        let dy: number = delta.getY();
        let willCollide = true;
        for (let i = dy; i <= 0 && willCollide; i++) {
            dy = i;
            willCollide = this.willCollide(clonedRect.clone(), new Pt2D(0, dy), blockRectangles);
        }
        delta = new Pt2D(0, dy);
        this.playerRect.moveDelta(delta);
        this.posActual = this.playerRect.getOrigin();
        if (this.lastPressedLeft == true)
            this.playerRect.setImage(this.getPathJumpLeftImg());
        else if (this.lastPressedLeft == false)
            this.playerRect.setImage(this.getPathJumpRightImg());
        this.actualMoveType = Moves.JumpUp;
        this.jumpAudio();
    }
    public moveDown(blockRectangles: Rectangle[]) {
        let delta: Pt2D = new Pt2D(0, 10);
        let clonedRect = this.playerRect.clone();
        let dy: number = delta.getY();
        let willCollide = true;
        for (let i = dy; i >= 0 && willCollide; i--) {
            dy = i;
            willCollide = this.willCollide(clonedRect.clone(), new Pt2D(0, dy), blockRectangles);
        }
        delta = new Pt2D(0, dy);
        this.playerRect.moveDelta(delta);
        this.posActual = this.playerRect.getOrigin();
        if (this.posActual.getY() > this.posStart.getY()) {
            this.posActual.setY(this.posStart.getY());
            this.playerRect.moveOnPoint(this.posActual);
            if (this.lastPressedLeft == true)
                this.actualMoveType = Moves.Left;
        } else
            this.actualMoveType = Moves.Right;
        if (this.lastPressedLeft)
            this.playerRect.setImage(this.getPathLeftImg());
        else if (this.lastPressedLeft == false)
            this.playerRect.setImage(this.getPathRightImg());
    }
    public jumpAudio(){
        this.jumpAudioObj.play();
    }
    private willCollide(clonedRect: Rectangle, delta: Pt2D, blockRectangles: Rectangle[]): boolean {
        clonedRect.moveDelta(delta);
        let collision: boolean = false;
        for (let i = 0; i < blockRectangles.length; i++) {
            if (blockRectangles[i].intersectRect(clonedRect)) {
                console.log("Ahia");
                collision = true;
            }
        }
        return collision;
    }
    public addBulletRight(): void {
        this.bullets.push(new Bullet(true, new Pt2D(this.posActual.getX(),this.posActual.getY()+this.getMarioH()/2), this.getWidthAmbient()));
    }
    public addBulletLeft(): void {
        this.bullets.push(new Bullet(false,  new Pt2D(this.posActual.getX(),this.posActual.getY()+this.getMarioH()/2), this.getWidthAmbient()));
    }
    public getPathJumpRightImg(): string {
        return "../supermario/Resources/Img/jumpMario.png";
    }
    public getPathJumpLeftImg(): string {
        return "../supermario/Resources/Img/jumpStorto.png";
    }
    public getPathLeftImg(): string {
        return "../supermario/Resources/Img/marioStorto.png";
    }
    public getPathRightImg(): string {
        return "../supermario/Resources/Img/marioTrasp.png";
    }
    public isMarioOutLeft(widthAmbient: number): boolean {
        if (this.playerRect.getOrigin().getX() + this.playerRect.getWidth() < 0) {
            return true;
        } else false;
    }
    public isMarioOutRight(widthAmbient: number): boolean {
        if (this.playerRect.getOrigin().getX() > widthAmbient) {
            return true;
        } else false;
    }
    public isMarioInternalLeft(): boolean {
        if (this.playerRect.getOrigin().getX() < 0) {
            return true;
        } else false;
    }
    public isMarioInternalRight(widthAmbient: number): boolean {
        if (this.playerRect.getOrigin().getX() + this.playerRect.getWidth() > widthAmbient) {
            return true;
        } else false;
    }
}