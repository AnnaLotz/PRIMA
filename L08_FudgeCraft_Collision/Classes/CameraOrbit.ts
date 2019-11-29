namespace L08_FudgeCraft_Collision {
    import f = FudgeCore;

    export class CameraOrbit extends f.Node {

        // rotatorX: f.Node;
        maxRotX: number = 75;
        minDistance: number;
        /* private*/ camera: f.ComponentCamera;

        constructor(_maxRotX: number) {
            super("CameraOrbit");

            this.maxRotX = Math.min(_maxRotX, 89);

            let cmpTransform: f.ComponentTransform = new f.ComponentTransform();
            this.addComponent(cmpTransform);
            let rotatorX: f.Node = new f.Node("CameraRotX");
            this.appendChild(rotatorX);

            let cmpCamera: f.ComponentCamera = new f.ComponentCamera();
            rotatorX.addComponent(cmpCamera);
            this.setDistance(20);
            cmpCamera.pivot.lookAt(f.Vector3.ZERO());

        } //close constructor    


        get cmpCamera(): f.ComponentCamera {
            let rotatorX: f.Node = this.getChildrenByName("CameraRotX")[0];
            return rotatorX.getComponent(f.ComponentCamera);
        }

        rotateY(_delta: number): void {
            // 
        }

        setRotationY(_angle: number): void {
            this.cmpTransform.local.rotation.y = _angle;
            // 
        }

        rotateX(_delta: number): void {
            // 
        }

        setRotationX(_angle: number): void {
            let rotatorX: f.Node = this.getChildrenByName("CameraRotX")[0];
            rotatorX.cmpTransform.local.rotation.x = _angle;
            // 
        }


        setDistance(_dist: number): void {
            let newDistance: number = Math.max(this.minDistance, _dist);
            this.cmpCamera.pivot.translation = f.Vector3.Z(newDistance);
        }

        moveDistance(_delta: number): void {
            this.setDistance(this.cmpCamera.pivot.translation.z + _delta);
            // 
        }


    } //close class Camera

} //namespace zu