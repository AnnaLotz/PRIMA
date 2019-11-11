"use strict";
var L07;
(function (L07) {
    // let rows: number[][] = [new Array(3), new Array(3), new Array(3)];
    // rows = [[0, 0, 1], [0, 0, 1], [0, 0, 1]];
    // let startFragment: FragmentDef = {
    //     level1: {
    //         row1: [1, 1, 1],
    //         row2: [1, 0, 1],
    //         row3: [1, 0, 1]
    //     },
    //     level2: {
    //         row1: [1, 0, 1],
    //         row2: [0, 0, 0],
    //         row3: [0, 0, 0]
    //     },
    //     level3: {
    //         row1: [1, 0, 1],
    //         row2: [0, 0, 0],
    //         row3: [0, 0, 0]
    //     }
    // };
    //##############################################################################
    class Fragment {
        constructor() {
            this.level0 = {
                row0: [1, 1, 1],
                row1: [1, 0, 1],
                row2: [1, 0, 1]
            };
            this.level1 = {
                row0: [1, 0, 1],
                row1: [0, 0, 0],
                row2: [0, 0, 0]
            };
            this.level2 = {
                row0: [1, 0, 1],
                row1: [0, 0, 0],
                row2: [0, 0, 0]
            };
            console.log(this);
            // this.definition.level1 = {
            //     row1: [1, 1, 1],
            //     row2: [1, 0, 1],
            //     row3: [1, 0, 1]
            // };
            // this.definition.level2 = {
            //     row1: [1, 0, 1],
            //     row2: [0, 0, 0],
            //     row3: [0, 0, 0]
            // };
            // this.definition.level3 = {
            //     row1: [1, 0, 1],
            //     row2: [0, 0, 0],
            //     row3: [0, 0, 0]
            // };
        } //close constructor
        createMesh() {
            // for (let key in this.level1) {
            //     console.log(key);
            //     for (let i: number = 0; i < key.length; i++) {
            //         console.log(key[i]);
            //     }
            // }
            // for (let i: number = 0; i < 3; i++) {
            //     let currentLevel: string = "level" + i;
            //     console.log(currentLevel);
            //     for (let iterator in currentLevel) {
            //         console.log(iterator);
            //     }
            // }
        }
    } //close class
    L07.Fragment = Fragment;
})(L07 || (L07 = {})); //namespace zu
//# sourceMappingURL=Fragment.js.map