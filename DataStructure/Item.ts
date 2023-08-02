abstract class Item{
    public abstract draw(context: CanvasRenderingContext2D, i:number): void;
    public abstract moveOnPoint(point: Pt2D): void;
    public abstract setColor(color: string): void;
    public abstract isPointInsideItem(point: Pt2D):boolean;
}