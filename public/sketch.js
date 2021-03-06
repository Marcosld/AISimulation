// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

// Separation
// Via Reynolds: http://www.red3d.com/cwr/steer/

// A list of vehicles

// http-server -c-1


let vehicles = [];
let foodSystem;
let obstacleSystem;
var rockImages = [];

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


    foodSystem = new FoodSystem(100, width, height, obstacleSystem);

    vehicles.push(new Vehicle(random(width), random(height)));

}

function draw() {
    background(100, 181, 246);

    foodSystem.update();
    foodSystem.display();

    obstacleSystem.display();

    for (let i = 0; i < vehicles.length; i++) {
        vehicles[i].applyBehaviors(foodSystem);
        vehicles[i].update();
        vehicles[i].display();
    }

}
