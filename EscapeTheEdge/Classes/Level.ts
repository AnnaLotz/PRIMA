namespace EscapeTheEdge {
    import f = FudgeCore;

    export class Level extends f.Node {

        level: Floor;
        lenght: number; //Durch json ändern?

        public constructor(_levelCount: number) {
            super("Level" + _levelCount);
            this.lenght = 20;
            this.createLevel();
        } //close Constructor

        private createLevel(): void {
            let floor: Floor;

            //Boden+Decke+WandLinks
            floor = new Floor();
            floor.cmpTransform.local.scaleY(2);
            floor.cmpTransform.local.scaleX(this.lenght);
            floor.cmpTransform.local.translateX(this.lenght / 2 - 2);
            // floor.cmpTransform.local.translateY(-1);
            // floor.cmpTransform.local.translateX(1.5);
            this.appendChild(floor);

            floor = new Floor();
            floor.cmpTransform.local.scaleY(2);
            floor.cmpTransform.local.scaleX(this.lenght);
            floor.cmpTransform.local.translateX(this.lenght / 2 - 2);
            floor.cmpTransform.local.translateY(3.8);
            this.appendChild(floor);

            floor = new Floor();
            floor.cmpTransform.local.scaleY(5);
            floor.cmpTransform.local.scaleX(2);
            floor.cmpTransform.local.translateX(-3);
            floor.cmpTransform.local.translateY(3);
            this.appendChild(floor);

            for (let i: number = 1; i <= this.lenght; i += 2) {
                console.log(i);
                floor = new Floor();
                floor.cmpTransform.local.scaleX(this.randNumb(0.5, 1.5));
                floor.cmpTransform.local.scaleY(this.randNumb(0.5, 1));
                floor.cmpTransform.local.translateX(this.randNumb(-0.8, 0.8) + i);
                floor.cmpTransform.local.translateY(this.randNumb(0.1, 2));

                this.appendChild(floor);

            }
            for (let i: number = 2; i <= this.lenght; i += 2) {

                console.log(i);
                floor = new Floor();
                floor.cmpTransform.local.scaleX(this.randNumb(0.2, 1));
                floor.cmpTransform.local.scaleY(this.randNumb(0.2, 1));
                floor.cmpTransform.local.translateX(this.randNumb(-0.5, 0.5) + i);
                floor.cmpTransform.local.translateY(this.randNumb(0.1, 2));

                this.appendChild(floor);

            }
        }//close createLevel

        private randNumb(_min: number, _max: number): number {
            return Math.random() * (_max - _min) + _min;
        }
    } //close class
} //close Namespace