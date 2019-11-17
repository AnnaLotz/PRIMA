"use strict";
var L08_FudgeCraft;
(function (L08_FudgeCraft) {
    var f = FudgeCore;
    class Cube extends f.Node {
        //der constructor nimmt den Vektor von einem Cube entgegen und das Material
        constructor(_position, _mtr) {
            super("Cube"); //f.Node constructor vergibt einen simplen Namen
            this.mesh = new f.MeshCube();
            //Dem Cube die Position geben aus dem Übergabeparameter
            let cmpTransform = new f.ComponentTransform(f.Matrix4x4.TRANSLATION(_position));
            cmpTransform.local.scale(f.Vector3.ONE(0.8)); // um den Würfel bissl zu verkleinern
            this.addComponent(cmpTransform);
            this.transformComp = cmpTransform;
            //Dem Cube ein mesh- und Material-component anhängen
            let cmpMesh = new f.ComponentMesh(this.mesh);
            this.addComponent(cmpMesh);
            let cmpMaterial = new f.ComponentMaterial(_mtr);
            this.addComponent(cmpMaterial);
        } //close constructor        
    } //close class Cube
    L08_FudgeCraft.Cube = Cube;
})(L08_FudgeCraft || (L08_FudgeCraft = {})); //namespace zu
//# sourceMappingURL=Cube.js.map