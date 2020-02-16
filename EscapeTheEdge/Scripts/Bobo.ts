namespace EscapeTheEdge {
    import f = FudgeCore;

    export enum ACTION {
        IDLE = "Idle",
        WALK = "Walk",
        JUMP = "Jump"
    }
    export enum SIZE {
        SMALL = "Small",
        MEDIUM = "Medium",
        BIG = "Big"
    }
    export enum DIRECTION {
        LEFT, RIGHT
    }

    export class Bobo extends Moveable {
        public bullet: BoboBullet;
        public mana: number = 100;
        public health: number = 100;
        manaCostToShoot: number;
        manaCostToResize: number;
        protected enemyDamage: number;
        private speedMax: f.Vector2 = new f.Vector2(1.5, 5); // units per second
        private size: SIZE = SIZE.MEDIUM;


        constructor(_name: string = "Bobo") {
            super(_name);
            this.fetchData();
            this.addComponent(new f.ComponentTransform());
            this.cmpTransform.local.translateX(-1);
            for (let sprite of Bobo.sprites) {
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
            Bobo.sprites = [];
            let sprite: Sprite = new Sprite(ACTION.WALK);
            sprite.generateByGrid(_txtImage, f.Rectangle.GET(1, 0, 17, 17), 6, new f.Vector2(1, 1), 64, f.ORIGIN2D.BOTTOMCENTER);
            Bobo.sprites.push(sprite);

            sprite = new Sprite(ACTION.IDLE);
            sprite.generateByGrid(_txtImage, f.Rectangle.GET(1, 18, 17, 17), 7, new f.Vector2(1, 1), 64, f.ORIGIN2D.BOTTOMCENTER);
            Bobo.sprites.push(sprite);
        } //close generate Sprites



        public act(_action: ACTION, _direction?: DIRECTION): void {
            switch (_action) {
                case ACTION.IDLE:
                    this.speed.x = 0;
                    break;
                case ACTION.WALK:
                    let direction: number = (_direction == DIRECTION.RIGHT ? 1 : -1);
                    if (this.cmpTransform.local.translation.x > -2.5 && this.cmpTransform.local.translation.x < 2.5)
                        this.speed.x = this.speedMax.x;
                    this.cmpTransform.local.rotation = f.Vector3.Y(90 - 90 * direction);
                    break;
                case ACTION.JUMP:
                    if (this.speed.y == 0) { //für keinen doppelSprung 
                        Sound.play("boboJump");
                        this.speed.y = this.speedMax.y;
                    }
                    break;
            }
            this.show(_action);
        } //close act

        public toSize(_size: SIZE): void {
            if (this.mana <= 0) {
                _size = SIZE.MEDIUM;
            }
            this.size = _size;
            switch (_size) {
                case SIZE.MEDIUM:
                    this.cmpTransform.local.scaling = new f.Vector3(1, 1, 1);
                    this.speedMax = new f.Vector2(1, 2);
                    break;
                case SIZE.SMALL:
                    Sound.play("boboShrink");
                    this.cmpTransform.local.scaling = new f.Vector3(0.6, 0.6, 1);
                    this.speedMax = new f.Vector2(5, 2);
                    break;
                case SIZE.BIG:
                    Sound.play("boboGrow");
                    this.cmpTransform.local.scaling = new f.Vector3(1.5, 1.5, 1);
                    this.speedMax = new f.Vector2(0.5, 2.2);
                    break;
            }
        } //close toSize

        public shoot(_direction: number): void {
            if (this.mana >= this.manaCostToShoot) {
                Sound.play("boboShoot");
                this.bullet = new BoboBullet(_direction);
                items.appendChild(this.bullet);
                this.mana -= this.manaCostToShoot;
            }
        } //close shoot

        protected update = (_event: f.Eventƒ): void => {
            this.broadcastEvent(new CustomEvent("showNext"));
            let timeFrame: number = f.Loop.timeFrameGame / 1000;
            this.speed.y += Bobo.gravity.y * timeFrame;
            let distance: f.Vector3 = f.Vector3.SCALE(this.speed, timeFrame);
            let halfDist: f.Vector3 = new f.Vector3(distance.x / 2, distance.y / 2, distance.z / 2);
            this.cmpTransform.local.translate(distance);
            this.checkCollision(halfDist);
            this.checkCollision(distance);
            this.checkHit(characters);
            this.checkHit(items);
            this.handleHealthAndMana();
        } //close update


        protected fetchData(): void {
            this.enemyDamage = data[0].enemy[0].damageToBobo;
            this.manaCostToShoot = data[0].bobo[0].manaCostToShoot;
            this.manaCostToResize = data[0].bobo[0].manaCostToResize;
        }

        protected checkHit(_object: f.Node): void {
            for (let object of _object.getChildren()) {
                if (!(object instanceof Bobo)) {
                    let evilPos: f.Vector3 = object.cmpTransform.local.translation;
                    let boboPos: f.Vector3 = this.cmpTransform.local.translation;
                    let dif: f.Vector3 = f.Vector3.DIFFERENCE(evilPos, boboPos);
                    let distance: number = Math.abs(Math.sqrt(dif.x * dif.x + dif.y * dif.y + dif.z * dif.z));
                    if (distance < 0.15) {
                        if (object instanceof Enemy) {
                            this.health -= this.enemyDamage;
                        } else if (object instanceof Collectable) {
                            this.mana += 5;
                            removeNodeFromNode(object, items);
                        }
                    }
                }
            }
        } //close checkHit

        private handleHealthAndMana(): void {
            //mana abzeihen für größe
            if (this.size != SIZE.MEDIUM) {
                this.mana -= this.manaCostToResize;
                console.log("Mana: " + this.mana);
            }
            if (this.mana < 0) {
                this.mana = 0;
            } else if (this.mana > 100) {
                this.mana = 100;
            }

            if (this.health <= 0) {
                Sound.play("boboDeath");
                gameOver();
            } else if (this.health >= 100) {
                this.health = 100;
            }
        } //close healthandMana

    } //close class
} //close namespace