"use strict";
///<reference types="../Fudge/FudgeCore.js"/> 
var L09_FudgeCraft_Camera;
///<reference types="../Fudge/FudgeCore.js"/> 
(function (L09_FudgeCraft_Camera) {
    var f = FudgeCore;
    document.addEventListener("DOMContentLoaded", handleLoad);
    let fragment;
    let currentFragment;
    // ############################################################################################
    // ############################################################################################
    function handleLoad(_event) {
        // grid.set("Jonas", new Cube(new f.Vector3(3, 3, 0), new f.Material("Cyan", f.ShaderFlat, new f.CoatColored(f.Color.CYAN))));
        // console.log(grid);
        console.log("Hello World");
        const canvas = document.querySelector("canvas");
        f.RenderManager.initialize(true); //true um Antialiasing zu vermeiden
        //Camera
        let camera = new f.Node("Camera");
        let cmpCam = new f.ComponentCamera();
        camera.addComponent(cmpCam);
        cmpCam.pivot.translate(new f.Vector3(0, 6, 30)); // kamera auf ort setzen
        cmpCam.backgroundColor = f.Color.DARK_GREY;
        // cmpCam.pivot.lookAt(f.Vector3.ZERO()); // um auf 0|0|0 zu schauen
        //create Game Node
        L09_FudgeCraft_Camera.game = new f.Node("Game");
        L09_FudgeCraft_Camera.grid = new L09_FudgeCraft_Camera.Grid();
        createStart();
        //Light
        let cmpLight = new f.ComponentLight(new f.LightDirectional(f.Color.WHITE));
        cmpLight.pivot.lookAt(new f.Vector3(0.5, 0, 0.5));
        L09_FudgeCraft_Camera.game.addComponent(cmpLight);
        let cmpLightAmbient = new f.ComponentLight(new f.LightAmbient(f.Color.GREY));
        L09_FudgeCraft_Camera.game.addComponent(cmpLightAmbient);
        //Viewport
        L09_FudgeCraft_Camera.viewport = new f.Viewport();
        L09_FudgeCraft_Camera.viewport.initialize("Viewport", L09_FudgeCraft_Camera.game, camera.getComponent(f.ComponentCamera), canvas);
        L09_FudgeCraft_Camera.viewport.draw();
        // console.log("currentFragment after viewport.draw(): " + currentFragment.getCubesPositions()); //erst hier ist die position im raum richtig erfasst
        window.addEventListener("keydown", handleKeyDown);
        console.log("Setup done");
    } //close handleLoad
    function createStart() {
        let rndFragNum = Math.floor(Math.random() * 7);
        fragment = new L09_FudgeCraft_Camera.Fragment(rndFragNum);
        currentFragment = fragment;
        L09_FudgeCraft_Camera.game.appendChild(currentFragment);
        for (let cube of currentFragment.cubes) {
            console.log("set cube at pos: " + cube.transformComp.local.translation);
            let position = cube.transformComp.local.translation;
            cube.cmpTransform.local.translation = position;
            L09_FudgeCraft_Camera.grid.push(position, new L09_FudgeCraft_Camera.GridElement(cube));
        }
        rndFragNum = Math.floor(Math.random() * fragment.fragmentDef.length);
        fragment = new L09_FudgeCraft_Camera.Fragment(rndFragNum);
        fragment.addComponent(new f.ComponentTransform(f.Matrix4x4.TRANSLATION(new f.Vector3(0, 7, 0))));
        currentFragment = fragment;
        L09_FudgeCraft_Camera.game.appendChild(fragment);
        return L09_FudgeCraft_Camera.game;
    } //close createGame
    // ############################################################################################
    // ############################################################################################
    function handleKeyDown(_event) {
        processInput(_event, 1);
        if (checkIfHit()) {
            processInput(_event, -1); //die bewegung rückgängig machen
            // f.RenderManager.update();
            fragment.setAtPosition();
            createNewFragment(); //neues Fragment erstellen und zum currentFrag machen
        }
    } //close handleKeyDown
    function checkIfHit() {
        for (let cube of currentFragment.getChildren()) {
            let element = L09_FudgeCraft_Camera.grid.pull(cube.mtxWorld.translation);
            if (element) {
                return true;
            }
        }
        return false;
    } //close checkIfHit
    function createNewFragment() {
        let rndFragNum = Math.floor(Math.random() * fragment.fragmentDef.length);
        fragment = new L09_FudgeCraft_Camera.Fragment(rndFragNum);
        fragment.addComponent(new f.ComponentTransform);
        fragment.cmpTransform.local.translate(new f.Vector3(0, 7, 0));
        currentFragment = fragment;
        L09_FudgeCraft_Camera.game.appendChild(fragment);
        f.RenderManager.update();
        L09_FudgeCraft_Camera.viewport.draw();
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
        L09_FudgeCraft_Camera.viewport.draw();
    } //close process Input
})(L09_FudgeCraft_Camera || (L09_FudgeCraft_Camera = {})); //close Namespace
//# sourceMappingURL=Main.js.map