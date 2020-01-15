"use strict";
var L11_FudgeCraft_Compression;
(function (L11_FudgeCraft_Compression) {
    var f = FudgeCore;
    class CameraOrbit extends f.Node {
        constructor() {
            super("CameraOrbit");
            let cmpTransform = new f.ComponentTransform();
            this.addComponent(cmpTransform);
            let cmpCam = new f.ComponentCamera();
            cmpCam.pivot.translate(new f.Vector3(0, 7, 30));
            cmpCam.pivot.lookAt(new f.Vector3(0, 7, 0)); // um auf 0|0|0 zu schauen
            cmpCam.backgroundColor = f.Color.CSS("DARK_GREY");
            this.addComponent(cmpCam);
        } //close constructor
        rotate(_direction) {
            // 
        }
        rotateY(_delta) {
            this.cmpTransform.local.rotateY(_delta);
            f.RenderManager.update();
            L11_FudgeCraft_Compression.viewport.draw();
        }
        setRotationY(_angle) {
            this.cmpTransform.local.rotation = f.Vector3.Y(_angle);
            f.RenderManager.update();
            L11_FudgeCraft_Compression.viewport.draw();
        }
    } //close class Camera
    L11_FudgeCraft_Compression.CameraOrbit = CameraOrbit;
})(L11_FudgeCraft_Compression || (L11_FudgeCraft_Compression = {})); //namespace zu
//# sourceMappingURL=Camera.js.map