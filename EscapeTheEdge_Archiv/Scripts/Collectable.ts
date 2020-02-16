namespace EscapeTheEdge_Archiv {
    import f = FudgeCore;

    export enum COLLECTABLETYPE {
        HEALTH = "Health",
        MANA = "Mana"
    }

    export class Collectable extends f.Node {
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
            this.show();
            f.Loop.addEventListener(f.EVENT.LOOP_FRAME, this.update);
        } //close constructor


        public static generateSprites(_txtImage: f.TextureImage): void {
            Collectable.sprites = [];
            let sprite: Sprite = new Sprite("Collectable");
            sprite.generateByGrid(_txtImage, f.Rectangle.GET(1, 132, 11, 11), 8, new f.Vector2(1, 1), 64, f.ORIGIN2D.BOTTOMCENTER);
            Collectable.sprites.push(sprite);
        } //close generate Sprites
        

        public show(): void {
            for (let child of this.getChildren())
                child.activate(child.name == "Collectable");
        }

        protected update = (_event: f.Eventƒ): void => {
            this.broadcastEvent(new CustomEvent("showNext"));

        } //close update
    } //close class
} //close namespace