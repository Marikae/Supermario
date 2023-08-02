abstract class Player {
    protected playerRect: Rectangle;
    protected wPlayer: number;
    protected hPlayer: number;
    protected posActual: Pt2D;
    protected posStart: Pt2D;
    protected pressedLeft: boolean = false;
    protected pressedRight: boolean = false;
    protected pressedSpace: boolean = false;
    protected lastPressedLeft: boolean = false;
    protected heightAmbient: number;
    protected widthAmbient: number;
    protected actualMoveType: Moves;
    constructor(wPlayer: number, hPlayer: number, heightAmbient: number, widthAmbient: number, startPosX: number, startPosY: number) {
        this.heightAmbient = heightAmbient;
        this.widthAmbient = widthAmbient;
        this.wPlayer = wPlayer;
        this.hPlayer = hPlayer;
        this.posActual = new Pt2D(startPosX, startPosY);
        this.posStart = this.posActual.clone();
        this.generatePlayer();
    }
    public getWidthAmbient(): number {
        return this.widthAmbient;
    }
    public getHeightAmbient(): number {
        return this.heightAmbient;
    }
    public draw(context: CanvasRenderingContext2D): void {
        this.playerRect.draw(context, 1);
    }
    public generatePlayer() {
        this.playerRect = new Rectangle(this.hPlayer, this.wPlayer, this.posActual);
        this.playerRect.setImage(this.getPathRightImg());
    }
    public abstract moveLeft(blockRectangles: Rectangle[]): void;
    public abstract moveRight(blockRectangles: Rectangle[]): void;
    public abstract moveJumpLeft(blockRectangles: Rectangle[]): void;
    public abstract moveJumpRight(blockRectangles: Rectangle[]): void;
    public abstract moveJumpUp(blockRectangles: Rectangle[]): void;
    public abstract moveDown(blockRectangles: Rectangle[]): void;
    public abstract executeMove(blockRectangles: Rectangle[]): void;
    public setPressedLeft(pressed: boolean) {
        this.pressedLeft = pressed;
    }
    public setPressedRight(pressed: boolean) {
        this.pressedRight = pressed;
    }
    public setPressedSpace(pressed: boolean) {
        this.pressedSpace = pressed;
    }
    public abstract getPathJumpRightImg(): string;
    public abstract getPathJumpLeftImg(): string;
    public abstract getPathLeftImg(): string;
    public abstract getPathRightImg(): string;
}