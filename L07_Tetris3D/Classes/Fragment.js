"use strict";
var L07;
(function (L07) {
    // let rows: number[][] = [new Array(3), new Array(3), new Array(3)];
    // rows = [[0, 0, 1], [0, 0, 1], [0, 0, 1]];
    let startFragment = {
        level1: {
            row1: [1, 1, 1],
            row2: [1, 0, 1],
            row3: [1, 0, 1]
        },
        level2: {
            row1: [1, 0, 1],
            row2: [0, 0, 0],
            row3: [0, 0, 0]
        },
        level3: {
            row1: [1, 0, 1],
            row2: [0, 0, 0],
            row3: [0, 0, 0]
        }
    };
    //##############################################################################
    class Fragment {
        constructor() {
            this.level1 = {
                row1: [1, 1, 1],
                row2: [1, 0, 1],
                row3: [1, 0, 1]
            };
            this.level2 = {
                row1: [1, 0, 1],
                row2: [0, 0, 0],
                row3: [0, 0, 0]
            };
            this.level3 = {
                row1: [1, 0, 1],
                row2: [0, 0, 0],
                row3: [0, 0, 0]
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
            // 
        }
    } //close class
    L07.Fragment = Fragment;
})(L07 || (L07 = {})); //namespace zu
//# sourceMappingURL=Fragment.js.map