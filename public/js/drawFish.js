function drawFish(x, y, direction, size){

    this.direction = direction.copy().normalize();
    this.angleDirection = atan2(direction.y, direction.x);
    this.angleDiffSize = HALF_PI;
    this.position = createVector(x, y);

    this.drawHead = function(){
        noStroke();
        fill(0);
        arc(x, y, size, size, this.angleDirection - this.angleDiffSize, this.angleDirection + this.angleDiffSize);
    }

    this.drawBody = function(){
        noStroke();
        fill(0);
        let auxRotatedDirection = this.direction.copy();
        let p1 = p5.Vector.sub(this.position, p5.Vector.mult(this.direction, size))
        let p2 = p5.Vector.add(this.position, p5.Vector.mult(auxRotatedDirection.rotate(HALF_PI), size/2))
        let p3 = p5.Vector.add(this.position, p5.Vector.mult(auxRotatedDirection.rotate(PI), size/2))
        triangle(p1.x, p1.y, p2.x, p2.y, p3.x, p3.y);
    }

    this.drawHead();
    this.drawBody();

}
