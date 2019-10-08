"use strict";
window.addEventListener("load", init);
function init() {
    console.log("Hello World!");
    //geht beides:
    document.getElementsByTagName("body")[0].innerHTML = "Hello World";
    document.body.innerHTML = "HelloWorld";
}
//# sourceMappingURL=test.js.map