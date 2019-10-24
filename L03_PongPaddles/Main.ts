///<reference types="../Fudge/FudgeCore.js"/> 
namespace L03_FirstFudge {
    import f = FudgeCore;
    export let viewport: f.Viewport;

    //EventHandler
    window.addEventListener("load", handleLoad);
    window.addEventListener("keydown", handleClick);

    //Nodes erstellen
    let ball: f.Node = new f.Node("Ball");
    let paddleLeft: f.Node = new f.Node("paddleLeft");
    let paddleRight: f.Node = new f.Node("paddleRight");


    function handleLoad(_event: Event): void {
        const canvas: HTMLCanvasElement = document.querySelector("canvas");
        f.RenderManager.initialize();
        f.Debug.log(canvas);


        //Camera
        let camera: f.Node = new f.Node("Camera");
        let cmpCam: f.ComponentCamera = new f.ComponentCamera();
        camera.addComponent(cmpCam);
        cmpCam.pivot.translateZ(45); //Camera bewegen (um x auf der Z-Achse)

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
    } //close handleLoad


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


    function handleClick(_event: KeyboardEvent): void {
        // console.log("handleClick");
        // 38: arrowup  40: arrowndown
        switch (_event.keyCode) {
            case 38:
                paddleRight.cmpTransform.local.translateY(+ 1);
            case 40:
                paddleRight.cmpTransform.local.translateY(- 1);
            default:
                break;
        }

        // if (_event.keyCode == 38) {
        //     //let currentPosZ: number = paddleRight.cmpTransform.local.translation.z;
        //     paddleRight.cmpTransform.local.translateY(- 1);

           
        //     console.log(paddleRight.cmpTransform.local.translation.z);

        //     // console.log(paddleRight.cmpTransform.local.translation.z);
        // }

        viewport.draw();
        f.RenderManager.update();


    }// close handleClick

} //close Namespace