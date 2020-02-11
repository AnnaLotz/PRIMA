"use strict";
///<reference types="../Fudge/FudgeCore.js"/> 
var EscapeTheEdge;
///<reference types="../Fudge/FudgeCore.js"/> 
(function (EscapeTheEdge) {
    var f = FudgeCore;
    let mover;
    let characters;
    let bobo;
    let sprite;
    let keysPressed = {};
    window.addEventListener("load", init);
    function init(_event) {
        const canvas = document.querySelector("canvas");
        f.RenderManager.initialize(true, false);
        startGame(canvas);
    } //close init
    function startGame(_canvas) {
        EscapeTheEdge.rootNode = new f.Node("RootNode");
        mover = new f.Node("Mover");
        characters = new f.Node("Characters");
        EscapeTheEdge.rootNode.appendChild(mover);
        EscapeTheEdge.rootNode.appendChild(characters);
        let crc2 = _canvas.getContext("2d");
        let img = document.querySelector("img");
        let txtBobo = new f.TextureImage();
        txtBobo.image = img;
        EscapeTheEdge.Bobo.generateSprites(txtBobo);
        bobo = new EscapeTheEdge.Bobo("Bobo");
        characters.appendChild(bobo);
        console.log(EscapeTheEdge.rootNode.getChildren.length);
        let camera = new f.Node("Camera");
        let cmpCam = new f.ComponentCamera();
        camera.addComponent(cmpCam);
        cmpCam.pivot.translateZ(45);
        cmpCam.pivot.lookAt(f.Vector3.ZERO());
        cmpCam.backgroundColor = f.Color.CSS("grey");
        mover.appendChild(camera);
        let cmpLightAmbient = new f.ComponentLight(new f.LightAmbient(f.Color.CSS("WHITE")));
        EscapeTheEdge.rootNode.addComponent(cmpLightAmbient);
        EscapeTheEdge.viewport = new f.Viewport();
        EscapeTheEdge.viewport.initialize("Viewport", EscapeTheEdge.rootNode, camera.getComponent(f.ComponentCamera), _canvas);
        //starting game
        f.RenderManager.update();
        EscapeTheEdge.viewport.draw();
        document.addEventListener("keydown", handleKeyboard);
        document.addEventListener("keyup", handleKeyboard);
        f.Loop.addEventListener("loopFrame" /* LOOP_FRAME */, update);
        f.Loop.start(f.LOOP_MODE.TIME_GAME, 10);
        console.log("update ready");
    } //close startGame
    function update() {
        processInput();
        // bobo.broadcastEvent(new CustomEvent("showNext"));
        EscapeTheEdge.viewport.draw();
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
        // bobo.act(ACTION.IDLE);
    }
})(EscapeTheEdge || (EscapeTheEdge = {}));
//# sourceMappingURL=Main.js.map