namespace L10_FudgeCraft_Combos {
    import f = FudgeCore;

    export class GridElement {
        public cube: Cube;
        public yPos: number;

        constructor(_cube: Cube = null) {
            this.cube = _cube;
            this.yPos = _cube.mtxWorld.translation.y;
        }
    }

    export class Grid extends Map<string, GridElement> {

        constructor() {
            super();
        }

        push(_position: f.Vector3, _element: GridElement = null): void {
            let key: string = this.toKey(_position);
            this.set(key, _element);
            // console.log(_element);
            if (_element)
                game.appendChild(_element.cube);
            // console.log(grid);
        }

        pull(_position: f.Vector3): GridElement {
            let key: string = this.toKey(_position);
            let element: GridElement = this.get(key);
            return element;
        }

        pop(_position: f.Vector3): GridElement {
            let key: string = this.toKey(_position);
            let element: GridElement = this.get(key);
            this.delete(key);
            if (element)
                game.removeChild(element.cube);
            console.log(_position);
            return element;
        }

        popRow(_yPosition: number): void {
            console.log("delete Row " + _yPosition);
            for (let element of grid.values()) {
                if (element.yPos == _yPosition) {
                    // console.log(element.cube.cmpTransform.local.translation);
                    this.pop(element.cube.cmpTransform.local.translation);
                }
            }
            f.RenderManager.update();
            viewport.draw();
            console.log(grid);
        }

        toKey(_position: f.Vector3): string {
            let position: f.Vector3 = _position.map(Math.round);
            let key: string = position.toString();
            return key;
        }
    }
}