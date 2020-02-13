"use strict";
var EscapeTheEdge;
(function (EscapeTheEdge) {
    var f = FudgeCore;
    let COLLECTABLETYPE;
    (function (COLLECTABLETYPE) {
        COLLECTABLETYPE["HEALTH"] = "Health";
        COLLECTABLETYPE["MANA"] = "Mana";
    })(COLLECTABLETYPE = EscapeTheEdge.COLLECTABLETYPE || (EscapeTheEdge.COLLECTABLETYPE = {}));
    class Collectable extends f.Node {
        constructor(_type) {
            super(_type);
            this.addComponent(new f.ComponentTransform());
            for (let sprite of Collectable.sprites) {
                let nodeSprite = new EscapeTheEdge.NodeSprite(sprite.name, sprite);
                nodeSprite.activate(false);
                nodeSprite.addEventListener("showNext", (_event) => { _event.currentTarget.showFrameNext(); }, true);
                this.appendChild(nodeSprite);
            }
            // this.show(STATUS.FLYING);
            // f.Loop.addEventListener(f.EVENT.LOOP_FRAME, this.update);
        } //close constructor
        static generateSprites(_txtImage) {
            Collectable.sprites = [];
            // let sprite: Sprite = new Sprite(this.type);
            EscapeTheEdge.sprite.generateByGrid(_txtImage, f.Rectangle.GET(2, 38, 6, 3), 1, new f.Vector2(1, 1), 64, f.ORIGIN2D.BOTTOMCENTER);
            // Collectable.sprites.push(sprite);
        } //close generate Sprites
    }
})(EscapeTheEdge || (EscapeTheEdge = {}));
//# sourceMappingURL=Collectable.js.map