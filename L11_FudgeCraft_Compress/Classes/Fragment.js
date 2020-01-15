"use strict";
var L11_FudgeCraft_Compression;
(function (L11_FudgeCraft_Compression) {
    var f = FudgeCore;
    class Fragment extends f.Node {
        constructor(_shape) {
            super("Fragment-Type" + _shape);
            this.fragmentDef = this.getShapeArray();
            this.position = new f.Vector3(0, 0, 0);
            this.materials = this.createMaterials();
            this.cubes = [];
            console.log("New Fragment Type " + _shape);
            this.shape = this.fragmentDef[_shape];
            let mtr = this.getMaterial(_shape);
            //schleife durch eine Form um die einzelnen Cubes zu setzen
            for (let position of this.shape) {
                //einen Nullvektor erstellen an dessen Werte die Position gesetzt wird
                let vctPosition = f.Vector3.ZERO();
                vctPosition.set(position[0], position[1], position[2]);
                //neuen Cube an der vectorPosition erstellen und anhängen
                let cube = new L11_FudgeCraft_Compression.Cube(vctPosition, mtr);
                this.cubes.push(cube);
                this.appendChild(cube);
            }
            console.log();
        } //close constructor
        setAtPosition() {
            for (let cube of this.cubes) {
                // console.log("set cube at pos: " + cube.mtxWorld.translation);
                let position = cube.mtxWorld.translation;
                cube.cmpTransform.local.translation = position;
                L11_FudgeCraft_Compression.grid.push(position, new L11_FudgeCraft_Compression.GridElement(cube));
            }
        } //close setAtPosition
        getShapeArray() {
            //[Index der Form/shape][Eine Form][Position eines Cubes]
            let shapeArray = [
                [[-1, 0, 0], [0, 0, 0], [1, 0, 0], [1, 1, 0]],
                [[1, -1, 0], [-1, 0, 0], [0, 0, 0], [1, 0, 0]],
                [[0, 0, 0], [0, 1, 0], [-1, 1, 0], [1, 0, 0]],
                [[0, 0, 0], [0, 1, 0], [1, 1, 0], [-1, 0, 0]],
                [[0, 0, 0], [0, 1, 0], [-1, 0, 0], [1, 0, 0]],
                [[0, 0, 0], [0, 1, 0], [1, 0, 0], [1, 1, 0]],
                [[0, 0, 0], [1, 0, 0], [2, 0, 0], [-1, 0, 0]] // I: Hero
            ];
            return shapeArray;
        } //close getShapeArray
        createMaterials() {
            let mtrArray = [];
            mtrArray = [
                new f.Material("Orange", f.ShaderFlat, new f.CoatColored(new f.Color(1, 0.75, 0, 1))),
                new f.Material("Blue", f.ShaderFlat, new f.CoatColored(f.Color.CSS("BLUE"))),
                new f.Material("Red", f.ShaderFlat, new f.CoatColored(f.Color.CSS("RED"))),
                new f.Material("Green", f.ShaderFlat, new f.CoatColored(f.Color.CSS("GREEN"))),
                new f.Material("Magenta", f.ShaderFlat, new f.CoatColored(f.Color.CSS("MAGENTA"))),
                new f.Material("Yellow", f.ShaderFlat, new f.CoatColored(f.Color.CSS("YELLOW"))),
                new f.Material("Cyan", f.ShaderFlat, new f.CoatColored(f.Color.CSS("CYAN")))
            ];
            return mtrArray;
        } //close createMaterials
        getMaterial(_shape) {
            let mtr = this.materials[_shape];
            return mtr;
        } //close getMaterial
    } //close class Fragment
    L11_FudgeCraft_Compression.Fragment = Fragment;
})(L11_FudgeCraft_Compression || (L11_FudgeCraft_Compression = {})); //namespace zu
//# sourceMappingURL=Fragment.js.map