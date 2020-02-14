"use strict";
var EscapeTheEdge;
(function (EscapeTheEdge) {
    var f = FudgeCore;
    class Floor extends f.Node {
        constructor() {
            super("Floor");
            this.addComponent(new f.ComponentTransform());
            this.addComponent(new f.ComponentMaterial(Floor.material));
            let cmpMesh = new f.ComponentMesh(Floor.mesh);
            //cmpMesh.pivot.translateY(-0.5);
            cmpMesh.pivot = Floor.pivot;
            this.addComponent(cmpMesh);
        } //close constructor
        createEnemy() {
            let enemy = new EscapeTheEdge.Enemy(this);
            this.enemy = enemy;
            enemy.cmpTransform.local.translation = this.cmpTransform.local.translation;
            EscapeTheEdge.characters.appendChild(enemy);
        }
        getRectWorld() {
            let rect = f.Rectangle.GET(0, 0, 100, 100);
            let topleft = new f.Vector3(-0.5, 0.5, 0);
            let bottomright = new f.Vector3(0.5, -0.5, 0);
            //let pivot: f.Matrix4x4 = this.getComponent(f.ComponentMesh).pivot;
            let mtxResult = f.Matrix4x4.MULTIPLICATION(this.mtxWorld, Floor.pivot);
            topleft.transform(mtxResult, true);
            bottomright.transform(mtxResult, true);
            let size = new f.Vector2(bottomright.x - topleft.x, bottomright.y - topleft.y);
            rect.position = topleft.toVector2();
            rect.size = size;
            return rect;
        } //close getrectWorld
        getTopRectWorld() {
            let rect = f.Rectangle.GET(0, 0, 100, 100);
            let topleft = new f.Vector3(-0.4, 1.5, 0);
            let bottomright = new f.Vector3(0.4, 0, 0);
            //let pivot: f.Matrix4x4 = this.getComponent(f.ComponentMesh).pivot;
            let mtxResult = f.Matrix4x4.MULTIPLICATION(this.mtxWorld, Floor.pivot);
            topleft.transform(mtxResult, true);
            bottomright.transform(mtxResult, true);
            let size = new f.Vector2(bottomright.x - topleft.x, bottomright.y - topleft.y);
            rect.position = topleft.toVector2();
            rect.size = size;
            return rect;
        } //close getTopRectWorld
    } //close class
    Floor.mesh = new f.MeshSprite();
    Floor.material = new f.Material("Floor", f.ShaderUniColor, new f.CoatColored(new f.Color(0.18, 0.18, 0.18, 1)));
    Floor.pivot = f.Matrix4x4.TRANSLATION(f.Vector3.Y(-0.5));
    EscapeTheEdge.Floor = Floor;
})(EscapeTheEdge || (EscapeTheEdge = {})); //close namespace
//# sourceMappingURL=Floor.js.map