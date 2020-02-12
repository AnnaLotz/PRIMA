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
    let DIRECTION;
    (function (DIRECTION) {
        DIRECTION[DIRECTION["LEFT"] = 0] = "LEFT";
        DIRECTION[DIRECTION["RIGHT"] = 1] = "RIGHT";
    })(DIRECTION = EscapeTheEdge.DIRECTION || (EscapeTheEdge.DIRECTION = {}));
    class Bobo extends EscapeTheEdge.Moveable {
        // private static sprites: Sprite[];
        // private static speedMax: f.Vector2 = new f.Vector2(1.5, 5); // units per second
        // private static gravity: f.Vector2 = f.Vector2.Y(-3);
        // private action: ACTION;
        // private time: f.Time = new f.Time();
        // public speed: f.Vector3 = f.Vector3.ZERO();
        constructor(_name = "Bobo") {
            super(_name);
            this.update = (_event) => {
                this.broadcastEvent(new CustomEvent("showNext"));
                let timeFrame = f.Loop.timeFrameGame / 1000;
                this.speed.y += Bobo.gravity.y * timeFrame;
                let distance = f.Vector3.SCALE(this.speed, timeFrame);
                this.cmpTransform.local.translate(distance);
                // console.log(this.speed.y);
                this.checkCollision(distance);
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
        }
        act(_action, _direction) {
            switch (_action) {
                case ACTION.IDLE:
                    this.speed.x = 0;
                    break;
                case ACTION.WALK:
                    let direction = (_direction == DIRECTION.RIGHT ? 1 : -1);
                    this.speed.x = Bobo.speedMax.x; // * direction;
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
    } //close class
    EscapeTheEdge.Bobo = Bobo;
})(EscapeTheEdge || (EscapeTheEdge = {})); //close namespace
//# sourceMappingURL=Bobo.js.map