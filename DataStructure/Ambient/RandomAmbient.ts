class RandomAmbient {
    private wAmbient: number;
    private hAmbient: number;
    //private wBlock: number;
    //private hBlock: number;
    private blocks: Rectangle[] = [];
    private wFloor: number;
    private hFloor: number;
    private pathBlocks: string;
    constructor(wAmbient: number, hAmbient: number, wFloor: number, hFloor: number, pathBlocks: string) {
        this.wAmbient = wAmbient;
        this.hAmbient = hAmbient;
        this.wFloor = wFloor;
        this.hFloor = hFloor;
        //this.wBlock = wBlock;
        //this.hBlock = hBlock;
        this.pathBlocks = pathBlocks;
        this.generateBlock();
    }
    public setBlocks(blocks: Rectangle[]): void {
        this.blocks = blocks;
    }
    public getHBlock(): number {
        return null;
        //return this.hBlock;
    }
    public getWBlock(): number{
        return null;
        //return this.wBlock;
    }
    public draw(context: CanvasRenderingContext2D) {
        for (let i = 0; i < this.blocks.length; i++) {
            this.blocks[i].draw(context, i);
        }
        /*  this.block.draw(context, 1);
         this.block2.draw(context, 1);*/
    }
    public generateBlock(): any {
        /* for (let i = 0; i < 7; i++) {
            let minX = 0;
            let maxX = this.w - this.wBlock - this.wFloor;
            let minY = 0;
            let maxY = this.h - this.hBlock - this.hFloor;

            let originX = this.getRandomBlock(minX, maxX);
            let originY = this.getRandomBlock(minY, maxY);
          
            let step: number= 45;
            let y = (originY % step);
     
            let rectBlock: Rectangle = new Rectangle(this.hBlock, this.wBlock, new Pt2D(originX, originY));

            rectBlock.setImage("../supermario/Resources/Img/245.png");
            this.blocks.push(rectBlock);
        }*/
        /*
          this.block3T.setImage("../supermario/Resources/Img/245.png");
          this.blocks.push(this.block3T);*/
    }
    public getBlocks(): Rectangle[] {
        let blocks: Rectangle[] = [];
        for (let i = 0; i < this.blocks.length; i++) {
            blocks.push(this.blocks[i]);
        }
        return blocks;
    }
    public getRandomBlock(min: number, max: number): number {
        min = Math.ceil(min)
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    static randomAmbientFromJson(wAmbient: number, hAmbient: number, wFloor: number, hFloor: number, json: any): RandomAmbient {
        let path = json.pathBlocks;
        let randomAmbient = new RandomAmbient(wAmbient, hAmbient, wFloor, hFloor, path);
        let blockRect: Rectangle[] = [];
        //let dirtyJsonssss = [];
        for (let i = 0; i < json.blocks.length; i++) {
            /*let myDirtyJson: any = {};
            myDirtyJson.h = MyMath.to01(json.blocks[i].h, hAmbient);
            myDirtyJson.w = MyMath.to01(json.blocks[i].w, wAmbient);
            myDirtyJson.x = MyMath.to01(json.blocks[i].x, wAmbient);
            myDirtyJson.y = MyMath.to01(json.blocks[i].y, hAmbient);*/
            let rect = new Rectangle(MyMath.compare01(json.blocks[i].h, hAmbient), MyMath.compare01(json.blocks[i].w, wAmbient), new Pt2D(MyMath.compare01(json.blocks[i].x, wAmbient), MyMath.compare01(json.blocks[i].y, hAmbient)));
            rect.setImage(path);
            blockRect.push(rect);
            //dirtyJsonssss.push(myDirtyJson);
        }

        //console.log(JSON.stringify(dirtyJsonssss));
        //console.log(JSON.parse(JSON.stringify(dirtyJsonssss)));
        randomAmbient.setBlocks(blockRect);
        return randomAmbient;
    }
}