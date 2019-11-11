namespace L07 {

    // let rows: number[][] = [new Array(3), new Array(3), new Array(3)];
    // rows = [[0, 0, 1], [0, 0, 1], [0, 0, 1]];

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

    let startFragment: FragmentDef = {
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
    export class Fragment implements FragmentDef {

        definition: FragmentDef;

        level1: Level = {
            row1: [1, 1, 1],
            row2: [1, 0, 1],
            row3: [1, 0, 1]
        };
        level2: Level = {
            row1: [1, 0, 1],
            row2: [0, 0, 0],
            row3: [0, 0, 0]
        };
        level3: Level = {
            row1: [1, 0, 1],
            row2: [0, 0, 0],
            row3: [0, 0, 0]
        };

        constructor() {
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

        createMesh(): void {
            // 

        }

    } //close class

} //namespace zu