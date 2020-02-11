///<reference types="../Fudge/FudgeCore.js"/> 
namespace EscapeTheEdge {
    import f = FudgeCore;
    import Sprite = L14_ScrollerFoundation.Sprite;
    // import NodeSprite = L14_ScrollerFoundation.NodeSprite;
    export let sprite: Sprite;
    export let viewport: f.Viewport;
    export let rootNode: f.Node;
    export let level: f.Node;
    let mover: f.Node;
    let characters: f.Node;
    let bobo: Bobo;
    let crc2: CanvasRenderingContext2D;
    let canvas: HTMLCanvasElement;


    interface KeyPressed {
        [code: string]: boolean;
    }
    let keysPressed: KeyPressed = {};

    window.addEventListener("load", init);


    function init(_event: Event): void {

        canvas = document.querySelector("canvas");
        f.RenderManager.initialize(true, false);


        startGame(canvas);
    }//close init

    function startGame(_canvas: HTMLCanvasElement): void {

        rootNode = new f.Node("RootNode");
        mover = new f.Node("Mover");
        characters = new f.Node("Characters");
        level = createLevel();
        rootNode.appendChild(mover);
        rootNode.appendChild(characters);
        rootNode.appendChild(level);

        mover.addComponent(new f.ComponentTransform());

        crc2 = _canvas.getContext("2d");
        let img: HTMLImageElement = document.querySelector("img");
        let txtBobo: f.TextureImage = new f.TextureImage();
        txtBobo.image = img;
        Bobo.generateSprites(txtBobo);
        bobo = new Bobo("Bobo");
        characters.appendChild(bobo);


        // bobo.appendChild(mover);


        let camera: f.Node = new f.Node("Camera");
        let cmpCam: f.ComponentCamera = new f.ComponentCamera();
        camera.addComponent(cmpCam);
        cmpCam.pivot.translateZ(5);
        cmpCam.pivot.lookAt(f.Vector3.ZERO());
        cmpCam.pivot.translateY(1);
        cmpCam.backgroundColor = f.Color.CSS("grey");
        mover.appendChild(camera);

        let cmpLightAmbient: f.ComponentLight = new f.ComponentLight(new f.LightAmbient(f.Color.CSS("WHITE")));
        rootNode.addComponent(cmpLightAmbient);

        let light: f.Node = new f.Node("Light");
        let cmpLight: f.ComponentLight;
        cmpLight = new f.ComponentLight(new f.LightDirectional(f.Color.CSS("WHITE")));
        cmpLight.pivot.translate(new f.Vector3(0, 0, 10));
        cmpLight.pivot.lookAt(new f.Vector3(0, 0, 0));
        light.addComponent(cmpLight);
        // mover.appendChild(light);

        viewport = new f.Viewport();
        viewport.initialize("Viewport", rootNode, camera.getComponent(f.ComponentCamera), _canvas);

        //starting game

        f.RenderManager.update();
        viewport.draw();

        document.addEventListener("keydown", handleKeyboard);
        document.addEventListener("keyup", handleKeyboard);

        f.Loop.addEventListener(f.EVENT.LOOP_FRAME, update);
        f.Loop.start(f.LOOP_MODE.TIME_GAME, 10);

    }//close startGame

    function createLevel(): f.Node {

        let level: f.Node = new f.Node("Level");
        let floor: Floor = new Floor();

        floor = new Floor();
        floor.cmpTransform.local.scaleY(1);
        floor.cmpTransform.local.scaleX(3);
        // floor.cmpTransform.local.translateY(0);
        // floor.cmpTransform.local.translateX(1.5);
        level.appendChild(floor);

        floor = new Floor();
        floor.cmpTransform.local.scaleX(1);
        floor.cmpTransform.local.translateY(3.5);
        level.appendChild(floor);

        floor = new Floor();
        floor.cmpTransform.local.scaleX(2);
        floor.cmpTransform.local.translateY(1);
        floor.cmpTransform.local.translateX(2);
        // rootNode.appendChild(floor);

        return level;
    }


    function update(): void {
        processInput();

        // mover.cmpTransform.local.translation.x = bobo.cmpTransform.local.translation.x;
       
        

        

        viewport.draw();
        f.RenderManager.update();
        crc2.strokeRect(-1, -1, canvas.width / 2, canvas.height + 2);
        crc2.strokeRect(-1, 550, canvas.width + 2, canvas.height);

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

        bobo.act(ACTION.IDLE);
    } //close processInput
} //close Namespace