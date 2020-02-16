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
            this.update = (_event) => {
                this.broadcastEvent(new CustomEvent("showNext"));
            }; //close update
            this.addComponent(new f.ComponentTransform());
            for (let sprite of Collectable.sprites) {
                let nodeSprite = new EscapeTheEdge.NodeSprite(sprite.name, sprite);
                nodeSprite.activate(false);
                nodeSprite.addEventListener("showNext", (_event) => { _event.currentTarget.showFrameNext(); }, true);
                this.appendChild(nodeSprite);
            }
            this.show();
            f.Loop.addEventListener("loopFrame" /* LOOP_FRAME */, this.update);
            // this.show(STATUS.FLYING);
            // f.Loop.addEventListener(f.EVENT.LOOP_FRAME, this.update);
        } //close constructor
        static generateSprites(_txtImage) {
            Collectable.sprites = [];
            let sprite = new EscapeTheEdge.Sprite("Collectable");
            sprite.generateByGrid(_txtImage, f.Rectangle.GET(1, 132, 11, 11), 8, new f.Vector2(1, 1), 64, f.ORIGIN2D.BOTTOMCENTER);
            Collectable.sprites.push(sprite);
        } //close generate Sprites
        show() {
            // if (_action == ACTION.JUMP)
            //     return;
            for (let child of this.getChildren())
                child.activate(child.name == "Collectable");
            // this.action = _action;
        }
    }
    EscapeTheEdge.Collectable = Collectable;
})(EscapeTheEdge || (EscapeTheEdge = {}));
//# sourceMappingURL=Collectable.js.map