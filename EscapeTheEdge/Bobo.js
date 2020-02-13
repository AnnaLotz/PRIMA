"use strict";
var EscapeTheEdge;
(function (EscapeTheEdge) {
    var f = FudgeCore;
    let ACTION;
    (function (ACTION) {
        ACTION["IDLE"] = "Idle";
        ACTION["WALK"] = "Walk";
        ACTION["JUMP"] = "Jump";
    })(ACTION = EscapeTheEdge.ACTION || (EscapeTheEdge.ACTION = {}));
    let SIZE;
    (function (SIZE) {
        SIZE["SMALL"] = "Small";
        SIZE["MEDIUM"] = "Medium";
        SIZE["BIG"] = "Big";
    })(SIZE = EscapeTheEdge.SIZE || (EscapeTheEdge.SIZE = {}));
    let DIRECTION;
    (function (DIRECTION) {
        DIRECTION[DIRECTION["LEFT"] = 0] = "LEFT";
        DIRECTION[DIRECTION["RIGHT"] = 1] = "RIGHT";
    })(DIRECTION = EscapeTheEdge.DIRECTION || (EscapeTheEdge.DIRECTION = {}));
    class Bobo extends EscapeTheEdge.Moveable {
        constructor(_name = "Bobo") {
            super(_name);
            this.mana = 100;
            this.health = 100;
            // private static sprites: Sprite[];
            this.speedMax = new f.Vector2(1.5, 5); // units per second
            // private static gravity: f.Vector2 = f.Vector2.Y(-3);
            // private action: ACTION;
            // private time: f.Time = new f.Time();
            // public speed: f.Vector3 = f.Vector3.ZERO();
            this.size = SIZE.MEDIUM;
            this.update = (_event) => {
                this.broadcastEvent(new CustomEvent("showNext"));
                let timeFrame = f.Loop.timeFrameGame / 1000;
                this.speed.y += Bobo.gravity.y * timeFrame;
                let distance = f.Vector3.SCALE(this.speed, timeFrame);
                this.cmpTransform.local.translate(distance);
                //mana abzeihen für größe
                if (this.size != SIZE.MEDIUM) {
                    this.mana -= 0.5;
                    console.log("Mana: " + this.mana);
                }
                if (this.mana < 0) {
                    this.mana = 0;
                }
                else if (this.mana > 100) {
                    this.mana = 100;
                }
                this.checkCollision(distance);
                this.checkHit(EscapeTheEdge.characters);
                // this.checkHit(EnemyBullets);
                if (this.health <= 0) {
                    EscapeTheEdge.gameOver();
                }
                else if (this.health >= 100) {
                    this.health = 100;
                }
            }; //close update
            this.addComponent(new f.ComponentTransform());
            for (let sprite of Bobo.sprites) {
                let nodeSprite = new EscapeTheEdge.NodeSprite(sprite.name, sprite);
                nodeSprite.activate(false);
                nodeSprite.addEventListener("showNext", (_event) => { _event.currentTarget.showFrameNext(); }, true);
                this.appendChild(nodeSprite);
            }
            this.show(ACTION.IDLE);
            f.Loop.addEventListener("loopFrame" /* LOOP_FRAME */, this.update);
        } //close constructor
        static generateSprites(_txtImage) {
            Bobo.sprites = [];
            let sprite = new EscapeTheEdge.Sprite(ACTION.WALK);
            sprite.generateByGrid(_txtImage, f.Rectangle.GET(1, 1, 17, 17), 6, new f.Vector2(1, 1), 64, f.ORIGIN2D.BOTTOMCENTER);
            Bobo.sprites.push(sprite);
            sprite = new EscapeTheEdge.Sprite(ACTION.IDLE);
            sprite.generateByGrid(_txtImage, f.Rectangle.GET(1, 18, 17, 17), 7, new f.Vector2(1, 1), 64, f.ORIGIN2D.BOTTOMCENTER);
            Bobo.sprites.push(sprite);
        } //close generate Sprites
        act(_action, _direction) {
            switch (_action) {
                case ACTION.IDLE:
                    this.speed.x = 0;
                    break;
                case ACTION.WALK:
                    let direction = (_direction == DIRECTION.RIGHT ? 1 : -1);
                    this.speed.x = this.speedMax.x; // * direction;
                    this.cmpTransform.local.rotation = f.Vector3.Y(90 - 90 * direction);
                    // console.log(direction);
                    break;
                case ACTION.JUMP:
                    // if (this.speed.y == 0) //für kein doppelSprung
                    this.speed.y = 2;
                    break;
            }
            this.show(_action);
        } //close act
        toSize(_size) {
            if (this.mana <= 0) {
                _size = SIZE.MEDIUM;
            }
            this.size = _size;
            // console.log(this.size);
            switch (_size) {
                case SIZE.MEDIUM:
                    this.cmpTransform.local.scaling = new f.Vector3(1, 1, 1);
                    this.speedMax = new f.Vector2(1, 2);
                    break;
                case SIZE.SMALL:
                    this.cmpTransform.local.scaling = new f.Vector3(0.6, 0.6, 1);
                    this.speedMax = new f.Vector2(5, 1);
                    break;
                case SIZE.BIG:
                    this.cmpTransform.local.scaling = new f.Vector3(1.5, 1.5, 1);
                    this.speedMax = new f.Vector2(0.5, 10);
                    break;
            }
        } //close toSize
        shoot(_direction) {
            console.log("shoot " + _direction);
            this.bullet = new EscapeTheEdge.BoboBullet(_direction);
            EscapeTheEdge.items.appendChild(this.bullet);
            this.mana -= 5;
        } //close shoot
        checkHit(_object) {
            for (let object of _object.getChildren()) {
                if (!(object instanceof Bobo)) {
                    let evilPos = object.cmpTransform.local.translation;
                    let boboPos = this.cmpTransform.local.translation;
                    let dif = f.Vector3.DIFFERENCE(evilPos, boboPos);
                    let distance = Math.abs(Math.sqrt(dif.x * dif.x + dif.y * dif.y + dif.z * dif.z));
                    console.log(distance);
                    if (distance < 0.1) {
                        this.health -= 30;
                    }
                }
            }
        }
    } //close class
    EscapeTheEdge.Bobo = Bobo;
})(EscapeTheEdge || (EscapeTheEdge = {})); //close namespace
//# sourceMappingURL=Bobo.js.map