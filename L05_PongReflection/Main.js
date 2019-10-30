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
    let ball = new f.Node("ball");
    let paddleLeft = new f.Node("paddleLeft");
    let paddleRight = new f.Node("paddleRight");
    let ballMoveX;
    let ballMoveY;
    let ballMovement;
    let boundaries = [];
    let keysPressed = {};
    let playerOnePoints = 0;
    let playerTwoPoints = 0;
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
        for (let i of pong.getChildren()) {
            if (i.name !== "ball") {
                //console.log(i);
                let sclRect = i.getComponent(f.ComponentMesh).pivot.scaling.copy;
                let posRect = i.cmpTransform.local.translation.copy;
                let hit = detectHit(ball.cmpTransform.local.translation, posRect, sclRect);
                console.log(hit);
                if (hit) {
                    handleHit(i.name);
                    break;
                }
            }
        }
        moveBall();
        f.RenderManager.update();
        viewport.draw();
    } //close update
    function handleHit(_pongNode) {
        switch (_pongNode) {
            case "topBoundary":
            case "bottomBoundary":
                ballMovement.y = -ballMovement.y;
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
                break;
            default:
                break;
        }
    }
    function detectHit(_position, _posRect, _sclRect) {
        let rect = new f.Rectangle(_posRect.x, _posRect.y, _sclRect.x, _sclRect.y, f.ORIGIN2D.CENTER);
        return rect.isInside(_position.toVector2());
    } //close detectHit
    function moveBall() {
        ball.cmpTransform.local.translate(ballMovement);
        // if (ball.cmpTransform.local.translation.y >= 15 || ball.cmpTransform.local.translation.y <= -15) {
        //     ballMovement.y = -ballMovement.y;
        // } else if (ball.cmpTransform.local.translation.x >= 22.5 || ball.cmpTransform.local.translation.x <= -22.5) {
        //     ballMovement.x = -ballMovement.x;
        // }
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
        //Nodes für die boundaries erstellen
        let topBoundary = new f.Node("topBoundary");
        let bottomBoundary = new f.Node("bottomBoundary");
        let leftBoundary = new f.Node("leftBoundary");
        let rightBoundary = new f.Node("rightBoundary");
        boundaries = [topBoundary, bottomBoundary, leftBoundary, rightBoundary];
        for (let i = 0; i < boundaries.length; i++) {
            boundaries[i].addComponent(new f.ComponentMesh(meshQuad));
            boundaries[i].addComponent(new f.ComponentTransform);
            //boundaries[i].addComponent(new f.ComponentMaterial(mtrSolidWhite));  
            pong.appendChild(boundaries[i]);
        }
        topBoundary.cmpTransform.local.translateY(15);
        topBoundary.getComponent(f.ComponentMesh).pivot.scaleX(50);
        bottomBoundary.cmpTransform.local.translateY(-15);
        bottomBoundary.getComponent(f.ComponentMesh).pivot.scaleX(50);
        leftBoundary.cmpTransform.local.translateX(23);
        leftBoundary.getComponent(f.ComponentMesh).pivot.scaleY(31);
        rightBoundary.cmpTransform.local.translateX(-23);
        rightBoundary.getComponent(f.ComponentMesh).pivot.scaleY(31);
        //alle restlichen Nodes an das Spielnode "pong" anhängen
        pong.appendChild(ball);
        pong.appendChild(paddleLeft);
        pong.appendChild(paddleRight);
        initializeVariables();
        return pong;
    } //close createGame
    function initializeVariables() {
        //ball Richtung und Geschwindigkeit geben
        ballMoveX = Math.random() * 0.3 - 0.08;
        ballMoveY = Math.random() * 0.3 - 0.08;
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
})(L05_PongReflection || (L05_PongReflection = {})); //close Namespace
//# sourceMappingURL=Main.js.map