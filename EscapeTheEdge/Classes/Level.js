"use strict";
var EscapeTheEdge;
(function (EscapeTheEdge) {
    var f = FudgeCore;
    class Level extends f.Node {
        constructor(_levelCount) {
            super("Level" + _levelCount);
            this.height = 20;
            this.createLevel();
        } //close Constructor
        createLevel() {
            let floor;
            let wall;
            //Boden+Wände
            floor = new EscapeTheEdge.Floor();
            floor.cmpTransform.local.scaleY(2);
            floor.cmpTransform.local.scaleX(5);
            floor.cmpTransform.local.translateY(0);
            this.appendChild(floor);
            // floor.createEnemy();
            wall = new EscapeTheEdge.Wall(-1);
            wall.cmpTransform.local.scaleY(this.height);
            wall.cmpTransform.local.scaleX(2);
            wall.cmpTransform.local.translateX(-3);
            wall.cmpTransform.local.translateY(this.height - 2);
            this.appendChild(wall);
            wall = new EscapeTheEdge.Wall(1);
            wall.cmpTransform.local.scaleY(this.height);
            wall.cmpTransform.local.scaleX(2);
            wall.cmpTransform.local.translateX(3);
            wall.cmpTransform.local.translateY(this.height - 2);
            this.appendChild(wall);
            for (let i = 0; i <= this.height; i += 0.25) {
                floor = new EscapeTheEdge.Floor();
                // floor.cmpTransform.local.scaleX(this.randNumb(0.5, 3));
                floor.cmpTransform.local.scaleY(EscapeTheEdge.randNumb(0.08, 0.17));
                floor.cmpTransform.local.translateX(EscapeTheEdge.randNumb(-1.9, 1.9));
                floor.cmpTransform.local.translateY(EscapeTheEdge.randNumb(-0.2, 0.2) + i);
                if (EscapeTheEdge.randNumb(0, 10) < 2 && floor.cmpTransform.local.translation.y >= 0.8) {
                    // if (i == 0.4) {
                    floor.createEnemy();
                }
                this.appendChild(floor);
            }
            // for (let i: number = 2; i <= this.lenght; i += 2) {
            //     console.log(i);
            //     floor = new Floor();
            //     floor.cmpTransform.local.scaleX(this.randNumb(0.2, 1));
            //     floor.cmpTransform.local.scaleY(this.randNumb(0.2, 1));
            //     floor.cmpTransform.local.translateX(this.randNumb(-0.5, 0.5) + i);
            //     floor.cmpTransform.local.translateY(this.randNumb(0.1, 2));
            //     this.appendChild(floor);
            // }
        } //close createLevel
    } //close class
    EscapeTheEdge.Level = Level;
})(EscapeTheEdge || (EscapeTheEdge = {})); //close Namespace
//# sourceMappingURL=Level.js.map