"use strict";
///<reference types="../Fudge/FudgeCore.js"/> 
var L14_ScrollerFoundation;
///<reference types="../Fudge/FudgeCore.js"/> 
(function (L14_ScrollerFoundation) {
    var f = FudgeCore;
    var Sprite = L14_ScrollerFoundation.Sprite;
    var NodeSprite = L14_ScrollerFoundation.NodeSprite;
    window.addEventListener("load", init);
    let sprite;
    let root;
    function init() {
        let img = document.querySelector("img");
        let canvas = document.querySelector("canvas");
        let crc2 = canvas.getContext("2d");
        let txtImage = new f.TextureImage();
        txtImage.image = img;
        sprite = new Sprite("Ball");
        sprite.generateByGrid(txtImage, f.Rectangle.GET(2, 2, 16, 16), 6, f.Vector2.ZERO(), 64, f.ORIGIN2D.TOPLEFT);
        //reminder: generateByGrid(_texture: ƒ.TextureImage, _startRect: ƒ.Rectangle, _frames: number, _borderSize: ƒ.Vector2, _resolutionQuad: number, _origin: ƒ.ORIGIN2D)
        f.RenderManager.initialize(true, false);
        root = new f.Node("Root");
        let mtxBall;
        let ball;
        ball = new NodeSprite("Ball", sprite);
        mtxBall = f.Matrix4x4.TRANSLATION(f.Vector3.X(1));
        ball.setFrameDirection(-1);
        root.appendChild(ball);
        ball.addEventListener("showNext", (_event) => { _event.currentTarget.showFrameNext(); }, true);
        let cmpCamera = new f.ComponentCamera();
        cmpCamera.pivot.translateZ(5);
        cmpCamera.pivot.lookAt(f.Vector3.ZERO());
        let viewport = new f.Viewport();
        viewport.initialize("Viewport", root, cmpCamera, canvas);
        viewport.draw(); //ERROR
        /*
                f.Loop.addEventListener(f.EVENT.LOOP_FRAME, update);
                // f.Loop.start(f.LOOP_MODE.TIME_GAME, 10);
        
        
                function update(_event: f.Eventƒ): void {
                    // ƒ.Debug.log(frame);
                    // root.showFrameNext();
                    root.broadcastEvent(new CustomEvent("showNext"));
                    // root.getChildren()[3].cmpTransform.local.rotateY(5);
                    // mtxBall = root.getChildren()[2].cmpTransform.local;
                    // mtxBall.translateX(0.1);
                    // ƒ.Debug.log(mtxHare.translation.toString());
                    if (mtxBall.translation.x > 2) {
                        mtxBall.translation = f.Vector3.X(-2);
                        root.getChildren()[3].activate(!root.getChildren()[3].isActive);
                    }
        
                    viewport.draw();
        
                    crc2.strokeRect(-1, -1, canvas.width / 2, canvas.height + 2);
                    crc2.strokeRect(-1, canvas.height / 2, canvas.width + 2, canvas.height);
                } //close update
        
                */
    } //close init
})(L14_ScrollerFoundation || (L14_ScrollerFoundation = {}));
//# sourceMappingURL=main.js.map