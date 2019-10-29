"use strict";
///<reference types="../Fudge/FudgeCore.js"/> 
var L04_MovingBall;
///<reference types="../Fudge/FudgeCore.js"/> 
(function (L04_MovingBall) {
    var f = FudgeCore;
    let viewport;
    //EventHandler
    window.addEventListener("load", handleLoad);
    window.addEventListener("keydown", handleKeydown);
    window.addEventListener("keyup", handleKeyup);
    //Nodes erstellen
    let ball = new f.Node("Ball");
    let paddleLeft = new f.Node("paddleLeft");
    let paddleRight = new f.Node("paddleRight");
    let ballMoveX;
    let ballMoveY;
    let ballMovement;
    let keysPressed = {};
    function handleLoad(_event) {
        const canvas = document.querySelector("canvas");
        f.RenderManager.initialize();
        f.Debug.log(canvas);
        //Camera
        let camera = new f.Node("Camera");
        let cmpCam = new f.ComponentCamera();
        camera.addComponent(cmpCam);
        cmpCam.pivot.translateZ(45); //Camera bewegen (um x auf der Z-Achse)
        //create Pong Node
        let pong = createPong();
        viewport = new f.Viewport();
        viewport.initialize("Viewport", pong, camera.getComponent(f.ComponentCamera), canvas); //was hier "pong" heißt: will einen branch 
        f.Debug.log(viewport);
        f.Debug.log(viewport.getCanvasRectangle());
        viewport.draw();
        //to start a game Loop
        f.Loop.addEventListener("loopFrame" /* LOOP_FRAME */, update);
        f.Loop.start();
    } //close handleLoad
    function update(_event) {
        if (keysPressed[f.KEYBOARD_CODE.ARROW_UP]) {
            paddleRight.cmpTransform.local.translate(f.Vector3.Y(+0.2));
        }
        else if (keysPressed[f.KEYBOARD_CODE.ARROW_DOWN]) {
            paddleRight.cmpTransform.local.translate(f.Vector3.Y(-0.2));
        }
        if (keysPressed[f.KEYBOARD_CODE.W]) {
            paddleLeft.cmpTransform.local.translateY(+0.2);
        }
        else if (keysPressed[f.KEYBOARD_CODE.S]) {
            paddleLeft.cmpTransform.local.translateY(-0.2);
        }
        moveBall();
        f.RenderManager.update();
        viewport.draw();
    } //close update
    function moveBall() {
        ball.cmpTransform.local.translate(ballMovement);
        if (ball.cmpTransform.local.translation.y >= 15 || ball.cmpTransform.local.translation.y <= -15) {
            ballMoveY = -ballMoveY;
            ballMovement = new f.Vector3(ballMoveX, ballMoveY, 0);
        }
        else if (ball.cmpTransform.local.translation.x >= 22.5 || ball.cmpTransform.local.translation.x <= -22.5) {
            ballMoveX = -ballMoveX;
            ballMovement = new f.Vector3(ballMoveX, ballMoveY, 0);
        }
    } //close moveBall
    function createPong() {
        let pong = new f.Node("Pong");
        //Material und ein Mesh erstellen, welches mehrmals als Blaupause genutzt werden kann
        let mtrSolidWhite = new f.Material("SolidWhite", f.ShaderUniColor, new f.CoatColored(new f.Color(1, 1, 1, 1)));
        let mtrSolidGreen = new f.Material("SolidGreen", f.ShaderUniColor, new f.CoatColored(new f.Color(0, 1, 0, 1)));
        let meshQuad = new f.MeshQuad();
        //den Nodes ein Mesh anhängen
        ball.addComponent(new f.ComponentMesh(meshQuad));
        paddleLeft.addComponent(new f.ComponentMesh(meshQuad));
        paddleRight.addComponent(new f.ComponentMesh(meshQuad));
        //den Nodes die Farbe anhängen
        ball.addComponent(new f.ComponentMaterial(mtrSolidWhite));
        paddleLeft.addComponent(new f.ComponentMaterial(mtrSolidGreen));
        paddleRight.addComponent(new f.ComponentMaterial(mtrSolidGreen));
        //Component hinzufügen zum transformieren
        ball.addComponent(new f.ComponentTransform);
        paddleLeft.addComponent(new f.ComponentTransform);
        paddleRight.addComponent(new f.ComponentTransform);
        //paddle bewegen (translate der transform Componente)
        paddleLeft.cmpTransform.local.translateX(-20);
        paddleRight.cmpTransform.local.translateX(20);
        //Paddle skalieren:
        // das hier würde das node verzerren: paddleLeft.cmpTransform.local.scaleY(5);
        paddleLeft.getComponent(f.ComponentMesh).pivot.scaleY(5);
        paddleRight.getComponent(f.ComponentMesh).pivot.scaleY(5);
        //alle Nodes an das Spielnode "pong" anhängen
        pong.appendChild(ball);
        pong.appendChild(paddleLeft);
        pong.appendChild(paddleRight);
        initializeVariables();
        return pong;
    } //close createGame
    function initializeVariables() {
        //ball Richtung und Geschwindigkeit geben
        ballMoveX = Math.random() * 0.4 - 0.08;
        ballMoveY = Math.random() * 0.4 - 0.08;
        if (ballMoveX <= 0.03 && ballMoveX >= -0.03)
            initializeVariables();
        else if (ballMoveY <= 0.03 && ballMoveY >= -0.03)
            initializeVariables();
        ballMovement = new f.Vector3(ballMoveX, ballMoveY, 0);
    } //close initializeVariables
    function handleKeydown(_event) {
        keysPressed[_event.code] = true;
    } // close handleClick
    function handleKeyup(_event) {
        keysPressed[_event.code] = false;
    } //clode handleKeyup
})(L04_MovingBall || (L04_MovingBall = {})); //close Namespace
//# sourceMappingURL=Main.js.map