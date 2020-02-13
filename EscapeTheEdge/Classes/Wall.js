"use strict";
var EscapeTheEdge;
(function (EscapeTheEdge) {
    // import f = FudgeCore;
    class Wall extends EscapeTheEdge.Floor {
        constructor(_side) {
            super();
            this.side = _side;
        }
    } //close class
    EscapeTheEdge.Wall = Wall;
})(EscapeTheEdge || (EscapeTheEdge = {})); //close namespace
//# sourceMappingURL=Wall.js.map