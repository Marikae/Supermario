class ItemManager {
    private items: Item[] = [];
    private itemSelected: Item;
    constructor() {
        this.itemSelected = null;
    }
    public addItem(item: Item) {
        this.items.push(item);
    }
    public draw(context: CanvasRenderingContext2D) {
        for (let i = 0; i < this.items.length; i++) {
            this.items[i].draw(context, i);
        }
        if (this.itemSelected != null) {
            this.itemSelected.setColor("yellow");
        }
    }
    public removeLastItem(): void {
        this.items.pop();
    }
    public removeItemByIndex(removeItem: number): void {
        this.items.splice(removeItem, 1);
    }
    public moveLastItemOnPoint(point: Pt2D): void {
        let lastItem = this.items[this.items.length - 1];
        lastItem.moveOnPoint(point);
    }
    public moveSelectItemOnPoint(point: Pt2D): void{     
       this.itemSelected.moveOnPoint(point);
    }
    public onHover(point: Pt2D): void {
        for (let i = 0; i < this.items.length; i++) {
            this.items[i].isPointInsideItem(point);
            if (this.items[i].isPointInsideItem(point) == true) {
                this.items[i].setColor("fuchsia");
            } else {
                this.items[i].setColor("blue");
            }
        }
    }
    public getPointedItem(point: Pt2D): Item {
        let foundItem: any = null;
        for (let i = 0; i < this.items.length; i++) {
            if (this.items[i].isPointInsideItem(point) == true) {
                foundItem = this.items[i];
            } else {}
        }
        return foundItem;
    }
    public selectItem(item: Item): any {
        this.itemSelected = item;
    }
    public deselectItem(): any {
        this.itemSelected.setColor("blue");
        this.itemSelected=null;
    }
}