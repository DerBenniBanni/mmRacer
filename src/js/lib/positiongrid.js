export class PositionGrid {
    constructor(cellSize, maxX, maxY) {
        this.cellSize = cellSize;
        this.maxX = maxX;
        this.maxY = maxY;
        this.grid = [];
        // pre-populate the grid with empty arrays
        for(let i = 0; i < Math.ceil(maxX / cellSize); i++) {
            this.grid[i] = [];
            for(let j = 0; j < Math.ceil(maxY / cellSize); j++) {
                this.grid[i][j] = [];
            }
        }
    }

    clear() {
        for(let i = 0; i < this.grid.length; i++) {
            for(let j = 0; j < this.grid[i].length; j++) {
                this.grid[i][j] = [];
            }
        }
    }

    addByPoint(obj) {
        let cellX = Math.floor(obj.x / this.cellSize);
        let cellY = Math.floor(obj.y / this.cellSize);
        if(cellX < 0 || cellX >= this.grid.length || cellY < 0 || cellY >= this.grid[0].length) {
            console.warn('Object out of bounds for PositionGrid:', obj);
            return;
        }
        this.grid[cellX][cellY].push(obj);
    }

    addByRectangle(rectangle) {
        // calculate the range of cells that the rectangle occupies
        // also consider the rotation of the rectangle by calculating the bounding box of the rotated rectangle
        let vertices = rectangle.getVertices();
        let minX = Math.min(...vertices.map(v => v.x));
        let maxX = Math.max(...vertices.map(v => v.x));
        let minY = Math.min(...vertices.map(v => v.y));
        let maxY = Math.max(...vertices.map(v => v.y)); 
        let startCellX = Math.floor(minX / this.cellSize);
        let endCellX = Math.floor(maxX / this.cellSize);
        let startCellY = Math.floor(minY / this.cellSize);
        let endCellY = Math.floor(maxY / this.cellSize);
        for(let cellX = startCellX; cellX <= endCellX; cellX++) {
            for(let cellY = startCellY; cellY <= endCellY; cellY++) {
                if(cellX < 0 || cellX >= this.grid.length || cellY < 0 || cellY >= this.grid[0].length) {
                    continue;
                }
                this.grid[cellX][cellY].push(rectangle);
            }
        }
    }
    getNearby(x, y, radius) {
        let cellX = Math.floor(x / this.cellSize);
        let cellY = Math.floor(y / this.cellSize);
        let nearbyObjects = [];
        let cellRadius = Math.ceil(radius / this.cellSize); 
        for(let i = cellX - cellRadius; i <= cellX + cellRadius; i++) {
            for(let j = cellY - cellRadius; j <= cellY + cellRadius; j++) {
                if(i < 0 || i >= this.grid.length || j < 0 || j >= this.grid[0].length) {
                    continue;
                }
                let objectsInCell = this.grid[i][j];
                let newNearbyObjects =this.grid[i][j].filter(obj => !!!obj._nearbyTouched)
                nearbyObjects.push(...newNearbyObjects);
                newNearbyObjects.forEach(obj => obj._nearbyTouched = true);
            }   
        }
        nearbyObjects.forEach(obj => delete obj._nearbyTouched);   
        return nearbyObjects;
    }
}