namespace L02_FirstFudge {
    import fudge = FudgeCore;
    window.addEventListener("load", handleLoad);

    function handleLoad(_event: Event): void {
        const canvas: HTMLCanvasElement = document.querySelector("canvas");
        console.log(canvas);
        console.log(fudge);
        // let viewport: fudge.Viewport = new fudge.Viewport();
        // viewport.initialize("Viewport", null, null, canvas);
    }
}