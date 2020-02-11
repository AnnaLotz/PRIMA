///<reference types="../Fudge/FudgeCore.js"/> 
namespace EscapeTheEdge {
    import f = FudgeCore;
    import Sprite = L14_ScrollerFoundation.Sprite;
    import NodeSprite = L14_ScrollerFoundation.NodeSprite;
    export let viewport: f.Viewport;
    export let rootNode: f.Node;
    let mover: f.Node;
    let characters: f.Node;
    let bobo: Bobo;
    let sprite: Sprite;

    interface KeyPressed {
        [code: string]: boolean;
    }
    let keysPressed: KeyPressed = {};

    window.addEventListener("load", init);


    function init(_event: Event): void {

        const canvas: HTMLCanvasElement = document.querySelector("canvas");
        f.RenderManager.initialize(true, false);


        startGame(canvas);
    }//close init

    function startGame(_canvas: HTMLCanvasElement): void {

        rootNode = new f.Node("RootNode");
        mover = new f.Node("Mover");
        characters = new f.Node("Characters");
        rootNode.appendChild(mover);
        rootNode.appendChild(characters);

        let crc2: CanvasRenderingContext2D = _canvas.getContext("2d");
        let img: HTMLImageElement = document.querySelector("img");
        let txtBobo: f.TextureImage = new f.TextureImage();
        txtBobo.image = img;
        Bobo.generateSprites(txtBobo);
        bobo = new Bobo("Bobo");
        characters.appendChild(bobo);
        console.log(rootNode.getChildren.length);


        

        let camera: f.Node = new f.Node("Camera");
        let cmpCam: f.ComponentCamera = new f.ComponentCamera();
        camera.addComponent(cmpCam);
        cmpCam.pivot.translateZ(45);
        cmpCam.pivot.lookAt(f.Vector3.ZERO());
        cmpCam.backgroundColor = f.Color.CSS("grey");
        mover.appendChild(camera);

        let cmpLightAmbient: f.ComponentLight = new f.ComponentLight(new f.LightAmbient(f.Color.CSS("WHITE")));
        rootNode.addComponent(cmpLightAmbient);

        viewport = new f.Viewport();
        viewport.initialize("Viewport", rootNode, camera.getComponent(f.ComponentCamera), _canvas);





        //starting game

        f.RenderManager.update();
        viewport.draw();

        document.addEventListener("keydown", handleKeyboard);
        document.addEventListener("keyup", handleKeyboard);

        f.Loop.addEventListener(f.EVENT.LOOP_FRAME, update);
        f.Loop.start(f.LOOP_MODE.TIME_GAME, 10);
        console.log("update ready");

    }//close startGame


    function update(): void {
        processInput();
        // bobo.broadcastEvent(new CustomEvent("showNext"));
        viewport.draw();

    }//close update

    function handleKeyboard(_event: KeyboardEvent): void {
        keysPressed[_event.code] = (_event.type == "keydown");
        if (_event.code == f.KEYBOARD_CODE.SPACE && _event.type == "keydown")
            bobo.act(ACTION.JUMP);
        console.log(_event.code);
    }

    function processInput(): void {
        if (keysPressed[f.KEYBOARD_CODE.A]) {
            bobo.act(ACTION.WALK, DIRECTION.LEFT);
            return;
        }
        if (keysPressed[f.KEYBOARD_CODE.D]) {
            bobo.act(ACTION.WALK, DIRECTION.RIGHT);
            return;
        }

        // bobo.act(ACTION.IDLE);
    }
}