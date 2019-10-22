"use strict";
///<reference types="../Fudge/FudgeCore.js"/> 
var L03_FirstFudge;
///<reference types="../Fudge/FudgeCore.js"/> 
(function (L03_FirstFudge) {
    var f = FudgeCore;
    //Nodes erstellen
    let ball = new f.Node("Ball");
    let paddleLeft = new f.Node("paddleLeft");
    let paddleRight = new f.Node("paddleRight");
    window.addEventListener("load", handleLoad);
    function handleLoad(_event) {
        const canvas = document.querySelector("canvas");
        f.RenderManager.initialize();
        f.Debug.log(canvas);
        //Camera
        let camera = new f.Node("Camera");
        let cmpCam = new f.ComponentCamera();
        camera.addComponent(cmpCam);
        cmpCam.pivot.translateZ(45); //Camera bewegen (um x auf der Z-Achse)
        let pong = createPong();
        //den transform-componenten vom paddle zugreifen
        //let cmpTransform: f.ComponentTransform = paddleLeft.getComponent(f.ComponentTransform);
        //console.log(cmpTransform);
        //paddle bewegen (translate der transform Componente)
        paddleLeft.cmpTransform.local.translateX(-20);
        paddleRight.cmpTransform.local.translateX(20);
        // das hier würde das node verzerrt werden: paddleLeft.cmpTransform.local.scaleY(5);
        paddleLeft.getComponent(f.ComponentMesh).pivot.scaleY(5);
        paddleRight.getComponent(f.ComponentMesh).pivot.scaleY(5);
        L03_FirstFudge.viewport = new f.Viewport();
        L03_FirstFudge.viewport.initialize("Viewport", pong, camera.getComponent(f.ComponentCamera), canvas); //was hier "pong" heißt: will einen branch 
        f.Debug.log(L03_FirstFudge.viewport);
        L03_FirstFudge.viewport.draw();
    } //close handleLoad
    function createPong() {
        let pong = new f.Node("Pong");
        //Material und ein Mesh erstellen, welches mehrmals als Blaupause genutzt werden kann
        let mtrSolidWhite = new f.Material("SolidWhite", f.ShaderUniColor, new f.CoatColored(new f.Color(1, 1, 1, 1)));
        let mtrSolidGreen = new f.Material("SolidGreen", f.ShaderUniColor, new f.CoatColored(new f.Color(0, 1, 0, 1)));
        let meshQuad = new f.MeshQuad();
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
})(L03_FirstFudge || (L03_FirstFudge = {})); //close Namespace
//# sourceMappingURL=Main.js.map