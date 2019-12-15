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
            let key = this.toKey(_position);
            this.set(key, _element);
            // console.log(_element);
            if (_element)
                L11_FudgeCraft_Compression.game.appendChild(_element.cube);
            // console.log(grid);
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
                    console.log("poped: " + element.cube.cmpTransform.local.translation);
                    this.pop(element.cube.cmpTransform.local.translation);
                }
            }
            f.RenderManager.update();
            L11_FudgeCraft_Compression.viewport.draw();
            console.log(L11_FudgeCraft_Compression.grid);
        }
        toKey(_position) {
            let position = _position.map(Math.round);
            let key = position.toString();
            return key;
        }
    }
    L11_FudgeCraft_Compression.Grid = Grid;
})(L11_FudgeCraft_Compression || (L11_FudgeCraft_Compression = {}));
//# sourceMappingURL=Grid.js.map