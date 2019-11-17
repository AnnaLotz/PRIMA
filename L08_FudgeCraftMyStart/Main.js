"use strict";
///<reference types="../Fudge/FudgeCore.js"/> 
var L08_FudgeCraft;
///<reference types="../Fudge/FudgeCore.js"/> 
(function (L08_FudgeCraft) {
    var f = FudgeCore;
    document.addEventListener("DOMContentLoaded", handleLoad);
    let game;
    let currentFragment;
    // ############################################################################################
    // ############################################################################################
    function handleLoad(_event) {
        console.log("Hello World");
        const canvas = document.querySelector("canvas");
        f.RenderManager.initialize(true); //true um Antialiasing zu vermeiden
        f.Debug.log(canvas);
        //Camera
        let camera = new f.Node("Camera");
        let cmpCam = new f.ComponentCamera();
        camera.addComponent(cmpCam);
        cmpCam.pivot.translate(new f.Vector3(0, 3, 30)); // kamera auf ort setzen
        // cmpCam.pivot.lookAt(f.Vector3.ZERO()); // um auf 0|0|0 zu schauen
        //create Game Node
        let game = createGame();
        let cmpLight = new f.ComponentLight(new f.LightDirectional(f.Color.WHITE));
        cmpLight.pivot.lookAt(new f.Vector3(0.5, 0, 0.5));
        game.addComponent(cmpLight);
        L08_FudgeCraft.viewport = new f.Viewport();
        L08_FudgeCraft.viewport.initialize("Viewport", game, camera.getComponent(f.ComponentCamera), canvas);
        L08_FudgeCraft.viewport.draw();
        window.addEventListener("keydown", handleKeyDown);
    } //close handleLoad
    function createGame() {
        game = new f.Node("Game");
        let fragment = new L08_FudgeCraft.Fragment(0);
        game.appendChild(fragment);
        fragment = new L08_FudgeCraft.Fragment(2);
        fragment.addComponent(new f.ComponentTransform(f.Matrix4x4.TRANSLATION(new f.Vector3(0, 5, 0))));
        game.appendChild(fragment);
        currentFragment = fragment;
        // for (let i: number = 0; i < 7; i++) {
        //     let fragment: Fragment = new Fragment(i);
        //     fragment.addComponent(new f.ComponentTransform(f.Matrix4x4.TRANSLATION(new f.Vector3(i * 3, 0, 0))));
        //     game.appendChild(fragment);
        // }
        return game;
    } //close createGame
    // ############################################################################################
    // ############################################################################################
    function handleKeyDown(_event) {
        processInput(_event);
        // !!!!!!! vvvvv
        // console.log(currentFragment.mtxWorld.translation.x);
        console.log(currentFragment.getCubesPositions());
        // console.log(checkIfHit());
        if (checkIfHit) {
            //fragment fest setzen und neues erstellen
        }
        f.RenderManager.update();
        L08_FudgeCraft.viewport.draw();
    } //close handleKeyDown
    function checkIfHit() {
        for (let fragment of game.getChildren()) {
            if (fragment != currentFragment) {
                //hier die abfrage für hit hin
            }
        }
        return false;
    } //close checkIfHit
    function processInput(_event) {
        //bewegung
        switch (_event.code) {
            case f.KEYBOARD_CODE.W: //W später raus nehmen
                currentFragment.cmpTransform.local.translateY(1);
                break;
            case f.KEYBOARD_CODE.A:
                currentFragment.cmpTransform.local.translateX(-1);
                break;
            case f.KEYBOARD_CODE.D:
                currentFragment.cmpTransform.local.translateX(1);
                break;
            case f.KEYBOARD_CODE.S:
                currentFragment.cmpTransform.local.translateY(-1);
                break;
        }
        //Rotation
        switch (_event.code) {
            case f.KEYBOARD_CODE.Q:
                currentFragment.cmpTransform.local.rotateZ(90);
                break;
            case f.KEYBOARD_CODE.E:
                currentFragment.cmpTransform.local.rotateZ(-90);
                break;
        }
    } //close process Input
})(L08_FudgeCraft || (L08_FudgeCraft = {})); //close Namespace
//# sourceMappingURL=Main.js.map