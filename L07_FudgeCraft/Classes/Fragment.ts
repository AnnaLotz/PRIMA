namespace L07_FudgeCraft {
    import f = FudgeCore;

    export class Fragment extends f.Node {

        fragmentDef: number[][][] = this.getShapeArray();
        position: f.Vector3 = new f.Vector3(0, 0, 0);

        constructor(_shape: number) {
            super("Fragment-Type" + _shape);
            let shape: number[][] = this.fragmentDef[_shape];
            //schleife durch eine Form um die einzelnen Cubes zu setzen
            for (let position of shape) {
                //einen Nullvektor erstellen an dessen Werte die Position gesetzt wird
                let vctPosition: f.Vector3 = f.Vector3.ZERO();
                vctPosition.set(position[0], position[1], position[2]);
                //neuen Cube an der vectorPosition erstellen und anhängen
                let cube: Cube = new Cube(vctPosition);
                this.appendChild(cube);
            } 
        } //close constructor

        getShapeArray(): number[][][] {
            //[Index der Form][Eine Form][Position eines Cubes]
            let shapeArray: number[][][] =
            [
                [[0, 0, 0], [1, 0, 0], [0, 1, 0], [0, 1, 1]],
                [[0, 0, 0], [1, 0, 0], [0, 1, 0], [2, 0, 0]],
                [[0, 0, 0], [1, 0, 0], [0, 1, 0], [-1, 0, 0]]
            ];
            return shapeArray;
        } //close getShapeArray


    } //close class Fragment

} //namespace zu