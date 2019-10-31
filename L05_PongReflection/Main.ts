///<reference types="../Fudge/FudgeCore.js"/> 
namespace L05_PongReflection {
    import f = FudgeCore;
    let viewport: f.Viewport;

    //EventHandler
    window.addEventListener("load", handleLoad);
    window.addEventListener("keydown", handleKeydown);
    window.addEventListener("keyup", handleKeyup);

    //Nodes erstellen
    let pong: f.Node;
    let ball: f.Node;
    let paddleLeft: f.Node;
    let paddleRight: f.Node;

    let ballMoveX: number;
    let ballMoveY: number;
    let ballMovement: f.Vector3;

    //Array, in dem alle aktuell gedrückten Tasten gepeichert werden
    interface KeyPressed {
        [code: string]: boolean;
    }
    let keysPressed: KeyPressed = {};

    let playerOnePoints: number = 0;
    let playerTwoPoints: number = 0;

    function handleLoad(_event: Event): void {

        document.getElementById("points").innerHTML = "Player 1: " + playerOnePoints.toString() + "<br>";
        document.getElementById("points").innerHTML += "Player 2: " + playerTwoPoints.toString();

        const canvas: HTMLCanvasElement = document.querySelector("canvas");
        f.RenderManager.initialize();
        f.Debug.log(canvas);

        //Camera
        let camera: f.Node = new f.Node("Camera");
        let cmpCam: f.ComponentCamera = new f.ComponentCamera();
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
        f.Loop.addEventListener(f.EVENT.LOOP_FRAME, update);
        f.Loop.start();

    } //close handleLoad



    function update(_event: Event): void {

        if (keysPressed[f.KEYBOARD_CODE.ARROW_UP]) {
            if (paddleRight.cmpTransform.local.translation.y >= 12.6) {
                paddleRight.cmpTransform.local.translation.y = 12.5;
            } else {
                paddleRight.cmpTransform.local.translate(f.Vector3.Y(+ 0.2));
            }
        } else if (keysPressed[f.KEYBOARD_CODE.ARROW_DOWN]) {
            if (paddleRight.cmpTransform.local.translation.y <= -12.6) {
                paddleRight.cmpTransform.local.translation.y = -12.5;
            } else {
                paddleRight.cmpTransform.local.translate(f.Vector3.Y(- 0.2));
            }
        }

        if (keysPressed[f.KEYBOARD_CODE.W]) {
            if (paddleLeft.cmpTransform.local.translation.y >= 12.6) {
                paddleLeft.cmpTransform.local.translation.y = 12.5;
            } else {
                paddleLeft.cmpTransform.local.translate(f.Vector3.Y(+ 0.2));
            }
        } else if (keysPressed[f.KEYBOARD_CODE.S]) {
            if (paddleLeft.cmpTransform.local.translation.y <= -12.6) {
                paddleLeft.cmpTransform.local.translation.y = -12.5;
            } else {
                paddleLeft.cmpTransform.local.translate(f.Vector3.Y(- 0.2));
            }
        }

        let hit: boolean = false;
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



    function processHit(_pongNode: string): void {
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


    function detectHit(_position: f.Vector3, _node: f.Node): boolean {
        let sclRect: f.Vector3 = _node.getComponent(f.ComponentMesh).pivot.scaling.copy;
        let posRect: f.Vector3 = _node.cmpTransform.local.translation.copy;
        let rect: f.Rectangle = new f.Rectangle(posRect.x, posRect.y, sclRect.x, sclRect.y, f.ORIGIN2D.CENTER);
        return rect.isInside(_position.toVector2());
    } //close detectHit


    function moveBall(): void {

        ball.cmpTransform.local.translate(ballMovement);

        // if (ball.cmpTransform.local.translation.y >= 15 || ball.cmpTransform.local.translation.y <= -15) {
        //     ballMovement.y = -ballMovement.y;
        // } else if (ball.cmpTransform.local.translation.x >= 22.5 || ball.cmpTransform.local.translation.x <= -22.5) {
        //     ballMovement.x = -ballMovement.x;
        // }

    } //close moveBall




    function createPong(): f.Node {

        let pong: f.Node = new f.Node("Pong");

        //Material und ein Mesh erstellen, welches mehrmals als Blaupause genutzt werden kann
        let mtrSolidWhite: f.Material = new f.Material("SolidWhite", f.ShaderUniColor, new f.CoatColored(new f.Color(1, 1, 1, 1)));
        let mtrSolidGreen: f.Material = new f.Material("SolidGreen", f.ShaderUniColor, new f.CoatColored(new f.Color(0, 1, 0, 1)));
        let meshQuad: f.MeshQuad = new f.MeshQuad();

        // //den Nodes ein Mesh anhängen
        // ball.addComponent(new f.ComponentMesh(meshQuad));
        // paddleLeft.addComponent(new f.ComponentMesh(meshQuad));
        // paddleRight.addComponent(new f.ComponentMesh(meshQuad));

        // //den Nodes die Farbe anhängen
        // ball.addComponent(new f.ComponentMaterial(mtrSolidWhite));
        // paddleLeft.addComponent(new f.ComponentMaterial(mtrSolidGreen));
        // paddleRight.addComponent(new f.ComponentMaterial(mtrSolidGreen));

        // //Component hinzufügen zum transformieren
        // ball.addComponent(new f.ComponentTransform);
        // paddleLeft.addComponent(new f.ComponentTransform);
        // paddleRight.addComponent(new f.ComponentTransform);

        // //paddle bewegen (translate der transform Componente)
        // paddleLeft.cmpTransform.local.translateX(-20);
        // paddleRight.cmpTransform.local.translateX(20);
        // //Paddle skalieren:
        // // das hier würde das node verzerren: paddleLeft.cmpTransform.local.scaleY(5);
        // (<f.ComponentMesh>paddleLeft.getComponent(f.ComponentMesh)).pivot.scaleY(5);
        // (<f.ComponentMesh>paddleRight.getComponent(f.ComponentMesh)).pivot.scaleY(5);


        //Nodes für die boundaries erstellen
        // let topBoundary: f.Node;
        // let bottomBoundary: f.Node;
        // let leftBoundary: f.Node;
        // let rightBoundary: f.Node;

        // boundaries = [topBoundary, bottomBoundary, leftBoundary, rightBoundary];

        // for (let i: number = 0; i < boundaries.length; i++) {
        //     boundaries[i].addComponent(new f.ComponentMesh(meshQuad));
        //     boundaries[i].addComponent(new f.ComponentTransform);
        //     //boundaries[i].addComponent(new f.ComponentMaterial(mtrSolidWhite));  
        //     pong.appendChild(boundaries[i]);
        // }

        // topBoundary.cmpTransform.local.translateY(15);
        // topBoundary.getComponent(f.ComponentMesh).pivot.scaleX(50);
        // bottomBoundary.cmpTransform.local.translateY(-15);
        // bottomBoundary.getComponent(f.ComponentMesh).pivot.scaleX(50);

        // leftBoundary.cmpTransform.local.translateX(23);
        // leftBoundary.getComponent(f.ComponentMesh).pivot.scaleY(31);
        // rightBoundary.cmpTransform.local.translateX(-23);
        // rightBoundary.getComponent(f.ComponentMesh).pivot.scaleY(31);


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

        initializeVariables();

        return pong;

    } //close createGame


    function createNode(_name: string, _mesh: f.Mesh, _material: f.Material, _translation: f.Vector2, _scaling: f.Vector2): f.Node {
        let node: f.Node = new f.Node(_name);
        node.addComponent(new f.ComponentTransform);
        node.addComponent(new f.ComponentMaterial(_material));
        node.addComponent(new f.ComponentMesh(_mesh));
        node.cmpTransform.local.translate(_translation.toVector3());
        node.getComponent(f.ComponentMesh).pivot.scale(_scaling.toVector3());
        return node;
    } //close createNode


    function initializeVariables(): void {

        //ball Richtung und Geschwindigkeit geben
        ballMoveX = Math.random() * 0.3 - 0.08;
        ballMoveY = Math.random() * 0.3 - 0.08;

        if (ballMoveX <= 0.04 && ballMoveX >= -0.1)
            initializeVariables();
        else if (ballMoveY <= 0.04 && ballMoveY >= -0.1)
            initializeVariables();

        ballMovement = new f.Vector3(ballMoveX, ballMoveY, 0);

    } //close initializeVariables


    function handleKeydown(_event: KeyboardEvent): void {
        keysPressed[_event.code] = true;
    }// close handleClick

    function handleKeyup(_event: KeyboardEvent): void {
        keysPressed[_event.code] = false;
    }//clode handleKeyup

} //close Namespace