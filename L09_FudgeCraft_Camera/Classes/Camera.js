"use strict";
var L09_FudgeCraft_Camera;
(function (L09_FudgeCraft_Camera) {
    var f = FudgeCore;
    class CameraOrbit extends f.Node {
        constructor() {
            super("CameraOrbit");
            let cmpTransform = new f.ComponentTransform();
            this.addComponent(cmpTransform);
            let cmpCam = new f.ComponentCamera();
            cmpCam.pivot.translate(new f.Vector3(-0.5, 6, 30));
            cmpCam.pivot.lookAt(new f.Vector3(0, 6, 0)); // um auf 0|0|0 zu schauen
            cmpCam.backgroundColor = f.Color.DARK_GREY;
            this.addComponent(cmpCam);
        } //close constructor    
        // get cmpCamera(): f.ComponentCamera {
        //     let rotatorX: f.Node = this.getChildrenByName("CameraRotX")[0];
        //     return rotatorX.getComponent(f.ComponentCamera);
        // }
        rotate(_direction) {
            // 
        }
        rotateY(_delta) {
            this.cmpTransform.local.rotateY(_delta);
        }
        setRotationY(_angle) {
            this.cmpTransform.local.rotation.y = _angle;
            // 
        }
    } //close class Camera
    L09_FudgeCraft_Camera.CameraOrbit = CameraOrbit;
})(L09_FudgeCraft_Camera || (L09_FudgeCraft_Camera = {})); //namespace zu
//# sourceMappingURL=Camera.js.map