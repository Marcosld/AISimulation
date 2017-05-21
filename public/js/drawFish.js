function drawFish(x, y, direction, size){

    this.angleDirection = atan2(direction.y, direction.x);
    this.angleDiffSize = HALF_PI;

    this.drawHead = function(){
        push();
        noStroke();
        translate(x, y);
        rotate(this.angleDirection);
        fill(255);
        ellipse(size / 2, size / 2.5, 3);
        ellipse(size / 2, -size / 2.5, 3);
        fill(0);
        arc(0, 0, size, size, -this.angleDiffSize, this.angleDiffSize);
        pop();
    }

    this.drawBody = function(){
        push();
        noStroke();
        fill(0);
        translate(x, y);
        rotate(this.angleDirection);
        triangle(0, size / 2, 0, - size / 2, - size, 0);
        pop();
    }

    this.drawHead();
    this.drawBody();

}
