var socket=io()

socket.on("my_matrix", my_draw)

function setup() {
    createCanvas(550, 550)
    background('#acacac');
}

function my_draw(matrix) {
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 1) {
                fill("green");
            }
            else if (matrix[y][x] == 0) {
                fill("#acacac");
            } else if (matrix[y][x] == 2) {
                fill("yellow");
            } else if (matrix[y][x] == 3) {
                fill("red")
            } else if (matrix[y][x] == 4) {
                fill("white")
            }else if(matrix[y][x] == 5){
                fill("black")
            }
            rect(x * 50, y * 50, 50, 50);

            /*
            fill("blue")
            text(x+" "+y, x*side+side/2,y*side+side/2)
            */
        }
    }


}

let side = 50
function setup() {
createCanvas(600, 600)

}
function draw() {
for(let x = 0;x < 11;x++){
for(let y = 0;y< 11;y++){
if(y===0){
fill("#cacaca")
rect(x*side,y*side,side,side)
fill("black")
textSize(30)
}
else if(x === 0){
fill("#cacaca")
rect(x*side,y*side,side,side)
fill("black")
textSize(30)
}
else{
fill("#cacaca")
rect(x*side,y*side,side,side)
fill("black")
textSize(30)
}


}
}

}