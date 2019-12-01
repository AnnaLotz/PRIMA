"use strict";
var L09_FudgeCraft_Camera;
(function (L09_FudgeCraft_Camera) {
    var f = FudgeCore;
    class Camera extends f.Node {
        constructor(_maxRotX) {
            super("CameraOrbit");
            let cmpTransform = new f.ComponentTransform();
            this.addComponent(cmpTransform);
            // let rotatorX: f.Node = new f.Node("CameraRotX");
            // rotatorX.addComponent(new f.ComponentTransform());
            // this.appendChild(rotatorX);
            let cmpCamera = new f.ComponentCamera();
            cmpCamera.backgroundColor = f.Color.DARK_GREY;
            this.addComponent(cmpCamera);
            cmpCamera.pivot.translate(new f.Vector3(0, 6, 30));
        } //close constructor    
        // get cmpCamera(): f.ComponentCamera {
        //     let rotatorX: f.Node = this.getChildrenByName("CameraRotX")[0];
        //     return rotatorX.getComponent(f.ComponentCamera);
        // }
        rotate(_direction) {
            // 
        }
        setRotationY(_angle) {
            this.cmpTransform.local.rotation.y = _angle;
            // 
        }
    } //close class Camera
    L09_FudgeCraft_Camera.Camera = Camera;
})(L09_FudgeCraft_Camera || (L09_FudgeCraft_Camera = {})); //namespace zu
//# sourceMappingURL=Camera.js.map