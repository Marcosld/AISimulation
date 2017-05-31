// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

// Separation
// Via Reynolds: http://www.red3d.com/cwr/steer/

// A list of fishes

// http-server -c-1


let fishSystem;
let foodSystem;
let obstacleSystem;
var rockImages = [];

function isOutsideMap(position, size){
    let aux = {x: false, y: false};

    if((position.x - size / 2) < 0 || (position.x + size / 2) > 1000)
        aux.x = true;
    if((position.y - size / 2) < 0 || (position.y + size / 2) > 800)
        aux.y = true

    return aux;
}

function newRandomPosition(offset, width_, height_){
    return createVector(
        random(0 + offset, width_ - offset),
        random(0 + offset, height_ - offset)
    )
}

function setup() {

    createCanvas(1000,800);

    for (let i = 1; i <= 4; i++) {
        rockImages.push(loadImage('images/rock_sprite' + i + '.png'));
    }

    obstacleSystem = new ObstacleSystem(10, width, height, rockImages);


    foodSystem = new FoodSystem(200, width, height, obstacleSystem);

    fishSystem = new FishSystem(4, width, height, foodSystem, obstacleSystem);

}

function draw() {
    background(100, 181, 246);

    foodSystem.update();
    foodSystem.display();

    obstacleSystem.display();

    fishSystem.update();
    fishSystem.display();

}
