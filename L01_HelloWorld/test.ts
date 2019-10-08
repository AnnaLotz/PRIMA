window.addEventListener("load", init);

function init(): void {
    console.log("Hello World!");
    //geht beides:
    document.getElementsByTagName("body")[0].innerHTML = "Hello World";
    document.body.innerHTML = "HelloWorld";
}