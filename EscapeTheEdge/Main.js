"use strict";
///<reference types="../Fudge/FudgeCore.js"/> 
var EscapeTheEdge;
///<reference types="../Fudge/FudgeCore.js"/> 
(function (EscapeTheEdge) {
    var f = FudgeCore;
    EscapeTheEdge.rootNode = new f.Node("RootNode");
    let mover = new f.Node("Mover");
    let sprite;
    window.addEventListener("load", init);
    function init(_event) {
        EscapeTheEdge.rootNode.appendChild(mover);
        const canvas = document.querySelector("canvas");
        f.RenderManager.initialize(true);
        startGame(canvas);
    } //close init
    function startGame(_canvas) {
        let camera = new f.Node("Camera");
        let cmpCam = new f.ComponentCamera();
        camera.addComponent(cmpCam);
        cmpCam.pivot.translateZ(45);
        mover.appendChild(camera);
        EscapeTheEdge.viewport = new f.Viewport();
        EscapeTheEdge.viewport.initialize("Viewport", EscapeTheEdge.rootNode, camera.getComponent(f.ComponentCamera), _canvas);
        EscapeTheEdge.rootNode.appendChild(mover);
        let cmpLight;
        cmpLight = new f.ComponentLight(new f.LightDirectional(f.Color.CSS("WHITE")));
        cmpLight.pivot.translate(new f.Vector3(50, 10, 50));
        cmpLight.pivot.lookAt(new f.Vector3(0, 0, 0));
        mover.addComponent(cmpLight);
    } //close startGame
    function update() {
    } //close update
})(EscapeTheEdge || (EscapeTheEdge = {}));
//# sourceMappingURL=Main.js.map