namespace EscapeTheEdge {
    import f = FudgeCore;

    export enum ENEMYACTION {
        IDLE = "Idle",
        WALK = "Walk",
        JUMP = "Jump"
    }
    export enum ENEMYDIRECTION {
        LEFT, RIGHT
    }

    export class Enemy extends Moveable {
        // private static sprites: Sprite[];
        // private static speedMax: f.Vector2 = new f.Vector2(1.5, 5); // units per second
        // private static gravity: f.Vector2 = f.Vector2.Y(-3);
        // private action: ACTION;
        // private time: f.Time = new f.Time();
        // public speed: f.Vector3 = f.Vector3.ZERO();

        constructor(_name: string = "Bobo") {
            super(_name);
            this.addComponent(new f.ComponentTransform());

            for (let sprite of Enemy.sprites) {
                let nodeSprite: NodeSprite = new NodeSprite(sprite.name, sprite);
                nodeSprite.activate(false);

                nodeSprite.addEventListener(
                    "showNext",
                    (_event: Event) => { (<NodeSprite>_event.currentTarget).showFrameNext(); },
                    true
                );

                this.appendChild(nodeSprite);
            }

            this.show(ACTION.IDLE);
            f.Loop.addEventListener(f.EVENT.LOOP_FRAME, this.update);
        } //close constructor

        public static generateSprites(_txtImage: f.TextureImage): void {
            Enemy.sprites = [];
            let sprite: Sprite = new Sprite(ACTION.WALK);
            sprite.generateByGrid(_txtImage, f.Rectangle.GET(1, 54, 17, 14), 6, new f.Vector2(1, 1), 64, f.ORIGIN2D.BOTTOMCENTER);
            Enemy.sprites.push(sprite);

            sprite = new Sprite(ACTION.IDLE);
            sprite.generateByGrid(_txtImage, f.Rectangle.GET(1, 54, 17, 14), 4, new f.Vector2(1, 1), 64, f.ORIGIN2D.BOTTOMCENTER);
            Enemy.sprites.push(sprite); //(1, 68, 17, 14), 2
        }

        public act(_action: ACTION, _direction?: DIRECTION): void {
            switch (_action) {
                case ACTION.IDLE:
                    this.speed.x = 0;
                    break;
                case ACTION.WALK:
                    let direction: number = (_direction == DIRECTION.RIGHT ? 1 : -1);
                    this.speed.x = Enemy.speedMax.x; // * direction;
                    this.cmpTransform.local.rotation = f.Vector3.Y(90 - 90 * direction);
                    // console.log(direction);
                    break;
                case ACTION.JUMP:
                    this.speed.y = 2;
                    break;
            }
            this.show(_action);
        } //close act

        protected update = (_event: f.Eventƒ): void => {
            this.broadcastEvent(new CustomEvent("showNext"));

            let timeFrame: number = f.Loop.timeFrameGame / 1000;
            this.speed.y += Enemy.gravity.y * timeFrame;
            let distance: f.Vector3 = f.Vector3.SCALE(this.speed, timeFrame);
            this.cmpTransform.local.translate(distance);

            this.checkCollision();
        } //close update

       
    } //close class

} //close namespace