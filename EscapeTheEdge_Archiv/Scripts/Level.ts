namespace EscapeTheEdge_Archiv {
    import f = FudgeCore;

    export class Level extends f.Node {
        level: Floor;
        height: number; 
        enemySpawnRate: number = 0.2;


        public constructor(_levelCount: number) {
            super("Level" + _levelCount);
            this.height = 40;
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
            floor.createMaterial(this.height);
            this.appendChild(floor);

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
                floor.cmpTransform.local.scaleX(randNumb(0.8, 1.2));
                floor.cmpTransform.local.scaleY(randNumb(0.1, 0.17));
                floor.cmpTransform.local.translateX(randNumb(- 1.85, 1.85));
                floor.cmpTransform.local.translateY(randNumb(-0.2, 0.2) + i);
                floor.createMaterial(this.height);
                if (randNumb(0, 1) < this.enemySpawnRate && floor.cmpTransform.local.translation.y >= 0.6 && floor.cmpTransform.local.translation.y <= this.height - 0.2) {
                    floor.createEnemy();
                } else if (randNumb(0, 1) < 0.05) {
                    let collectable: Collectable = new Collectable(COLLECTABLETYPE.MANA);
                    collectable.cmpTransform.local.translation = floor.cmpTransform.local.translation;
                    collectable.cmpTransform.local.translation.y += 0.8;
                    items.appendChild(collectable);
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

    } //close class
} //close Namespace