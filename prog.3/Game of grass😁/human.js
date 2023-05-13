class Human{
    constructor(x, y){
        this.x=x
        this.y=y
        this.yearsToLive=40
        this.age=0
        this.directions=[]
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
    die(){
        matrix[this.y][this.x]=0
        for(var i in humanArr){
            if(this.x===humanArr[i].x && this.y===humanArr[i].y){
                humanArr.splice(i, 1)
                break;
            }
        }
    }
    move() {
        let emptyCells = this.chooseCell(0)
        let newCell = random(emptyCells)
        if (newCell) {
            let newX = newCell[0]
            let newY = newCell[1]
            matrix[this.y][this.x] = 0
            matrix[newY][newX] = 4
            this.x = newX
            this.y = newY
        }
        this.getNewCoordinates()
    }
    mul(){
        var newCell = random(this.chooseCell(0));
        if (newCell) {
            var newHuman = new Human(newCell[0], newCell[1]);
            humanArr.push(newHuman);
            matrix[newCell[1]][newCell[0]] = 4;
        }
    }
    kill(){
        let grassEaters=this.chooseCell(2)
        let grassEater=random(grassEaters)
        if(this.age>=this.yearsToLive){
            this.die()
        }else if(grassEater){
            this.age++
            this.yearsToLive++
            matrix[this.y][this.x]=0
            let newX=grassEater[0]
            let newY=grassEater[1]
            this.x=newX
            this.y=newY
            matrix[newY][newX]=4
            for(var i in grassEatArr){
                if(newX === grassEatArr[i].x && newY === grassEatArr[i].y){
                    grassEatArr.splice(i, 1)
                    break;
                }
            }
            if(this.age >= 4 && this.age <= 50 && this.age % 10 == 0){
                this.mul()
            }
        }else{
            this.age++
            this.move()
        }
    }
}