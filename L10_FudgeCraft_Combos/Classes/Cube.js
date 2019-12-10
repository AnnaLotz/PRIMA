"use strict";
var L10_FudgeCraft_Combos;
(function (L10_FudgeCraft_Combos) {
    var f = FudgeCore;
    class Cube extends f.Node {
        //der constructor nimmt den Vektor von einem Cube entgegen und das Material
        constructor(_position, _mtr) {
            super("Cube" + _mtr); //f.Node constructor vergibt einen simplen Namen
            this.mesh = new f.MeshCube();
            // console.log(this.mtxWorld.translation);
            //Dem Cube die Position geben aus dem Übergabeparameter
            let cmpTransform = new f.ComponentTransform(f.Matrix4x4.TRANSLATION(_position));
            cmpTransform.local.scale(f.Vector3.ONE(0.985)); // um den Würfel bissl zu verkleinern
            this.addComponent(cmpTransform);
            this.transformComp = cmpTransform;
            // console.log(cmpTransform.local.translation);
            //Dem Cube ein mesh- und Material-component anhängen
            let cmpMesh = new f.ComponentMesh(this.mesh);
            this.addComponent(cmpMesh);
            let cmpMaterial = new f.ComponentMaterial(_mtr);
            this.addComponent(cmpMaterial);
            f.RenderManager.update();
        } //close constructor        
    } //close class Cube
    L10_FudgeCraft_Combos.Cube = Cube;
})(L10_FudgeCraft_Combos || (L10_FudgeCraft_Combos = {})); //namespace zu
//# sourceMappingURL=Cube.js.map