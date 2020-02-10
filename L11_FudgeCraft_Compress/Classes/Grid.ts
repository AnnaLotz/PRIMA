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
                // console.log("createt at: " + _position.toString());
                //cube in row pushen:
            // let yPos: number = _element.yPos;
                // if (_element.yPos != 0) {
                //     if (rows[yPos] == undefined)
                //         rows[yPos] = [_element];
                //     else
                //         rows[yPos].push(_element);
                // }
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
            console.log("popped: " + _position);
            return element;
        }

        popRow(_yPosition: number): void {
            console.log("delete Row " + _yPosition);
            for (let element of grid.values()) {
                if (element.yPos == _yPosition) {
                    // console.log("popped: " + element.cube.cmpTransform.local.translation);
                    this.pop(element.cube.cmpTransform.local.translation);
                }
            }
            // rows[_yPosition] = [];
            f.RenderManager.update();
            viewport.draw();
            // console.log(grid);
        }

        toKey(_position: f.Vector3): string {
            let position: f.Vector3 = _position.map(Math.round);
            let key: string = position.toString();
            return key;
        }

        slideRowsDown(_fromRowUp: number): void {
            console.log("slide Rows down over: " + _fromRowUp);
            for (let element of grid.values()) {
                if (element.yPos > _fromRowUp) {

                    // rows[_fromRowUp] = [];
                    let oldPos: f.Vector3 = element.cube.mtxWorld.translation; 
                    console.log("oldPos: " + oldPos.toString());                  
                    grid.pop(oldPos);

                    let newPos: f.Vector3 = oldPos;
                    newPos.y--;
                    console.log("newPos: " + newPos.toString());

                    // console.log(element);
                    
                    element.cube.cmpTransform.local.translation.y--;
                    element.yPos--;
                    let newElement: GridElement = element;
                    newElement.yPos = newPos.y;
                    grid.push(newPos, newElement);
                    element.cube.cmpTransform.local.translateY(-1);

                    // console.log(element);

                    f.RenderManager.update();
                    viewport.draw();

                }
            }
        } //

    } //close class
} //close namespace



// for (let element of grid.values()) {
            //     console.log(element);
            //     console.log(grid.values());
            //     if (element.cube.mtxWorld.translation.y > _fromRowUp) {
            //         console.log(element);
            //         console.log("old Position: " + element.cube.mtxWorld.translation.toString());
            //         let newPosition: f.Vector3;
            //         newPosition = element.cube.mtxWorld.translation;
            //         newPosition.y--;
            //         console.log("new Position" + newPosition);

            //         grid.pop(element.cube.mtxWorld.translation);
            //         grid.push(newPosition, grid.pull(element.cube.mtxWorld.translation));
            //     }
            // }