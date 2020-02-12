"use strict";
var EscapeTheEdge;
(function (EscapeTheEdge) {
    var f = FudgeCore;
    let ENEMYACTION;
    (function (ENEMYACTION) {
        ENEMYACTION["IDLE"] = "Idle";
        ENEMYACTION["WALK"] = "Walk";
        ENEMYACTION["JUMP"] = "Jump";
    })(ENEMYACTION = EscapeTheEdge.ENEMYACTION || (EscapeTheEdge.ENEMYACTION = {}));
    let ENEMYDIRECTION;
    (function (ENEMYDIRECTION) {
        ENEMYDIRECTION[ENEMYDIRECTION["LEFT"] = 0] = "LEFT";
        ENEMYDIRECTION[ENEMYDIRECTION["RIGHT"] = 1] = "RIGHT";
    })(ENEMYDIRECTION = EscapeTheEdge.ENEMYDIRECTION || (EscapeTheEdge.ENEMYDIRECTION = {}));
    class Enemy extends EscapeTheEdge.Moveable {
        // private static sprites: Sprite[];
        // private static speedMax: f.Vector2 = new f.Vector2(1.5, 5); // units per second
        // private static gravity: f.Vector2 = f.Vector2.Y(-3);
        // private action: ACTION;
        // private time: f.Time = new f.Time();
        // public speed: f.Vector3 = f.Vector3.ZERO();
        constructor(_name = "Enemy") {
            super(_name);
            this.update = (_event) => {
                this.broadcastEvent(new CustomEvent("showNext"));
                let timeFrame = f.Loop.timeFrameGame / 1000;
                this.speed.y += Enemy.gravity.y * timeFrame;
                let distance = f.Vector3.SCALE(this.speed, timeFrame);
                this.cmpTransform.local.translate(distance);
                this.checkCollision(distance);
            }; //close update
            this.addComponent(new f.ComponentTransform());
            for (let sprite of Enemy.sprites) {
                let nodeSprite = new EscapeTheEdge.NodeSprite(sprite.name, sprite);
                nodeSprite.activate(false);
                nodeSprite.addEventListener("showNext", (_event) => { _event.currentTarget.showFrameNext(); }, true);
                this.appendChild(nodeSprite);
            }
            this.cmpTransform.local.scaling = new f.Vector3(1, 1, 1);
            this.show(EscapeTheEdge.ACTION.IDLE);
            f.Loop.addEventListener("loopFrame" /* LOOP_FRAME */, this.update);
        } //close constructor
        static generateSprites(_txtImage) {
            Enemy.sprites = [];
            let sprite = new EscapeTheEdge.Sprite(EscapeTheEdge.ACTION.WALK);
            sprite.generateByGrid(_txtImage, f.Rectangle.GET(1, 54, 17, 13), 6, new f.Vector2(1, 1), 64, f.ORIGIN2D.BOTTOMCENTER);
            Enemy.sprites.push(sprite);
            sprite = new EscapeTheEdge.Sprite(EscapeTheEdge.ACTION.IDLE);
            sprite.generateByGrid(_txtImage, f.Rectangle.GET(1, 54, 17, 13), 4, new f.Vector2(1, 1), 64, f.ORIGIN2D.BOTTOMCENTER);
            Enemy.sprites.push(sprite); //(1, 68, 17, 14), 2
        } //close generateSprites
        act(_action, _direction) {
            switch (_action) {
                case EscapeTheEdge.ACTION.IDLE:
                    this.speed.x = 0;
                    break;
                case EscapeTheEdge.ACTION.WALK:
                    let direction = (_direction == EscapeTheEdge.DIRECTION.RIGHT ? 1 : -1);
                    this.speed.x = Enemy.speedMax.x; // * direction;
                    this.cmpTransform.local.rotation = f.Vector3.Y(90 - 90 * direction);
                    // console.log(direction);
                    break;
                case EscapeTheEdge.ACTION.JUMP:
                    this.speed.y = 2;
                    break;
            }
            this.show(_action);
        } //close act
    } //close class
    EscapeTheEdge.Enemy = Enemy;
})(EscapeTheEdge || (EscapeTheEdge = {})); //close namespace
//# sourceMappingURL=Enemy.js.map