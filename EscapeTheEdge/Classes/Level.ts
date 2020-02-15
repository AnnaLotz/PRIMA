namespace EscapeTheEdge {
    import f = FudgeCore;

    export class Level extends f.Node {

        level: Floor;
        height: number; //Durch json ändern?

        public constructor(_levelCount: number) {
            super("Level" + _levelCount);
            this.height = 20;
            this.createLevel();
            // this.createGoal();
        } //close Constructor

        private createLevel(): void {
            let floor: Floor;
            let wall: Wall;

            //Boden+Wände
            floor = new Floor();
            floor.cmpTransform.local.scaleY(2);
            floor.cmpTransform.local.scaleX(5);
            floor.cmpTransform.local.translateY(0);
            floor.createMaterial(this.height);
            this.appendChild(floor);
            // floor.createEnemy();

            wall = new Wall(-1);
            wall.cmpTransform.local.scaleY(this.height * 2);
            wall.cmpTransform.local.scaleX(2);
            wall.cmpTransform.local.translateX(-3);
            wall.cmpTransform.local.translateY(this.height);
            wall.createMaterial(this.height * 2);
            this.appendChild(wall);

            wall = new Wall(1);
            wall.cmpTransform.local.scaleY(this.height * 2);
            wall.cmpTransform.local.scaleX(2);
            wall.cmpTransform.local.translateX(3);
            wall.cmpTransform.local.translateY(this.height);
            wall.createMaterial(this.height * 2);
            this.appendChild(wall);

            for (let i: number = 0; i <= this.height + 2; i += 0.25) {
                floor = new Floor();
                // floor.cmpTransform.local.scaleX(this.randNumb(0.5, 3));
                floor.cmpTransform.local.scaleY(randNumb(0.08, 0.17));
                floor.cmpTransform.local.translateX(randNumb(- 1.9, 1.9));
                floor.cmpTransform.local.translateY(randNumb(-0.2, 0.2) + i);
                floor.createMaterial(this.height);
                if (randNumb(0, 1) < 0.2 && floor.cmpTransform.local.translation.y >= 0.8 && floor.cmpTransform.local.translation.y <= this.height - 0.2) {
                    // if (i == 0.4) {
                    floor.createEnemy();
                }
                this.appendChild(floor);
            }

            let goalLine: f.Node = new f.Node("GoalLine");
            goalLine.addComponent(new f.ComponentTransform);
            goalLine.addComponent(new f.ComponentMaterial(new f.Material("SolidWhite", f.ShaderUniColor, new f.CoatColored(new f.Color(1, 0.3, 0.2, 0.8)))));
            goalLine.addComponent(new f.ComponentMesh(new f.MeshQuad()));
            goalLine.cmpTransform.local.translate(new f.Vector3(0, this.height, -0.01));
            goalLine.getComponent(f.ComponentMesh).pivot.scale(new f.Vector3(10, 0.1, 0));
            rootNode.appendChild(goalLine);

        }//close createLevel

        // private createGoal(): void {

        //     let goalNode: f.Node = new f.Node("Goal");
        //     goalNode.addComponent(new f.ComponentTransform);
        //     let material: f.Material = new f.Material("Goal", f.ShaderUniColor, new f.CoatColored(new f.Color(0.8, 0.2, 0.2, 0.5)));
        //     goalNode.addComponent(new f.ComponentMaterial(material));
        //     goalNode.cmpTransform.local.scale(new f.Vector3(1, this.height, 0));
        //     rootNode.appendChild(goalNode);

        // }
    } //close class
} //close Namespace