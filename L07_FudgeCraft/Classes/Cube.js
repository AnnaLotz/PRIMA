"use strict";
var L07_FudgeCraft;
(function (L07_FudgeCraft) {
    var f = FudgeCore;
    class Cube extends f.Node {
        //der constructor nimmt den Vektor von einem Cube entgegen
        constructor(_position) {
            super("Cube"); //f.Node constructor vergibt einen simplen Namen
            this.mesh = new f.MeshCube();
            this.material = new f.Material("SolidWhite", f.ShaderFlat, new f.CoatColored(new f.Color(1, 1, 1, 1)));
            //Dem Cube ein mesh- und Material-component anhängen
            let cmpMesh = new f.ComponentMesh(this.mesh);
            this.addComponent(cmpMesh);
            let cmpMaterial = new f.ComponentMaterial(this.material);
            this.addComponent(cmpMaterial);
            //Dem Cube die Position geben aus dem Übergabeparameter
            let cmpTransform = new f.ComponentTransform(f.Matrix4x4.TRANSLATION(_position));
            cmpTransform.local.scale(f.Vector3.ONE(0.95)); // um den Würfel bissl zu verkleinern
            this.addComponent(cmpTransform);
        } //close constructor
    } //close class Cube
    L07_FudgeCraft.Cube = Cube;
})(L07_FudgeCraft || (L07_FudgeCraft = {})); //namespace zu
//# sourceMappingURL=Cube.js.map