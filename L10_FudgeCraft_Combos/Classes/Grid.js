"use strict";
var L10_FudgeCraft_Combos;
(function (L10_FudgeCraft_Combos) {
    var f = FudgeCore;
    class GridElement {
        constructor(_cube = null) {
            this.cube = _cube;
            this.yPos = _cube.mtxWorld.translation.y;
        }
    }
    L10_FudgeCraft_Combos.GridElement = GridElement;
    class Grid extends Map {
        constructor() {
            super();
        }
        push(_position, _element = null) {
            let key = this.toKey(_position);
            this.set(key, _element);
            // console.log(_element);
            if (_element)
                L10_FudgeCraft_Combos.game.appendChild(_element.cube);
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
                L10_FudgeCraft_Combos.game.removeChild(element.cube);
            console.log(_position);
            return element;
        }
        popRow(_yPosition) {
            console.log("delete Row " + _yPosition);
            for (let element of L10_FudgeCraft_Combos.grid.values()) {
                if (element.yPos == _yPosition) {
                    // console.log(element.cube.cmpTransform.local.translation);
                    this.pop(element.cube.cmpTransform.local.translation);
                }
            }
            f.RenderManager.update();
            L10_FudgeCraft_Combos.viewport.draw();
            console.log(L10_FudgeCraft_Combos.grid);
        }
        toKey(_position) {
            let position = _position.map(Math.round);
            let key = position.toString();
            return key;
        }
    }
    L10_FudgeCraft_Combos.Grid = Grid;
})(L10_FudgeCraft_Combos || (L10_FudgeCraft_Combos = {}));
//# sourceMappingURL=Grid.js.map