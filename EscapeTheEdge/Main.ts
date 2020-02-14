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
    // enum GAMESTATE {
    //     STARTSCREEN = "Startscreen",
    //     RUNNING = "Running",
    //     PAUSE = "Pause"
    // }
    // let gamestate: GAMESTATE = GAMESTATE.STARTSCREEN;
    export let musicMuted: boolean = false;
    export let soundMuted: boolean = false;

    interface KeyPressed {
        [code: string]: boolean;
    }
    let keysPressed: KeyPressed = {};

    window.addEventListener("load", init);


    function init(_event: Event): void {

        document.getElementById("startButton").addEventListener("click", startGame);
        document.getElementById("controlButton").addEventListener("click", showControls);
        document.getElementById("musicButton").addEventListener("click", toggleMusic);
        document.getElementById("soundButton").addEventListener("click", toggleSounds);
        document.getElementById("creditsButton").addEventListener("click", showCredits);
        document.getElementById("backButton").addEventListener("click", showMenue);
        document.getElementById("playAgain").addEventListener("click", playAgain);
        showMenue();

        canvas = document.querySelector("canvas");
        f.RenderManager.initialize(true, false);
        startGame();
    }//close init

    function showMenue(): void {
        document.getElementById("gameWrapper").style.display = "none";
        document.getElementById("controlPage").style.display = "none";
        document.getElementById("creditsPage").style.display = "none";
        document.getElementById("backButton").style.display = "none";
        document.getElementById("endScreen").style.display = "none";
        document.getElementById("menueButtons").style.display = "initial";

    }

    function showControls(): void {
        document.getElementById("menueButtons").style.display = "none";
        document.getElementById("controlPage").style.display = "initial";
        document.getElementById("backButton").style.display = "initial";
    } //close showControls

    function toggleMusic(): void {
        if (!musicMuted) {
            musicMuted = true;
            document.getElementById("musicButton").innerHTML = "Musik: aus";
        } else if (musicMuted) {
            musicMuted = false;
            document.getElementById("musicButton").innerHTML = "Musik: an";
        }
        // 
    } //close toggleMusic

    function toggleSounds(): void {
        if (!soundMuted) {
            soundMuted = true;
            document.getElementById("soundButton").innerHTML = "Sounds: aus";
        } else if (soundMuted) {
            soundMuted = false;
            document.getElementById("soundButton").innerHTML = "Sounds: an";
        }
    } //close toggleSounds

    function showCredits(): void {
        document.getElementById("menueButtons").style.display = "none";
        document.getElementById("creditsPage").style.display = "initial";
        document.getElementById("backButton").style.display = "initial";
    }


    function startGame(): void {
        // styleGameCanvas(); //-> Style.ts
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
        Bobo.generateSprites(txtFigures);
        bobo = new Bobo("Bobo");
        characters.appendChild(bobo);

        Enemy.generateSprites(txtFigures);
        // enemy = new Enemy("Enemy");
        // characters.appendChild(enemy);
        // enemy.cmpTransform.local.translateX(-1.5);

        BoboBullet.generateSprites(txtFigures);
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

        Sound.init();
        Sound.playMusic();
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

        if(bobo.cmpTransform.local.translation.y >= level.height) {
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