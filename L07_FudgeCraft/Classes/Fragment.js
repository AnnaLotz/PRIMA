"use strict";
var L07_FudgeCraft;
(function (L07_FudgeCraft) {
    var f = FudgeCore;
    class Fragment extends f.Node {
        constructor(_shape) {
            super("Fragment-Type" + _shape);
            this.fragmentDef = this.getShapeArray();
            this.position = new f.Vector3(0, 0, 0);
            let shape = this.fragmentDef[_shape];
            //schleife durch eine Form um die einzelnen Cubes zu setzen
            for (let position of shape) {
                //einen Nullvektor erstellen an dessen Werte die Position gesetzt wird
                let vctPosition = f.Vector3.ZERO();
                vctPosition.set(position[0], position[1], position[2]);
                //neuen Cube an der vectorPosition erstellen und anhängen
                let cube = new L07_FudgeCraft.Cube(vctPosition);
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
    } //close class Fragment
    L07_FudgeCraft.Fragment = Fragment;
})(L07_FudgeCraft || (L07_FudgeCraft = {})); //namespace zu
//# sourceMappingURL=Fragment.js.map