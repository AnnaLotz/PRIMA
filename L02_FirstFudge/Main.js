"use strict";
///<reference types="../Fudge/FudgeCore.js"/> 
var L02_FirstFudge;
///<reference types="../Fudge/FudgeCore.js"/> 
(function (L02_FirstFudge) {
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
        L02_FirstFudge.viewport = new f.Viewport();
        L02_FirstFudge.viewport.initialize("Viewport", node, camera.getComponent(f.ComponentCamera), canvas);
        f.Debug.log(L02_FirstFudge.viewport);
        L02_FirstFudge.viewport.draw();
    }
})(L02_FirstFudge || (L02_FirstFudge = {}));
//# sourceMappingURL=Main.js.map