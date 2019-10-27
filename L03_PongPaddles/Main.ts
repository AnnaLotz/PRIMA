///<reference types="../Fudge/FudgeCore.js"/> 
namespace L03_FirstFudge {
    import f = FudgeCore;
    let viewport: f.Viewport;

    //EventHandler
    window.addEventListener("load", handleLoad);
    window.addEventListener("keydown", handleKeydown);
    window.addEventListener("keyup", handleKeyup);

    //Nodes erstellen
    let ball: f.Node = new f.Node("Ball");
    let paddleLeft: f.Node = new f.Node("paddleLeft");
    let paddleRight: f.Node = new f.Node("paddleRight");

    interface KeyPressed {
        [code: string]: boolean;
    }
    let keysPressed: KeyPressed = {};

    function handleLoad(_event: Event): void {
        const canvas: HTMLCanvasElement = document.querySelector("canvas");
        f.RenderManager.initialize();
        f.Debug.log(canvas);

        //Camera
        let camera: f.Node = new f.Node("Camera");
        let cmpCam: f.ComponentCamera = new f.ComponentCamera();
        camera.addComponent(cmpCam);
        cmpCam.pivot.translateZ(45); //Camera bewegen (um x auf der Z-Achse)

        //create Pong Node
        let pong: f.Node = createPong();

        //paddle bewegen (translate der transform Componente)
        paddleLeft.cmpTransform.local.translateX(-20);
        paddleRight.cmpTransform.local.translateX(20);

        // das hier würde das node verzerren: paddleLeft.cmpTransform.local.scaleY(5);
        (<f.ComponentMesh>paddleLeft.getComponent(f.ComponentMesh)).pivot.scaleY(5);
        (<f.ComponentMesh>paddleRight.getComponent(f.ComponentMesh)).pivot.scaleY(5);

        viewport = new f.Viewport();
        viewport.initialize("Viewport", pong, camera.getComponent(f.ComponentCamera), canvas); //was hier "pong" heißt: will einen branch 
        f.Debug.log(viewport);

        viewport.draw();

        //to start a game Loop
        f.Loop.addEventListener(f.EVENT.LOOP_FRAME, update);
        f.Loop.start();

    } //close handleLoad


    function update(_event: Event): void {

        if (keysPressed[f.KEYBOARD_CODE.ARROW_UP]) {
            paddleRight.cmpTransform.local.translate(f.Vector3.Y(+ 0.2));
        } else if (keysPressed[f.KEYBOARD_CODE.ARROW_DOWN]) {
            paddleRight.cmpTransform.local.translate(f.Vector3.Y(- 0.2));
        }
        if (keysPressed[f.KEYBOARD_CODE.W]) {
            paddleLeft.cmpTransform.local.translateY(+ 0.2);
        } else if (keysPressed[f.KEYBOARD_CODE.S]) {
            paddleLeft.cmpTransform.local.translateY(- 0.2);
        }

        f.RenderManager.update();
        viewport.draw();
    }


    function createPong(): f.Node {

        let pong: f.Node = new f.Node("Pong");

        //Material und ein Mesh erstellen, welches mehrmals als Blaupause genutzt werden kann
        let mtrSolidWhite: f.Material = new f.Material("SolidWhite", f.ShaderUniColor, new f.CoatColored(new f.Color(1, 1, 1, 1)));
        let mtrSolidGreen: f.Material = new f.Material("SolidGreen", f.ShaderUniColor, new f.CoatColored(new f.Color(0, 1, 0, 1)));
        let meshQuad: f.MeshQuad = new f.MeshQuad();

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

        //alle Nodes an das Spielnode "pong" anhängen
        pong.appendChild(ball);
        pong.appendChild(paddleLeft);
        pong.appendChild(paddleRight);

        return pong;

    } //close createGame


    function handleKeydown(_event: KeyboardEvent): void {
        keysPressed[_event.code] = true;
    }// close handleClick

    function handleKeyup(_event: KeyboardEvent): void {
        keysPressed[_event.code] = false;
    }//clode handleKeyup

} //close Namespace