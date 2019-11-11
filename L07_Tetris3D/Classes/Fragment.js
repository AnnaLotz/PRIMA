"use strict";
var L07;
(function (L07) {
    class Fragment {
        constructor() {
            this.level1 = {
                row1: [1, 1, 1],
                row2: [1, 0, 1],
                row3: [1, 0, 1]
            };
            this.definition = { this: .level1, level2, level3 };
            console.log(this.definition);
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
            for (let key in this.definition) {
                console.log("Schlüssel " + key + " mit Wert ");
            }
        }
    } //close class
    L07.Fragment = Fragment;
})(L07 || (L07 = {})); //namespace zu
//# sourceMappingURL=Fragment.js.map