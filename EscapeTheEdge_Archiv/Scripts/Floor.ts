namespace EscapeTheEdge_Archiv {
    import f = FudgeCore;

    export class Floor extends f.Node {
        private static mesh: f.MeshSprite = new f.MeshSprite();
        private static material: f.Material = new f.Material("Floor", f.ShaderUniColor, new f.CoatColored(new f.Color(0.1, 0.1, 0.1, 1)));
        private static goalMaterial: f.Material = new f.Material("Floor", f.ShaderUniColor, new f.CoatColored(new f.Color(1, 0.9, 0.25, 0.8)));
        private static readonly pivot: f.Matrix4x4 = f.Matrix4x4.TRANSLATION(f.Vector3.Y(-0.5));
        public enemy: Enemy;

        public constructor() {
            super("Floor");
            this.addComponent(new f.ComponentTransform());
            let cmpMesh: f.ComponentMesh = new f.ComponentMesh(Floor.mesh);
            cmpMesh.pivot = Floor.pivot;
            this.addComponent(cmpMesh);
        } //close constructor


        public createMaterial(_levelHeight: number): void {
            if (this.cmpTransform.local.translation.y >= _levelHeight - 5)
                this.addComponent(new f.ComponentMaterial(Floor.goalMaterial));
            else
                this.addComponent(new f.ComponentMaterial(Floor.material));
        } //close createMaterial


        public createEnemy(): void {
            let enemy: Enemy = new Enemy(this);
            this.enemy = enemy;
            enemy.cmpTransform.local.translation = this.cmpTransform.local.translation;
            enemy.cmpTransform.local.translateX(0.2);
            characters.appendChild(enemy);
        } //close createEnemy


        public getRectWorld(): f.Rectangle {
            let rect: f.Rectangle = f.Rectangle.GET(0, 0, 100, 100);
            let topleft: f.Vector3 = new f.Vector3(-0.5, 0.5, 0);
            let bottomright: f.Vector3 = new f.Vector3(0.5, -0.5, 0);

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