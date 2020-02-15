"use strict";
var EscapeTheEdge;
(function (EscapeTheEdge) {
    var f = FudgeCore;
    let STATUS;
    (function (STATUS) {
        STATUS["FLYING"] = "Flying";
        STATUS["EXPLODING"] = "Exploding";
    })(STATUS = EscapeTheEdge.STATUS || (EscapeTheEdge.STATUS = {}));
    class BoboBullet extends f.Node {
        constructor(_direction, _name = "BoboBullet") {
            super(_name);
            this.update = (_event) => {
                this.broadcastEvent(new CustomEvent("showNext"));
                let timeFrame = f.Loop.timeFrameGame / 1000;
                // this.speed.y += Bobo.gravity.y * timeFrame;
                let distance = f.Vector3.SCALE(this.speed, timeFrame);
                this.cmpTransform.local.translate(distance);
                this.checkHit();
            }; //close update
            this.addComponent(new f.ComponentTransform());
            this.direction = _direction;
            this.fetchData();
            this.speed = new f.Vector3(this.direction * this.speedX, 0, 0);
            this.cmpTransform.local.translation = EscapeTheEdge.bobo.cmpTransform.local.translation;
            this.cmpTransform.local.translateY(0.08);
            for (let sprite of BoboBullet.sprites) {
                let nodeSprite = new EscapeTheEdge.NodeSprite(sprite.name, sprite);
                nodeSprite.activate(false);
                nodeSprite.addEventListener("showNext", (_event) => { _event.currentTarget.showFrameNext(); }, true);
                this.appendChild(nodeSprite);
            }
            this.show(STATUS.FLYING);
            setTimeout(() => {
                this.removeBullet();
            }, 5000);
            f.Loop.addEventListener("loopFrame" /* LOOP_FRAME */, this.update);
        } //close constructor
        static generateSprites(_txtImage) {
            BoboBullet.sprites = [];
            let sprite = new EscapeTheEdge.Sprite(STATUS.FLYING);
            sprite.generateByGrid(_txtImage, f.Rectangle.GET(2, 38, 6, 3), 4, new f.Vector2(1, 1), 64, f.ORIGIN2D.BOTTOMCENTER);
            BoboBullet.sprites.push(sprite);
            sprite = new EscapeTheEdge.Sprite(STATUS.EXPLODING);
            sprite.generateByGrid(_txtImage, f.Rectangle.GET(2, 42, 4, 4), 3, new f.Vector2(1, 1), 64, f.ORIGIN2D.BOTTOMCENTER);
            BoboBullet.sprites.push(sprite);
        } //close generate Sprites
        act(_status, _direction) {
            switch (_status) {
                case STATUS.FLYING:
                    // let direction: number = (_direction == DIRECTION.RIGHT ? 1 : -1);
                    // this.speed.x = this.speedMax.x; // * direction;
                    this.cmpTransform.local.rotation = f.Vector3.Y(90 - 90 * this.direction);
                    // console.log(direction);
                    break;
                case STATUS.EXPLODING:
                    // if (this.speed.y == 0) //für kein doppelSprung
                    this.speed = f.Vector3.ZERO();
                    break;
            }
            this.show(_status);
        } //close act
        show(_status) {
            if (_status == STATUS.EXPLODING)
                return;
            for (let child of this.getChildren())
                child.activate(child.name == _status);
        }
        removeBullet() {
            EscapeTheEdge.removeNodeFromNode(this, EscapeTheEdge.items);
        } //close removeBullet
        fetchData() {
            this.speedX = EscapeTheEdge.data[0].bobo[0].bulletSpeed;
        }
        checkHit() {
            let hitEnemy = false;
            for (let enemy of EscapeTheEdge.characters.getChildren()) {
                if (enemy instanceof EscapeTheEdge.Enemy && !hitEnemy && STATUS.FLYING) {
                    let enemyPos = enemy.cmpTransform.local.translation;
                    let bulletPos = this.cmpTransform.local.translation;
                    let dif = f.Vector3.DIFFERENCE(enemyPos, bulletPos);
                    let distance = Math.abs(Math.sqrt(dif.x * dif.x + dif.y * dif.y + dif.z * dif.z));
                    // console.log(distance);
                    if (distance < 0.15) {
                        hitEnemy = true;
                        this.act(STATUS.EXPLODING);
                        // window.setTimeout(this.kill, 2000, enemy);
                        this.kill(enemy);
                        f.Loop.removeEventListener("loopFrame" /* LOOP_FRAME */, this.update);
                        break;
                    }
                    // console.log(enemy);
                }
            }
            for (let floor of EscapeTheEdge.level.getChildren()) {
                let rect = floor.getRectWorld();
                let hit = rect.isInside(this.cmpTransform.local.translation.toVector2());
                if (hit) {
                    console.log("HIT");
                    this.removeBullet();
                    f.Loop.removeEventListener("loopFrame" /* LOOP_FRAME */, this.update);
                    break;
                }
            }
        } // close checkHit
        kill(_enemy) {
            EscapeTheEdge.Sound.play("enemyDeath");
            EscapeTheEdge.characters.removeChild(_enemy);
            this.removeBullet();
        }
    } //close class
    EscapeTheEdge.BoboBullet = BoboBullet;
})(EscapeTheEdge || (EscapeTheEdge = {})); //close Namespace
//# sourceMappingURL=BoboBullet.js.map