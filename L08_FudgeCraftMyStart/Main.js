"use strict";
///<reference types="../Fudge/FudgeCore.js"/> 
var L08_FudgeCraft;
///<reference types="../Fudge/FudgeCore.js"/> 
(function (L08_FudgeCraft) {
    var f = FudgeCore;
    document.addEventListener("DOMContentLoaded", handleLoad);
    let game;
    let currentFragment;
    let firstFragment;
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
        firstFragment = fragment;
        game.appendChild(fragment);
        fragment = new L08_FudgeCraft.Fragment(0);
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
        // console.log(currentFragment.getCubesPositions());
        checkIfHit();
        if (checkIfHit) {
            //fragment fest setzen und neues erstellen
        }
        f.RenderManager.update();
        L08_FudgeCraft.viewport.draw();
    } //close handleKeyDown
    function checkIfHit() {
        console.log(firstFragment.getCubesPositions());
        console.log(currentFragment.getCubesPositions());
        // for (let fragment of game.getChildren()) {
        //     console.log("1. durch alle game.getChildren");
        //     if (fragment != currentFragment && fragment instanceof Fragment) {
        //         console.log("2. if fragment != currentFragment und Fragment instace");
        //         for (let othersPosition of fragment.getCubesPositions()) {
        //             console.log("3. for otherpositions of fragment.getCubesPositions");
        //             for (let currentPosition of currentFragment.getCubesPositions()) {
        //                 console.log("4. for currentPos of currentFrag.getCubesPositions");
        //                 console.log("other: " + othersPosition);
        //                 console.log("current: " + currentPosition);
        //                 if (othersPosition == currentPosition) {
        //                     console.log("5. If hit");
        //                     return true;
        //                 }
        //             }
        //         }
        //     }
        // }
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