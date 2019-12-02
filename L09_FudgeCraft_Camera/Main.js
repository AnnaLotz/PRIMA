"use strict";
///<reference types="../Fudge/FudgeCore.js"/> 
var L09_FudgeCraft_Camera;
///<reference types="../Fudge/FudgeCore.js"/> 
(function (L09_FudgeCraft_Camera) {
    var f = FudgeCore;
    document.addEventListener("DOMContentLoaded", handleLoad);
    L09_FudgeCraft_Camera.game = new f.Node("Game");
    L09_FudgeCraft_Camera.grid = new L09_FudgeCraft_Camera.Grid();
    let camera;
    let fragment;
    let currentFragment;
    // ############################################################################################
    // ############################################################################################
    function handleLoad(_event) {
        console.log("Hello World");
        const canvas = document.querySelector("canvas");
        f.RenderManager.initialize(true); //true um Antialiasing zu vermeiden
        camera = new L09_FudgeCraft_Camera.CameraOrbit();
        L09_FudgeCraft_Camera.game.appendChild(camera);
        //Light
        let cmpLight;
        cmpLight = new f.ComponentLight(new f.LightDirectional(f.Color.WHITE));
        cmpLight.pivot.translate(new f.Vector3(30, 10, 30));
        cmpLight.pivot.lookAt(new f.Vector3(0, 0, 0));
        L09_FudgeCraft_Camera.game.addComponent(cmpLight);
        cmpLight = new f.ComponentLight(new f.LightDirectional(f.Color.WHITE));
        cmpLight.pivot.translate(new f.Vector3(-30, 10, 30));
        cmpLight.pivot.lookAt(new f.Vector3(0, 0, 0));
        L09_FudgeCraft_Camera.game.addComponent(cmpLight);
        cmpLight = new f.ComponentLight(new f.LightDirectional(f.Color.WHITE));
        cmpLight.pivot.translate(new f.Vector3(-30, 10, -30));
        cmpLight.pivot.lookAt(new f.Vector3(0, 0, 0));
        L09_FudgeCraft_Camera.game.addComponent(cmpLight);
        cmpLight = new f.ComponentLight(new f.LightDirectional(f.Color.WHITE));
        cmpLight.pivot.translate(new f.Vector3(30, 10, -30));
        cmpLight.pivot.lookAt(new f.Vector3(0, 0, 0));
        L09_FudgeCraft_Camera.game.addComponent(cmpLight);
        // let cmpLightAmbient: f.ComponentLight = new f.ComponentLight(new f.LightAmbient(f.Color.WHITE));
        // game.addComponent(cmpLightAmbient);
        //Viewport
        L09_FudgeCraft_Camera.viewport = new f.Viewport();
        L09_FudgeCraft_Camera.viewport.initialize("Viewport", L09_FudgeCraft_Camera.game, camera.getComponent(f.ComponentCamera), canvas);
        L09_FudgeCraft_Camera.viewport.draw();
        // console.log("currentFragment after viewport.draw(): " + currentFragment.getCubesPositions()); //erst hier ist die position im raum richtig erfasst
        createStart();
        window.addEventListener("keydown", handleKeyDown);
        console.log("Setup done");
    } //close handleLoad
    function createStart() {
        //Boden erstellen
        for (let x = -6; x < 6; x++) {
            for (let z = -6; z < 6; z++) {
                let position = new f.Vector3(x, 0, z);
                let cube = new L09_FudgeCraft_Camera.Cube(position, new f.Material("White", f.ShaderFlat, new f.CoatColored(f.Color.WHITE)));
                cube.cmpTransform.local.translation = position;
                L09_FudgeCraft_Camera.grid.push(position, new L09_FudgeCraft_Camera.GridElement(cube));
                // console.log("set cube at pos: " + position);
            }
        }
        // console.log(grid);
        let rndFragNum = Math.floor(Math.random() * 7);
        fragment = new L09_FudgeCraft_Camera.Fragment(rndFragNum);
        fragment.addComponent(new f.ComponentTransform);
        fragment.cmpTransform.local.translate(new f.Vector3(0, 7, 5));
        currentFragment = fragment;
        L09_FudgeCraft_Camera.game.appendChild(fragment);
        f.RenderManager.update();
        L09_FudgeCraft_Camera.viewport.draw();
    } //close createStart
    // ############################################################################################
    // ############################################################################################
    function handleKeyDown(_event) {
        // let key: f.KEYBOARD_CODE = f.KEYBOARD_CODE;
        if (_event.code == f.KEYBOARD_CODE.W || _event.code == f.KEYBOARD_CODE.A || _event.code == f.KEYBOARD_CODE.S ||
            _event.code == f.KEYBOARD_CODE.D || _event.code == f.KEYBOARD_CODE.Q || _event.code == f.KEYBOARD_CODE.E) {
            moveFragment(_event, 1);
            if (checkIfHit()) {
                moveFragment(_event, -1); //die bewegung rückgängig machen
                // f.RenderManager.update();
                fragment.setAtPosition();
                createNewFragment(); //neues Fragment erstellen und zum currentFrag machen
            }
        }
        else if (_event.code == f.KEYBOARD_CODE.ARROW_LEFT) {
            console.log("rotate left");
            rotateFragmentAround(-90);
            // camera.rotateY(-90);
        }
        else if (_event.code == f.KEYBOARD_CODE.ARROW_RIGHT) {
            console.log("rotate right");
            rotateFragmentAround(90);
            camera.rotateY(90);
        }
    } //close handleKeyDown
    function rotateFragmentAround(_direction) {
        // let vectorToFragment: f.Vector3 = currentFragment.mtxWorld.translation;
        // console.log(vectorToFragment);
        // let minusVectorToFragment: f.Vector3 = vectorToFragment;
        // minusVectorToFragment.x = vectorToFragment.x * -1;
        // minusVectorToFragment.y = vectorToFragment.y * -1;
        // minusVectorToFragment.z = vectorToFragment.z * -1;
        // currentFragment.cmpTransform.local.translate(minusVectorToFragment);
        // currentFragment.cmpTransform.local.rotateY(_direction);
        // currentFragment.cmpTransform.local.translate(minusVectorToFragment);
        // currentFragment.mtxWorld.translation.set(1, 1, 1);
        // for (let cube of currentFragment.getChildren()) {
        // let relativeVectorToCube: f.Vector3 = cube.cmpTransform.local.translation;
        //     console.log(relativeVectorToCube);
        //     let vectorToCube: f.Vector3 = new f.Vector3(0, 0, 0);
        //     vectorToCube.x = vectorToFragment.x + relativeVectorToCube.x;
        //     vectorToCube.y = vectorToFragment.y + relativeVectorToCube.y;
        //     vectorToCube.z = vectorToFragment.z + relativeVectorToCube.z;
        //     console.log("own cube vector: " + vectorToCube);
        //     console.log("fudge vector cube: " + cube.mtxWorld.translation);
        //     cube.mtxWorld.translation = new f.Vector3(1, 1, 1);
        //     console.log("fudge vector cube: " + cube.mtxWorld.translation);
        // }
        f.RenderManager.update();
        L09_FudgeCraft_Camera.viewport.draw();
    } //close rotateFragmentAround
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
        fragment.cmpTransform.local.translate(new f.Vector3(0, 7, 5));
        currentFragment = fragment;
        L09_FudgeCraft_Camera.game.appendChild(fragment);
        f.RenderManager.update();
        L09_FudgeCraft_Camera.viewport.draw();
    } //close createNewFragment
    function moveFragment(_event, _moveOn) {
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