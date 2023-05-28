var express = require("express");
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);

app.use(express.static("../client"));

app.get("/", function (req, res) {
    res.redirect("index.html");
});

server.listen(3000, function () {
    console.log("Game is running on port 3000");
});

let Grass = require("./class.js")
let GrassEater = require("./grassEater.js")
let Human = require("./human.js")
let Predator = require("./predator.js")
let SuperHuman = require("./superHuman.js")

let sizeX = 30
let sizeY = 30
matrix = []
grassArr = []
grassEatArr = []
predatorArr = []
humanArr = []
superHumanArr = []


function random(min, max) {
    if (min === undefined && max === undefined) {
      return Math.random();
    } else if (max === undefined) {
      max = min;
      min = 0;
    }
    return Math.random() * (max - min) + min;
  }
  
  function generateMatrix() {
    function character(quantity, char) {
      let initialNumber = 0;
      while (initialNumber < quantity) {
        let x = Math.floor(random(0, sizeX));
        let y = Math.floor(random(0, sizeY));
        if (matrix[y][x] == 0) {
          matrix[y][x] = char;
        }
        initialNumber++;
      }
      
    }
  
    for (let i = 0; i < sizeX; i++) {
      matrix.push([]);
      for (let j = 0; j < sizeY; j++) {
        matrix[i].push(0);
      }
     
    }
   

    character(1, 1);
    character(1, 2);
    character(1, 3);
    character(1, 4);
    character(1, 5);

module.exports = {random}


}
generateMatrix()
io.on('connection', function (socket) {
    // socket.emit("my_matrix", matrix) //uxarkel
}); 


function createObject(){
    for (let y = 0; y < matrix.length; y++) {
        for (let x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] === 1) {
                let grass = new Grass(x, y)
                grassArr.push(grass)
            } else if (matrix[y][x] === 2) {
                let grassEater = new GrassEater(x, y)
                grassEatArr.push(grassEater)
            } else if (matrix[y][x] === 3) {
                let predatorObj = new Predator(x, y)
                predatorArr.push(predatorObj)
            } else if (matrix[y][x] === 4) {
                let humanObj = new Human(x, y)
                humanArr.push(humanObj)
            } else if(matrix[y][x] === 5){
                let superHuman= new SuperHuman(x, y)
                superHumanArr.push(superHuman)
            }
        }
    }
    
}
createObject()

function game(){
    for (var i in grassArr) {
        grassArr[i].mul()
    }
    for (var i in grassEatArr) {
        grassEatArr[i].eat()
    }
    for (var i in predatorArr) {
        predatorArr[i].eat()
    }
    for (var i in humanArr) {
        humanArr[i].kill()
    }
    for(var i in superHumanArr){
        superHumanArr[i].kill()
    }
   io.emit("my_matrix", matrix) //uxarkel
}


setInterval(game, 2000)