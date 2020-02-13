///<reference types="../EscapeTheEdge/FUDGE/FudgeCore.js"/>
namespace EscapeTheEdge {
    import f = FudgeCore;
    import Sprite = L14_ScrollerFoundation.Sprite;
    // import NodeSprite = L14_ScrollerFoundation.NodeSprite;
    export let sprite: Sprite;
    export let viewport: f.Viewport;
    export let rootNode: f.Node;
    export let level: f.Node;
    export let items: f.Node;
    let mover: f.Node;    
    export let characters: f.Node;
    export let bobo: Bobo;
    let enemy: Enemy;
    // let boboBullet: BoboBullet;
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
        items = new f.Node("Items");
        characters = new f.Node("Characters");
        level = createLevel();
        rootNode.appendChild(level);
        rootNode.appendChild(mover);
        rootNode.appendChild(characters);
        rootNode.appendChild(items);


        mover.addComponent(new f.ComponentTransform());

        crc2 = _canvas.getContext("2d");
        let img: HTMLImageElement = document.querySelector("img");
        let txtFigures: f.TextureImage = new f.TextureImage();
        txtFigures.image = img;
        Bobo.generateSprites(txtFigures);
        bobo = new Bobo("Bobo");
        characters.appendChild(bobo);

        Enemy.generateSprites(txtFigures);
        enemy = new Enemy("Enemy");
        characters.appendChild(enemy);
        enemy.cmpTransform.local.translateX(-1.5);

        BoboBullet.generateSprites(txtFigures);


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
        rootNode.appendChild(light);
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
        floor.cmpTransform.local.scaleX(10);
        // floor.cmpTransform.local.translateY(0);
        // floor.cmpTransform.local.translateX(1.5);
        level.appendChild(floor);

        floor = new Floor();
        floor.cmpTransform.local.scaleX(1);
        floor.cmpTransform.local.translateY(3.5);
        level.appendChild(floor);

        floor = new Floor();
        floor.cmpTransform.local.scaleX(2);
        floor.cmpTransform.local.translateY(0.5);
        floor.cmpTransform.local.translateX(2);
        level.appendChild(floor);

        return level;
    } //close createLevel


    function update(): void {
        processInput();

        updateCamera();

        viewport.draw();
        f.RenderManager.update();
        // crc2.strokeRect(-1, -1, canvas.width / 2, canvas.height + 2);
        // crc2.strokeRect(-1, 550, canvas.width + 2, canvas.height);
    }//close update

    function updateCamera(): void {
        let cmpCam: f.ComponentCamera = mover.getChildrenByName("Camera")[0].getComponent(f.ComponentCamera);
        let boboPos: f.Vector3 = bobo.cmpTransform.local.translation;
        cmpCam.pivot.translation = new f.Vector3(boboPos.x, boboPos.y / 3 + 1, cmpCam.pivot.translation.z);
    } //close updateCamera

    function handleKeyboard(_event: KeyboardEvent): void {
        keysPressed[_event.code] = (_event.type == "keydown");
        if (_event.code == f.KEYBOARD_CODE.SPACE && _event.type == "keydown")
            bobo.act(ACTION.JUMP);
        if (_event.code == f.KEYBOARD_CODE.ARROW_LEFT && _event.type == "keydown")
            bobo.shoot(-1);
        if (_event.code == f.KEYBOARD_CODE.ARROW_RIGHT && _event.type == "keydown")
            bobo.shoot(1); 

        // console.log(_event.code);
    } //close handleKeyboard

    function processInput(): void {
        if (keysPressed[f.KEYBOARD_CODE.ARROW_DOWN]) {
            bobo.toSize(SIZE.SMALL);
        } else if (keysPressed[f.KEYBOARD_CODE.ARROW_UP]) {
            bobo.toSize(SIZE.BIG);
        } else {
            bobo.toSize(SIZE.MEDIUM);
        }

        if (keysPressed[f.KEYBOARD_CODE.A]) {
            bobo.act(ACTION.WALK, DIRECTION.LEFT);
        } else if (keysPressed[f.KEYBOARD_CODE.D]) {
            bobo.act(ACTION.WALK, DIRECTION.RIGHT);
        } else {
            bobo.act(ACTION.IDLE);
        }

    } //close processInput
} //close Namespace