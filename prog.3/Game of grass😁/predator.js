class Predator {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.directions = [];
        this.countEating = 0;
    }
    getNewCoordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }
    chooseCell(character) {
        this.getNewCoordinates()
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == character) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;

    }
    move() {
        let emptyCells = this.chooseCell(0)
        let newCell = random(emptyCells)
        if (newCell) {
            let newX = newCell[0]
            let newY = newCell[1]
            matrix[this.y][this.x] = 0
            matrix[newY][newX] = 3
            this.x = newX
            this.y = newY
        }
    }
    die() {
        matrix[this.y][this.x] = 0
        for (var i in predatorArr) {
            if (this.x === predatorArr[i].x && this.y === predatorArr[i].y) {
                predatorArr.splice(i, 1)
                break;
            }
        }
    }
    eat() {
        let grassesN = this.chooseCell(1)
        let grassEaterN = this.chooseCell(2)
        let all = grassesN.concat(grassEaterN)
        let oneP = random(all)
        if (this.countEating === 150) {
            console.log("die")
            this.die()
        } else if (oneP) {
            this.countEating++
            matrix[this.y][this.x] = 0
            matrix[oneP[1]][oneP[0]] = 3
            this.x = oneP[0]
            this.y = oneP[1]
            for (var i in grassArr) {
                if (oneP[0] === grassArr[i].x && oneP[1] === grassArr[i].y) {
                    grassArr.splice(i, 1)
                    break;
                }
            }
            for (var i in grassEatArr) {
                if (oneP[0] === grassEatArr[i].x && oneP[1] === grassEatArr[i].y) {
                    grassEatArr.splice(i, 1)
                    break;
                }
            }
        } else {
            this.move()
        }
    }
}