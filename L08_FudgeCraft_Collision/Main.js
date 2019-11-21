"use strict";
///<reference types="../Fudge/FudgeCore.js"/> 
var L08_FudgeCraft_Collision;
///<reference types="../Fudge/FudgeCore.js"/> 
(function (L08_FudgeCraft_Collision) {
    var f = FudgeCore;
    document.addEventListener("DOMContentLoaded", handleLoad);
    let game;
    let fragment;
    let currentFragment;
    let firstFragment;
    let grid = new L08_FudgeCraft_Collision.Grid();
    // ############################################################################################
    // ############################################################################################
    function handleLoad(_event) {
        grid.set("Jonas", new L08_FudgeCraft_Collision.Cube(new f.Vector3(3, 3, 0), new f.Material("Cyan", f.ShaderFlat, new f.CoatColored(f.Color.CYAN))));
        console.log(grid);
        console.log("Hello World");
        const canvas = document.querySelector("canvas");
        f.RenderManager.initialize(true); //true um Antialiasing zu vermeiden
        //Camera
        let camera = new f.Node("Camera");
        let cmpCam = new f.ComponentCamera();
        camera.addComponent(cmpCam);
        cmpCam.pivot.translate(new f.Vector3(0, 3, 30)); // kamera auf ort setzen
        // cmpCam.pivot.lookAt(f.Vector3.ZERO()); // um auf 0|0|0 zu schauen
        //create Game Node
        game = createGame();
        //Light
        let cmpLight = new f.ComponentLight(new f.LightDirectional(f.Color.WHITE));
        cmpLight.pivot.lookAt(new f.Vector3(0.5, 0, 0.5));
        game.addComponent(cmpLight);
        //Viewport
        L08_FudgeCraft_Collision.viewport = new f.Viewport();
        L08_FudgeCraft_Collision.viewport.initialize("Viewport", game, camera.getComponent(f.ComponentCamera), canvas);
        L08_FudgeCraft_Collision.viewport.draw();
        // console.log("currentFragment after viewport.draw(): " + currentFragment.getCubesPositions()); //erst hier ist die position im raum richtig erfasst
        window.addEventListener("keydown", handleKeyDown);
        console.log("Setup done");
    } //close handleLoad
    function createGame() {
        game = new f.Node("Game");
        fragment = new L08_FudgeCraft_Collision.Fragment(0);
        firstFragment = fragment;
        game.appendChild(fragment);
        fragment = new L08_FudgeCraft_Collision.Fragment(3);
        fragment.addComponent(new f.ComponentTransform(f.Matrix4x4.TRANSLATION(new f.Vector3(0, 3, 0))));
        currentFragment = fragment;
        game.appendChild(fragment);
        return game;
    } //close createGame
    // ############################################################################################
    // ############################################################################################
    function handleKeyDown(_event) {
        processInput(_event, 1);
        if (checkIfHit()) {
            processInput(_event, -1); //die bewegung rückgängig machen
            createNewFragment(); //neues Fragment erstellen und zum currentFrag machen
        }
    } //close handleKeyDown
    function checkIfHit() {
        console.log("firstFrag: " + firstFragment.getCubesPositions());
        console.log("currentFrag: " + currentFragment.getCubesPositions());
        for (let fragment of game.getChildren()) {
            // console.log("1. durch alle game.getChildren");
            if (fragment != currentFragment && fragment instanceof L08_FudgeCraft_Collision.Fragment) {
                // console.log("2. if fragment != currentFragment und Fragment instace");
                for (let othersPosition of fragment.getCubesPositions()) {
                    // console.log("3. for otherpositions of fragment.getCubesPositions");
                    for (let currentPosition of currentFragment.getCubesPositions()) {
                        // console.log("4. for currentPos of currentFrag.getCubesPositions");
                        // console.log(othersPosition);
                        // console.log(currentPosition);
                        if (othersPosition[0] == currentPosition[0] && othersPosition[1] == currentPosition[1]) {
                            console.log("HIT!");
                            return true;
                            break;
                        }
                    }
                }
            }
        }
        return false;
    } //close checkIfHit
    function createNewFragment() {
        //funktioniert noch nicht: das neue Fragment ist nicht sichtbar, hat aber werte
        fragment = new L08_FudgeCraft_Collision.Fragment(0);
        fragment.addComponent(new f.ComponentTransform);
        fragment.cmpTransform.local.translate(new f.Vector3(0, 5, 0));
        currentFragment = fragment;
        game.appendChild(fragment);
        f.RenderManager.update();
        L08_FudgeCraft_Collision.viewport.draw();
    } //close createNewFragment
    function processInput(_event, _moveOn) {
        //bewegung
        switch (_event.code) {
            case f.KEYBOARD_CODE.W: //W später raus nehmen
                currentFragment.cmpTransform.local.translateY(_moveOn * 1);
                break;
            case f.KEYBOARD_CODE.A:
                currentFragment.cmpTransform.local.translateX(_moveOn * -1);
                break;
            case f.KEYBOARD_CODE.D:
                currentFragment.cmpTransform.local.translateX(_moveOn * 1);
                break;
            case f.KEYBOARD_CODE.S:
                currentFragment.cmpTransform.local.translateY(_moveOn * -1);
                break;
        }
        //Rotation
        switch (_event.code) {
            case f.KEYBOARD_CODE.Q:
                currentFragment.cmpTransform.local.rotateZ(_moveOn * 90);
                break;
            case f.KEYBOARD_CODE.E:
                currentFragment.cmpTransform.local.rotateZ(_moveOn * -90);
                break;
        }
        f.RenderManager.update();
        L08_FudgeCraft_Collision.viewport.draw();
    } //close process Input
})(L08_FudgeCraft_Collision || (L08_FudgeCraft_Collision = {})); //close Namespace
//# sourceMappingURL=Main.js.map