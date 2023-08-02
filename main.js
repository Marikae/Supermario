var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var MyMath = (function () {
    function MyMath() {
    }
    MyMath.compare01 = function (numToCompare, maxValue) {
        var value = 0;
        value = maxValue * numToCompare;
        return value;
    };
    MyMath.to01 = function (numToCompare, maxValue) {
        return numToCompare / maxValue;
    };
    return MyMath;
}());
var Bullet = (function () {
    function Bullet(directionMove, posStart, xMax) {
        this.directionMove = directionMove;
        this.posActual = posStart.clone();
        this.wBullet = 80;
        this.hBullet = 20;
        this.bullet = new Rectangle(this.hBullet, this.wBullet, this.posActual);
        this.bulletSoundObj = new Audio("../supermario/Resources/Audio/bulletSound.mp3");
    }
    Bullet.prototype.getWidthAmbient = function () {
        return this.widthAmbient;
    };
    Bullet.prototype.getX = function () {
        return this.posActual.getX();
    };
    Bullet.prototype.getBulletRect = function () {
        return this.bullet;
    };
    Bullet.prototype.move = function () {
        if (this.directionMove == true) {
            this.moveRight();
        }
        else if (this.directionMove == false) {
            this.moveLeft();
        }
    };
    Bullet.prototype.moveRight = function () {
        var delta = new Pt2D(20, 0);
        this.bullet.moveDelta(delta);
        this.posActual = this.bullet.getOrigin();
        this.bullet = new Rectangle(this.hBullet, this.wBullet, this.posActual);
        this.bullet.setImage("../supermario/Resources/Img/bullet.png");
        this.bulletSound();
    };
    Bullet.prototype.moveLeft = function () {
        var delta = new Pt2D(-20, 0);
        this.bullet.moveDelta(delta);
        this.posActual = this.bullet.getOrigin();
        this.bullet = new Rectangle(this.hBullet, this.wBullet, this.posActual);
        this.bullet.setImage("../supermario/Resources/Img/leftBullet.png");
        this.bulletSound();
    };
    Bullet.prototype.draw = function (context) {
        this.bullet.draw(context, 1);
    };
    Bullet.prototype.bulletSound = function () {
        this.bulletSoundObj.play();
    };
    Bullet.prototype.isOut = function () {
        var out = false;
        if (this.posActual.getX() < 0 || this.posActual.getX() > this.getWidthAmbient()) {
            out = true;
        }
        return out;
    };
    return Bullet;
}());
var RandomAmbient = (function () {
    function RandomAmbient(wAmbient, hAmbient, wFloor, hFloor, pathBlocks) {
        this.blocks = [];
        this.wAmbient = wAmbient;
        this.hAmbient = hAmbient;
        this.wFloor = wFloor;
        this.hFloor = hFloor;
        this.pathBlocks = pathBlocks;
        this.generateBlock();
    }
    RandomAmbient.prototype.setBlocks = function (blocks) {
        this.blocks = blocks;
    };
    RandomAmbient.prototype.getHBlock = function () {
        return null;
    };
    RandomAmbient.prototype.getWBlock = function () {
        return null;
    };
    RandomAmbient.prototype.draw = function (context) {
        for (var i = 0; i < this.blocks.length; i++) {
            this.blocks[i].draw(context, i);
        }
    };
    RandomAmbient.prototype.generateBlock = function () {
    };
    RandomAmbient.prototype.getBlocks = function () {
        var blocks = [];
        for (var i = 0; i < this.blocks.length; i++) {
            blocks.push(this.blocks[i]);
        }
        return blocks;
    };
    RandomAmbient.prototype.getRandomBlock = function (min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };
    RandomAmbient.randomAmbientFromJson = function (wAmbient, hAmbient, wFloor, hFloor, json) {
        var path = json.pathBlocks;
        var randomAmbient = new RandomAmbient(wAmbient, hAmbient, wFloor, hFloor, path);
        var blockRect = [];
        for (var i = 0; i < json.blocks.length; i++) {
            var rect = new Rectangle(MyMath.compare01(json.blocks[i].h, hAmbient), MyMath.compare01(json.blocks[i].w, wAmbient), new Pt2D(MyMath.compare01(json.blocks[i].x, wAmbient), MyMath.compare01(json.blocks[i].y, hAmbient)));
            rect.setImage(path);
            blockRect.push(rect);
        }
        randomAmbient.setBlocks(blockRect);
        return randomAmbient;
    };
    return RandomAmbient;
}());
var Moves;
(function (Moves) {
    Moves[Moves["Left"] = 0] = "Left";
    Moves[Moves["Right"] = 1] = "Right";
    Moves[Moves["JumpUp"] = 2] = "JumpUp";
    Moves[Moves["JumpLeft"] = 3] = "JumpLeft";
    Moves[Moves["JumpRight"] = 4] = "JumpRight";
    Moves[Moves["Down"] = 5] = "Down";
})(Moves || (Moves = {}));
var TurnResult;
(function (TurnResult) {
    TurnResult[TurnResult["Win"] = 0] = "Win";
    TurnResult[TurnResult["Lose"] = 1] = "Lose";
    TurnResult[TurnResult["ShowMustGoOn"] = 2] = "ShowMustGoOn";
})(TurnResult || (TurnResult = {}));
var ItemManager = (function () {
    function ItemManager() {
        this.items = [];
        this.itemSelected = null;
    }
    ItemManager.prototype.addItem = function (item) {
        this.items.push(item);
    };
    ItemManager.prototype.draw = function (context) {
        for (var i = 0; i < this.items.length; i++) {
            this.items[i].draw(context, i);
        }
        if (this.itemSelected != null) {
            this.itemSelected.setColor("yellow");
        }
    };
    ItemManager.prototype.removeLastItem = function () {
        this.items.pop();
    };
    ItemManager.prototype.removeItemByIndex = function (removeItem) {
        this.items.splice(removeItem, 1);
    };
    ItemManager.prototype.moveLastItemOnPoint = function (point) {
        var lastItem = this.items[this.items.length - 1];
        lastItem.moveOnPoint(point);
    };
    ItemManager.prototype.moveSelectItemOnPoint = function (point) {
        this.itemSelected.moveOnPoint(point);
    };
    ItemManager.prototype.onHover = function (point) {
        for (var i = 0; i < this.items.length; i++) {
            this.items[i].isPointInsideItem(point);
            if (this.items[i].isPointInsideItem(point) == true) {
                this.items[i].setColor("fuchsia");
            }
            else {
                this.items[i].setColor("blue");
            }
        }
    };
    ItemManager.prototype.getPointedItem = function (point) {
        var foundItem = null;
        for (var i = 0; i < this.items.length; i++) {
            if (this.items[i].isPointInsideItem(point) == true) {
                foundItem = this.items[i];
            }
            else { }
        }
        return foundItem;
    };
    ItemManager.prototype.selectItem = function (item) {
        this.itemSelected = item;
    };
    ItemManager.prototype.deselectItem = function () {
        this.itemSelected.setColor("blue");
        this.itemSelected = null;
    };
    return ItemManager;
}());
var Item = (function () {
    function Item() {
    }
    return Item;
}());
var Pt2D = (function () {
    function Pt2D(x, y) {
        this.x = x;
        this.y = y;
    }
    Pt2D.prototype.setX = function (newX) {
        this.x = newX;
    };
    Pt2D.prototype.setY = function (newY) {
        this.y = newY;
    };
    Pt2D.prototype.getX = function () {
        return this.x;
    };
    Pt2D.prototype.getY = function () {
        return this.y;
    };
    Pt2D.prototype.sum = function (point) {
        var sumX = this.getX() + point.getX();
        var sumY = this.getY() + point.getY();
        var sum = new Pt2D(sumX, sumY);
        return sum;
    };
    Pt2D.prototype.sub = function (point) {
        var subX = this.getX() - point.getX();
        var subY = this.getY() - point.getY();
        var sub = new Pt2D(subX, subY);
        return sub;
    };
    Pt2D.prototype.distance = function (point) {
        var b = this.getY() - point.getY();
        var a = this.getX() - point.getX();
        var c = Math.sqrt(a * a + b * b);
        return c;
    };
    Pt2D.prototype.clone = function () {
        return new Pt2D(this.x, this.y);
    };
    return Pt2D;
}());
var Triangle = (function (_super) {
    __extends(Triangle, _super);
    function Triangle(a, b, c) {
        var _this = _super.call(this) || this;
        _this.items = [];
        _this.a = a;
        _this.b = b;
        _this.c = c;
        _this.color = "blue";
        return _this;
    }
    Triangle.prototype.getA = function () {
        return this.a;
    };
    Triangle.prototype.getB = function () {
        return this.b;
    };
    Triangle.prototype.getC = function () {
        return this.c;
    };
    Triangle.prototype.draw = function (context, i) {
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
    };
    Triangle.prototype.moveOnPoint = function (point) {
        var diff1 = this.c.sub(this.a);
        var diff2 = this.b.sub(this.a);
        this.a = point;
        this.c = this.a.sum(diff1);
        this.b = this.a.sum(diff2);
    };
    Triangle.prototype.setColor = function (color) {
        this.color = color;
    };
    Triangle.prototype.isPointInsideItem = function (point) {
        return this.pointInTriangle(point);
    };
    Triangle.prototype.sign = function (p1, p2, p3) {
        return (p1.getX() - p3.getX()) * (p2.getY() - p3.getY()) - (p2.getX() - p3.getX()) * (p1.getY() - p3.getY());
    };
    Triangle.prototype.pointInTriangle = function (pt) {
        var d1;
        var d2;
        var d3;
        var has_neg;
        var has_pos;
        d1 = this.sign(pt, this.a, this.b);
        d2 = this.sign(pt, this.b, this.c);
        d3 = this.sign(pt, this.c, this.a);
        has_neg = (d1 < 0) || (d2 < 0) || (d3 < 0);
        has_pos = (d1 > 0) || (d2 > 0) || (d3 > 0);
        return !(has_neg && has_pos);
    };
    return Triangle;
}(Item));
var Circle = (function (_super) {
    __extends(Circle, _super);
    function Circle(center, radius) {
        var _this = _super.call(this) || this;
        _this.items = [];
        _this.center = center;
        _this.radius = radius;
        _this.color = "blue";
        return _this;
    }
    Circle.prototype.getCenter = function () {
        return this.center;
    };
    Circle.prototype.getRadius = function () {
        return this.radius;
    };
    Circle.prototype.draw = function (context, i) {
        context.fillStyle = this.color;
        context.beginPath();
        context.arc(this.center.getX(), this.center.getY(), this.radius, 0, 2 * Math.PI);
        context.closePath();
        context.stroke();
        context.fill();
        context.fillStyle = "white";
        context.font = "30px Arial";
        context.fillText(i.toString(), this.center.getX(), this.center.getY());
    };
    Circle.prototype.isPointInsideCircle = function (point) {
        if (this.center.distance(point) > this.radius) {
            return false;
        }
        else {
            return true;
        }
    };
    Circle.prototype.moveOnPoint = function (point) {
        this.center = point;
    };
    Circle.prototype.setColor = function (color) {
        this.color = color;
    };
    Circle.prototype.isPointInsideItem = function (point) {
        return this.isPointInsideCircle(point);
    };
    return Circle;
}(Item));
var Rectangle = (function (_super) {
    __extends(Rectangle, _super);
    function Rectangle(height, width, origin) {
        var _this = _super.call(this) || this;
        _this.height = height;
        _this.width = width;
        _this.origin = origin;
        _this.color = "white";
        return _this;
    }
    Rectangle.prototype.getHeight = function () {
        return this.height;
    };
    Rectangle.prototype.getWidth = function () {
        return this.width;
    };
    Rectangle.prototype.getOrigin = function () {
        return this.origin.clone();
    };
    Rectangle.prototype.getA = function () {
        var a = new Pt2D(this.origin.getX(), this.origin.getY());
        return a;
    };
    Rectangle.prototype.getB = function () {
        var b = new Pt2D(this.origin.getX() + this.width, this.origin.getY());
        return b;
    };
    Rectangle.prototype.getC = function () {
        var c = new Pt2D(this.origin.getX() + this.width, this.origin.getY() + this.height);
        return c;
    };
    Rectangle.prototype.getD = function () {
        var d = new Pt2D(this.origin.getX(), this.origin.getY() + this.height);
        return d;
    };
    Rectangle.prototype.draw = function (context, i) {
        context.fillStyle = this.color;
        context.beginPath();
        context.strokeStyle = "white";
        context.drawImage(this.img, this.origin.getX(), this.origin.getY(), this.width, this.height);
    };
    Rectangle.prototype.setColor = function (color) {
        this.color = color;
    };
    Rectangle.prototype.moveOnPoint = function (point) {
        this.origin = point.clone();
    };
    Rectangle.prototype.isPointInsideItem = function (point) {
        var inside = false;
        var a = this.getA();
        var b = this.getB();
        var c = this.getC();
        var d = this.getD();
        var t1 = new Triangle(a, b, c);
        var t2 = new Triangle(a, c, d);
        if (t1.isPointInsideItem(point) || t2.isPointInsideItem(point)) {
            inside = true;
        }
        else {
            inside = false;
        }
        return inside;
    };
    Rectangle.prototype.setImage = function (path) {
        this.img = new Image();
        this.img.src = path;
        this.img.width = this.width;
        this.img.height = this.height;
    };
    Rectangle.prototype.moveDelta = function (delta) {
        this.origin = new Pt2D(this.origin.getX() + delta.getX(), this.origin.getY() + delta.getY());
    };
    Rectangle.prototype.clone = function () {
        return new Rectangle(this.height, this.width, this.origin.clone());
    };
    Rectangle.prototype.intersectRect = function (rect) {
        var intersect = false;
        if ((rect.isPointInsideItem(this.getA()) || rect.isPointInsideItem(this.getB()) || rect.isPointInsideItem(this.getC()) || rect.isPointInsideItem(this.getD())) ||
            (this.isPointInsideItem(rect.getA()) || this.isPointInsideItem(rect.getB()) || this.isPointInsideItem(rect.getC()) || this.isPointInsideItem(rect.getD()))) {
            intersect = true;
        }
        else {
            intersect = false;
        }
        return intersect;
    };
    Rectangle.prototype.getImage = function () {
        return this.img;
    };
    return Rectangle;
}(Item));
var Ambient = (function () {
    function Ambient(heightAmbient, weightAmbient, floorPath, skyPath, blocksPath) {
        this.heightAmbient = heightAmbient;
        this.widthAmbient = weightAmbient;
        this.floor = new Floor(this.widthAmbient, this.heightAmbient, floorPath, 45, 45);
        this.sky = new Sky(this.widthAmbient, this.heightAmbient, this.floor.getWTiles(), skyPath);
        this.randomAmbient = new RandomAmbient(this.widthAmbient, this.heightAmbient, this.floor.getWTiles(), this.floor.getHTiles(), blocksPath);
    }
    Ambient.prototype.getHeightAmbient = function () {
        return this.heightAmbient;
    };
    Ambient.prototype.getwidthAmbient = function () {
        return this.widthAmbient;
    };
    Ambient.prototype.getHFloorTiles = function () {
        return this.floor.getHTiles();
    };
    Ambient.prototype.getWidthFloorTiles = function () {
        return this.floor.getWTiles();
    };
    Ambient.prototype.getRandomAmbient = function () {
        return this.randomAmbient;
    };
    Ambient.prototype.setSky = function (sky) {
        this.sky = sky;
    };
    Ambient.prototype.setFloor = function (floor) {
        this.floor = floor;
    };
    Ambient.prototype.setRandomAmbient = function (randomAmbient) {
        this.randomAmbient = randomAmbient;
    };
    Ambient.prototype.draw = function (context) {
        this.floor.draw(context);
        this.sky.draw(context);
        this.randomAmbient.draw(context);
    };
    Ambient.fromJson = function (h, w, json) {
        var floor = Floor.floorFromJson(h, w, json.floor);
        var heightFloor = floor.getHTiles();
        var sky = Sky.skyFromJson(w, h, heightFloor, json.sky);
        var randomAmbient = RandomAmbient.randomAmbientFromJson(w, h, floor.getWTiles(), floor.getHTiles(), json.obstacles);
        var ambient = new Ambient(h, w, "", "", "");
        ambient.setSky(sky);
        ambient.setFloor(floor);
        ambient.setRandomAmbient(randomAmbient);
        return ambient;
    };
    return Ambient;
}());
var Floor = (function () {
    function Floor(widthAmbient, heightAmbient, pathFloor, widthFloor, heightFloor) {
        this.floorTiles = [];
        this.widthAmbient = widthAmbient;
        this.heightAmbient = heightAmbient;
        this.wFTiles = widthFloor;
        this.hFTiles = heightFloor;
        this.pathFloor = pathFloor;
        this.generateFloor();
    }
    Floor.prototype.getHTiles = function () {
        return this.hFTiles;
    };
    Floor.prototype.getWTiles = function () {
        return this.wFTiles;
    };
    Floor.prototype.draw = function (context) {
        for (var i = 0; i < this.floorTiles.length; i++) {
            this.floorTiles[i].draw(context, i);
        }
    };
    Floor.prototype.generateFloor = function () {
        var totFT = this.widthAmbient / this.wFTiles;
        for (var i = 0; i < totFT; i++) {
            var originX = i * this.wFTiles;
            var originY = this.heightAmbient - this.hFTiles;
            var rectFT = new Rectangle(this.hFTiles, this.wFTiles, new Pt2D(originX, originY));
            rectFT.setImage(this.pathFloor);
            this.floorTiles.push(rectFT);
        }
    };
    Floor.floorFromJson = function (h, w, json) {
        var floor = new Floor(w, h, json.floorBackground, MyMath.compare01(json.floorTiles.w, w), MyMath.compare01(json.floorTiles.h, h));
        return floor;
    };
    return Floor;
}());
var Sky = (function () {
    function Sky(widthAmbient, heightAmbient, heightFloor, pathSky) {
        this.widthAmbient = widthAmbient;
        this.heightAmbient = heightAmbient - heightFloor;
        this.pathSky = pathSky;
        this.generateSky();
    }
    Sky.prototype.getHeightSky = function () {
        return this.heightAmbient;
    };
    Sky.prototype.draw = function (context) {
        this.sky.draw(context, 1);
    };
    Sky.prototype.generateSky = function () {
        this.sky = new Rectangle(this.heightAmbient, this.widthAmbient, new Pt2D(0, 0));
        this.sky.setImage(this.pathSky);
    };
    Sky.skyFromJson = function (w, h, heightFloor, json) {
        var path = json.skyBackground;
        var sky = new Sky(w, h, heightFloor, path);
        return sky;
    };
    return Sky;
}());
var Player = (function () {
    function Player(wPlayer, hPlayer, heightAmbient, widthAmbient, startPosX, startPosY) {
        this.pressedLeft = false;
        this.pressedRight = false;
        this.pressedSpace = false;
        this.lastPressedLeft = false;
        this.heightAmbient = heightAmbient;
        this.widthAmbient = widthAmbient;
        this.wPlayer = wPlayer;
        this.hPlayer = hPlayer;
        this.posActual = new Pt2D(startPosX, startPosY);
        this.posStart = this.posActual.clone();
        this.generatePlayer();
    }
    Player.prototype.getWidthAmbient = function () {
        return this.widthAmbient;
    };
    Player.prototype.getHeightAmbient = function () {
        return this.heightAmbient;
    };
    Player.prototype.draw = function (context) {
        this.playerRect.draw(context, 1);
    };
    Player.prototype.generatePlayer = function () {
        this.playerRect = new Rectangle(this.hPlayer, this.wPlayer, this.posActual);
        this.playerRect.setImage(this.getPathRightImg());
    };
    Player.prototype.setPressedLeft = function (pressed) {
        this.pressedLeft = pressed;
    };
    Player.prototype.setPressedRight = function (pressed) {
        this.pressedRight = pressed;
    };
    Player.prototype.setPressedSpace = function (pressed) {
        this.pressedSpace = pressed;
    };
    return Player;
}());
var Enemy = (function (_super) {
    __extends(Enemy, _super);
    function Enemy(wEnemy, hEnemy, heightAmbient, widthAmbient, startPosX, startPosY) {
        var _this = _super.call(this, wEnemy, hEnemy, heightAmbient, widthAmbient, startPosX, startPosY) || this;
        _this.directionMove = true;
        _this.posActual = new Pt2D(startPosX, startPosY);
        _this.jsonImagePath = null;
        _this.generatePlayer();
        _this.maxX = widthAmbient;
        _this.minX = 0;
        _this.speedX = 10;
        return _this;
    }
    Enemy.fromJson = function (json, heightAmbient, widthAmbient) {
        var enemy = new Enemy(MyMath.compare01(json.width, widthAmbient), MyMath.compare01(json.height, heightAmbient), heightAmbient, widthAmbient, MyMath.compare01(json.x, widthAmbient), MyMath.compare01(json.y, heightAmbient));
        enemy.setDirectionMove(json.directionMove);
        enemy.setJsonImagePath(json.pathImg);
        enemy.setMaxX(MyMath.compare01(json.maxX, widthAmbient) - json.width);
        enemy.setMinX(MyMath.compare01(json.minX, widthAmbient));
        enemy.setSpeedX(json.speedX);
        enemy.generatePlayer();
        return enemy;
    };
    Enemy.prototype.setMaxX = function (maxX) {
        this.maxX = maxX;
    };
    Enemy.prototype.setMinX = function (minX) {
        this.minX = minX;
    };
    Enemy.prototype.setSpeedX = function (speedX) {
        this.speedX = speedX;
    };
    Enemy.prototype.setDirectionMove = function (move) {
        this.actualMoveType;
    };
    Enemy.prototype.setJsonImagePath = function (path) {
        this.jsonImagePath = path;
    };
    Enemy.prototype.draw = function (context) {
        _super.prototype.draw.call(this, context);
    };
    Enemy.prototype.getEnemyRect = function () {
        return this.playerRect;
    };
    Enemy.prototype.executeMove = function () {
        if (this.directionMove == true) {
            this.moveRight();
        }
        else
            this.moveLeft();
        if (this.posActual.getX() > this.maxX) {
            this.directionMove = !this.directionMove;
        }
        else if (this.posActual.getX() < this.minX) {
            this.directionMove = !this.directionMove;
        }
    };
    Enemy.prototype.moveLeft = function () {
        var delta = new Pt2D(-this.speedX, 0);
        this.playerRect.moveDelta(delta);
        this.posActual = this.playerRect.getOrigin();
        this.playerRect = new Rectangle(this.hPlayer, this.wPlayer, this.posActual);
        this.playerRect.setImage(this.getPathLeftImg());
        this.actualMoveType = Moves.Left;
        this.moveDown();
        this.lastPressedLeft = true;
    };
    Enemy.prototype.moveRight = function () {
        var delta = new Pt2D(this.speedX, 0);
        this.playerRect.moveDelta(delta);
        this.posActual = this.playerRect.getOrigin();
        this.playerRect = new Rectangle(this.hPlayer, this.wPlayer, this.posActual);
        this.playerRect.setImage(this.getPathRightImg());
        this.actualMoveType = Moves.Right;
        this.moveDown();
        this.lastPressedLeft = false;
    };
    Enemy.prototype.moveJumpLeft = function () {
        var delta = new Pt2D(-10, -10);
        this.playerRect.moveDelta(delta);
        this.posActual = this.playerRect.getOrigin();
        this.playerRect = new Rectangle(this.hPlayer, this.wPlayer, this.posActual);
        this.playerRect.setImage(this.getPathJumpLeftImg());
        this.actualMoveType = Moves.JumpLeft;
        this.lastPressedLeft = true;
    };
    Enemy.prototype.moveJumpRight = function () {
        var delta = new Pt2D(+10, -10);
        this.playerRect.moveDelta(delta);
        this.posActual = this.playerRect.getOrigin();
        this.playerRect = new Rectangle(this.hPlayer, this.wPlayer, this.posActual);
        this.playerRect.setImage(this.getPathJumpRightImg());
        this.actualMoveType = Moves.JumpRight;
        this.lastPressedLeft = false;
    };
    Enemy.prototype.moveJumpUp = function () {
        var delta = new Pt2D(0, -45);
        this.playerRect.moveDelta(delta);
        this.posActual = this.playerRect.getOrigin();
        if (this.lastPressedLeft == true)
            this.playerRect.setImage(this.getPathJumpLeftImg());
        else if (this.lastPressedLeft == false)
            this.playerRect.setImage(this.getPathJumpRightImg());
        this.actualMoveType = Moves.JumpUp;
    };
    Enemy.prototype.moveDown = function () {
        var delta = new Pt2D(0, +this.speedX);
        this.playerRect.moveDelta(delta);
        this.posActual = this.playerRect.getOrigin();
        if (this.posActual.getY() > this.posStart.getY()) {
            this.posActual.setY(this.posStart.getY());
            this.playerRect.moveOnPoint(this.posActual);
            if (this.lastPressedLeft == true)
                this.actualMoveType = Moves.Left;
        }
        else
            this.actualMoveType = Moves.Right;
        if (this.lastPressedLeft)
            this.playerRect.setImage(this.getPathLeftImg());
        else if (this.lastPressedLeft == false)
            this.playerRect.setImage(this.getPathRightImg());
    };
    Enemy.prototype.getPathJumpRightImg = function () {
        if (this.jsonImagePath) {
            return this.jsonImagePath;
        }
        else {
            return "../supermario/Resources/Img/goom.png";
        }
    };
    Enemy.prototype.getPathJumpLeftImg = function () {
        if (this.jsonImagePath) {
            return this.jsonImagePath;
        }
        else {
            return "../supermario/Resources/Img/goom.png";
        }
    };
    Enemy.prototype.getPathLeftImg = function () {
        if (this.jsonImagePath) {
            return this.jsonImagePath;
        }
        else {
            return "../supermario/Resources/Img/goom.png";
        }
    };
    Enemy.prototype.getPathRightImg = function () {
        if (this.jsonImagePath) {
            return this.jsonImagePath;
        }
        else {
            return "../supermario/Resources/Img/goom.png";
        }
    };
    return Enemy;
}(Player));
var Enemies = (function () {
    function Enemies(hFloor, hEnemy, wEnemy, heightAmbient, widthAmbient) {
        this.coins = [];
        this.hPlayer = hEnemy;
        this.wPlayer = wEnemy;
        this.heightAmbient = heightAmbient - hFloor;
        this.widthAmbient = widthAmbient;
        this.hFloor = hFloor;
    }
    Enemies.prototype.setHFloor = function (hFloor) {
        this.hFloor = hFloor;
    };
    Enemies.prototype.getEnemyRect = function () {
        var rectArray = [];
        for (var i = 0; i < this.coins.length; i++) {
            var rectEnemies = this.coins[i].getEnemyRect();
            rectArray.push(rectEnemies);
        }
        return rectArray;
    };
    Enemies.prototype.deleteEnemyesByIndex = function (index) {
        this.coins.splice(index, 1);
    };
    Enemies.prototype.draw = function (context) {
        for (var i = 0; i < this.coins.length; i++) {
            this.coins[i].draw(context);
        }
    };
    Enemies.prototype.generateEnemys = function () {
        this.coins = [];
        for (var i = 0; i < 1; i++) {
            var minX = 400;
            var maxX = this.widthAmbient - this.wPlayer;
            var startPosX = this.getRandomEnemys(minX, maxX);
            var startPosY = this.heightAmbient - this.hPlayer;
            var enemy = new Enemy(this.wPlayer, this.hPlayer, this.heightAmbient, this.widthAmbient, startPosX, startPosY);
            this.coins.push(enemy);
        }
    };
    Enemies.prototype.getRandomEnemys = function (min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };
    Enemies.prototype.executeMove = function () {
        for (var i = 0; i < this.coins.length; i++) {
            this.coins[i].executeMove();
        }
    };
    Enemies.fromJson = function (json, hFloor, heightAmbient, widthAmbient) {
        var enemies = new Enemies(hFloor, 0, 0, heightAmbient, widthAmbient);
        for (var i = 0; i < json.length; i++) {
            var enemy = Enemy.fromJson(json[i], heightAmbient, widthAmbient);
            enemies.coins.push(enemy);
        }
        return enemies;
    };
    return Enemies;
}());
var Mario = (function (_super) {
    __extends(Mario, _super);
    function Mario(wPlayer, hPlayer, heightAmbient, widthAmbient, hfloor, startPosY) {
        var _this = _super.call(this, wPlayer, hPlayer, heightAmbient, widthAmbient, hfloor, startPosY) || this;
        _this.startPosY = startPosY;
        _this.bullets = [];
        _this.jumpAudioObj = new Audio("../supermario/Resources/Audio/jump.mp3");
        _this.generatePlayer();
        return _this;
    }
    Mario.prototype.getMarioRect = function () {
        return this.playerRect;
    };
    Mario.prototype.getMarioPosActual = function () {
        return this.posActual;
    };
    Mario.prototype.getStartPosY = function () {
        return this.startPosY;
    };
    Mario.prototype.setMarioPosActual = function (newPosAcual) {
        this.posActual = newPosAcual;
        this.playerRect.moveOnPoint(this.posActual.clone());
    };
    Mario.prototype.getMarioW = function () {
        return this.wPlayer;
    };
    Mario.prototype.getMarioH = function () {
        return this.hPlayer;
    };
    Mario.prototype.getBullets = function () {
        var rectBullets = [];
        for (var i = 0; i < this.bullets.length; i++) {
            rectBullets.push(this.bullets[i].getBulletRect());
        }
        return rectBullets;
    };
    Mario.prototype.draw = function (context) {
        _super.prototype.draw.call(this, context);
        for (var i = 0; i < this.bullets.length; i++) {
            this.bullets[i].draw(context);
        }
    };
    Mario.prototype.deleteBulletsByIndex = function (index) {
        this.bullets.splice(index, 1);
    };
    Mario.prototype.executeMove = function (blockRectangles) {
        var deleteBullets = [];
        for (var i = 0; i < this.bullets.length; i++) {
            this.bullets[i].move();
            if (this.bullets[i].isOut()) {
                deleteBullets.push(this.bullets[i]);
            }
        }
        for (var i = 0; i < deleteBullets.length; i++) {
            var index = this.bullets.indexOf(deleteBullets[i]);
            this.bullets.splice(index, 1);
        }
        if (this.pressedSpace == true && this.pressedRight == true) {
            this.moveJumpRight(blockRectangles);
        }
        else if (this.pressedSpace == true && this.pressedLeft == true) {
            this.moveJumpLeft(blockRectangles);
        }
        else if (this.pressedSpace == true) {
            this.moveJumpUp(blockRectangles);
        }
        else if (this.pressedLeft == true) {
            this.moveLeft(blockRectangles);
        }
        else if (this.pressedRight == true) {
            this.moveRight(blockRectangles);
        }
        else {
            if (this.posActual.getY() < this.posStart.getY())
                this.moveDown(blockRectangles);
        }
    };
    Mario.prototype.moveRight = function (blockRectangles) {
        var delta = new Pt2D(10, 0);
        var clonedRect = this.playerRect.clone();
        var dx = delta.getX();
        var willCollide = true;
        for (var i = dx; i >= 0 && willCollide; i--) {
            dx = i;
            willCollide = this.willCollide(clonedRect.clone(), new Pt2D(dx, 0), blockRectangles);
        }
        delta = new Pt2D(dx, 0);
        this.playerRect.moveDelta(delta);
        this.posActual = this.playerRect.getOrigin();
        this.playerRect.setImage(this.getPathRightImg());
        this.actualMoveType = Moves.Right;
        this.moveDown(blockRectangles);
        this.lastPressedLeft = false;
    };
    Mario.prototype.moveLeft = function (blockRectangles) {
        var delta = new Pt2D(-10, 0);
        var clonedRect = this.playerRect.clone();
        var dx = delta.getX();
        var dy = delta.getY();
        var willCollide = true;
        for (var i = dx; i <= 0 && willCollide; i++) {
            dx = i;
            willCollide = this.willCollide(clonedRect.clone(), new Pt2D(dx, dy), blockRectangles);
        }
        delta = new Pt2D(dx, dy);
        if (true) {
            this.playerRect.moveDelta(delta);
            this.posActual = this.playerRect.getOrigin();
            this.playerRect.setImage(this.getPathLeftImg());
            this.actualMoveType = Moves.Left;
            this.moveDown(blockRectangles);
            this.lastPressedLeft = true;
        }
    };
    Mario.prototype.moveJumpLeft = function (blockRectangles) {
        var delta = new Pt2D(-10, -10);
        var clonedRect = this.playerRect.clone();
        var dx = delta.getX();
        var dy = delta.getY();
        var willCollide = true;
        for (var i = dx; i <= 0 && willCollide; i++) {
            dx = i;
            willCollide = this.willCollide(clonedRect.clone(), new Pt2D(dx, 0), blockRectangles);
        }
        delta = new Pt2D(dx, 0);
        this.playerRect.moveDelta(delta);
        this.posActual = this.playerRect.getOrigin();
        this.playerRect.setImage(this.getPathJumpLeftImg());
        this.actualMoveType = Moves.JumpLeft;
        this.lastPressedLeft = true;
        willCollide = true;
        for (var i = dy; i <= 0 && willCollide; i++) {
            dy = i;
            willCollide = this.willCollide(clonedRect.clone(), new Pt2D(0, dy), blockRectangles);
        }
        delta = new Pt2D(0, dy);
        this.playerRect.moveDelta(delta);
        this.posActual = this.playerRect.getOrigin();
        this.playerRect.setImage(this.getPathJumpLeftImg());
        this.actualMoveType = Moves.JumpLeft;
        this.lastPressedLeft = true;
        this.jumpAudio();
    };
    Mario.prototype.moveJumpRight = function (blockRectangles) {
        var delta = new Pt2D(10, -10);
        var clonedRect = this.playerRect.clone();
        var dx = delta.getX();
        var dy = delta.getY();
        var willCollide = true;
        for (var i = dx; i >= 0 && willCollide; i--) {
            dx = i;
            willCollide = this.willCollide(clonedRect.clone(), new Pt2D(dx, 0), blockRectangles);
        }
        delta = new Pt2D(dx, 0);
        this.playerRect.moveDelta(delta);
        this.posActual = this.playerRect.getOrigin();
        this.playerRect.setImage(this.getPathJumpRightImg());
        this.actualMoveType = Moves.JumpRight;
        willCollide = true;
        for (var i = dy; i <= 0 && willCollide; i++) {
            dy = i;
            willCollide = this.willCollide(clonedRect.clone(), new Pt2D(0, dy), blockRectangles);
        }
        delta = new Pt2D(0, dy);
        this.playerRect.moveDelta(delta);
        this.posActual = this.playerRect.getOrigin();
        this.playerRect.setImage(this.getPathJumpRightImg());
        this.actualMoveType = Moves.JumpRight;
        this.lastPressedLeft = false;
        this.jumpAudio();
    };
    Mario.prototype.moveJumpUp = function (blockRectangles) {
        var delta = new Pt2D(0, -30);
        var clonedRect = this.playerRect.clone();
        var dy = delta.getY();
        var willCollide = true;
        for (var i = dy; i <= 0 && willCollide; i++) {
            dy = i;
            willCollide = this.willCollide(clonedRect.clone(), new Pt2D(0, dy), blockRectangles);
        }
        delta = new Pt2D(0, dy);
        this.playerRect.moveDelta(delta);
        this.posActual = this.playerRect.getOrigin();
        if (this.lastPressedLeft == true)
            this.playerRect.setImage(this.getPathJumpLeftImg());
        else if (this.lastPressedLeft == false)
            this.playerRect.setImage(this.getPathJumpRightImg());
        this.actualMoveType = Moves.JumpUp;
        this.jumpAudio();
    };
    Mario.prototype.moveDown = function (blockRectangles) {
        var delta = new Pt2D(0, 10);
        var clonedRect = this.playerRect.clone();
        var dy = delta.getY();
        var willCollide = true;
        for (var i = dy; i >= 0 && willCollide; i--) {
            dy = i;
            willCollide = this.willCollide(clonedRect.clone(), new Pt2D(0, dy), blockRectangles);
        }
        delta = new Pt2D(0, dy);
        this.playerRect.moveDelta(delta);
        this.posActual = this.playerRect.getOrigin();
        if (this.posActual.getY() > this.posStart.getY()) {
            this.posActual.setY(this.posStart.getY());
            this.playerRect.moveOnPoint(this.posActual);
            if (this.lastPressedLeft == true)
                this.actualMoveType = Moves.Left;
        }
        else
            this.actualMoveType = Moves.Right;
        if (this.lastPressedLeft)
            this.playerRect.setImage(this.getPathLeftImg());
        else if (this.lastPressedLeft == false)
            this.playerRect.setImage(this.getPathRightImg());
    };
    Mario.prototype.jumpAudio = function () {
        this.jumpAudioObj.play();
    };
    Mario.prototype.willCollide = function (clonedRect, delta, blockRectangles) {
        clonedRect.moveDelta(delta);
        var collision = false;
        for (var i = 0; i < blockRectangles.length; i++) {
            if (blockRectangles[i].intersectRect(clonedRect)) {
                console.log("Ahia");
                collision = true;
            }
        }
        return collision;
    };
    Mario.prototype.addBulletRight = function () {
        this.bullets.push(new Bullet(true, new Pt2D(this.posActual.getX(), this.posActual.getY() + this.getMarioH() / 2), this.getWidthAmbient()));
    };
    Mario.prototype.addBulletLeft = function () {
        this.bullets.push(new Bullet(false, new Pt2D(this.posActual.getX(), this.posActual.getY() + this.getMarioH() / 2), this.getWidthAmbient()));
    };
    Mario.prototype.getPathJumpRightImg = function () {
        return "../supermario/Resources/Img/jumpMario.png";
    };
    Mario.prototype.getPathJumpLeftImg = function () {
        return "../supermario/Resources/Img/jumpStorto.png";
    };
    Mario.prototype.getPathLeftImg = function () {
        return "../supermario/Resources/Img/marioStorto.png";
    };
    Mario.prototype.getPathRightImg = function () {
        return "../supermario/Resources/Img/marioTrasp.png";
    };
    Mario.prototype.isMarioOutLeft = function (widthAmbient) {
        if (this.playerRect.getOrigin().getX() + this.playerRect.getWidth() < 0) {
            return true;
        }
        else
            false;
    };
    Mario.prototype.isMarioOutRight = function (widthAmbient) {
        if (this.playerRect.getOrigin().getX() > widthAmbient) {
            return true;
        }
        else
            false;
    };
    Mario.prototype.isMarioInternalLeft = function () {
        if (this.playerRect.getOrigin().getX() < 0) {
            return true;
        }
        else
            false;
    };
    Mario.prototype.isMarioInternalRight = function (widthAmbient) {
        if (this.playerRect.getOrigin().getX() + this.playerRect.getWidth() > widthAmbient) {
            return true;
        }
        else
            false;
    };
    return Mario;
}(Player));
var ScoreManager = (function () {
    function ScoreManager(wAmbient, hAmbient) {
        this.wAmbient = wAmbient;
        this.hAmbient = hAmbient;
        this.actualScore = 0;
    }
    ScoreManager.prototype.deleteEnemies = function () {
        this.actualScore += 100;
    };
    ScoreManager.prototype.takeCoin = function () {
        this.actualScore += 200;
    };
    ScoreManager.prototype.draw = function (context) {
        var fontSize = 22;
        context.font = fontSize + "px Courier New";
        context.fillText(this.actualScore.toString(), this.wAmbient - 100, fontSize);
    };
    return ScoreManager;
}());
var Coin = (function () {
    function Coin(wAmbient, hAmbient, wFloor, hFloor, wCoin, hCoin, xCoin, yCoin) {
        this.keepImage = 0;
        this.indiceColumn = 0;
        this.coinRect = new Rectangle(hCoin, wCoin, new Pt2D(xCoin, yCoin));
        this.wAmbient = wAmbient;
        this.hAmbient = hAmbient;
        this.wFloor = wFloor;
        this.hFloor = hFloor;
        this.wCoin = wCoin;
        this.hCoin = hCoin;
    }
    Coin.prototype.draw = function (context) {
        var sX = this.indiceColumn * 57;
        if (this.keepImage == 0) {
            if (this.indiceColumn == 5) {
                this.indiceColumn = 0;
            }
            else {
                this.indiceColumn++;
            }
            this.keepImage = 20;
        }
        else {
            this.keepImage--;
        }
        context.drawImage(this.coinRect.getImage(), sX, 0, 57, 57, this.coinRect.getOrigin().getX(), this.coinRect.getOrigin().getY(), this.coinRect.getWidth(), this.coinRect.getHeight());
    };
    Coin.prototype.getCoinRect = function () {
        return this.coinRect;
    };
    Coin.prototype.setCoinImage = function (path) {
        this.coinRect.setImage(path);
    };
    Coin.fromJson = function (json, wAmbient, hAmbient, wFloor, hFloor, wCoin, hCoin) {
        var coin = new Coin(wAmbient, hAmbient, wFloor, hFloor, wCoin, hAmbient, json.x, json.y);
        return coin;
    };
    return Coin;
}());
var CoinsManager = (function () {
    function CoinsManager(wAmbient, hAmbient, wFloor, hFloor, wCoin, hCoin) {
        this.coins = [];
        this.wAmbient = wAmbient;
        this.hAmbient = hAmbient;
        this.wFloor = wFloor;
        this.hFloor = hFloor;
        this.wCoin = wCoin;
        this.hCoin = hCoin;
        this.keepImage = 20;
        this.generateCoin();
        this.coinSoundObj = new Audio("../supermario/Resources/Audio/coinSound.mp3");
    }
    CoinsManager.prototype.draw = function (context) {
        for (var i = 0; i < this.coins.length; i++) {
            this.coins[i].draw(context);
        }
    };
    CoinsManager.prototype.generateCoin = function () {
        for (var i = 0; i < 50; i++) {
            var minX = 0;
            var maxX = this.wAmbient - this.wCoin - this.wFloor;
            var minY = 0;
            var maxY = this.hAmbient - this.hCoin - this.hFloor;
            var originX = this.getRandomCoin(minX, maxX);
            var originY = this.getRandomCoin(minY, maxY);
            var step = 45;
            var y = (originY % step);
            var coin = new Coin(this.wAmbient, this.hAmbient, this.wFloor, this.hFloor, this.wCoin, this.hCoin, originX, originY);
            coin.setCoinImage("../supermario/Resources/Img/flipCoin.png");
            this.coins.push(coin);
        }
    };
    CoinsManager.prototype.deletCoinByIndex = function (index) {
        this.coins.splice(index, 1);
    };
    CoinsManager.prototype.coinSound = function () {
        var clonedAudio = this.coinSoundObj.cloneNode();
        clonedAudio.play();
    };
    CoinsManager.prototype.getCoinsRect = function () {
        var coinsRects = [];
        for (var i = 0; i < this.coins.length; i++) {
            var coin = this.coins[i].getCoinRect();
            coinsRects.push(coin);
        }
        return coinsRects;
    };
    CoinsManager.prototype.getRandomCoin = function (min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };
    CoinsManager.fromJson = function (json, wFloor, hFloor, heightAmbient, widthAmbient, wCoin, hCoin) {
        var coins = new CoinsManager(widthAmbient, heightAmbient, wFloor, hFloor, wCoin, hCoin);
        for (var i = 0; i < json.length; i++) {
            var coin = Coin.fromJson(json[i], widthAmbient, heightAmbient, wFloor, hFloor, wCoin, hCoin);
            coins.coins.push(coin);
        }
        return coins;
    };
    return CoinsManager;
}());
var Game = (function () {
    function Game(wAmbient, heightAmbient) {
        this.ambients = [];
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
    Game.prototype.getWidthAmbient = function () {
        return this.actualAmbient.getwidthAmbient();
    };
    Game.prototype.getHeightAmbient = function () {
        return this.actualAmbient.getHeightAmbient();
    };
    Game.prototype.setAmbients = function (ambients) {
        this.ambients = ambients;
        if (this.ambients.length > 0) {
            this.actualAmbient = this.ambients[0];
        }
    };
    Game.prototype.explosionSound = function () {
        var clonedAudio = this.explosionAudio.cloneNode();
        clonedAudio.play();
    };
    Game.prototype.changeMapSound = function () {
        var clonedAudio = this.changeAmbientAudio.cloneNode();
        clonedAudio.play();
    };
    Game.prototype.setMario = function (json, heightAmbient, wAmbient) {
        var marioW = MyMath.compare01(json.w, wAmbient);
        var marioH = MyMath.compare01(json.h, heightAmbient);
        var posY = this.heightAmbient - this.actualAmbient.getHFloorTiles() - MyMath.compare01(json.h, heightAmbient);
        this.mario = new Mario(marioW, marioH, heightAmbient, wAmbient, this.actualAmbient.getHFloorTiles(), posY);
    };
    Game.prototype.setEnemies = function (enemies) {
        this.enemies = enemies;
        if (this.enemies.length > 0) {
            this.actualEnemeis = this.enemies[0];
        }
    };
    Game.prototype.getPreviousAmbient = function () {
        var actualIndex = this.ambients.indexOf(this.actualAmbient);
        if (actualIndex > 0) {
            return this.ambients[actualIndex - 1];
        }
        else {
            return null;
        }
    };
    Game.prototype.getNextAmbient = function () {
        var actualIndex = this.ambients.indexOf(this.actualAmbient);
        if (actualIndex + 1 < this.ambients.length) {
            return this.ambients[actualIndex + 1];
        }
        else {
            return null;
        }
    };
    Game.prototype.getPreviousEnemies = function () {
        var actualIndex = this.enemies.indexOf(this.actualEnemeis);
        if (actualIndex > 0) {
            return this.enemies[actualIndex - 1];
        }
        else {
            return null;
        }
    };
    Game.prototype.getNextEnemies = function () {
        var actualIndex = this.enemies.indexOf(this.actualEnemeis);
        if (actualIndex + 1 < this.enemies.length) {
            return this.enemies[actualIndex + 1];
        }
        else {
            return null;
        }
    };
    Game.prototype.checkChangeAmbient = function () {
        if (this.mario.isMarioOutRight(this.getWidthAmbient())) {
            if (this.getNextAmbient() != null) {
                this.actualAmbient = this.getNextAmbient();
                this.actualEnemeis = this.getNextEnemies();
                this.changeMapSound();
                this.mario.setMarioPosActual(new Pt2D(0, this.mario.getMarioPosActual().getY()));
            }
        }
        else if (this.mario.isMarioOutLeft(this.getWidthAmbient())) {
            if (this.getPreviousAmbient() != null) {
                this.mario.setMarioPosActual(new Pt2D(this.getWidthAmbient() - this.mario.getMarioW(), this.mario.getMarioPosActual().getY()));
                this.actualAmbient = this.getPreviousAmbient();
                this.actualEnemeis = this.getPreviousEnemies();
                this.changeMapSound();
            }
        }
        else if (this.mario.isMarioInternalLeft() && this.getPreviousAmbient() == null)
            this.mario.setMarioPosActual(new Pt2D(0, this.mario.getMarioPosActual().getY()));
        else if (this.mario.isMarioInternalRight(this.getWidthAmbient()) && this.getNextAmbient() == null)
            this.mario.setMarioPosActual(new Pt2D(this.getWidthAmbient() - this.mario.getMarioW(), this.mario.getMarioPosActual().getY()));
    };
    Game.prototype.draw = function (context) {
        this.actualAmbient.draw(context);
        this.mario.draw(context);
        if (this.explosion != null) {
            this.explosion.draw(context);
        }
        this.actualEnemeis.draw(context);
        this.coinsManager.draw(context);
        this.scoreManager.draw(context);
    };
    Game.prototype.executeTurn = function () {
        var oldPos = this.mario.getMarioPosActual().clone();
        this.mario.executeMove(this.actualAmbient.getRandomAmbient().getBlocks());
        this.actualEnemeis.executeMove();
        return this.checkTurn(oldPos);
    };
    Game.prototype.checkTurn = function (oldMarioPos) {
        var turnResult = TurnResult.ShowMustGoOn;
        var marioBullets = this.mario.getBullets();
        var rectMario = this.mario.getMarioRect();
        var gameOver = false;
        var gameWon = false;
        this.checkTakeCoin(rectMario);
        gameWon = this.checkWon();
        if (this.enemies != null && !gameWon) {
            var rectsEnemy = this.actualEnemeis.getEnemyRect();
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
    };
    Game.prototype.checkRemoveBullets = function () {
        var bullets = this.mario.getBullets();
        for (var i = 0; i < bullets.length; i++) {
            var singleBullet = bullets[i];
            if (singleBullet.getA().getX() > this.widthAmbient || singleBullet.getB().getX() < 0)
                this.mario.deleteBulletsByIndex(i);
        }
    };
    Game.prototype.checkGameOver = function (rectMario, rectsEnemy) {
        var gameOver = false;
        for (var i = 0; i < rectsEnemy.length && !gameOver; i++) {
            if (rectMario.intersectRect(rectsEnemy[i])) {
                gameOver = true;
            }
        }
        return gameOver;
    };
    Game.prototype.checkWon = function () {
        var gameWon = false;
        if (this.mario.isMarioInternalRight(this.getWidthAmbient()) && this.getNextAmbient() == null) {
            gameWon = true;
        }
        return gameWon;
    };
    Game.prototype.checkTakeCoin = function (rectMario) {
        var rectCoins = this.coinsManager.getCoinsRect();
        for (var i = 0; i < rectCoins.length; i++) {
            if (rectMario.intersectRect(rectCoins[i])) {
                this.scoreManager.takeCoin();
                this.coinsManager.coinSound();
                this.coinsManager.deletCoinByIndex(i);
            }
        }
    };
    Game.prototype.checkBulletsExplosion = function (marioBullets, rectsEnemy) {
        var vaI = -1;
        var vaK = -1;
        for (var k = 0; k < rectsEnemy.length; k++) {
            var singleRect = rectsEnemy[k];
            var _loop_1 = function (i) {
                if (marioBullets[i].intersectRect(singleRect)) {
                    vaI = i;
                    vaK = k;
                    this_1.explosion = new Explosion(singleRect);
                    this_1.explosionSound();
                    this_1.scoreManager.deleteEnemies();
                    var myThis_1 = this_1;
                    setTimeout(function () {
                        myThis_1.explosion = null;
                    }, 500);
                }
            };
            var this_1 = this;
            for (var i = 0; i < marioBullets.length; i++) {
                _loop_1(i);
            }
            if (vaI > -1)
                this.mario.deleteBulletsByIndex(vaI);
        }
        if (vaK > -1) {
            this.actualEnemeis.deleteEnemyesByIndex(vaK);
        }
    };
    Game.prototype.marioMoveOnKeyDown = function (e) {
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
    };
    Game.prototype.marioMoveOnKeyUp = function (e) {
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
    };
    return Game;
}());
var Explosion = (function () {
    function Explosion(enemy) {
        this.indiceColumn = 0;
        this.indiceRow = 0;
        this.enemy = enemy;
        this.enemy.setImage("../supermario/Resources/Img/explosion.png");
        this.keepImage = 20;
    }
    Explosion.prototype.draw = function (context) {
        var sX = this.indiceColumn * 127;
        var sY = this.indiceRow * 125;
        if (this.keepImage == 0) {
            if (this.indiceColumn == 3 && this.indiceRow == 3) {
                this.indiceRow = 0;
                this.indiceColumn = 0;
            }
            else if (this.indiceColumn == 3) {
                this.indiceColumn = 0;
                this.indiceRow++;
            }
            else {
                this.indiceColumn++;
            }
            if (this.keepImage == 0)
                this.keepImage = 20;
        }
        else {
            this.keepImage--;
        }
        context.drawImage(this.enemy.getImage(), sX, sY, 127, 125, this.enemy.getOrigin().getX(), this.enemy.getOrigin().getY(), this.enemy.getWidth(), this.enemy.getHeight());
    };
    return Explosion;
}());
var Main = (function () {
    function Main() {
        this.itemsManager = new ItemManager();
        this.moveSelectedItem = false;
        var c = document.getElementById("myCanvas");
        this.canvas = c;
        var ctx = this.canvas.getContext("2d");
        this.context = ctx;
        var myThis = this;
        this.canvas.addEventListener("mousemove", function (e) {
            myThis.onMouseMove(e);
        });
        this.canvas.addEventListener("mousedown", function (e) {
            myThis.onMouseDown(e);
        });
        this.canvas.addEventListener("mouseup", function (e) {
            myThis.onMouseUp(e);
        });
        document.addEventListener("keydown", function (event) {
            myThis.onKeyDown(event);
        });
        document.addEventListener("keyup", function (event) {
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
        this.gameWonImg.width = window.innerWidth;
        this.gameWonImg.height = window.innerHeight;
    }
    Main.prototype.onKeyDown = function (e) {
        this.game.marioMoveOnKeyDown(e);
    };
    Main.prototype.onKeyUp = function (e) {
        this.game.marioMoveOnKeyUp(e);
    };
    Main.prototype.start = function () { };
    Main.prototype.addTriangle = function () {
        var aX = document.getElementById("aX").value;
        aX = Number(aX);
        var aY = document.getElementById("aY").value;
        aY = Number(aY);
        var bX = document.getElementById("bX").value;
        bX = Number(bX);
        var bY = document.getElementById("bY").value;
        bY = Number(bY);
        var cX = document.getElementById("cX").value;
        cX = Number(cX);
        var cY = document.getElementById("cY").value;
        cY = Number(cY);
        var a2 = new Pt2D(aX, aY);
        var b2 = new Pt2D(bX, bY);
        var c2 = new Pt2D(cX, cY);
        var t = new Triangle(a2, b2, c2);
        this.itemsManager.addItem(t);
        this.itemsManager.draw(this.context);
    };
    Main.prototype.addCircle = function () {
        var cenX = document.getElementById("cenX").value;
        cenX = Number(cenX);
        var cenY = document.getElementById("cenY").value;
        cenY = Number(cenY);
        var rY = document.getElementById("rY").value;
        rY = Number(rY);
        var center1 = new Pt2D(cenX, cenY);
        var circle1 = new Circle(center1, rY);
        this.itemsManager.addItem(circle1);
        this.itemsManager.draw(this.context);
    };
    Main.prototype.addRectangle = function () {
        var originX = document.getElementById("originX").value;
        originX = Number(originX);
        var originY = document.getElementById("originY").value;
        originY = Number(originY);
        var height = document.getElementById("height").value;
        height = Number(height);
        var width = document.getElementById("width").value;
        width = Number(width);
        var origin = new Pt2D(originX, originY);
        var rectangle = new Rectangle(height, width, origin);
        this.itemsManager.addItem(rectangle);
        this.itemsManager.draw(this.context);
    };
    Main.prototype.clearCanvas = function () {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    };
    Main.prototype.removeLastItem = function () {
        this.itemsManager.removeLastItem();
    };
    Main.prototype.removeItemByIndex = function () {
        var removeItem = document.getElementById("removeItem").value;
        removeItem = Number(removeItem);
        this.itemsManager.removeItemByIndex(removeItem);
    };
    Main.prototype.moveLastItemOnPoint = function () {
        var moveX = document.getElementById("moveX").value;
        moveX = Number(moveX);
        var moveY = document.getElementById("moveY").value;
        moveY = Number(moveY);
        var centerMove = new Pt2D(moveX, moveY);
        this.itemsManager.moveLastItemOnPoint(centerMove);
    };
    Main.prototype.onMouseMove = function (e) {
        var mousePos = new Pt2D(e.offsetX, e.offsetY);
        this.itemsManager.onHover(mousePos);
        if (this.moveSelectedItem == true) {
            this.itemsManager.moveSelectItemOnPoint(mousePos);
        }
    };
    Main.prototype.onMouseDown = function (e) {
        var mousePoint = new Pt2D(e.offsetX, e.offsetY);
        var pointedItem = this.itemsManager.getPointedItem(mousePoint);
        if (pointedItem)
            this.itemsManager.selectItem(pointedItem);
        else
            this.itemsManager.deselectItem();
        if (pointedItem) {
            this.moveSelectedItem = true;
        }
        else {
            this.itemsManager.deselectItem();
        }
    };
    Main.prototype.onMouseUp = function (e) {
        this.moveSelectedItem = false;
    };
    Main.prototype.loadGame = function (json) {
        this.map(this.canvas.clientWidth, this.canvas.clientHeight, json);
        var myThis = this;
        this.intervalDraw = setInterval(function () {
            myThis.clearCanvas();
            myThis.game.draw(myThis.context);
        });
        this.intervalMove = setInterval(function () {
            var turnResult = myThis.game.executeTurn();
            switch (turnResult) {
                case (TurnResult.Lose):
                    myThis.stopGame();
                    break;
                case (TurnResult.Win):
                    myThis.win();
            }
        }, 33);
    };
    Main.prototype.stopGame = function () {
        clearInterval(this.intervalMove);
        clearInterval(this.intervalDraw);
        this.drawGameOver(this.context);
        var gameOverAudio = new Audio("../supermario/Resources/Audio/loseSound.mp3");
        gameOverAudio.play();
    };
    Main.prototype.win = function () {
        clearInterval(this.intervalMove);
        clearInterval(this.intervalDraw);
        this.drawGameWon(this.context);
        var gameOverAudio = new Audio("../supermario/Resources/Audio/victory.mp3");
        gameOverAudio.play();
    };
    Main.prototype.map = function (widthAmbient, heightAmbient, json) {
        var maps = json.maps;
        var ambients = [];
        var enemiesOfEnemies = [];
        var marioJson = json.defaultValues.player;
        for (var i = 0; i < maps.length; i++) {
            var singleMap = maps[i];
            var ambient = Ambient.fromJson(heightAmbient, widthAmbient, singleMap);
            ambients.push(ambient);
            var enemies = Enemies.fromJson(singleMap.enemies, ambient.getHFloorTiles(), heightAmbient, widthAmbient);
            enemiesOfEnemies.push(enemies);
        }
        this.game.setAmbients(ambients);
        this.game.setEnemies(enemiesOfEnemies);
        this.game.setMario(marioJson, heightAmbient, widthAmbient);
    };
    Main.prototype.drawGameOver = function (context) {
        context.drawImage(this.gameOverImg, 0, 0, this.gameOverImg.width, this.gameOverImg.height);
    };
    Main.prototype.drawGameWon = function (context) {
        context.drawImage(this.gameWonImg, 0, 0, this.gameWonImg.width, this.gameWonImg.height);
    };
    return Main;
}());
var main = new Main();
main.start();
fetch("maps.json")
    .then(function (response) { return response.json(); })
    .then(function (json) { return main.loadGame(json); });
//# sourceMappingURL=main.js.map