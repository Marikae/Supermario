class Rectangle extends Item {
    private height: number;
    private width: number;
    private origin: Pt2D;
    private color: string;
    private img: HTMLImageElement;
    constructor(height: number, width: number, origin: Pt2D) {
        super();
        this.height = height;
        this.width = width;
        this.origin = origin;
        this.color = "white";
    }
    public getHeight(): number {
        return this.height;
    }
    public getWidth(): number {
        return this.width;
    }
    public getOrigin(): Pt2D {
        return this.origin.clone();
    }
    public getA() {
        let a: Pt2D = new Pt2D(this.origin.getX(), this.origin.getY());
        return a;
    }
    public getB() {
        let b: Pt2D = new Pt2D(this.origin.getX() + this.width, this.origin.getY())
        return b;
    }
    public getC() {
        let c: Pt2D = new Pt2D(this.origin.getX() + this.width, this.origin.getY() + this.height);
        return c;
    }
    public getD() {
        let d: Pt2D = new Pt2D(this.origin.getX(), this.origin.getY() + this.height);
        return d;
    }
    public draw(context: CanvasRenderingContext2D, i: number): void {
        context.fillStyle = this.color;
        context.beginPath();
        context.strokeStyle = "white";
        context.drawImage(this.img, this.origin.getX(), this.origin.getY(), this.width, this.height);
    }
    public setColor(color: string): void {
        this.color = color;
    }
    public moveOnPoint(point: Pt2D): void {
        this.origin = point.clone();
    }
    public isPointInsideItem(point: Pt2D): boolean {
        let inside: boolean = false;
        let a = this.getA();
        let b = this.getB();
        let c = this.getC();
        let d = this.getD();
        let t1: Triangle = new Triangle(a, b, c);
        let t2: Triangle = new Triangle(a, c, d);
        if (t1.isPointInsideItem(point) || t2.isPointInsideItem(point)) {
            inside = true;
        } else {
            inside = false;
        }
        return inside;
    }
    public setImage(path: string): void {
        this.img = new Image();
        this.img.src = path;
        this.img.width = this.width;
        this.img.height = this.height;
    }
    public moveDelta(delta: Pt2D): void {
        this.origin = new Pt2D(this.origin.getX() + delta.getX(), this.origin.getY() + delta.getY());
    }
    public clone(){
        return new Rectangle(this.height, this.width, this.origin.clone());
    }
    public intersectRect(rect: Rectangle): boolean {
        let intersect: boolean = false;
        if ((rect.isPointInsideItem(this.getA()) || rect.isPointInsideItem(this.getB()) || rect.isPointInsideItem(this.getC()) || rect.isPointInsideItem(this.getD())) ||
            (this.isPointInsideItem(rect.getA()) || this.isPointInsideItem(rect.getB()) || this.isPointInsideItem(rect.getC()) || this.isPointInsideItem(rect.getD()))) {
            intersect = true;
        } else {
            intersect = false;
        }
        return intersect;
    }
    public getImage(): any{
        return this.img;
    }
}