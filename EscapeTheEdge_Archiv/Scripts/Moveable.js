"use strict";
var EscapeTheEdge_Archiv;
(function (EscapeTheEdge_Archiv) {
    var f = FudgeCore;
    class Moveable extends f.Node {
        constructor(_name = "Bobo") {
            super(_name);
            this.speed = f.Vector3.ZERO();
            this.update = (_event) => {
                this.broadcastEvent(new CustomEvent("showNext"));
                let timeFrame = f.Loop.timeFrameGame / 1000;
                let distance = f.Vector3.SCALE(this.speed, timeFrame);
                this.cmpTransform.local.translate(distance);
                this.checkCollision(distance);
            }; //close update
        } //close constructor
        show(_action) {
            if (_action == EscapeTheEdge_Archiv.ACTION.JUMP)
                return;
            for (let child of this.getChildren())
                child.activate(child.name == _action);
        } //close show
        checkCollision(_distance) {
            for (let floor of level.getChildren()) {
                let rect = floor.getRectWorld();
                let fallingVec = this.cmpTransform.local.translation.toVector2();
                fallingVec.subtract(_distance.toVector2());
                let hit = rect.isInside(fallingVec);
                if (hit) {
                    let translation = this.cmpTransform.local.translation;
                    if (floor instanceof EscapeTheEdge_Archiv.Wall) {
                        translation.x = rect.x + (floor.side == 1 ? -0.1 : +rect.width + 0.1);
                        this.speed.x = 0;
                        this.cmpTransform.local.translation = translation;
                    }
                    else if (this.speed.y < 0) {
                        translation.y = rect.y;
                        this.speed.y = 0;
                        this.cmpTransform.local.translation = translation;
                        return true;
                    }
                }
            }
            return false;
        } //close checkCollision
    } //close class
    Moveable.speedMax = new f.Vector2(1.5, 3); // units per second
    Moveable.gravity = f.Vector2.Y(-3);
    EscapeTheEdge_Archiv.Moveable = Moveable;
})(EscapeTheEdge_Archiv || (EscapeTheEdge_Archiv = {})); //close namespace
//# sourceMappingURL=Moveable.js.map