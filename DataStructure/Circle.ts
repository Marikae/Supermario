class Circle extends Item {
    private items: Item[] = [];
    private center: Pt2D;
    private radius: number;
    private color: string;
    constructor(center: Pt2D, radius: number) {
        super();
        this.center = center;
        this.radius = radius;
        this.color = "blue";
    }
    public getCenter(): Pt2D {
        return this.center;
    }
    public getRadius(): number {
        return this.radius;
    }
    public draw(context: CanvasRenderingContext2D, i: number): void {
        context.fillStyle = this.color;
        context.beginPath();
        context.arc(this.center.getX(), this.center.getY(), this.radius, 0, 2 * Math.PI);
        context.closePath();
        context.stroke();
        context.fill();
        context.fillStyle = "white";
        context.font = "30px Arial";
        context.fillText(i.toString(), this.center.getX(), this.center.getY());
    }
    public isPointInsideCircle(point: Pt2D): boolean {
        if (this.center.distance(point) > this.radius) {
            return false;
        } else {
            return true
        }
    }
    public moveOnPoint(point: Pt2D): void {
        this.center = point;
    }
    public setColor(color: string): void {
        this.color = color;
    }
    public isPointInsideItem(point: Pt2D): boolean {
        return this.isPointInsideCircle(point);
    }
}