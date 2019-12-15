"use strict";
var L11_FudgeCraft_Compression;
(function (L11_FudgeCraft_Compression) {
    var f = FudgeCore;
    class GridElement {
        constructor(_cube = null) {
            this.cube = _cube;
            this.yPos = _cube.mtxWorld.translation.y;
        }
    }
    L11_FudgeCraft_Compression.GridElement = GridElement;
    class Grid extends Map {
        constructor() {
            super();
        }
        push(_position, _element = null) {
            //cube ins grid pushen
            let key = this.toKey(_position);
            this.set(key, _element);
            if (_element) {
                L11_FudgeCraft_Compression.game.appendChild(_element.cube);
                //cube in row pushen:
                let yPos = _element.yPos;
                if (_element.yPos != 0) {
                    if (L11_FudgeCraft_Compression.rows[yPos] == undefined)
                        L11_FudgeCraft_Compression.rows[yPos] = [_element];
                    else
                        L11_FudgeCraft_Compression.rows[yPos].push(_element);
                }
            }
        }
        pull(_position) {
            let key = this.toKey(_position);
            let element = this.get(key);
            return element;
        }
        pop(_position) {
            let key = this.toKey(_position);
            let element = this.get(key);
            this.delete(key);
            if (element)
                L11_FudgeCraft_Compression.game.removeChild(element.cube);
            // console.log(_position);
            return element;
        }
        popRow(_yPosition) {
            console.log("delete Row " + _yPosition);
            for (let element of L11_FudgeCraft_Compression.grid.values()) {
                if (element.yPos == _yPosition) {
                    // console.log("poped: " + element.cube.cmpTransform.local.translation);
                    this.pop(element.cube.cmpTransform.local.translation);
                }
            }
            f.RenderManager.update();
            L11_FudgeCraft_Compression.viewport.draw();
            // console.log(grid);
        }
        toKey(_position) {
            let position = _position.map(Math.round);
            let key = position.toString();
            return key;
        }
        slideRowsDown(_fromRow) {
            for (let element of L11_FudgeCraft_Compression.grid.values()) {
                console.log(element);
                console.log(L11_FudgeCraft_Compression.grid.values());
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
    L11_FudgeCraft_Compression.Grid = Grid;
})(L11_FudgeCraft_Compression || (L11_FudgeCraft_Compression = {}));
//# sourceMappingURL=Grid.js.map