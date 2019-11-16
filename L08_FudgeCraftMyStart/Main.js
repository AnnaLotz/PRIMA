"use strict";
///<reference types="../Fudge/FudgeCore.js"/> 
var L08_FudgeCraft;
///<reference types="../Fudge/FudgeCore.js"/> 
(function (L08_FudgeCraft) {
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
        cmpCam.pivot.translate(new f.Vector3(12, 8, 15)); // kamera auf ort setzen
        cmpCam.pivot.lookAt(f.Vector3.ZERO()); // um auf 0|0|0 zu schauen
        //create Game Node
        let game = createGame();
        L08_FudgeCraft.viewport = new f.Viewport();
        L08_FudgeCraft.viewport.initialize("Viewport", game, camera.getComponent(f.ComponentCamera), canvas);
        L08_FudgeCraft.viewport.draw();
    } //close handleLoad
    function createGame() {
        game = new f.Node("Game");
        let fragment = new L08_FudgeCraft.Fragment(0);
        game.appendChild(fragment);
        fragment = new L08_FudgeCraft.Fragment(1);
        fragment.addComponent(new f.ComponentTransform(f.Matrix4x4.TRANSLATION(f.Vector3.X(3))));
        game.appendChild(fragment);
        fragment = new L08_FudgeCraft.Fragment(2);
        fragment.addComponent(new f.ComponentTransform(f.Matrix4x4.TRANSLATION(f.Vector3.X(-5))));
        game.appendChild(fragment);
        fragment = new L08_FudgeCraft.Fragment(3);
        fragment.addComponent(new f.ComponentTransform(f.Matrix4x4.TRANSLATION(f.Vector3.X(7))));
        game.appendChild(fragment);
        fragment = new L08_FudgeCraft.Fragment(4);
        fragment.addComponent(new f.ComponentTransform(f.Matrix4x4.TRANSLATION(new f.Vector3(0, 3, 0))));
        game.appendChild(fragment);
        fragment = new L08_FudgeCraft.Fragment(5);
        fragment.addComponent(new f.ComponentTransform(f.Matrix4x4.TRANSLATION(new f.Vector3(3, 3, 0))));
        game.appendChild(fragment);
        fragment = new L08_FudgeCraft.Fragment(6);
        fragment.addComponent(new f.ComponentTransform(f.Matrix4x4.TRANSLATION(new f.Vector3(-5, 3, 0))));
        game.appendChild(fragment);
        //Light
        let cmpLight = new f.ComponentLight(new f.LightDirectional(f.Color.WHITE));
        cmpLight.pivot.lookAt(new f.Vector3(0.5, 1, 0.8));
        game.addComponent(cmpLight);
        return game;
    } //close createGame
})(L08_FudgeCraft || (L08_FudgeCraft = {})); //close Namespace
//# sourceMappingURL=Main.js.map