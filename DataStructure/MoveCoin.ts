/*class MoveCoin{


   
        private coin: Rectangle;
        private indiceColumn: number = 0;
        private indiceRow: number = 0;
        private keepImage: number;
        constructor(coin: Rectangle) {
            this.coin = coin;
            this.coin.setImage("../supermario/Resources/Img/clipCoin.png");
            this.keepImage =20;
        }
        public draw(context: CanvasRenderingContext2D) {
            let sX = this.indiceColumn;
            let sY = this.indiceRow*57;
            if (this.keepImage == 0) {        
                if (this.indiceColumn == 1 && this.indiceRow == 1) {
                    this.indiceRow = 0;
                    this.indiceColumn = 0;
                } else if (this.indiceColumn == 1) {
                    this.indiceColumn = 0;
                    this.indiceRow++;
                } else {
                    this.indiceColumn++;
                }
                if(this.keepImage==0) this.keepImage=20;
            } else {
                this.keepImage--;
            }
            context.drawImage(this.coin.getImage(), sX, sY, 57, 0, this.coin.getOrigin().getX(), this.coin.getOrigin().getY(), this.coin.getWidth(), this.coin.getHeight());
        }
    



}*/