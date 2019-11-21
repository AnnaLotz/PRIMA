namespace L08_FudgeCraft_Collision {
    import f = FudgeCore;

    export class Grid extends Map<string, Cube> {
        //durch extend WIRD das Grid zur Map
        // private grid:

        //neues Fudge ziehen!!!
        setCube(_cube: Cube): void {
            // 
            // console.log(_cube.mtxWorld.translation.toString());

        } //close setCube

    } //close class

} //close Namespace