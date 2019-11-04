"use strict";
///<reference types="../Fudge/FudgeCore.js"/> 
var L05_PongReflection;
///<reference types="../Fudge/FudgeCore.js"/> 
(function (L05_PongReflection) {
    var f = FudgeCore;
    let viewport;
    //EventHandler
    window.addEventListener("load", handleLoad);
    window.addEventListener("keydown", handleKeydown);
    window.addEventListener("keyup", handleKeyup);
    //Nodes erstellen
    let pong;
    let ball;
    let paddleLeft;
    let paddleRight;
    let ballMovement;
    let keysPressed = {};
    let playerOnePoints = 0;
    let playerTwoPoints = 0;
    //#######################################################################################################################
    //start:
    function handleLoad(_event) {
        document.getElementById("points").innerHTML = "Player 1: " + playerOnePoints.toString() + "<br>";
        document.getElementById("points").innerHTML += "Player 2: " + playerTwoPoints.toString();
        const canvas = document.querySelector("canvas");
        f.RenderManager.initialize();
        f.Debug.log(canvas);
        //Camera
        let camera = new f.Node("Camera");
        let cmpCam = new f.ComponentCamera();
        camera.addComponent(cmpCam);
        cmpCam.pivot.translateZ(45); //Camera bewegen (um x auf der Z-Achse)
        //create Pong Node
        pong = createPong();
        viewport = new f.Viewport();
        viewport.initialize("Viewport", pong, camera.getComponent(f.ComponentCamera), canvas); //was hier "pong" heißt: will einen branch 
        f.Debug.log(viewport);
        f.Debug.log(viewport.getCanvasRectangle());
        viewport.draw();
        //to start a game Loop
        f.Loop.addEventListener("loopFrame" /* LOOP_FRAME */, update);
        f.Loop.start();
    } //close handleLoad
    function createPong() {
        let pong = new f.Node("Pong");
        //Material und ein Mesh erstellen, welches mehrmals als Blaupause genutzt werden kann
        let mtrSolidWhite = new f.Material("SolidWhite", f.ShaderUniColor, new f.CoatColored(new f.Color(1, 1, 1, 1)));
        let mtrSolidGreen = new f.Material("SolidGreen", f.ShaderUniColor, new f.CoatColored(new f.Color(0, 1, 0, 1)));
        let meshQuad = new f.MeshQuad();
        ball = createNode("ball", meshQuad, mtrSolidWhite, f.Vector2.ZERO, new f.Vector2(1, 1));
        paddleLeft = createNode("paddleLeft", meshQuad, mtrSolidGreen, new f.Vector2(-20, 0), new f.Vector2(1, 5));
        paddleRight = createNode("paddleRight", meshQuad, mtrSolidGreen, new f.Vector2(20, 0), new f.Vector2(1, 5));
        pong.appendChild(createNode("topBoundary", meshQuad, null, new f.Vector2(0, 15), new f.Vector2(50, 1)));
        pong.appendChild(createNode("bottomBoundary", meshQuad, null, new f.Vector2(0, -15), new f.Vector2(50, 1)));
        pong.appendChild(createNode("leftBoundary", meshQuad, null, new f.Vector2(-22, 0), new f.Vector2(1, 31)));
        pong.appendChild(createNode("rightBoundary", meshQuad, null, new f.Vector2(22, 0), new f.Vector2(1, 31)));
        //alle restlichen Nodes an das Spielnode "pong" anhängen
        pong.appendChild(ball);
        pong.appendChild(paddleLeft);
        pong.appendChild(paddleRight);
        initializeMovement();
        return pong;
    } //close createGame
    function createNode(_name, _mesh, _material, _translation, _scaling) {
        let node = new f.Node(_name);
        node.addComponent(new f.ComponentTransform);
        node.addComponent(new f.ComponentMaterial(_material));
        node.addComponent(new f.ComponentMesh(_mesh));
        node.cmpTransform.local.translate(_translation.toVector3());
        node.getComponent(f.ComponentMesh).pivot.scale(_scaling.toVector3());
        return node;
    } //close createNode
    function initializeMovement() {
        ballMovement = new f.Vector3(Math.random() * 0.3 - 0.08, Math.random() * 0.3 - 0.08, 0);
        if (ballMovement.x <= 0.04 && ballMovement.x >= -0.1)
            initializeMovement();
        else if (ballMovement.y <= 0.04 && ballMovement.y >= -0.1)
            initializeMovement();
    } //close initializeMovement
    //#######################################################################################################################
    //update-stuff:
    function update(_event) {
        if (keysPressed[f.KEYBOARD_CODE.ARROW_UP]) {
            if (paddleRight.cmpTransform.local.translation.y >= 12.6) {
                paddleRight.cmpTransform.local.translation.y = 12.5;
            }
            else {
                paddleRight.cmpTransform.local.translate(f.Vector3.Y(+0.2));
            }
        }
        else if (keysPressed[f.KEYBOARD_CODE.ARROW_DOWN]) {
            if (paddleRight.cmpTransform.local.translation.y <= -12.6) {
                paddleRight.cmpTransform.local.translation.y = -12.5;
            }
            else {
                paddleRight.cmpTransform.local.translate(f.Vector3.Y(-0.2));
            }
        }
        if (keysPressed[f.KEYBOARD_CODE.W]) {
            if (paddleLeft.cmpTransform.local.translation.y >= 12.6) {
                paddleLeft.cmpTransform.local.translation.y = 12.5;
            }
            else {
                paddleLeft.cmpTransform.local.translate(f.Vector3.Y(+0.2));
            }
        }
        else if (keysPressed[f.KEYBOARD_CODE.S]) {
            if (paddleLeft.cmpTransform.local.translation.y <= -12.6) {
                paddleLeft.cmpTransform.local.translation.y = -12.5;
            }
            else {
                paddleLeft.cmpTransform.local.translate(f.Vector3.Y(-0.2));
            }
        }
        let hit = false;
        for (let node of pong.getChildren()) {
            if (node.name != "ball") {
                //console.log(i);
                hit = hit || detectHit(ball.cmpTransform.local.translation, node);
                console.log(hit);
                if (hit) {
                    processHit(node.name);
                    break;
                }
            }
        }
        moveBall();
        f.RenderManager.update();
        viewport.draw();
    } //close update
    function moveBall() {
        ball.cmpTransform.local.translate(ballMovement);
    } //close moveBall
    function detectHit(_position, _node) {
        let sclRect = _node.getComponent(f.ComponentMesh).pivot.scaling.copy;
        let posRect = _node.cmpTransform.local.translation.copy;
        let rect = new f.Rectangle(posRect.x, posRect.y, sclRect.x, sclRect.y, f.ORIGIN2D.CENTER);
        return rect.isInside(_position.toVector2());
    } //close detectHit
    function processHit(_pongNode) {
        switch (_pongNode) {
            case "topBoundary":
            case "bottomBoundary":
                ballMovement.y = -ballMovement.y;
                console.log("hit wall");
                break;
            case "leftBoundary":
                playerTwoPoints += 1;
                document.getElementById("points").innerHTML = "Player 1: " + playerOnePoints.toString() + "<br>";
                document.getElementById("points").innerHTML += "Player 2: " + playerTwoPoints.toString();
                break;
            case "rightBoundary":
                playerOnePoints += 1;
                document.getElementById("points").innerHTML = "Player 1: " + playerOnePoints.toString() + "<br>";
                document.getElementById("points").innerHTML += "Player 2: " + playerTwoPoints.toString();
                break;
            case "paddleLeft":
            case "paddleRight":
                ballMovement.x = -ballMovement.x;
                console.log("paddle touch");
                break;
            default:
                break;
        }
    } //close handleHit
    function handleKeydown(_event) {
        keysPressed[_event.code] = true;
    } // close handleClick
    function handleKeyup(_event) {
        keysPressed[_event.code] = false;
    } //clode handleKeyup
})(L05_PongReflection || (L05_PongReflection = {})); //close Namespace
//# sourceMappingURL=Main.js.map