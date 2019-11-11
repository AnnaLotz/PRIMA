"use strict";
///<reference types="../Fudge/FudgeCore.js"/> 
var L07;
///<reference types="../Fudge/FudgeCore.js"/> 
(function (L07) {
    var f = FudgeCore;
    document.addEventListener("DOMContentLoaded", handleLoad);
    function handleLoad(_event) {
        console.log("Hello World");
        const canvas = document.querySelector("canvas");
        f.RenderManager.initialize();
        f.Debug.log(canvas);
        //Camera
        let camera = new f.Node("Camera");
        let cmpCam = new f.ComponentCamera();
        camera.addComponent(cmpCam);
        cmpCam.pivot.translateZ(5); //Kamera auf Z-Achse verschieben
        //create Game Node
        let game = createGame();
        L07.viewport = new f.Viewport();
        L07.viewport.initialize("Viewport", game, camera.getComponent(f.ComponentCamera), canvas);
        L07.viewport.draw();
    } //close handleLoad
    function createGame() {
        let game = new f.Node("Game");
        let fragment = new L07.Fragment();
        // fragment.createMesh();
        return game;
    } //close createGame
})(L07 || (L07 = {})); //close Namespace
//# sourceMappingURL=Main.js.map