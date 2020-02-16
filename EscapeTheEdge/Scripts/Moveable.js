"use strict";
var EscapeTheEdge;
(function (EscapeTheEdge) {
    var f = FudgeCore;
    class Moveable extends f.Node {
        constructor(_name = "Bobo") {
            super(_name);
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
                let fallingVec = this.cmpTransform.local.translation.toVector2();
                fallingVec.subtract(_distance.toVector2());
                let hit = rect.isInside(fallingVec);
                if (hit) {
                    let translation = this.cmpTransform.local.translation;
                    if (floor instanceof EscapeTheEdge.Wall) {
                        // console.log(floor);
                        // translation.x = + rect.width;
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
            // for (let floor of level.getChildren()) {
            //     let rect: f.Rectangle = (<Floor>floor).getRectWorld();
            //     //console.log(rect.toString());
            //     let hit: boolean = rect.isInside(this.cmpTransform.local.translation.toVector2());
            //     if (hit) {
            //         //rect Oberfläche prüfen:
            //         let rectTop: f.Rectangle = (<Floor>floor).getRectTopWorld();
            //         let hitTop: boolean = rectTop.isInside(this.cmpTransform.local.translation.toVector2());
            //         let rectBottom: f.Rectangle = (<Floor>floor).getRectBottomWorld();
            //         let hitBottom: boolean = rectBottom.isInside(this.cmpTransform.local.translation.toVector2());
            //         // console.log(hitBottom);
            //         if (hitTop) {
            //             if (this.speed.y < -0.01) {
            //                 let translation: f.Vector3 = this.cmpTransform.local.translation;
            //                 translation.y = rect.y;
            //                 this.cmpTransform.local.translation = translation;
            //                 this.speed.y = 0;
            //             }
            //         } else if (hitBottom) {
            //             this.cmpTransform.local.translateY(- _distance.y);
            //             this.speed.y = 0;
            //         } else {
            //             this.cmpTransform.local.translateX(- _distance.x);
            //             this.speed.x = 0;
            //         }
            //     }
        } //close checkCollision
    } //close class
    Moveable.speedMax = new f.Vector2(1.5, 3); // units per second
    Moveable.gravity = f.Vector2.Y(-3);
    EscapeTheEdge.Moveable = Moveable;
})(EscapeTheEdge || (EscapeTheEdge = {})); //close namespace
//# sourceMappingURL=Moveable.js.map