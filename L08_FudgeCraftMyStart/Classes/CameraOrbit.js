"use strict";
var L08_FudgeCraft_Collision;
(function (L08_FudgeCraft_Collision) {
    var f = FudgeCore;
    class CameraOrbit extends f.Node {
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
    L08_FudgeCraft_Collision.CameraOrbit = CameraOrbit;
})(L08_FudgeCraft_Collision || (L08_FudgeCraft_Collision = {})); //namespace zu
//# sourceMappingURL=CameraOrbit.js.map