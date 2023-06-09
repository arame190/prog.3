LivingCreature = require("./livingcreature.js")

module.exports = class SuperHuman extends LivingCreature{
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
    move() {
        let grass = this.chooseCell(1)
        let emptyCells = this.chooseCell(0)
        let all = grass.concat(emptyCells)
        let newCell = all[Math.floor(Math.random()* all.length)]
        if (newCell) {
            let newX = newCell[0]
            let newY = newCell[1]
            matrix[this.y][this.x] = 1
            // var newGrass = newGrass(this.x, this.y, this.index);
            var check = 0
            for (var i in grassArr) {
                if (grassArr[i].x === newGrass.x && grassArr[i].y === newGrass.y) {
                    check++
                    break;
                }
            }
            if (check == 0) {
                grassArr.push(newGrass);
            }
            for (var i in grassArr) {
                if (newX === grassArr[i].x && newY === grassArr[i].y) {
                    grassArr.splice(i, 1)
                }
            }
            matrix[newY][newX] = 5
            this.x = newX
            this.y = newY
        }
        this.getNewCoordinates()
    }
    kill() {
        let predators = this.chooseCell(3)
        let grassEaters = this.chooseCell(2)
        let all = predators.concat(grassEaters)
        let one = all[Math.floor(Math.random()* all.length)]
        if (one) {
            matrix[this.y][this.x] = 0
            let newX = one[0]
            let newY = one[1]
            this.x = newX
            this.y = newY
            matrix[this.y][this.x] = 5
            for (var i in predatorArr) {
                if (newX === predatorArr[i].x && newY === predatorArr[i].y) {
                    predatorArr.splice(i, 1)
                    break;
                }
            }
            for (var i in grassEatArr) {
                if (newX === grassEatArr[i].x && newY === grassEatArr[i].y) {
                    grassEatArr.splice(i, 1)
                    break;
                }
            }
        } else {
            this.move()
        }
    }
}