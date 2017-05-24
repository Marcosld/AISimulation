function drawFish(x, y, direction, size, health, maxHealth){

    this.angleDirection = atan2(direction.y, direction.x);
    this.angleDiffSize = HALF_PI;

    this.calculateColor = function(){
        let color = [
            map(health, maxHealth, 0, 0, 153),
            map(health, maxHealth, 0, 0, 50),
            map(health, maxHealth, 0, 0, 204)
        ];

        return color;
    }

    this.drawHead = function(){
        push();
        noStroke();
        translate(x, y);
        rotate(this.angleDirection);
        fill(255);
        ellipse(size / 2, size / 2.5, 3);
        ellipse(size / 2, -size / 2.5, 3);
        fill(...this.calculateColor());
        arc(0, 0, size, size, -this.angleDiffSize, this.angleDiffSize);
        pop();
    }

    this.drawBody = function(){
        push();
        noStroke();
        fill(...this.calculateColor());
        translate(x, y);
        rotate(this.angleDirection);
        triangle(0, size / 2, 0, - size / 2, - size, 0);
        pop();
    }

    this.drawHead();
    this.drawBody();

}
