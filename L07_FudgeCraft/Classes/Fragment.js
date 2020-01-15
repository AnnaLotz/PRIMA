"use strict";
var L07_FudgeCraft;
(function (L07_FudgeCraft) {
    var f = FudgeCore;
    class Fragment extends f.Node {
        constructor(_shape) {
            super("Fragment-Type" + _shape);
            this.fragmentDef = this.getShapeArray();
            this.position = new f.Vector3(0, 0, 0);
            this.materials = this.createMaterials();
            let shape = this.fragmentDef[_shape];
            let mtr = this.getMaterial(_shape);
            f.Debug.log(mtr);
            //schleife durch eine Form um die einzelnen Cubes zu setzen
            for (let position of shape) {
                //einen Nullvektor erstellen an dessen Werte die Position gesetzt wird
                let vctPosition = f.Vector3.ZERO();
                vctPosition.set(position[0], position[1], position[2]);
                //neuen Cube an der vectorPosition erstellen und anhängen
                let cube = new L07_FudgeCraft.Cube(vctPosition, mtr);
                this.appendChild(cube);
            }
        } //close constructor
        getShapeArray() {
            //[Index der Form][Eine Form][Position eines Cubes]
            let shapeArray = [
                [[0, 0, 0], [1, 0, 0], [0, 1, 0], [0, 0, 1]],
                [[0, 0, 0], [1, 0, 0], [0, 1, 0], [0, 1, 1]],
                [[0, 0, 0], [1, 0, 0], [0, 1, 0], [2, 0, 0]],
                [[0, 0, 0], [1, 0, 0], [0, 1, 0], [-1, 0, 0]]
            ];
            return shapeArray;
        } //close getShapeArray
        createMaterials() {
            let mtrArray = [];
            mtrArray = [
                new f.Material("Red", f.ShaderFlat, new f.CoatColored(f.Color.CSS("RED"))),
                new f.Material("Green", f.ShaderFlat, new f.CoatColored(f.Color.CSS("LIME"))),
                new f.Material("Blue", f.ShaderFlat, new f.CoatColored(f.Color.CSS("BLUE"))),
                new f.Material("Yellow", f.ShaderFlat, new f.CoatColored(f.Color.CSS("YELLOW")))
            ];
            return mtrArray;
        }
        getMaterial(_shape) {
            let mtr = this.materials[_shape];
            return mtr;
        }
    } //close class Fragment
    L07_FudgeCraft.Fragment = Fragment;
})(L07_FudgeCraft || (L07_FudgeCraft = {})); //namespace zu
//# sourceMappingURL=Fragment.js.map