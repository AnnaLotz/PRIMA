"use strict";
var EscapeTheEdge_Archiv;
(function (EscapeTheEdge_Archiv) {
    var f = FudgeCore;
    class Level extends f.Node {
        constructor(_levelCount) {
            super("Level" + _levelCount);
            this.enemySpawnRate = 0.2;
            this.height = 40;
            this.createLevel();
        } //close Constructor
        createLevel() {
            let floor;
            let wall;
            //Boden+Wände
            floor = new EscapeTheEdge_Archiv.Floor();
            floor.cmpTransform.local.scaleY(2);
            floor.cmpTransform.local.scaleX(5);
            floor.cmpTransform.local.translateY(0);
            floor.createMaterial(this.height);
            this.appendChild(floor);
            wall = new EscapeTheEdge_Archiv.Wall(-1);
            wall.cmpTransform.local.scaleY(this.height * 2);
            wall.cmpTransform.local.scaleX(2);
            wall.cmpTransform.local.translateX(-3);
            wall.cmpTransform.local.translateY(this.height);
            wall.createMaterial(this.height * 2);
            this.appendChild(wall);
            wall = new EscapeTheEdge_Archiv.Wall(1);
            wall.cmpTransform.local.scaleY(this.height * 2);
            wall.cmpTransform.local.scaleX(2);
            wall.cmpTransform.local.translateX(3);
            wall.cmpTransform.local.translateY(this.height);
            wall.createMaterial(this.height * 2);
            this.appendChild(wall);
            for (let i = 0; i <= this.height + 2; i += 0.25) {
                floor = new EscapeTheEdge_Archiv.Floor();
                floor.cmpTransform.local.scaleX(EscapeTheEdge_Archiv.randNumb(0.8, 1.2));
                floor.cmpTransform.local.scaleY(EscapeTheEdge_Archiv.randNumb(0.1, 0.17));
                floor.cmpTransform.local.translateX(EscapeTheEdge_Archiv.randNumb(-1.85, 1.85));
                floor.cmpTransform.local.translateY(EscapeTheEdge_Archiv.randNumb(-0.2, 0.2) + i);
                floor.createMaterial(this.height);
                if (EscapeTheEdge_Archiv.randNumb(0, 1) < this.enemySpawnRate && floor.cmpTransform.local.translation.y >= 0.6 && floor.cmpTransform.local.translation.y <= this.height - 0.2) {
                    floor.createEnemy();
                }
                else if (EscapeTheEdge_Archiv.randNumb(0, 1) < 0.05) {
                    let collectable = new EscapeTheEdge_Archiv.Collectable(EscapeTheEdge_Archiv.COLLECTABLETYPE.MANA);
                    collectable.cmpTransform.local.translation = floor.cmpTransform.local.translation;
                    collectable.cmpTransform.local.translation.y += 0.8;
                    EscapeTheEdge_Archiv.items.appendChild(collectable);
                }
                this.appendChild(floor);
            }
            let goalLine = new f.Node("GoalLine");
            goalLine.addComponent(new f.ComponentTransform);
            goalLine.addComponent(new f.ComponentMaterial(new f.Material("SolidWhite", f.ShaderUniColor, new f.CoatColored(new f.Color(1, 0.3, 0.2, 0.8)))));
            goalLine.addComponent(new f.ComponentMesh(new f.MeshQuad()));
            goalLine.cmpTransform.local.translate(new f.Vector3(0, this.height, -0.01));
            goalLine.getComponent(f.ComponentMesh).pivot.scale(new f.Vector3(10, 0.1, 0));
            EscapeTheEdge_Archiv.rootNode.appendChild(goalLine);
        } //close createLevel
    } //close class
    EscapeTheEdge_Archiv.Level = Level;
})(EscapeTheEdge_Archiv || (EscapeTheEdge_Archiv = {})); //close Namespace
//# sourceMappingURL=Level.js.map