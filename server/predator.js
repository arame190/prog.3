LivingCreature = require("./livingcreature.js")
module.exports = class Predator extends LivingCreature{
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
        let emptyCells = this.chooseCell(0)
        let emptyCell = emptyCells[Math.floor(Math.random()* emptyCells.length)]
        if (emptyCell) {
            let newX = emptyCell[0]
            let newY = emptyCell[1]
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
        let oneP = all [Math.floor(Math.random()* all.length)]
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