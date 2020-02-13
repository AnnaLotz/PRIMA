"use strict";
var EscapeTheEdge;
(function (EscapeTheEdge) {
    var f = FudgeCore;
    class Moveable extends f.Node {
        constructor(_name = "Bobo") {
            super(_name);
            // private action: ACTION;
            // private time: f.Time = new f.Time();
            this.speed = f.Vector3.ZERO();
            this.update = (_event) => {
                this.broadcastEvent(new CustomEvent("showNext"));
                let timeFrame = f.Loop.timeFrameGame / 1000;
                // this.speed.y += Bobo.gravity.y * timeFrame;
                let distance = f.Vector3.SCALE(this.speed, timeFrame);
                this.cmpTransform.local.translate(distance);
                this.checkCollision(distance);
            }; //close update
        } //close constructor
        show(_action) {
            if (_action == EscapeTheEdge.ACTION.JUMP)
                return;
            for (let child of this.getChildren())
                child.activate(child.name == _action);
            // this.action = _action;
        }
        checkCollision(_distance) {
            for (let floor of EscapeTheEdge.level.getChildren()) {
                let rect = floor.getRectWorld();
                //console.log(rect.toString());
                let hit = rect.isInside(this.cmpTransform.local.translation.toVector2());
                if (hit) {
                    //rect Oberfläche prüfen:
                    let rectTop = floor.getRectTopWorld();
                    let hitTop = rectTop.isInside(this.cmpTransform.local.translation.toVector2());
                    let rectBottom = floor.getRectBottomWorld();
                    let hitBottom = rectBottom.isInside(this.cmpTransform.local.translation.toVector2());
                    // console.log(hitBottom);
                    if (hitTop) {
                        if (this.speed.y < -0.01) {
                            let translation = this.cmpTransform.local.translation;
                            translation.y = rect.y;
                            this.cmpTransform.local.translation = translation;
                            this.speed.y = 0;
                        }
                    }
                    else if (hitBottom) {
                        this.cmpTransform.local.translateY(-_distance.y - 0.2);
                        this.speed.y = 0;
                    }
                    else {
                        this.cmpTransform.local.translateX(-_distance.x);
                    }
                }
            }
        } //close checkCollision
    } //close class
    Moveable.speedMax = new f.Vector2(1.5, 3); // units per second
    Moveable.gravity = f.Vector2.Y(-3);
    EscapeTheEdge.Moveable = Moveable;
})(EscapeTheEdge || (EscapeTheEdge = {})); //close namespace
//# sourceMappingURL=Moveable.js.map