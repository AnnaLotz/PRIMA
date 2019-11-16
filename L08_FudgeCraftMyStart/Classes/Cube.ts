namespace L08_FudgeCraft {
    import f = FudgeCore;

    export class Cube extends f.Node {

        mesh: f.MeshCube = new f.MeshCube();
        
        //der constructor nimmt den Vektor von einem Cube entgegen
        constructor(_position: f.Vector3, _mtr: f.Material) {
            super("Cube"); //f.Node constructor vergibt einen simplen Namen

            //Dem Cube ein mesh- und Material-component anhängen
            let cmpMesh: f.ComponentMesh = new f.ComponentMesh(this.mesh);
            this.addComponent(cmpMesh);
            let cmpMaterial: f.ComponentMaterial = new f.ComponentMaterial(_mtr);
            this.addComponent(cmpMaterial);

            //Dem Cube die Position geben aus dem Übergabeparameter
            let cmpTransform: f.ComponentTransform = new f.ComponentTransform(f.Matrix4x4.TRANSLATION(_position));
            cmpTransform.local.scale(f.Vector3.ONE(0.95)); // um den Würfel bissl zu verkleinern
            this.addComponent(cmpTransform);

        } //close constructor

        

    } //close class Cube

} //namespace zu