class Enemy extends Player {
    private directionMove: boolean;
    private jsonImagePath: string;
    private maxX: number;
    private minX: number;
    private speedX: number;
    constructor(wEnemy: number, hEnemy: number, heightAmbient: number, widthAmbient: number, startPosX: number, startPosY: number) {
        super(wEnemy, hEnemy, heightAmbient, widthAmbient, startPosX, startPosY);
        this.directionMove = true;
        this.posActual = new Pt2D(startPosX, startPosY);
        this.jsonImagePath = null;
        this.generatePlayer();
        this.maxX=widthAmbient;
        this.minX=0;
        this.speedX = 10;
    }
    public static fromJson(json: any, heightAmbient: number, widthAmbient: number): Enemy {
        let enemy: Enemy = new Enemy(MyMath.compare01(json.width, widthAmbient), MyMath.compare01(json.height, heightAmbient), heightAmbient, widthAmbient, MyMath.compare01(json.x, widthAmbient), MyMath.compare01(json.y, heightAmbient));
        enemy.setDirectionMove(json.directionMove);
        enemy.setJsonImagePath(json.pathImg);
        enemy.setMaxX(MyMath.compare01(json.maxX, widthAmbient) - json.width);
        enemy.setMinX(MyMath.compare01(json.minX, widthAmbient));
        enemy.setSpeedX(json.speedX);
        enemy.generatePlayer();
        return enemy;
    }
    private setMaxX(maxX: number): void {
        this.maxX = maxX;
    }
    private setMinX(minX: number): void {
        this.minX = minX;
    }
    private setSpeedX(speedX: number): void {
        this.speedX = speedX;
    }
    private setDirectionMove(move: boolean): void {
        this.actualMoveType
    }

    private setJsonImagePath(path: string): void {
        this.jsonImagePath = path;
    }
    public draw(context: CanvasRenderingContext2D): void {
        super.draw(context);
    }
    public getEnemyRect(): Rectangle {
        return this.playerRect;
    }
    public executeMove(): void {
        if (this.directionMove == true) {
            this.moveRight();
        } else this.moveLeft();
        if (this.posActual.getX() > this.maxX) {
            this.directionMove = !this.directionMove;
        } else if (this.posActual.getX() < this.minX) {
            this.directionMove = !this.directionMove;
        }
    }
    public moveLeft(): void {
        let delta: Pt2D = new Pt2D(-this.speedX, 0);
        this.playerRect.moveDelta(delta);
        this.posActual = this.playerRect.getOrigin();
        this.playerRect = new Rectangle(this.hPlayer, this.wPlayer, this.posActual);
        this.playerRect.setImage(this.getPathLeftImg());
        this.actualMoveType = Moves.Left;
        this.moveDown();
        this.lastPressedLeft = true;
    }
    public moveRight(): void {
        let delta: Pt2D = new Pt2D(this.speedX, 0);
        this.playerRect.moveDelta(delta);
        this.posActual = this.playerRect.getOrigin();
        this.playerRect = new Rectangle(this.hPlayer, this.wPlayer, this.posActual);
        this.playerRect.setImage(this.getPathRightImg());
        this.actualMoveType = Moves.Right;
        this.moveDown();
        this.lastPressedLeft = false;
    }
    public moveJumpLeft(): void {
        let delta: Pt2D = new Pt2D(-10, -10);
        this.playerRect.moveDelta(delta);
        this.posActual = this.playerRect.getOrigin();
        this.playerRect = new Rectangle(this.hPlayer, this.wPlayer, this.posActual);
        this.playerRect.setImage(this.getPathJumpLeftImg());
        this.actualMoveType = Moves.JumpLeft;
        this.lastPressedLeft = true;
    }
    public moveJumpRight(): void {
        let delta: Pt2D = new Pt2D(+10, -10);
        this.playerRect.moveDelta(delta);
        this.posActual = this.playerRect.getOrigin();
        this.playerRect = new Rectangle(this.hPlayer, this.wPlayer, this.posActual);
        this.playerRect.setImage(this.getPathJumpRightImg());
        this.actualMoveType = Moves.JumpRight;
        this.lastPressedLeft = false;
    }
    public moveJumpUp(): void {
        let delta: Pt2D = new Pt2D(0, -45);
        this.playerRect.moveDelta(delta);
        this.posActual = this.playerRect.getOrigin();
        if (this.lastPressedLeft == true)
            this.playerRect.setImage(this.getPathJumpLeftImg());
        else if (this.lastPressedLeft == false)
            this.playerRect.setImage(this.getPathJumpRightImg());
        this.actualMoveType = Moves.JumpUp;
    }
    public moveDown(): void {
        let delta: Pt2D = new Pt2D(0, +this.speedX);
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
    public getPathJumpRightImg(): string {
        if (this.jsonImagePath) {
            return this.jsonImagePath;
        } else {
            return "../supermario/Resources/Img/goom.png";
        }
    }
    public getPathJumpLeftImg(): string {
        if (this.jsonImagePath) {
            return this.jsonImagePath;
        } else {
            return "../supermario/Resources/Img/goom.png";
        }
    }
    public getPathLeftImg(): string {
        if (this.jsonImagePath) {
            return this.jsonImagePath;
        } else {
            return "../supermario/Resources/Img/goom.png";
        }
    }
    public getPathRightImg(): string {
        if (this.jsonImagePath) {
            return this.jsonImagePath;
        } else {
            return "../supermario/Resources/Img/goom.png";
        }
    }
}