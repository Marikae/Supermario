class Main {
    private context: any;
    private canvas: any;
    private itemsManager: ItemManager = new ItemManager();
    private moveSelectedItem: boolean = false;
    private game: Game;
    private intervalMove: any;
    private intervalDraw: any;
    private intervalWon: any;
    private gameOverImg: HTMLImageElement;
    private gameWonImg: HTMLImageElement;
    constructor() {
        let c: any = document.getElementById("myCanvas");
        this.canvas = c;
        let ctx: any = this.canvas.getContext("2d");
        this.context = ctx;
        let myThis = this;
        this.canvas.addEventListener("mousemove", function (e: any) {
            myThis.onMouseMove(e);
        });
        this.canvas.addEventListener("mousedown", function (e: any) {
            myThis.onMouseDown(e);
        });
        this.canvas.addEventListener("mouseup", function (e: any) {
            myThis.onMouseUp(e);
        });
        document.addEventListener("keydown", event => {
            myThis.onKeyDown(event);
        });
        document.addEventListener("keyup", event => {
            myThis.onKeyUp(event);
        });
        this.canvas.height = window.innerHeight;
        this.canvas.width = window.innerWidth;
        this.game = new Game(this.canvas.clientWidth, this.canvas.clientHeight);
        this.intervalMove = null;
        this.intervalDraw = null;
        this.intervalWon = null;
        this.gameOverImg = new Image();
        this.gameOverImg.src = "../supermario/Resources/Img/gameOver2.png";
        this.gameOverImg.width = window.innerWidth;
        this.gameOverImg.height = window.innerHeight;
        this.gameWonImg = new Image();
        this.gameWonImg.src = "../supermario/Resources/Img/endR.png";
        this.gameWonImg.width =  window.innerWidth;
        this.gameWonImg.height =  window.innerHeight;
    }
    public onKeyDown(e: any) {
        this.game.marioMoveOnKeyDown(e);
    }
    public onKeyUp(e: any) {
        this.game.marioMoveOnKeyUp(e);
    }
    public start(): void {}
    public addTriangle(): void {
        let aX = (document.getElementById("aX") as any).value;
        aX = Number(aX);
        let aY = (document.getElementById("aY") as any).value;
        aY = Number(aY);
        let bX = (document.getElementById("bX") as any).value;
        bX = Number(bX);
        let bY = (document.getElementById("bY") as any).value;
        bY = Number(bY);
        let cX = (document.getElementById("cX") as any).value;
        cX = Number(cX);
        let cY = (document.getElementById("cY") as any).value;
        cY = Number(cY);
        let a2: Pt2D = new Pt2D(aX, aY);
        let b2: Pt2D = new Pt2D(bX, bY);
        let c2: Pt2D = new Pt2D(cX, cY);
        let t: Triangle = new Triangle(a2, b2, c2);
        this.itemsManager.addItem(t);
        this.itemsManager.draw(this.context);
    }
    public addCircle(): void {
        let cenX = (document.getElementById("cenX") as any).value;
        cenX = Number(cenX);
        let cenY = (document.getElementById("cenY") as any).value;
        cenY = Number(cenY);
        let rY = (document.getElementById("rY") as any).value;
        rY = Number(rY);
        let center1: Pt2D = new Pt2D(cenX, cenY);
        let circle1: Circle = new Circle(center1, rY);
        this.itemsManager.addItem(circle1);
        this.itemsManager.draw(this.context);
    }
    public addRectangle(): void {
        let originX = (document.getElementById("originX") as any).value;
        originX = Number(originX);
        let originY = (document.getElementById("originY") as any).value;
        originY = Number(originY);
        let height = (document.getElementById("height") as any).value;
        height = Number(height);
        let width = (document.getElementById("width") as any).value;
        width = Number(width);
        let origin: Pt2D = new Pt2D(originX, originY);
        let rectangle: Rectangle = new Rectangle(height, width, origin);
        this.itemsManager.addItem(rectangle);
        this.itemsManager.draw(this.context);
    }
    public clearCanvas() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
    public removeLastItem(): void {
        this.itemsManager.removeLastItem();
    }
    public removeItemByIndex(): void {
        let removeItem = (document.getElementById("removeItem") as any).value;
        removeItem = Number(removeItem);
        this.itemsManager.removeItemByIndex(removeItem);
    }
    public moveLastItemOnPoint(): void {
        let moveX = (document.getElementById("moveX") as any).value;
        moveX = Number(moveX);
        let moveY = (document.getElementById("moveY") as any).value;
        moveY = Number(moveY);
        let centerMove: Pt2D = new Pt2D(moveX, moveY);
        this.itemsManager.moveLastItemOnPoint(centerMove);
    }
    public onMouseMove(e: any): void {
        let mousePos: Pt2D = new Pt2D(e.offsetX, e.offsetY);
        this.itemsManager.onHover(mousePos);
        if (this.moveSelectedItem == true) {
            this.itemsManager.moveSelectItemOnPoint(mousePos);
        }
    }
    public onMouseDown(e: any): void {
        let mousePoint: Pt2D = new Pt2D(e.offsetX, e.offsetY);
        let pointedItem = this.itemsManager.getPointedItem(mousePoint);
        if (pointedItem)
            this.itemsManager.selectItem(pointedItem);
        else this.itemsManager.deselectItem();
        if (pointedItem) {
            this.moveSelectedItem = true;
        } else {
            this.itemsManager.deselectItem();
        }
    }
    public onMouseUp(e: any): void {
        this.moveSelectedItem = false;
    }
    public loadGame(json: any) {
        this.map(this.canvas.clientWidth, this.canvas.clientHeight, json);
        let myThis = this;
        this.intervalDraw = setInterval(function () {
            myThis.clearCanvas();
            myThis.game.draw(myThis.context);
        });
        this.intervalMove = setInterval(function () {
            let turnResult = myThis.game.executeTurn();
            switch(turnResult) {
                case(TurnResult.Lose):
                    myThis.stopGame();
                    break;
                case(TurnResult.Win):
                    myThis.win();
            }
        }, 33);
    
    }
    private stopGame() {
        clearInterval(this.intervalMove);
        clearInterval(this.intervalDraw);
        this.drawGameOver(this.context);

        let gameOverAudio = new Audio("../supermario/Resources/Audio/loseSound.mp3");
        gameOverAudio.play();
    }
    private win(){
        clearInterval(this.intervalMove);
        clearInterval(this.intervalDraw);
        this.drawGameWon(this.context);
        let gameOverAudio = new Audio("../supermario/Resources/Audio/victory.mp3");
        gameOverAudio.play();

    }
    public map(widthAmbient: number, heightAmbient: number, json: any): void {
        let maps: any[] = json.maps;
        let ambients: Ambient[] = [];
        let enemiesOfEnemies: Enemies[] = [];
        let marioJson = json.defaultValues.player;
        for (let i = 0; i < maps.length; i++) {
            let singleMap = maps[i];
            let ambient = Ambient.fromJson(heightAmbient, widthAmbient, singleMap);
            ambients.push(ambient);
            let enemies: Enemies = Enemies.fromJson(singleMap.enemies, ambient.getHFloorTiles(), heightAmbient, widthAmbient);
            enemiesOfEnemies.push(enemies);
        }
        this.game.setAmbients(ambients);
        this.game.setEnemies(enemiesOfEnemies);
        this.game.setMario(marioJson,heightAmbient,widthAmbient);
    }
    public drawGameOver(context: CanvasRenderingContext2D) {
        context.drawImage(this.gameOverImg, 0, 0, this.gameOverImg.width, this.gameOverImg.height);
    }
    public drawGameWon(context: CanvasRenderingContext2D) {
        context.drawImage(this.gameWonImg, 0, 0, this.gameWonImg.width, this.gameWonImg.height);
    }
}
let main = new Main();
main.start();
fetch("maps.json")
    .then(response => response.json())
    .then(json => main.loadGame(json));