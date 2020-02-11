"use strict";
///<reference types="../Fudge/FudgeCore.js"/> 
var EscapeTheEdge;
///<reference types="../Fudge/FudgeCore.js"/> 
(function (EscapeTheEdge) {
    var f = FudgeCore;
    let mover;
    let characters;
    let bobo;
    let crc2;
    let canvas;
    let keysPressed = {};
    window.addEventListener("load", init);
    function init(_event) {
        canvas = document.querySelector("canvas");
        f.RenderManager.initialize(true, false);
        startGame(canvas);
    } //close init
    function startGame(_canvas) {
        EscapeTheEdge.rootNode = new f.Node("RootNode");
        mover = new f.Node("Mover");
        characters = new f.Node("Characters");
        EscapeTheEdge.level = createLevel();
        EscapeTheEdge.rootNode.appendChild(mover);
        EscapeTheEdge.rootNode.appendChild(characters);
        EscapeTheEdge.rootNode.appendChild(EscapeTheEdge.level);
        mover.addComponent(new f.ComponentTransform());
        crc2 = _canvas.getContext("2d");
        let img = document.querySelector("img");
        let txtBobo = new f.TextureImage();
        txtBobo.image = img;
        EscapeTheEdge.Bobo.generateSprites(txtBobo);
        bobo = new EscapeTheEdge.Bobo("Bobo");
        characters.appendChild(bobo);
        // bobo.appendChild(mover);
        let camera = new f.Node("Camera");
        let cmpCam = new f.ComponentCamera();
        camera.addComponent(cmpCam);
        cmpCam.pivot.translateZ(5);
        cmpCam.pivot.lookAt(f.Vector3.ZERO());
        cmpCam.pivot.translateY(1);
        cmpCam.backgroundColor = f.Color.CSS("grey");
        mover.appendChild(camera);
        let cmpLightAmbient = new f.ComponentLight(new f.LightAmbient(f.Color.CSS("WHITE")));
        EscapeTheEdge.rootNode.addComponent(cmpLightAmbient);
        let light = new f.Node("Light");
        let cmpLight;
        cmpLight = new f.ComponentLight(new f.LightDirectional(f.Color.CSS("WHITE")));
        cmpLight.pivot.translate(new f.Vector3(0, 0, 10));
        cmpLight.pivot.lookAt(new f.Vector3(0, 0, 0));
        light.addComponent(cmpLight);
        // mover.appendChild(light);
        EscapeTheEdge.viewport = new f.Viewport();
        EscapeTheEdge.viewport.initialize("Viewport", EscapeTheEdge.rootNode, camera.getComponent(f.ComponentCamera), _canvas);
        //starting game
        f.RenderManager.update();
        EscapeTheEdge.viewport.draw();
        document.addEventListener("keydown", handleKeyboard);
        document.addEventListener("keyup", handleKeyboard);
        f.Loop.addEventListener("loopFrame" /* LOOP_FRAME */, update);
        f.Loop.start(f.LOOP_MODE.TIME_GAME, 10);
    } //close startGame
    function createLevel() {
        let level = new f.Node("Level");
        let floor = new EscapeTheEdge.Floor();
        floor = new EscapeTheEdge.Floor();
        floor.cmpTransform.local.scaleY(1);
        floor.cmpTransform.local.scaleX(3);
        // floor.cmpTransform.local.translateY(0);
        // floor.cmpTransform.local.translateX(1.5);
        level.appendChild(floor);
        floor = new EscapeTheEdge.Floor();
        floor.cmpTransform.local.scaleX(1);
        floor.cmpTransform.local.translateY(3.5);
        level.appendChild(floor);
        floor = new EscapeTheEdge.Floor();
        floor.cmpTransform.local.scaleX(2);
        floor.cmpTransform.local.translateY(1);
        floor.cmpTransform.local.translateX(2);
        // rootNode.appendChild(floor);
        return level;
    }
    function update() {
        processInput();
        // mover.cmpTransform.local.translation.x = bobo.cmpTransform.local.translation.x;
        EscapeTheEdge.viewport.draw();
        f.RenderManager.update();
        crc2.strokeRect(-1, -1, canvas.width / 2, canvas.height + 2);
        crc2.strokeRect(-1, 550, canvas.width + 2, canvas.height);
    } //close update
    function handleKeyboard(_event) {
        keysPressed[_event.code] = (_event.type == "keydown");
        if (_event.code == f.KEYBOARD_CODE.SPACE && _event.type == "keydown")
            bobo.act(EscapeTheEdge.ACTION.JUMP);
        console.log(_event.code);
    }
    function processInput() {
        if (keysPressed[f.KEYBOARD_CODE.A]) {
            bobo.act(EscapeTheEdge.ACTION.WALK, EscapeTheEdge.DIRECTION.LEFT);
            return;
        }
        if (keysPressed[f.KEYBOARD_CODE.D]) {
            bobo.act(EscapeTheEdge.ACTION.WALK, EscapeTheEdge.DIRECTION.RIGHT);
            return;
        }
        bobo.act(EscapeTheEdge.ACTION.IDLE);
    } //close processInput
})(EscapeTheEdge || (EscapeTheEdge = {})); //close Namespace
//# sourceMappingURL=Main.js.map