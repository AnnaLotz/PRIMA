namespace EscapeTheEdge {
    import f = FudgeCore;

    export class Level extends f.Node {

        level: Floor;
        height: number; //Durch json ändern?

        public constructor(_levelCount: number) {
            super("Level" + _levelCount);
            this.height = 20;
            this.createLevel();
        } //close Constructor

        private createLevel(): void {
            let floor: Floor;
            let wall: Wall;

            //Boden+Wände
            floor = new Floor();
            floor.cmpTransform.local.scaleY(2);
            floor.cmpTransform.local.scaleX(5);
            floor.cmpTransform.local.translateY(0);
            this.appendChild(floor);
            // floor.createEnemy();

            wall = new Wall(-1);
            wall.cmpTransform.local.scaleY(this.height);
            wall.cmpTransform.local.scaleX(2);
            wall.cmpTransform.local.translateX(-3);
            wall.cmpTransform.local.translateY(this.height - 2);
            this.appendChild(wall);

            wall = new Wall(1);
            wall.cmpTransform.local.scaleY(this.height);
            wall.cmpTransform.local.scaleX(2);
            wall.cmpTransform.local.translateX(3);
            wall.cmpTransform.local.translateY(this.height - 2);
            this.appendChild(wall);

            for (let i: number = 0; i <= this.height; i += 0.25) {
                floor = new Floor();
                // floor.cmpTransform.local.scaleX(this.randNumb(0.5, 3));
                floor.cmpTransform.local.scaleY(randNumb(0.08, 0.17));
                floor.cmpTransform.local.translateX(randNumb(- 1.9, 1.9));
                floor.cmpTransform.local.translateY(randNumb(-0.2, 0.2) + i);
                if (randNumb(0, 10) < 2 && floor.cmpTransform.local.translation.y >= 0.8) {
                // if (i == 0.4) {
                    floor.createEnemy();
                }
                this.appendChild(floor);
            }

            // for (let i: number = 2; i <= this.lenght; i += 2) {

            //     console.log(i);
            //     floor = new Floor();
            //     floor.cmpTransform.local.scaleX(this.randNumb(0.2, 1));
            //     floor.cmpTransform.local.scaleY(this.randNumb(0.2, 1));
            //     floor.cmpTransform.local.translateX(this.randNumb(-0.5, 0.5) + i);
            //     floor.cmpTransform.local.translateY(this.randNumb(0.1, 2));
            //     this.appendChild(floor);
            // }
        }//close createLevel

    } //close class
} //close Namespace