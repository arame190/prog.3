LivingCreature = require("./livingcreature.js")

module.exports = class Grass extends LivingCreature{
    mul() {
        if(this.multiply<25){
            this.multiply++;
            let n = this.chooseCell(0)
            let newCell = n[Math.floor(Math.random()* n.length)]
            if (this.multiply >= 8 && newCell) {
                var newGrass = new Grass(newCell[0], newCell[1], this.index);
                grassArr.push(newGrass);
                matrix[newCell[1]][newCell[0]] = 1;
                this.multiply = 0;  
            }
        }
        
    }
    
} 