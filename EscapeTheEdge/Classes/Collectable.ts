namespace EscapeTheEdge {
    import f = FudgeCore;

    export enum COLLECTABLETYPE {
        HEALTH = "Health",
        MANA = "Mana"
    }

    class Collectable extends f.Node {
        protected static sprites: Sprite[];
        type: COLLECTABLETYPE; 

        constructor(_type: COLLECTABLETYPE) {
            super(_type);
            this.addComponent(new f.ComponentTransform());
          

            for (let sprite of Collectable.sprites) {
                let nodeSprite: NodeSprite = new NodeSprite(sprite.name, sprite);
                nodeSprite.activate(false);

                nodeSprite.addEventListener(
                    "showNext",
                    (_event: Event) => { (<NodeSprite>_event.currentTarget).showFrameNext(); },
                    true
                );

                this.appendChild(nodeSprite);
            }
            // this.show(STATUS.FLYING);


            // f.Loop.addEventListener(f.EVENT.LOOP_FRAME, this.update);

        } //close constructor
        public static generateSprites(_txtImage: f.TextureImage): void {
            Collectable.sprites = [];
            // let sprite: Sprite = new Sprite(this.type);
            sprite.generateByGrid(_txtImage, f.Rectangle.GET(2, 38, 6, 3), 1, new f.Vector2(1, 1), 64, f.ORIGIN2D.BOTTOMCENTER);
            // Collectable.sprites.push(sprite);

        } //close generate Sprites
    }
}