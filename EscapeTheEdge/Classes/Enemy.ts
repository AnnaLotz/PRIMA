namespace EscapeTheEdge {
    import f = FudgeCore;

    export class Enemy extends Moveable {
        direction: DIRECTION;
        floor: Floor;
        protected speedMax: f.Vector2;  // units per second


        constructor(_floor: Floor, _name: string = "Enemy") {
            super(_name);
            this.floor = _floor;
            this.addComponent(new f.ComponentTransform());

            this.fetchData();
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
            this.speed.x = randNumb(0.1, Enemy.speedMax.x);

            if (randNumb(0, 1) < 0.5)
                this.direction = DIRECTION.LEFT;
            else
                this.direction = DIRECTION.LEFT;
            this.act(ACTION.WALK, this.direction);
            f.Loop.addEventListener(f.EVENT.LOOP_FRAME, this.update);
        } //close constructor



        public static generateSprites(_txtImage: f.TextureImage): void {
            Enemy.sprites = [];
            let sprite: Sprite = new Sprite(ACTION.WALK);
            sprite.generateByGrid(_txtImage, f.Rectangle.GET(1, 54, 17, 13), 6, new f.Vector2(1, 1), 64, f.ORIGIN2D.BOTTOMCENTER);
            Enemy.sprites.push(sprite);

            sprite = new Sprite(ACTION.IDLE);
            sprite.generateByGrid(_txtImage, f.Rectangle.GET(1, 54, 17, 13), 4, new f.Vector2(1, 1), 64, f.ORIGIN2D.BOTTOMCENTER);
            Enemy.sprites.push(sprite); //(1, 68, 17, 14), 2
        } //close generateSprites



        public act(_action: ACTION, _direction: DIRECTION): void {
            let direction: number = (_direction == DIRECTION.RIGHT ? 1 : -1);
            switch (_direction) {
                case DIRECTION.LEFT:
                    this.direction = DIRECTION.LEFT;
                    this.cmpTransform.local.rotation = f.Vector3.Y(90 - 90 * direction);
                    // console.log(this.speed.x);
                    break;
                case DIRECTION.RIGHT:
                    this.direction = DIRECTION.RIGHT;
                    this.cmpTransform.local.rotation = f.Vector3.Y(90 - 90 * direction);
                    break;
            }
            this.show(_action);
        } //close act

        protected fetchData(): void {
            this.speedMax = new f.Vector2(data[0].enemy[0].speedMaxX, 3);
        }


        protected update = (_event: f.Eventƒ): void => {
            this.broadcastEvent(new CustomEvent("showNext"));

            let timeFrame: number = f.Loop.timeFrameGame / 1000;
            this.speed.y += Enemy.gravity.y * timeFrame;
            let distance: f.Vector3 = f.Vector3.SCALE(this.speed, timeFrame);
            this.cmpTransform.local.translate(distance);
            this.checkCollision(distance);
            if (this.outOfWalkingRange())
                this.changeDirection();

            

        } //close update

        protected changeDirection(): void {
            if (this.direction == DIRECTION.LEFT)
                this.act(ACTION.WALK, DIRECTION.RIGHT);
            else if (this.direction == DIRECTION.RIGHT)
                this.act(ACTION.WALK, DIRECTION.LEFT);
        } //close changedirection

        protected checkCollision(_distance: f.Vector3): boolean {
            let rect: f.Rectangle = this.floor.getRectWorld();
            let fallingVec: f.Vector2 = this.cmpTransform.local.translation.toVector2();
            fallingVec.subtract(_distance.toVector2());
            let hit: boolean = rect.isInside(fallingVec);
            if (hit) {
                let translation: f.Vector3 = this.cmpTransform.local.translation;
                translation.y = rect.y;
                this.speed.y = 0;
                this.cmpTransform.local.translation = translation;
                return true;
            }
            return false;
        } //close checkCollision

        protected outOfWalkingRange(): boolean {
            // let hitNothing: boolean = true;
            let rect: f.Rectangle = (this.floor).getTopRectWorld();
            let hit: boolean = rect.isInside(this.cmpTransform.local.translation.toVector2());
            if (hit) {
                // hitNothing = false;

                return false;

            }
            // console.log("Out of walking range");
            return true;
        }
    } //close class
} //close namespace