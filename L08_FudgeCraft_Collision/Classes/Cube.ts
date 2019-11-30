namespace L08_FudgeCraft_Collision {
    import f = FudgeCore;

    export class Cube extends f.Node {

        mesh: f.MeshCube = new f.MeshCube();
        transformComp: f.ComponentTransform;
        
        //der constructor nimmt den Vektor von einem Cube entgegen und das Material
        constructor(_position: f.Vector3, _mtr: f.Material) {
            super("Cube" + _mtr); //f.Node constructor vergibt einen simplen Namen

            // console.log(this.mtxWorld.translation);
            //Dem Cube die Position geben aus dem Übergabeparameter
            let cmpTransform: f.ComponentTransform = new f.ComponentTransform(f.Matrix4x4.TRANSLATION(_position));
            cmpTransform.local.scale(f.Vector3.ONE(0.8)); // um den Würfel bissl zu verkleinern
            this.addComponent(cmpTransform);
            this.transformComp = cmpTransform;
            // console.log(cmpTransform.local.translation);

            //Dem Cube ein mesh- und Material-component anhängen
            let cmpMesh: f.ComponentMesh = new f.ComponentMesh(this.mesh);
            this.addComponent(cmpMesh);
            let cmpMaterial: f.ComponentMaterial = new f.ComponentMaterial(_mtr);
            this.addComponent(cmpMaterial);
            f.RenderManager.update();
        } //close constructor        

    } //close class Cube

} //namespace zu