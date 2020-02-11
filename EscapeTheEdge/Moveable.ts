namespace EscapeTheEdge {
    import f = FudgeCore;


    export class Moveable extends f.Node {
        protected static sprites: Sprite[];
        protected static speedMax: f.Vector2 = new f.Vector2(1.5, 5); // units per second
        protected static gravity: f.Vector2 = f.Vector2.Y(-3);
        // private action: ACTION;
        // private time: f.Time = new f.Time();
        public speed: f.Vector3 = f.Vector3.ZERO();

        constructor(_name: string = "Bobo") {
            super(_name);
        } //close constructor


        public show(_action: ACTION): void {
            if (_action == ACTION.JUMP)
                return;
            for (let child of this.getChildren())
                child.activate(child.name == _action);
            // this.action = _action;
        }

        protected update = (_event: f.Eventƒ): void => {
            this.broadcastEvent(new CustomEvent("showNext"));

            let timeFrame: number = f.Loop.timeFrameGame / 1000;
            // this.speed.y += Bobo.gravity.y * timeFrame;
            let distance: f.Vector3 = f.Vector3.SCALE(this.speed, timeFrame);
            this.cmpTransform.local.translate(distance);

            this.checkCollision();
        } //close update


        protected checkCollision(): void {
            for (let floor of level.getChildren()) {
                let rect: f.Rectangle = (<Floor>floor).getRectWorld();
                //console.log(rect.toString());
                let hit: boolean = rect.isInside(this.cmpTransform.local.translation.toVector2());
                if (hit) {
                    let translation: f.Vector3 = this.cmpTransform.local.translation;
                    translation.y = rect.y;
                    this.cmpTransform.local.translation = translation;
                    this.speed.y = 0;
                }
            }
        } //close checkCollision

    } //close class

} //close namespace