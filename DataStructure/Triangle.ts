class Triangle extends Item {
    private a: Pt2D;
    private b: Pt2D;
    private c: Pt2D;
    items: Item[] = [];
    private color: string;
    constructor(a: Pt2D, b: Pt2D, c: Pt2D) {
        super();
        this.a = a;
        this.b = b;
        this.c = c;
        this.color = "blue";
    }
    public getA(): Pt2D {
        return this.a;
    }
    public getB(): Pt2D {
        return this.b;
    }
    public getC(): Pt2D {
        return this.c;
    }
    public draw(context: CanvasRenderingContext2D, i: number): void {
        context.fillStyle = this.color;
        context.beginPath();
        context.moveTo(this.a.getX(), this.a.getY());
        context.lineTo(this.b.getX(), this.b.getY());
        context.lineTo(this.c.getX(), this.c.getY());
        context.lineTo(this.a.getX(), this.a.getY());
        context.closePath();
        context.stroke();
        context.fill();
        context.fillStyle = "white";
        context.font = "30px Arial";
        context.fillText(i.toString(), this.a.getX(), this.a.getY());
    }
    public moveOnPoint(point: Pt2D): void {
        let diff1 = this.c.sub(this.a);
        let diff2 = this.b.sub(this.a);
        this.a = point;
        this.c = this.a.sum(diff1);
        this.b = this.a.sum(diff2);
    }
    public setColor(color: string): void {
        this.color = color;
    }
    public isPointInsideItem(point: Pt2D): boolean {
        return this.pointInTriangle(point);
    }
    private sign(p1: Pt2D, p2: Pt2D, p3: Pt2D): number {

        return (p1.getX() - p3.getX()) * (p2.getY() - p3.getY()) - (p2.getX() - p3.getX()) * (p1.getY() - p3.getY());
    }
    private pointInTriangle(pt: Pt2D): boolean {
        let d1: number;
        let d2: number;
        let d3: number;
        let has_neg: boolean;
        let has_pos: boolean;
        d1 = this.sign(pt, this.a, this.b);
        d2 = this.sign(pt, this.b, this.c);
        d3 = this.sign(pt, this.c, this.a);
        has_neg = (d1 < 0) || (d2 < 0) || (d3 < 0);
        has_pos = (d1 > 0) || (d2 > 0) || (d3 > 0);
        return !(has_neg && has_pos);
    }
}