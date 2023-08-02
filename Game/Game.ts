class Game {
    private actualAmbient: Ambient;
    private actualEnemeis: Enemies;
    private ambients: Ambient[] = [];
    private enemies: Enemies[];
    private mario: Mario;
    private coinsManager: CoinsManager;
    private explosion: Explosion;
    private widthAmbient: number;
    private heightAmbient: number;
    private scoreManager: ScoreManager;
    //e: any;
    private explosionAudio: HTMLAudioElement;
    private changeAmbientAudio: HTMLAudioElement;
    constructor(wAmbient: number, heightAmbient: number) {
        this.widthAmbient = wAmbient;
        this.heightAmbient = heightAmbient;
        this.actualAmbient = new Ambient(wAmbient, heightAmbient, "", "", "");
        this.mario = new Mario(50, 65, heightAmbient, wAmbient, this.actualAmbient.getHFloorTiles(), this.heightAmbient - this.actualAmbient.getHFloorTiles() - 65);
        this.actualEnemeis = new Enemies(this.actualAmbient.getHFloorTiles(), 50, 45, heightAmbient, wAmbient);
        this.explosion = null;
        this.ambients = [];
        this.scoreManager = new ScoreManager(wAmbient, heightAmbient);
        this.coinsManager = new CoinsManager(wAmbient, heightAmbient, this.actualAmbient.getWidthFloorTiles(), this.actualAmbient.getHFloorTiles(), 30, 30);
        this.explosionAudio = new Audio("../supermario/Resources/Audio/explosion.mp3");
        this.changeAmbientAudio = new Audio("../supermario/Resources/Audio/changeMap.mp3");
    }
    public getWidthAmbient(): number {
        return this.actualAmbient.getwidthAmbient();
    }
    public getHeightAmbient(): number {
        return this.actualAmbient.getHeightAmbient();
    }
    public setAmbients(ambients: Ambient[]) {
        this.ambients = ambients;
        if (this.ambients.length > 0) {
            this.actualAmbient = this.ambients[0];
        }
    }
    public explosionSound(){
        let clonedAudio = this.explosionAudio.cloneNode() as HTMLAudioElement;
        clonedAudio.play();
    }
    public changeMapSound(){
        let clonedAudio = this.changeAmbientAudio.cloneNode() as HTMLAudioElement;
        clonedAudio.play();
    }
    public setMario(json: any,heightAmbient: number, wAmbient:number): void {
        let marioW = MyMath.compare01(json.w, wAmbient);
        let marioH = MyMath.compare01(json.h,heightAmbient);
        let posY = this.heightAmbient - this.actualAmbient.getHFloorTiles() - MyMath.compare01(json.h, heightAmbient)
        this.mario = new Mario(marioW,marioH , heightAmbient, wAmbient, this.actualAmbient.getHFloorTiles(), posY);
    }
    public setEnemies(enemies: Enemies[]): void {
        this.enemies = enemies;
        if (this.enemies.length > 0) {
            this.actualEnemeis = this.enemies[0];
        }
    }
    public getPreviousAmbient(): Ambient {
        let actualIndex = this.ambients.indexOf(this.actualAmbient);
        if (actualIndex > 0) {
            return this.ambients[actualIndex - 1];
        } else {
            return null;
        }
    }
    public getNextAmbient(): Ambient {
        let actualIndex = this.ambients.indexOf(this.actualAmbient);
        if (actualIndex + 1 < this.ambients.length) {
            return this.ambients[actualIndex + 1];
        } else {
            return null;
        }
    }
    public getPreviousEnemies(): Enemies {
        let actualIndex = this.enemies.indexOf(this.actualEnemeis);
        if (actualIndex > 0) {
            return this.enemies[actualIndex - 1];
        } else {
            return null;
        }
    }
    public getNextEnemies(): Enemies {
        let actualIndex = this.enemies.indexOf(this.actualEnemeis);
        if (actualIndex + 1 < this.enemies.length) {
            return this.enemies[actualIndex + 1];
        } else {
            return null;
        }
    }
    public checkChangeAmbient() {
        if (this.mario.isMarioOutRight(this.getWidthAmbient())) {
            if (this.getNextAmbient() != null) {
                this.actualAmbient = this.getNextAmbient();
                this.actualEnemeis = this.getNextEnemies();
                this.changeMapSound();
                this.mario.setMarioPosActual(new Pt2D(0, this.mario.getMarioPosActual().getY()));
            }
        } else if (this.mario.isMarioOutLeft(this.getWidthAmbient())) {
            if (this.getPreviousAmbient() != null) {
                this.mario.setMarioPosActual(new Pt2D(this.getWidthAmbient() - this.mario.getMarioW(), this.mario.getMarioPosActual().getY()));
                this.actualAmbient = this.getPreviousAmbient();
                this.actualEnemeis = this.getPreviousEnemies();
                this.changeMapSound();
            }
        } else if (this.mario.isMarioInternalLeft() && this.getPreviousAmbient() == null)
            this.mario.setMarioPosActual(new Pt2D(0, this.mario.getMarioPosActual().getY()));
        else if (this.mario.isMarioInternalRight(this.getWidthAmbient()) && this.getNextAmbient() == null)
            this.mario.setMarioPosActual(new Pt2D(this.getWidthAmbient() - this.mario.getMarioW(), this.mario.getMarioPosActual().getY()));
    }
    public draw(context: CanvasRenderingContext2D): void {
        this.actualAmbient.draw(context);
        this.mario.draw(context);
        if (this.explosion != null) {
            this.explosion.draw(context);
        }
        this.actualEnemeis.draw(context);
        this.coinsManager.draw(context);
        this.scoreManager.draw(context);
    }
    public executeTurn(): TurnResult {
        let oldPos = this.mario.getMarioPosActual().clone();
        this.mario.executeMove(this.actualAmbient.getRandomAmbient().getBlocks());
        this.actualEnemeis.executeMove();
        return this.checkTurn(oldPos);
    }
    public checkTurn(oldMarioPos: Pt2D): TurnResult {
        let turnResult = TurnResult.ShowMustGoOn;
        let marioBullets = this.mario.getBullets();
        let rectMario = this.mario.getMarioRect();
        let gameOver = false;
        let gameWon = false;
        this.checkTakeCoin(rectMario);
        gameWon = this.checkWon();
        if (this.enemies != null && !gameWon) {
            let rectsEnemy = this.actualEnemeis.getEnemyRect();
            gameOver = this.checkGameOver(rectMario, rectsEnemy);
            if (!gameOver)
                this.checkBulletsExplosion(marioBullets, rectsEnemy);
        }
        if (!gameOver)
            this.checkChangeAmbient();
        if (gameWon)
            turnResult = TurnResult.Win;
        if (gameOver)
            turnResult = TurnResult.Lose;
        this.checkRemoveBullets();
        return turnResult;
    }
    private checkRemoveBullets(): void {
        let bullets: Rectangle[] = this.mario.getBullets();
        for (let i = 0; i < bullets.length; i++) {
            let singleBullet = bullets[i];
            if (singleBullet.getA().getX() > this.widthAmbient || singleBullet.getB().getX() < 0)
                this.mario.deleteBulletsByIndex(i);
        } 
    }
    private checkGameOver(rectMario: Rectangle, rectsEnemy: Rectangle[]): boolean {
        let gameOver = false;
        for (let i = 0; i < rectsEnemy.length && !gameOver; i++) {
            if (rectMario.intersectRect(rectsEnemy[i])) {
                gameOver = true;
            }
        }
        return gameOver;
    }
    private checkWon(): boolean {
        let gameWon = false;
        if (this.mario.isMarioInternalRight(this.getWidthAmbient()) && this.getNextAmbient() == null) {
            gameWon = true;
        }
        return gameWon;
    }
    private checkTakeCoin(rectMario: Rectangle): void {
        let rectCoins = this.coinsManager.getCoinsRect();
        for (let i = 0; i < rectCoins.length; i++) {
            if (rectMario.intersectRect(rectCoins[i])) {
                this.scoreManager.takeCoin();
                this.coinsManager.coinSound();
                this.coinsManager.deletCoinByIndex(i);
            }
        }
    }
    private checkBulletsExplosion(marioBullets: Rectangle[], rectsEnemy: Rectangle[]): void {
        let vaI: number = -1;
        let vaK: number = -1;
        for (let k = 0; k < rectsEnemy.length; k++) {
            let singleRect = rectsEnemy[k];
            for (let i = 0; i < marioBullets.length; i++) {
                if (marioBullets[i].intersectRect(singleRect)) {
                    vaI = i;
                    vaK = k;
                    this.explosion = new Explosion(singleRect);
                    this.explosionSound();
                    this.scoreManager.deleteEnemies();
                    let myThis = this;
                    setTimeout(function () {
                        myThis.explosion = null;
                    }, 500);
                }
            }
            if (vaI > -1)
                this.mario.deleteBulletsByIndex(vaI);
        }
        if (vaK > -1) {
            this.actualEnemeis.deleteEnemyesByIndex(vaK);
        }
    }
    public marioMoveOnKeyDown(e: any) {
        switch (e.keyCode) {
            case (37):
                this.mario.setPressedLeft(true);
                break;
            case (39):
                this.mario.setPressedRight(true);
                break;
            case (32):
                this.mario.setPressedSpace(true);
                break;
            case (65):
                this.mario.addBulletLeft();
                break;
            case (83):
                this.mario.addBulletRight();
                break;
        }
    }
    public marioMoveOnKeyUp(e: any) {
        switch (e.keyCode) {
            case (37):
                this.mario.setPressedLeft(false);
                break;
            case (39):
                this.mario.setPressedRight(false);
                break;
            case (32):
                this.mario.setPressedSpace(false);
                break;
        }
    }
}