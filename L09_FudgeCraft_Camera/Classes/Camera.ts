namespace L09_FudgeCraft_Camera {
    import f = FudgeCore;

    export class Camera extends f.Node {

        /* private*/ camera: f.ComponentCamera;

        constructor(_maxRotX: number) {
            super("CameraOrbit");

            let cmpTransform: f.ComponentTransform = new f.ComponentTransform();
            this.addComponent(cmpTransform);
           
            // let rotatorX: f.Node = new f.Node("CameraRotX");
            // rotatorX.addComponent(new f.ComponentTransform());
            // this.appendChild(rotatorX);

            let cmpCamera: f.ComponentCamera = new f.ComponentCamera();
            cmpCamera.backgroundColor = f.Color.DARK_GREY;
            this.addComponent(cmpCamera);
            cmpCamera.pivot.translate(new f.Vector3(0, 6, 30));

        } //close constructor    


        // get cmpCamera(): f.ComponentCamera {
        //     let rotatorX: f.Node = this.getChildrenByName("CameraRotX")[0];
        //     return rotatorX.getComponent(f.ComponentCamera);
        // }

        rotate(_direction: Enumerator): void {
            
            // 
        }

        setRotationY(_angle: number): void {
            this.cmpTransform.local.rotation.y = _angle;
            // 
        }

        // rotateX(_delta: number): void {
        //     // 
        // }

        // setRotationX(_angle: number): void {
        //     let rotatorX: f.Node = this.getChildrenByName("CameraRotX")[0];
        //     rotatorX.cmpTransform.local.rotation.x = _angle;
        //     // 
        // }


        // setDistance(_dist: number): void {
        //     let newDistance: number = Math.max(this.minDistance, _dist);
        //     this.cmpCamera.pivot.translation = f.Vector3.Z(newDistance);
        // }

        // moveDistance(_delta: number): void {
        //     this.setDistance(this.cmpCamera.pivot.translation.z + _delta);
        //     // 
        // }


    } //close class Camera

} //namespace zu