namespace L07 {

    export interface FragmentDef {
        level1: Level;
        level2: Level;
        level3: Level;
    }

    export interface Level {
        //0 = no Cube, 1 = Cube
        row1: number[];
        row2: number[];
        row3: number[];
    }

    export class Fragment {
        level1: Level = {
            row1: [1, 1, 1],
            row2: [1, 0, 1],
            row3: [1, 0, 1]
        };
        definition: FragmentDef;

        constructor() {
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

        createMesh(): void {
            for (let key in this.definition) {
                console.log("Schlüssel " + key + " mit Wert ");
            }

        }

    } //close class

} //namespace zu