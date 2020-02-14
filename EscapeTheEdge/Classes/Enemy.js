"use strict";
var EscapeTheEdge;
(function (EscapeTheEdge) {
    var f = FudgeCore;
    class Enemy extends EscapeTheEdge.Moveable {
        constructor(_floor, _name = "Enemy") {
            super(_name);
            this.update = (_event) => {
                this.broadcastEvent(new CustomEvent("showNext"));
                let timeFrame = f.Loop.timeFrameGame / 1000;
                this.speed.y += Enemy.gravity.y * timeFrame;
                let distance = f.Vector3.SCALE(this.speed, timeFrame);
                this.cmpTransform.local.translate(distance);
                this.checkCollision(distance);
                if (this.outOfWalkingRange())
                    this.changeDirection();
            }; //close update
            this.floor = _floor;
            // this.walkRadius = _floorWidth;
            // console.log(this.walkRadius);
            this.addComponent(new f.ComponentTransform());
            for (let sprite of Enemy.sprites) {
                let nodeSprite = new EscapeTheEdge.NodeSprite(sprite.name, sprite);
                nodeSprite.activate(false);
                nodeSprite.addEventListener("showNext", (_event) => { _event.currentTarget.showFrameNext(); }, true);
                this.appendChild(nodeSprite);
            }
            this.speed.x = EscapeTheEdge.randNumb(0.1, Enemy.speedMax.x);
            if (EscapeTheEdge.randNumb(0, 1) < 0.5)
                this.direction = EscapeTheEdge.DIRECTION.LEFT;
            else
                this.direction = EscapeTheEdge.DIRECTION.LEFT;
            this.act(EscapeTheEdge.ACTION.WALK, this.direction);
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
            let direction = (_direction == EscapeTheEdge.DIRECTION.RIGHT ? 1 : -1);
            switch (_direction) {
                case EscapeTheEdge.DIRECTION.LEFT:
                    this.direction = EscapeTheEdge.DIRECTION.LEFT;
                    this.cmpTransform.local.rotation = f.Vector3.Y(90 - 90 * direction);
                    // console.log(this.speed.x);
                    break;
                case EscapeTheEdge.DIRECTION.RIGHT:
                    this.direction = EscapeTheEdge.DIRECTION.RIGHT;
                    this.cmpTransform.local.rotation = f.Vector3.Y(90 - 90 * direction);
                    break;
            }
            this.show(_action);
        } //close act
        changeDirection() {
            if (this.direction == EscapeTheEdge.DIRECTION.LEFT)
                this.act(EscapeTheEdge.ACTION.WALK, EscapeTheEdge.DIRECTION.RIGHT);
            else if (this.direction == EscapeTheEdge.DIRECTION.RIGHT)
                this.act(EscapeTheEdge.ACTION.WALK, EscapeTheEdge.DIRECTION.LEFT);
        } //close changedirection
        checkCollision(_distance) {
            let rect = this.floor.getRectWorld();
            let fallingVec = this.cmpTransform.local.translation.toVector2();
            fallingVec.subtract(_distance.toVector2());
            let hit = rect.isInside(fallingVec);
            if (hit) {
                let translation = this.cmpTransform.local.translation;
                translation.y = rect.y;
                this.speed.y = 0;
                this.cmpTransform.local.translation = translation;
                return true;
            }
            return false;
        } //close checkCollision
        outOfWalkingRange() {
            // let hitNothing: boolean = true;
            let rect = (this.floor).getTopRectWorld();
            let hit = rect.isInside(this.cmpTransform.local.translation.toVector2());
            if (hit) {
                // hitNothing = false;
                return false;
            }
            // console.log("Out of walking range");
            return true;
        }
    } //close class
    // private static sprites: Sprite[];
    Enemy.speedMax = new f.Vector2(0.2, 2); // units per second
    EscapeTheEdge.Enemy = Enemy;
})(EscapeTheEdge || (EscapeTheEdge = {})); //close namespace
//# sourceMappingURL=Enemy.js.map