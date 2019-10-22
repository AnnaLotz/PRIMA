"use strict";
///<reference types="../Fudge/FudgeCore.js"/> 
var L03_FirstFudge;
///<reference types="../Fudge/FudgeCore.js"/> 
(function (L03_FirstFudge) {
    var f = FudgeCore;
    window.addEventListener("load", handleLoad);
    function handleLoad(_event) {
        const canvas = document.querySelector("canvas");
        f.RenderManager.initialize();
        f.Debug.log(canvas);
        let node = new f.Node("Quad");
        let mesh = new f.MeshQuad();
        let cmpMesh = new f.ComponentMesh(mesh);
        node.addComponent(cmpMesh);
        let mtrSolidWhite = new f.Material("SolidWhite", f.ShaderUniColor, new f.CoatColored(new f.Color(1, 1, 1, 1)));
        let cmpMTR = new f.ComponentMaterial(mtrSolidWhite);
        node.addComponent(cmpMTR);
        //Camera
        let camera = new f.Node("Camera");
        let cmpCam = new f.ComponentCamera();
        camera.addComponent(cmpCam);
        cmpCam.pivot.translateZ(2); //Camera bewegen (um 2 auf der Z-Achse)
        L03_FirstFudge.viewport = new f.Viewport();
        L03_FirstFudge.viewport.initialize("Viewport", node, camera.getComponent(f.ComponentCamera), canvas);
        f.Debug.log(L03_FirstFudge.viewport);
        L03_FirstFudge.viewport.draw();
    }
})(L03_FirstFudge || (L03_FirstFudge = {}));
//# sourceMappingURL=Main.js.map