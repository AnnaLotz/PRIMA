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
            camera.rotateY(-90);
        }
        else if (_event.code == f.KEYBOARD_CODE.ARROW_RIGHT) {
            console.log("rotate right");
            rotateFragmentAround(90);
            camera.rotateY(90);
        }
    } //close handleKeyDown
    function rotateFragmentAround(_direction) {
        // let vectorToCurrent: f.Vector3 = currentFragment.mtxWorld.translation;
        // console.log(vectorToCurrent);
        for (let cube of currentFragment.getChildren()) {
            let pos = cube.mtxWorld.translation;
            console.log(pos.get());
            pos.set(-pos.z, pos.y, pos.x);
            // let newPos: f.Vector3 = new f.Vector3(-pos.z, pos.y, pos.x);
            // newPos.x = pos.z * -1;
            // newPos.z = pos.x;
            // console.log("newPos: " + newPos);
            console.log(pos.get());
            let vctPosition = f.Vector3.ZERO();
            vctPosition.set(pos.x, pos.y, pos.z);
            cube.cmpTransform.local.translation.x = pos.x;
            currentFragment.cmpTransform.local.translation = pos;
            f.RenderManager.update();
            L09_FudgeCraft_Camera.viewport.draw();
            // cube.cmpTransform.local.translate(newPos);
            // cube.cmpTransform.local.translation.set(pos);
            // cube.mtxWorld.translation.set(newPos);
            // cube.mtxWorld.translation.x = newPos.x;
            // cube.mtxWorld.translate(newPos);
            // cube.mtxWorld.translateX(newPos.x);
            // cube.cmpTransform.local.translation.set(pos);
            // cube.cmpTransform.local.translate(pos);
            // let cmpTransform: f.ComponentTransform = new f.ComponentTransform(f.Matrix4x4.TRANSLATION(newPos));
            // // cube.addComponent(cmpTransform);
            // cube.transformComp = cmpTransform;
            // cube.mtxWorld.translation.x = newPos.x;
            // cube.mtxWorld.translateX = newPos.x;
            // let newContainer: f.Node = new f.Node("Container");
            // let cmpTransform: f.ComponentTransform = new f.ComponentTransform(f.Matrix4x4.TRANSLATION(pos));
            // newContainer.addComponent(cmpTransform);
            // let vctPosition: f.Vector3 = f.Vector3.ZERO();
            // vctPosition.set(newPos.x, newPos.y, newPos.z);
            // fragment.cmpTransform.local.translate(new f.Vector3(0, 7, 5));
            // cube.cmpTransform.local.translate(new f.Vector3(-pos.z, pos.y, pos.x));
            // cube.cmpTransform.local.translation = new f.Vector3(-pos.z, pos.y, pos.x);
            // cube.cmpTransform.local.translation.set(vctPosition);
            // cube.cmpTransform.
            // console.log("newPos: " + newPos);
            // cube.mtxWorld.translation.set(-pos.z, pos.y, pos.x);
            // cube.mtxWorld.translate(newPos);
            // cube.cmpTransform.local.translation.y = 2;
            // cube.cmpTransform.local.translate(newPos);
        }
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