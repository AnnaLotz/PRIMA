namespace EscapeTheEdge {
    import f = FudgeCore;


    export class Moveable extends f.Node {
        protected static sprites: Sprite[];
        protected static speedMax: f.Vector2 = new f.Vector2(1.5, 3); // units per second
        protected static gravity: f.Vector2 = f.Vector2.Y(-3);
        public speed: f.Vector3 = f.Vector3.ZERO();

        constructor(_name: string = "Bobo") {
            super(_name);
        } //close constructor


        public show(_action: ACTION): void {
            if (_action == ACTION.JUMP)
                return;
            for (let child of this.getChildren())
                child.activate(child.name == _action);
        } //close show

        protected update = (_event: f.Eventƒ): void => {
            this.broadcastEvent(new CustomEvent("showNext"));
            let timeFrame: number = f.Loop.timeFrameGame / 1000;
            let distance: f.Vector3 = f.Vector3.SCALE(this.speed, timeFrame);
            this.cmpTransform.local.translate(distance);
            this.checkCollision(distance);
        } //close update


        protected checkCollision(_distance: f.Vector3): boolean {
            for (let floor of level.getChildren()) {
                let rect: f.Rectangle = (<Floor>floor).getRectWorld();
                let fallingVec: f.Vector2 = this.cmpTransform.local.translation.toVector2();
                fallingVec.subtract(_distance.toVector2());
                let hit: boolean = rect.isInside(fallingVec);
                if (hit) {
                    let translation: f.Vector3 = this.cmpTransform.local.translation;
                    if (floor instanceof Wall) {
                        translation.x = rect.x + (floor.side == 1 ? - 0.1 : + rect.width + 0.1);
                        this.speed.x = 0;
                        this.cmpTransform.local.translation = translation;
                    } else if (this.speed.y < 0) {
                        translation.y = rect.y;
                        this.speed.y = 0;
                        this.cmpTransform.local.translation = translation;
                        return true;
                    }
                }
            }
            return false;
        } //close checkCollision

    } //close class
} //close namespace