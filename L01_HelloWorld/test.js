"use strict";
var L01;
(function (L01) {
    window.addEventListener("load", init);
    function init() {
        console.log("Hello World!");
        //geht beides:
        document.getElementsByTagName("body")[0].innerHTML = "Hello World";
        document.body.innerHTML = "HelloWorld";
    }
})(L01 || (L01 = {}));
//# sourceMappingURL=test.js.map