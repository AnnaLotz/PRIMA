"use strict";
var L08_FudgeCraft;
(function (L08_FudgeCraft) {
    var f = FudgeCore;
    class CameraOrbit extends f.Node {
        // private camera: f.ComponentCamera;
        constructor(_maxRotX) {
            super("CameraOrbit");
            // rotatorX: f.Node;
            this.maxRotX = 75;
            this.maxRotX = Math.min(_maxRotX, 89);
            let cmpTransform = new f.ComponentTransform();
            this.addComponent(cmpTransform);
            let rotatorX = new f.Node("CameraRotX");
            this.appendChild(rotatorX);
            let cmpCamera = new f.ComponentCamera();
            rotatorX.addComponent(cmpCamera);
            this.setDistance(20);
            cmpCamera.pivot.lookAt(f.Vector3.ZERO());
        } //close constructor    
        get cmpCamera() {
            let rotatorX = this.getChildrenByName("CameraRotX")[0];
            return rotatorX.getComponent(f.ComponentCamera);
        }
        rotateY(_delta) {
            // 
        }
        setRotationY(_angle) {
            this.cmpTransform.local.rotation.y = _angle;
            // 
        }
        rotateX(_delta) {
            // 
        }
        setRotationX(_angle) {
            let rotatorX = this.getChildrenByName("CameraRotX")[0];
            rotatorX.cmpTransform.local.rotation.x = _angle;
            // 
        }
        setDistance(_dist) {
            let newDistance = Math.max(this.minDistance, _dist);
            this.cmpCamera.pivot.translation = f.Vector3.Z(newDistance);
        }
        moveDistance(_delta) {
            this.setDistance(this.cmpCamera.pivot.translation.z + _delta);
            // 
        }
    } //close class Camera
    L08_FudgeCraft.CameraOrbit = CameraOrbit;
})(L08_FudgeCraft || (L08_FudgeCraft = {})); //namespace zu
//# sourceMappingURL=CameraOrbit.js.map