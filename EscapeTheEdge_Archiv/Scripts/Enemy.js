"use strict";
var EscapeTheEdge_Archiv;
(function (EscapeTheEdge_Archiv) {
    var f = FudgeCore;
    class Enemy extends EscapeTheEdge_Archiv.Moveable {
        constructor(_floor, _name = "Enemy") {
            super(_name);
            this.update = (_event) => {
                this.broadcastEvent(new CustomEvent("showNext"));
                let timeFrame = f.Loop.timeFrameGame / 1000;
                this.speed.y += Enemy.gravity.y * timeFrame;
                let distance = f.Vector3.SCALE(this.speed, timeFrame);
                let halfDist = new f.Vector3(distance.x / 2, distance.y / 2, distance.z / 2);
                this.cmpTransform.local.translate(distance);
                this.checkCollision(halfDist);
                this.checkCollision(distance);
                //enemies fallen trotzdem oft herunter... 
                //vllt. weil die Rects zu weit entfernt sind und nicht berechnet werden?
                if (this.outOfWalkingRange())
                    this.changeDirection();
            }; //close update
            this.floor = _floor;
            this.addComponent(new f.ComponentTransform());
            this.fetchData();
            for (let sprite of Enemy.sprites) {
                let nodeSprite = new EscapeTheEdge_Archiv.NodeSprite(sprite.name, sprite);
                nodeSprite.activate(false);
                nodeSprite.addEventListener("showNext", (_event) => { _event.currentTarget.showFrameNext(); }, true);
                this.appendChild(nodeSprite);
            }
            this.speed.x = randNumb(0.1, Enemy.speedMax.x);
            if (randNumb(0, 1) < 0.5)
                this.direction = EscapeTheEdge_Archiv.DIRECTION.LEFT;
            else
                this.direction = EscapeTheEdge_Archiv.DIRECTION.LEFT;
            this.act(EscapeTheEdge_Archiv.ACTION.WALK, this.direction);
            f.Loop.addEventListener("loopFrame" /* LOOP_FRAME */, this.update);
        } //close constructor
        static generateSprites(_txtImage) {
            Enemy.sprites = [];
            let sprite = new EscapeTheEdge_Archiv.Sprite(EscapeTheEdge_Archiv.ACTION.WALK);
            sprite.generateByGrid(_txtImage, f.Rectangle.GET(1, 54, 17, 13), 6, new f.Vector2(1, 1), 64, f.ORIGIN2D.BOTTOMCENTER);
            Enemy.sprites.push(sprite);
        } //close generateSprites
        act(_action, _direction) {
            let direction = (_direction == EscapeTheEdge_Archiv.DIRECTION.RIGHT ? 1 : -1);
            switch (_direction) {
                case EscapeTheEdge_Archiv.DIRECTION.LEFT:
                    this.direction = EscapeTheEdge_Archiv.DIRECTION.LEFT;
                    this.cmpTransform.local.rotation = f.Vector3.Y(90 - 90 * direction);
                    break;
                case EscapeTheEdge_Archiv.DIRECTION.RIGHT:
                    this.direction = EscapeTheEdge_Archiv.DIRECTION.RIGHT;
                    this.cmpTransform.local.rotation = f.Vector3.Y(90 - 90 * direction);
                    break;
            }
            this.show(_action);
        } //close act
        fetchData() {
            this.speedMax = new f.Vector2(data[0].enemy[0].speedMaxX, 2);
        }
        changeDirection() {
            if (this.direction == EscapeTheEdge_Archiv.DIRECTION.LEFT)
                this.act(EscapeTheEdge_Archiv.ACTION.WALK, EscapeTheEdge_Archiv.DIRECTION.RIGHT);
            else if (this.direction == EscapeTheEdge_Archiv.DIRECTION.RIGHT)
                this.act(EscapeTheEdge_Archiv.ACTION.WALK, EscapeTheEdge_Archiv.DIRECTION.LEFT);
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
            let rect = (this.floor).getTopRectWorld();
            let hit = rect.isInside(this.cmpTransform.local.translation.toVector2());
            if (hit) {
                return false;
            }
            return true;
        } //close outofwalkingRange
    } //close class
    EscapeTheEdge_Archiv.Enemy = Enemy;
})(EscapeTheEdge_Archiv || (EscapeTheEdge_Archiv = {})); //close namespace
//# sourceMappingURL=Enemy.js.map