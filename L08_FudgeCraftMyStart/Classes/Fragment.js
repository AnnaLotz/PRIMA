"use strict";
var L08_FudgeCraft;
(function (L08_FudgeCraft) {
    var f = FudgeCore;
    class Fragment extends f.Node {
        constructor(_shape) {
            super("Fragment-Type" + _shape);
            this.fragmentDef = this.getShapeArray();
            this.position = new f.Vector3(0, 0, 0);
            this.materials = this.createMaterials();
            this.cubes = [];
            this.shape = this.fragmentDef[_shape];
            let mtr = this.getMaterial(_shape);
            //schleife durch eine Form um die einzelnen Cubes zu setzen
            for (let position of this.shape) {
                //einen Nullvektor erstellen an dessen Werte die Position gesetzt wird
                let vctPosition = f.Vector3.ZERO();
                vctPosition.set(position[0], position[1], position[2]);
                //neuen Cube an der vectorPosition erstellen und anhängen
                let cube = new L08_FudgeCraft.Cube(vctPosition, mtr);
                this.cubes.push(cube);
                this.appendChild(cube);
            }
        } //close constructor
        getCubesPositions() {
            let cubePositions = [];
            for (let i = 0; i < this.cubes.length; i++) {
                let cube = this.cubes[i];
                cubePositions[i] =
                    [
                        Math.round(cube.mtxWorld.translation.x),
                        Math.round(cube.mtxWorld.translation.y),
                        Math.round(cube.mtxWorld.translation.z)
                    ];
            }
            return cubePositions;
        } //close getCubesPositions
        getShapeArray() {
            //[Index der Form/shape][Eine Form][Position eines Cubes]
            let shapeArray = [
                [[0, 0, 0], [1, 0, 0]],
                [[0, 0, 0], [1, 0, 0]],
                // [[-1, 0, 0], [0, 0, 0], [1, 0, 0], [1, 1, 0]], //L: Orange Ricky
                [[-1, -1, 0], [-1, 0, 0], [0, 0, 0], [1, 0, 0]],
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
                new f.Material("Blue", f.ShaderFlat, new f.CoatColored(f.Color.BLUE)),
                new f.Material("Red", f.ShaderFlat, new f.CoatColored(f.Color.RED)),
                new f.Material("Green", f.ShaderFlat, new f.CoatColored(f.Color.GREEN)),
                new f.Material("Magenta", f.ShaderFlat, new f.CoatColored(f.Color.MAGENTA)),
                new f.Material("Yellow", f.ShaderFlat, new f.CoatColored(f.Color.YELLOW)),
                new f.Material("Cyan", f.ShaderFlat, new f.CoatColored(f.Color.CYAN))
            ];
            return mtrArray;
        } //close createMaterials
        getMaterial(_shape) {
            let mtr = this.materials[_shape];
            return mtr;
        } //close getMaterial
    } //close class Fragment
    L08_FudgeCraft.Fragment = Fragment;
})(L08_FudgeCraft || (L08_FudgeCraft = {})); //namespace zu
//# sourceMappingURL=Fragment.js.map