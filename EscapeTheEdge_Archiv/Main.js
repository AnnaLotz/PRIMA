"use strict";
///<reference types="../EscapeTheEdge_Archiv/FUDGE/FudgeCore.js"/>
var EscapeTheEdge_Archiv;
///<reference types="../EscapeTheEdge_Archiv/FUDGE/FudgeCore.js"/>
(function (EscapeTheEdge_Archiv) {
    var f = FudgeCore;
    let mover;
    EscapeTheEdge_Archiv.musicMuted = true;
    EscapeTheEdge_Archiv.soundMuted = false;
    let keysPressed = {};
    loadFilesWithResponse();
    window.addEventListener("load", init);
    function init(_event) {
        EscapeTheEdge_Archiv.showMenue(); //-> style.ts
        document.getElementById("startButton").addEventListener("click", startGame);
        document.getElementById("controlButton").addEventListener("click", EscapeTheEdge_Archiv.showControls);
        document.getElementById("musicButton").addEventListener("click", EscapeTheEdge_Archiv.toggleMusic);
        document.getElementById("soundButton").addEventListener("click", EscapeTheEdge_Archiv.toggleSounds);
        document.getElementById("creditsButton").addEventListener("click", EscapeTheEdge_Archiv.showCredits);
        document.getElementById("backButton").addEventListener("click", EscapeTheEdge_Archiv.showMenue);
        document.getElementById("playAgain").addEventListener("click", playAgain);
        EscapeTheEdge_Archiv.canvas = document.querySelector("canvas");
        f.RenderManager.initialize(true, false);
    } //close init
    async function loadFilesWithResponse() {
        let response = await fetch("Scripts/data.json");
        let offer = await response.text();
        EscapeTheEdge_Archiv.data = JSON.parse(offer);
    } //close loadFiles
    EscapeTheEdge_Archiv.loadFilesWithResponse = loadFilesWithResponse;
    function startGame() {
        EscapeTheEdge_Archiv.Sound.init();
        document.getElementById("stats").style.width = EscapeTheEdge_Archiv.canvas.width + "px";
        document.getElementById("menue").style.display = "none";
        document.getElementById("gameWrapper").style.display = "initial";
        EscapeTheEdge_Archiv.rootNode = new f.Node("RootNode");
        mover = new f.Node("Mover");
        EscapeTheEdge_Archiv.items = new f.Node("Items");
        EscapeTheEdge_Archiv.characters = new f.Node("Characters");
        let img = document.querySelector("img");
        let txtFigures = new f.TextureImage();
        txtFigures.image = img;
        EscapeTheEdge_Archiv.Enemy.generateSprites(txtFigures);
        EscapeTheEdge_Archiv.BoboBullet.generateSprites(txtFigures);
        EscapeTheEdge_Archiv.Bobo.generateSprites(txtFigures);
        EscapeTheEdge_Archiv.Collectable.generateSprites(txtFigures);
        EscapeTheEdge_Archiv.bobo = new EscapeTheEdge_Archiv.Bobo("Bobo");
        EscapeTheEdge_Archiv.characters.appendChild(EscapeTheEdge_Archiv.bobo);
        EscapeTheEdge_Archiv.level = new EscapeTheEdge_Archiv.Level(1);
        EscapeTheEdge_Archiv.rootNode.appendChild(EscapeTheEdge_Archiv.level);
        EscapeTheEdge_Archiv.rootNode.appendChild(mover);
        EscapeTheEdge_Archiv.rootNode.appendChild(EscapeTheEdge_Archiv.characters);
        EscapeTheEdge_Archiv.rootNode.appendChild(EscapeTheEdge_Archiv.items);
        mover.addComponent(new f.ComponentTransform());
        let camera = new f.Node("Camera");
        let cmpCam = new f.ComponentCamera();
        camera.addComponent(cmpCam);
        cmpCam.pivot.translateZ(5);
        cmpCam.pivot.lookAt(f.Vector3.ZERO());
        cmpCam.pivot.translateY(0.3);
        cmpCam.backgroundColor = new f.Color(0.4, 0.4, 0.4, 1);
        mover.appendChild(camera);
        let cmpLightAmbient = new f.ComponentLight(new f.LightAmbient(f.Color.CSS("WHITE")));
        EscapeTheEdge_Archiv.rootNode.addComponent(cmpLightAmbient);
        let light = new f.Node("Light");
        let cmpLight;
        cmpLight = new f.ComponentLight(new f.LightDirectional(f.Color.CSS("WHITE")));
        cmpLight.pivot.translate(new f.Vector3(0, 0, 10));
        cmpLight.pivot.lookAt(new f.Vector3(0, 0, 0));
        light.addComponent(cmpLight);
        mover.appendChild(light);
        EscapeTheEdge_Archiv.viewport = new f.Viewport();
        EscapeTheEdge_Archiv.viewport.initialize("Viewport", EscapeTheEdge_Archiv.rootNode, camera.getComponent(f.ComponentCamera), EscapeTheEdge_Archiv.canvas);
        //starting game
        f.RenderManager.update();
        EscapeTheEdge_Archiv.viewport.draw();
        document.addEventListener("keydown", handleKeyboard);
        document.addEventListener("keyup", handleKeyboard);
        f.Loop.addEventListener("loopFrame" /* LOOP_FRAME */, update);
        f.Loop.start(f.LOOP_MODE.TIME_GAME, 10);
    } //close startGame
    function update() {
        processInput();
        updateCamera();
        EscapeTheEdge_Archiv.viewport.draw();
        f.RenderManager.update();
        document.getElementById("health").style.width = EscapeTheEdge_Archiv.bobo.health + "%";
        document.getElementById("mana").style.width = EscapeTheEdge_Archiv.bobo.mana + "%";
        if (EscapeTheEdge_Archiv.bobo.cmpTransform.local.translation.y >= EscapeTheEdge_Archiv.level.height)
            win();
    } //close update
    function updateCamera() {
        let cmpCam = mover.getChildrenByName("Camera")[0].getComponent(f.ComponentCamera);
        let boboPos = EscapeTheEdge_Archiv.bobo.cmpTransform.local.translation;
        cmpCam.pivot.translation = new f.Vector3(boboPos.x / 2, boboPos.y + 0.8, cmpCam.pivot.translation.z);
        /****************************************
         * Kamerahintrgrund oben heller machen? !!
         */
    } //close updateCamera
    function removeNodeFromNode(_toRemove, _fromNode) {
        console.log("Removed" + _toRemove);
        _fromNode.removeChild(_toRemove);
    }
    EscapeTheEdge_Archiv.removeNodeFromNode = removeNodeFromNode;
    function handleKeyboard(_event) {
        keysPressed[_event.code] = (_event.type == "keydown");
        if (_event.code == f.KEYBOARD_CODE.SPACE && _event.type == "keydown")
            EscapeTheEdge_Archiv.bobo.act(EscapeTheEdge_Archiv.ACTION.JUMP);
        if (_event.code == f.KEYBOARD_CODE.ARROW_LEFT && _event.type == "keydown")
            EscapeTheEdge_Archiv.bobo.shoot(-1);
        if (_event.code == f.KEYBOARD_CODE.ARROW_RIGHT && _event.type == "keydown")
            EscapeTheEdge_Archiv.bobo.shoot(1);
    } //close handleKeyboard
    function processInput() {
        if (keysPressed[f.KEYBOARD_CODE.ARROW_DOWN])
            EscapeTheEdge_Archiv.bobo.toSize(EscapeTheEdge_Archiv.SIZE.SMALL);
        else if (keysPressed[f.KEYBOARD_CODE.ARROW_UP])
            EscapeTheEdge_Archiv.bobo.toSize(EscapeTheEdge_Archiv.SIZE.BIG);
        else
            EscapeTheEdge_Archiv.bobo.toSize(EscapeTheEdge_Archiv.SIZE.MEDIUM);
        if (keysPressed[f.KEYBOARD_CODE.A])
            EscapeTheEdge_Archiv.bobo.act(EscapeTheEdge_Archiv.ACTION.WALK, EscapeTheEdge_Archiv.DIRECTION.LEFT);
        else if (keysPressed[f.KEYBOARD_CODE.D])
            EscapeTheEdge_Archiv.bobo.act(EscapeTheEdge_Archiv.ACTION.WALK, EscapeTheEdge_Archiv.DIRECTION.RIGHT);
        else
            EscapeTheEdge_Archiv.bobo.act(EscapeTheEdge_Archiv.ACTION.IDLE);
    } //close processInput
    function gameOver() {
        EscapeTheEdge_Archiv.Sound.stopMusic();
        f.Loop.stop();
        document.getElementById("gameWrapper").style.display = "none";
        document.getElementById("endScreen").style.display = "initial";
        document.getElementById("winScreen").style.display = "none";
        document.getElementById("score").innerText = (Number(EscapeTheEdge_Archiv.bobo.cmpTransform.local.translation.y.toFixed(1)) * 10).toString();
    } //close gameOver
    EscapeTheEdge_Archiv.gameOver = gameOver;
    function win() {
        f.Loop.stop();
        EscapeTheEdge_Archiv.Sound.play("win");
        document.getElementById("gameWrapper").style.display = "none";
        document.getElementById("endScreen").style.display = "initial";
        document.getElementById("deathScreen").style.display = "none";
    } //close win
    EscapeTheEdge_Archiv.win = win;
    function playAgain() {
        location.reload();
    }
    function randNumb(_min, _max) {
        return Math.random() * (_max - _min) + _min;
    }
    EscapeTheEdge_Archiv.randNumb = randNumb;
})(EscapeTheEdge_Archiv || (EscapeTheEdge_Archiv = {})); //close Namespace
//# sourceMappingURL=Main.js.map