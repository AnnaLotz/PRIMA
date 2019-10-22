///<reference types="../Fudge/FudgeCore.js"/> 
namespace L03_FirstFudge {
    import f = FudgeCore;
    export let viewport: f.Viewport;
    window.addEventListener("load", handleLoad);

    function handleLoad(_event: Event): void {
        const canvas: HTMLCanvasElement = document.querySelector("canvas");
        f.RenderManager.initialize();
        f.Debug.log(canvas);

        let node: f.Node = new f.Node("Quad");

        let mesh: f.MeshQuad = new f.MeshQuad();
        let cmpMesh: f.ComponentMesh = new f. ComponentMesh(mesh);
        node.addComponent(cmpMesh);

        let mtrSolidWhite: f.Material = new f.Material("SolidWhite", f.ShaderUniColor, new f.CoatColored(new f.Color(1, 1, 1, 1)));
        let cmpMTR: f.ComponentMaterial = new f.ComponentMaterial(mtrSolidWhite);
        node.addComponent(cmpMTR);

        //Camera
        let camera: f.Node = new f.Node("Camera");
        let cmpCam: f.ComponentCamera = new f.ComponentCamera();
        camera.addComponent(cmpCam);
        cmpCam.pivot.translateZ(2); //Camera bewegen (um 2 auf der Z-Achse)
 
        viewport = new f.Viewport();
        viewport.initialize("Viewport", node, camera.getComponent(f.ComponentCamera), canvas);
        f.Debug.log(viewport);
        
        viewport.draw();
    }   
}