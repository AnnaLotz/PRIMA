namespace L11_FudgeCraft_Compression {
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
            //cube ins grid pushen
            let key: string = this.toKey(_position);
            this.set(key, _element);
            if (_element) {
                game.appendChild(_element.cube);
                //cube in row pushen:
                let yPos: number = _element.yPos;
                if (_element.yPos != 0) {
                    if (rows[yPos] == undefined)
                        rows[yPos] = [_element];
                    else
                        rows[yPos].push(_element);
                }
            }
            

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
            // console.log(_position);
            return element;
        }

        popRow(_yPosition: number): void {
            console.log("delete Row " + _yPosition);
            for (let element of grid.values()) {
                if (element.yPos == _yPosition) {
                    // console.log("poped: " + element.cube.cmpTransform.local.translation);
                    this.pop(element.cube.cmpTransform.local.translation);
                }
            }
            f.RenderManager.update();
            viewport.draw();
            // console.log(grid);
        }

        toKey(_position: f.Vector3): string {
            let position: f.Vector3 = _position.map(Math.round);
            let key: string = position.toString();
            return key;
        }

        slideRowsDown(_fromRow: number): void {
            for (let element of grid.values()) {
                console.log(element);
                console.log(grid.values());
                // if (element.cube.mtxWorld.translation.y > _fromRow) {
                //     console.log(element);
                //     console.log("old Position: " + element.cube.mtxWorld.translation.toString());
                //     let newPosition: f.Vector3;
                //     newPosition = element.cube.mtxWorld.translation;
                //     newPosition.y--;
                //     console.log("new Position" + newPosition);

                //     grid.pop(element.cube.mtxWorld.translation);
                //     grid.push(newPosition, grid.pull(element.cube.mtxWorld.translation));
                // }
            }
        }
    }
}