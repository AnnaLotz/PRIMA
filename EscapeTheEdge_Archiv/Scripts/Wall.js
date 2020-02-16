"use strict";
var EscapeTheEdge_Archiv;
(function (EscapeTheEdge_Archiv) {
    // import f = FudgeCore;
    class Wall extends EscapeTheEdge_Archiv.Floor {
        constructor(_side) {
            super();
            this.side = _side;
        }
    } //close class
    EscapeTheEdge_Archiv.Wall = Wall;
})(EscapeTheEdge_Archiv || (EscapeTheEdge_Archiv = {})); //close namespace
//# sourceMappingURL=Wall.js.map