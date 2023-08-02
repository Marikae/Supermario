class Pt2D {
    private x: number;
    private y: number;
    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }
    public setX(newX: number): any {
        this.x = newX;
    }
    public setY(newY: number): any {
        this.y = newY;
    }
    public getX(): number {
        return this.x;
    }
    public getY(): number {
        return this.y;
    }
    public sum(point: Pt2D): Pt2D {
        let sumX: number = this.getX() + point.getX();
        let sumY: number = this.getY() + point.getY();
        let sum: Pt2D = new Pt2D(sumX, sumY);
        return sum;
    }
    public sub(point: Pt2D): Pt2D {
        let subX: number = this.getX() - point.getX();
        let subY: number = this.getY() - point.getY();
        let sub: Pt2D = new Pt2D(subX, subY);
        return sub;
    }
    public distance(point: Pt2D): number {
        let b = this.getY() - point.getY();
        let a = this.getX() - point.getX();
        let c = Math.sqrt(a * a + b * b);
        return c;
    }
    public clone(): Pt2D {
        return new Pt2D(this.x, this.y);
    }
}