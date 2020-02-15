///<reference types="../EscapeTheEdge/FUDGE/FudgeCore.js"/>
namespace EscapeTheEdge {
    import f = FudgeCore;
    import Sprite = L14_ScrollerFoundation.Sprite;
    // import NodeSprite = L14_ScrollerFoundation.NodeSprite;
    export let sprite: Sprite;
    export let viewport: f.Viewport;
    export let rootNode: f.Node;
    export let level: Level;
    export let items: f.Node;
    let mover: f.Node;
    export let characters: f.Node;
    export let bobo: Bobo;
    let crc2: CanvasRenderingContext2D;
    export let canvas: HTMLCanvasElement;
    export let data: Object[];
    // enum GAMESTATE {
    //     STARTSCREEN = "Startscreen",
    //     RUNNING = "Running",
    //     PAUSE = "Pause"
    // }
    // let gamestate: GAMESTATE = GAMESTATE.STARTSCREEN;
    export let musicMuted: boolean = true;
    export let soundMuted: boolean = false;

    interface Object {
        enemy: Object[];
        speedMaxX: number;
        // speedMaxY: number;
        spawRate: number;
        damageToBobo: number;
        bobo: Object[];
        bulletSpeed: number;
        manaCostToShoot: number;
        manaCostToResize: number;
    }

    interface KeyPressed {
        [code: string]: boolean;
    }
    let keysPressed: KeyPressed = {};

    loadFilesWithResponse();
    window.addEventListener("load", init);


    function init(_event: Event): void {

        
        showMenue(); //-> style.ts
        document.getElementById("startButton").addEventListener("click", startGame);
        document.getElementById("controlButton").addEventListener("click", showControls);
        document.getElementById("musicButton").addEventListener("click", toggleMusic);
        document.getElementById("soundButton").addEventListener("click", toggleSounds);
        document.getElementById("creditsButton").addEventListener("click", showCredits);
        document.getElementById("backButton").addEventListener("click", showMenue);
        document.getElementById("playAgain").addEventListener("click", playAgain);
        canvas = document.querySelector("canvas");
        f.RenderManager.initialize(true, false);
    }//close init

    export async function loadFilesWithResponse(): Promise<void> {
        let response: Response = await fetch("data.json");
        let offer: string = await response.text();
        data = JSON.parse(offer);
        fetchData(data);
        // Enemy.fetchData();
        // Level.fetchData();
        // Bobo.fetchData();
    } //close loadFiles

    function fetchData(_data: Object[]): void {
        console.log(_data);
        // console.log(data.enemy.spawnRate);
        // console.log(data[0].enemy[0].speedMaxX);

    }

    function startGame(): void {
        Sound.init();
        document.getElementById("stats").style.width = canvas.width + "px";
        document.getElementById("menue").style.display = "none";
        document.getElementById("gameWrapper").style.display = "initial";


        rootNode = new f.Node("RootNode");
        mover = new f.Node("Mover");
        items = new f.Node("Items");
        characters = new f.Node("Characters");
        crc2 = canvas.getContext("2d");
        let img: HTMLImageElement = document.querySelector("img");
        let txtFigures: f.TextureImage = new f.TextureImage();
        txtFigures.image = img;
        Enemy.generateSprites(txtFigures);
        BoboBullet.generateSprites(txtFigures);
        Bobo.generateSprites(txtFigures);
        bobo = new Bobo("Bobo");
        characters.appendChild(bobo);

        level = new Level(1);
        rootNode.appendChild(level);
        rootNode.appendChild(mover);
        rootNode.appendChild(characters);
        rootNode.appendChild(items);
        mover.addComponent(new f.ComponentTransform());


        let camera: f.Node = new f.Node("Camera");
        let cmpCam: f.ComponentCamera = new f.ComponentCamera();
        camera.addComponent(cmpCam);
        cmpCam.pivot.translateZ(5);
        cmpCam.pivot.lookAt(f.Vector3.ZERO());
        cmpCam.pivot.translateY(0.3);
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
        viewport.initialize("Viewport", rootNode, camera.getComponent(f.ComponentCamera), canvas);

        //starting game

        f.RenderManager.update();
        viewport.draw();

        document.addEventListener("keydown", handleKeyboard);
        document.addEventListener("keyup", handleKeyboard);

        // gamestate = GAMESTATE.RUNNING;
        f.Loop.addEventListener(f.EVENT.LOOP_FRAME, update);
        f.Loop.start(f.LOOP_MODE.TIME_GAME, 10);

    }//close startGame



    function update(): void {
        processInput();
        updateCamera();
        viewport.draw();
        f.RenderManager.update();
        document.getElementById("health").style.width = bobo.health + "%";
        document.getElementById("mana").style.width = bobo.mana + "%";

        if (bobo.cmpTransform.local.translation.y >= level.height) {
            win();
        }
    }//close update

    function updateCamera(): void {
        let cmpCam: f.ComponentCamera = mover.getChildrenByName("Camera")[0].getComponent(f.ComponentCamera);
        let boboPos: f.Vector3 = bobo.cmpTransform.local.translation;
        cmpCam.pivot.translation = new f.Vector3(boboPos.x / 2, boboPos.y + 0.8, cmpCam.pivot.translation.z);
    } //close updateCamera

    export function removeNodeFromNode(_toRemove: f.Node, _fromNode: f.Node): void {
        console.log("Removed" + _toRemove);
        _fromNode.removeChild(_toRemove);
    }

    function handleKeyboard(_event: KeyboardEvent): void {
        keysPressed[_event.code] = (_event.type == "keydown");
        if (_event.code == f.KEYBOARD_CODE.SPACE && _event.type == "keydown")
            bobo.act(ACTION.JUMP);
        if (_event.code == f.KEYBOARD_CODE.ARROW_LEFT && _event.type == "keydown")
            bobo.shoot(-1);
        if (_event.code == f.KEYBOARD_CODE.ARROW_RIGHT && _event.type == "keydown")
            bobo.shoot(1);

        // if (_event.code == f.KEYBOARD_CODE.ESC && _event.type == "keydown") {
        //     if (gamestate == GAMESTATE.RUNNING) {
        //         f.Loop.stop();
        //         gamestate = GAMESTATE.PAUSE;
        //     } else {
        //         //ERROR!!
        //         f.Loop.start(f.LOOP_MODE.TIME_GAME, 10);
        //         gamestate = GAMESTATE.RUNNING;
        //     }
        // }
        // if (_event.code == f.KEYBOARD_CODE.R && _event.type == "keydown")
        //     console.log("Restart");

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

    export function gameOver(): void {
        Sound.stopMusic();
        f.Loop.stop();
        document.getElementById("gameWrapper").style.display = "none";
        document.getElementById("endScreen").style.display = "initial";
        document.getElementById("winScreen").style.display = "none";
        document.getElementById("score").innerText = (Number(bobo.cmpTransform.local.translation.y.toFixed(1)) * 10).toString();
    } //close gameOver

    export function win(): void {
        f.Loop.stop();
        Sound.play("win");
        document.getElementById("gameWrapper").style.display = "none";
        document.getElementById("endScreen").style.display = "initial";
        document.getElementById("deathScreen").style.display = "none";

    } //close win

    function playAgain(): void {
        location.reload();
    }

    export function randNumb(_min: number, _max: number): number {
        return Math.random() * (_max - _min) + _min;
    }
} //close Namespace