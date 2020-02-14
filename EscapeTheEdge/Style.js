"use strict";
var EscapeTheEdge;
(function (EscapeTheEdge) {
    function styleGameCanvas() {
        let healthHolder = document.getElementById("health-holder");
        // healthHolder.style.width = canvas.width / 1.5 + "px";
        // healthHolder.style.marginLeft = canvas.width / 3 + "px" ;
        let manaHolder = document.getElementById("mana-holder");
        // manaHolder.style.width = canvas.width / 1.5 + "px";
        // manaHolder.style.marginLeft = canvas.width / 3 + "px" ;
        // canvas.style.display = "none";
        document.getElementById("stats").style.width = EscapeTheEdge.canvas.width + "px";
    }
    EscapeTheEdge.styleGameCanvas = styleGameCanvas;
})(EscapeTheEdge || (EscapeTheEdge = {}));
//# sourceMappingURL=Style.js.map