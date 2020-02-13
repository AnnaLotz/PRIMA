namespace EscapeTheEdge {
    import f = FudgeCore;

    export enum STATUS {
        FLYING = "Flying",
        EXPLODING = "Exploding"
    }

    export class BoboBullet extends f.Node {
        protected static sprites: Sprite[];
        protected speed: f.Vector3;
        protected direction: number;

        constructor(_direction: number, _name: string = "BoboBullet") {
            super(_name);
            this.addComponent(new f.ComponentTransform());
            this.direction = _direction;
            this.speed = new f.Vector3(this.direction, 0, 0);
            this.cmpTransform.local.translation = bobo.cmpTransform.local.translation;
            this.cmpTransform.local.translateY(0.08);

            for (let sprite of BoboBullet.sprites) {
                let nodeSprite: NodeSprite = new NodeSprite(sprite.name, sprite);
                nodeSprite.activate(false);

                nodeSprite.addEventListener(
                    "showNext",
                    (_event: Event) => { (<NodeSprite>_event.currentTarget).showFrameNext(); },
                    true
                );

                this.appendChild(nodeSprite);
            }
            this.show(STATUS.FLYING);

            setTimeout(() => {
                this.removeBullet();
            },         5000);
            f.Loop.addEventListener(f.EVENT.LOOP_FRAME, this.update);

        } //close constructor


        public static generateSprites(_txtImage: f.TextureImage): void {
            BoboBullet.sprites = [];
            let sprite: Sprite = new Sprite(STATUS.FLYING);
            sprite.generateByGrid(_txtImage, f.Rectangle.GET(2, 38, 6, 3), 4, new f.Vector2(1, 1), 64, f.ORIGIN2D.BOTTOMCENTER);
            BoboBullet.sprites.push(sprite);

            sprite = new Sprite(STATUS.EXPLODING);
            sprite.generateByGrid(_txtImage, f.Rectangle.GET(2, 42, 4, 4), 3, new f.Vector2(1, 1), 64, f.ORIGIN2D.BOTTOMCENTER);
            BoboBullet.sprites.push(sprite);
        } //close generate Sprites

        public act(_status: STATUS, _direction?: DIRECTION): void {
            switch (_status) {
                case STATUS.FLYING:
                    // let direction: number = (_direction == DIRECTION.RIGHT ? 1 : -1);
                    // this.speed.x = this.speedMax.x; // * direction;
                    this.cmpTransform.local.rotation = f.Vector3.Y(90 - 90 * this.direction);
                    // console.log(direction);
                    break;
                case STATUS.EXPLODING:
                    // if (this.speed.y == 0) //für kein doppelSprung
                    this.speed = f.Vector3.ZERO();
                    break;
            }
            this.show(_status);
        } //close act

        public show(_status: STATUS): void {
            if (_status == STATUS.EXPLODING)
                return;
            for (let child of this.getChildren())
                child.activate(child.name == _status);
        }

        public removeBullet(): void {
            removeNodeFromNode(this, items);
        } //close removeBullet

        protected update = (_event: f.Eventƒ): void => {
            this.broadcastEvent(new CustomEvent("showNext"));

            let timeFrame: number = f.Loop.timeFrameGame / 1000;
            // this.speed.y += Bobo.gravity.y * timeFrame;
            let distance: f.Vector3 = f.Vector3.SCALE(this.speed, timeFrame);
            this.cmpTransform.local.translate(distance);

            this.checkHit();
        } //close update

        protected checkHit(): void {
            let hitEnemy: boolean = false;
            for (let enemy of characters.getChildren()) {
                if (enemy instanceof Enemy && !hitEnemy && STATUS.FLYING) {
                    let enemyPos: f.Vector3 = enemy.cmpTransform.local.translation;
                    let bulletPos: f.Vector3 = this.cmpTransform.local.translation;
                    let dif: f.Vector3 = f.Vector3.DIFFERENCE(enemyPos, bulletPos);
                    let distance: number = Math.abs(Math.sqrt(dif.x * dif.x + dif.y * dif.y + dif.z * dif.z));
                    // console.log(distance);
                    if (distance < 0.15) {
                        hitEnemy = true;
                        this.act(STATUS.EXPLODING);
                        // window.setTimeout(this.kill, 2000, enemy);
                        this.kill(enemy);

                        f.Loop.removeEventListener(f.EVENT.LOOP_FRAME, this.update);

                        break;
                    }
                    // console.log(enemy);
                }
            }
            for (let floor of level.getChildren()) {
                let rect: f.Rectangle = (<Floor>floor).getRectWorld();
                let hit: boolean = rect.isInside(this.cmpTransform.local.translation.toVector2());
                if (hit) {
                    console.log("HIT");
                    this.removeBullet();
                    f.Loop.removeEventListener(f.EVENT.LOOP_FRAME, this.update);
                    break;
                }
            }
        }// close checkHit

        protected kill(_enemy: Enemy): void {
            characters.removeChild(_enemy);
            this.removeBullet();
        }


    } //close class
} //close Namespace