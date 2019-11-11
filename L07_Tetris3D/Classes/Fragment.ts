namespace L07 {

    export class Row {

        row: number[];

        constructor() {
            //
        }
    }

    export class Level {

        level: number[][];


        constructor() {
            // 
        }
        
    }


    export class Fragment extends Level {

        fragment: Level[];
        level0: Level;
        level1: Level;
        level2: Level;
        

        constructor() {
            super();
            // this.level0 = new Level;
            // this.level0 = [0, 0, 1];
            // this.rows = [0, 0, 1];
            // this.rows = [[0, 0, 1], [0, 0, 1], [0, 0, 1]];
            // this.level0 = [[0, 0, 1], [0, 0, 1], [0, 0, 1]];
            // this.levels
        }
    }

    


    /*
    export interface Level {
        //0 = no Cube, 1 = Cube
        row0: number[];
        row1: number[];
        row2: number[];
    }
    export interface Row {
        0: number;
        1: number;
        2: number;
    }

    export class Fragment {

        // level0: Level;
        // level1: Level;
        // level2: Level;
        levels: Level[] = new Array(3);
        rows: Row[] = new Array(3);
        

        constructor() {
            this.levels[0] = {
                row0: [1, 1, 1],
                row1: [1, 0, 1],
                row2: [1, 0, 1]
            };
            this.levels[1] = {
                row0: [1, 0, 1],
                row1: [0, 0, 0],
                row2: [0, 0, 0]
            };
            this.levels[2] = {
                row0: [1, 0, 1],
                row1: [0, 0, 0],
                row2: [0, 0, 0]
            };
            console.log(this);
        } //close constructor

        createMesh(): void {
            // for (let i: number = 0; i < this.levels.length; i++) {
            //     console.log(this.levels[i]);
            //     this.levels[i];
                
            // }

            for (let level of this.levels) {
                console.log(level);
                for (let i: number = 0; i < 3; i++) {
                    console.log("row" + [i]);
                }
            }
        } //close createMesh


    }

    /*
    // let rows: number[][] = [new Array(3), new Array(3), new Array(3)];
    // rows = [[0, 0, 1], [0, 0, 1], [0, 0, 1]];

    export interface FragmentDef {
        level0: Level;
        level1: Level;
        level2: Level;
    }

    export interface Level {
        //0 = no Cube, 1 = Cube
        row0: number[];
        row1: number[];
        row2: number[];
    }

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
    export class Fragment implements FragmentDef {

        definition: FragmentDef;

        level0: Level = {
            row0: [1, 1, 1],
            row1: [1, 0, 1],
            row2: [1, 0, 1]
        };
        level1: Level = {
            row0: [1, 0, 1],
            row1: [0, 0, 0],
            row2: [0, 0, 0]
        };
        level2: Level = {
            row0: [1, 0, 1],
            row1: [0, 0, 0],
            row2: [0, 0, 0]
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

    */

} //namespace zu