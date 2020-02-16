"use strict";
var EscapeTheEdge_Archiv;
(function (EscapeTheEdge_Archiv) {
    var f = FudgeCore;
    let COLLECTABLETYPE;
    (function (COLLECTABLETYPE) {
        COLLECTABLETYPE["HEALTH"] = "Health";
        COLLECTABLETYPE["MANA"] = "Mana";
    })(COLLECTABLETYPE = EscapeTheEdge_Archiv.COLLECTABLETYPE || (EscapeTheEdge_Archiv.COLLECTABLETYPE = {}));
    class Collectable extends f.Node {
        constructor(_type) {
            super(_type);
            this.update = (_event) => {
                this.broadcastEvent(new CustomEvent("showNext"));
            }; //close update
            this.addComponent(new f.ComponentTransform());
            for (let sprite of Collectable.sprites) {
                let nodeSprite = new EscapeTheEdge_Archiv.NodeSprite(sprite.name, sprite);
                nodeSprite.activate(false);
                nodeSprite.addEventListener("showNext", (_event) => { _event.currentTarget.showFrameNext(); }, true);
                this.appendChild(nodeSprite);
            }
            this.show();
            f.Loop.addEventListener("loopFrame" /* LOOP_FRAME */, this.update);
        } //close constructor
        static generateSprites(_txtImage) {
            Collectable.sprites = [];
            let sprite = new EscapeTheEdge_Archiv.Sprite("Collectable");
            sprite.generateByGrid(_txtImage, f.Rectangle.GET(1, 132, 11, 11), 8, new f.Vector2(1, 1), 64, f.ORIGIN2D.BOTTOMCENTER);
            Collectable.sprites.push(sprite);
        } //close generate Sprites
        show() {
            for (let child of this.getChildren())
                child.activate(child.name == "Collectable");
        }
    } //close class
    EscapeTheEdge_Archiv.Collectable = Collectable;
})(EscapeTheEdge_Archiv || (EscapeTheEdge_Archiv = {})); //close namespace
//# sourceMappingURL=Collectable.js.map