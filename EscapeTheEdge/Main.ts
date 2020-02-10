///<reference types="../Fudge/FudgeCore.js"/> 
namespace EscapeTheEdge {
    import f = FudgeCore;
    import Sprite = L14_ScrollerFoundation.Sprite;
    import NodeSprite = L14_ScrollerFoundation.NodeSprite;
    export let viewport: f.Viewport;
    export let rootNode: f.Node = new f.Node("RootNode");
    let mover: f.Node = new f.Node("Mover");
    let sprite: Sprite;

    window.addEventListener("load", init);

    


    function init(_event: Event): void {
        rootNode.appendChild(mover);
        const canvas: HTMLCanvasElement = document.querySelector("canvas");
        f.RenderManager.initialize(true);
        

        startGame(canvas);
    }//close init

    function startGame(_canvas: HTMLCanvasElement): void {
        let camera: f.Node = new f.Node("Camera");
        let cmpCam: f.ComponentCamera = new f.ComponentCamera();
        camera.addComponent(cmpCam);
        cmpCam.pivot.translateZ(45);
        mover.appendChild(camera);

        viewport = new f.Viewport();
        viewport.initialize("Viewport", rootNode, camera.getComponent(f.ComponentCamera), _canvas);
        rootNode.appendChild(mover);

        let cmpLight: f.ComponentLight;
        cmpLight = new f.ComponentLight(new f.LightDirectional(f.Color.CSS("WHITE")));
        cmpLight.pivot.translate(new f.Vector3(50, 10, 50));
        cmpLight.pivot.lookAt(new f.Vector3(0, 0, 0));
        mover.addComponent(cmpLight);
    }//close startGame

    function update(): void {

    }//close update

}