"use strict";
var EscapeTheEdge_Archiv;
(function (EscapeTheEdge_Archiv) {
    var f = FudgeCore;
    class Floor extends f.Node {
        constructor() {
            super("Floor");
            this.addComponent(new f.ComponentTransform());
            let cmpMesh = new f.ComponentMesh(Floor.mesh);
            cmpMesh.pivot = Floor.pivot;
            this.addComponent(cmpMesh);
        } //close constructor
        createMaterial(_levelHeight) {
            if (this.cmpTransform.local.translation.y >= _levelHeight - 5)
                this.addComponent(new f.ComponentMaterial(Floor.goalMaterial));
            else
                this.addComponent(new f.ComponentMaterial(Floor.material));
        } //close createMaterial
        createEnemy() {
            let enemy = new EscapeTheEdge_Archiv.Enemy(this);
            this.enemy = enemy;
            enemy.cmpTransform.local.translation = this.cmpTransform.local.translation;
            enemy.cmpTransform.local.translateX(0.2);
            EscapeTheEdge_Archiv.characters.appendChild(enemy);
        } //close createEnemy
        getRectWorld() {
            let rect = f.Rectangle.GET(0, 0, 100, 100);
            let topleft = new f.Vector3(-0.5, 0.5, 0);
            let bottomright = new f.Vector3(0.5, -0.5, 0);
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
    Floor.material = new f.Material("Floor", f.ShaderUniColor, new f.CoatColored(new f.Color(0.1, 0.1, 0.1, 1)));
    Floor.goalMaterial = new f.Material("Floor", f.ShaderUniColor, new f.CoatColored(new f.Color(1, 0.9, 0.25, 0.8)));
    Floor.pivot = f.Matrix4x4.TRANSLATION(f.Vector3.Y(-0.5));
    EscapeTheEdge_Archiv.Floor = Floor;
})(EscapeTheEdge_Archiv || (EscapeTheEdge_Archiv = {})); //close namespace
//# sourceMappingURL=Floor.js.map