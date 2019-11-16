"use strict";
///<reference types="../Fudge/FudgeCore.js"/> 
var L07_FudgeCraft;
///<reference types="../Fudge/FudgeCore.js"/> 
(function (L07_FudgeCraft) {
    var f = FudgeCore;
    let game;
    document.addEventListener("DOMContentLoaded", handleLoad);
    function handleLoad(_event) {
        console.log("Hello World");
        const canvas = document.querySelector("canvas");
        f.RenderManager.initialize(true); //true um Antialiasing zu vermeiden
        f.Debug.log(canvas);
        //Camera
        let camera = new f.Node("Camera");
        let cmpCam = new f.ComponentCamera();
        camera.addComponent(cmpCam);
        cmpCam.pivot.translateZ(20); //Kamera auf Z-Achse verschieben
        cmpCam.pivot.translate(new f.Vector3(5, 5, 5));
        cmpCam.pivot.lookAt(f.Vector3.ZERO()); // um auf 0|0|0 zu schauen
        //create Game Node
        let game = createGame();
        L07_FudgeCraft.viewport = new f.Viewport();
        L07_FudgeCraft.viewport.initialize("Viewport", game, camera.getComponent(f.ComponentCamera), canvas);
        L07_FudgeCraft.viewport.draw();
    } //close handleLoad
    function createGame() {
        game = new f.Node("Game");
        let fragment = new L07_FudgeCraft.Fragment(0);
        game.appendChild(fragment);
        return game;
    } //close createGame
})(L07_FudgeCraft || (L07_FudgeCraft = {})); //close Namespace
//# sourceMappingURL=Main.js.map