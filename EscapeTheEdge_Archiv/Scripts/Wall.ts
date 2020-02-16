namespace EscapeTheEdge_Archiv {
    // import f = FudgeCore;

    export class Wall extends Floor {
        side: number;

        public constructor(_side: number) {
            super();
            this.side = _side;
        }
        
    } //close class
} //close namespace