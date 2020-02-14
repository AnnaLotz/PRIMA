namespace EscapeTheEdge {
    import f = FudgeCore;

    export class Floor extends f.Node {
        private static mesh: f.MeshSprite = new f.MeshSprite();
        private static material: f.Material = new f.Material("Floor", f.ShaderUniColor, new f.CoatColored(new f.Color(0.18, 0.18, 0.18, 1)));
        private static goalMaterial: f.Material = new f.Material("Floor", f.ShaderUniColor, new f.CoatColored(new f.Color(1, 0.9, 0.25, 0.8)));
        private static readonly pivot: f.Matrix4x4 = f.Matrix4x4.TRANSLATION(f.Vector3.Y(-0.5));
        public enemy: Enemy;

        public constructor() {
            super("Floor");
            this.addComponent(new f.ComponentTransform());

            // this.addComponent(new f.ComponentMaterial(Floor.material));
            let cmpMesh: f.ComponentMesh = new f.ComponentMesh(Floor.mesh);
            //cmpMesh.pivot.translateY(-0.5);
            cmpMesh.pivot = Floor.pivot;
            this.addComponent(cmpMesh);

        } //close constructor

        createMaterial(_levelHeight: number): void {
            if (this.cmpTransform.local.translation.y >= _levelHeight / 1.3)
                this.addComponent(new f.ComponentMaterial(Floor.goalMaterial));
            else
                this.addComponent(new f.ComponentMaterial(Floor.material));
        }

        public createEnemy(): void {
            let enemy: Enemy = new Enemy(this);
            this.enemy = enemy;
            enemy.cmpTransform.local.translation = this.cmpTransform.local.translation;
            characters.appendChild(enemy);
        }

        public getRectWorld(): f.Rectangle {
            let rect: f.Rectangle = f.Rectangle.GET(0, 0, 100, 100);
            let topleft: f.Vector3 = new f.Vector3(-0.5, 0.5, 0);
            let bottomright: f.Vector3 = new f.Vector3(0.5, -0.5, 0);

            //let pivot: f.Matrix4x4 = this.getComponent(f.ComponentMesh).pivot;
            let mtxResult: f.Matrix4x4 = f.Matrix4x4.MULTIPLICATION(this.mtxWorld, Floor.pivot);
            topleft.transform(mtxResult, true);
            bottomright.transform(mtxResult, true);

            let size: f.Vector2 = new f.Vector2(bottomright.x - topleft.x, bottomright.y - topleft.y);
            rect.position = topleft.toVector2();
            rect.size = size;

            return rect;
        } //close getrectWorld

        public getTopRectWorld(): f.Rectangle {
            let rect: f.Rectangle = f.Rectangle.GET(0, 0, 100, 100);
            let topleft: f.Vector3 = new f.Vector3(-0.4, 1.5, 0);
            let bottomright: f.Vector3 = new f.Vector3(0.4, 0, 0);

            //let pivot: f.Matrix4x4 = this.getComponent(f.ComponentMesh).pivot;
            let mtxResult: f.Matrix4x4 = f.Matrix4x4.MULTIPLICATION(this.mtxWorld, Floor.pivot);
            topleft.transform(mtxResult, true);
            bottomright.transform(mtxResult, true);

            let size: f.Vector2 = new f.Vector2(bottomright.x - topleft.x, bottomright.y - topleft.y);
            rect.position = topleft.toVector2();
            rect.size = size;

            return rect;

        } //close getTopRectWorld



    } //close class
} //close namespace