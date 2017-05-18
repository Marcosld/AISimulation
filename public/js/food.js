class Food {

    constructor(pos, reproductionTime = ~~random(500, 900), childrenNumber = ~~random(1, 4)) {
        this.dead = false;
        this.position = pos;
        this.initialSize = 10;
        this.maxSize = 20;
        this.birthTime = frameCount;
        this.reproductionTime = reproductionTime;
        this.children = [];
        this.childrenNumber = childrenNumber;
    }

    display() {
        fill(118, 255, 3);
        noStroke();
        push();
        translate(this.position.x, this.position.y);
        ellipse(0, 0, this.size);
        pop();
    }

    update() {
        if(this.lifetime >= this.reproductionTime){
            this.reproduce();
            this.dead = true;
            return;
        }
        this.size = map(this.lifetime, 0, this.reproductionTime, this.initialSize, this.maxSize);
    }

    eat() {
        this.dead = true;
    }

    reproduce() {
        for (let i = 0; i < this.childrenNumber; i++){
            this.children.push(new Food(
                p5.Vector.add(this.position, createVector(random(30), random(30)))
            ));
        }
    }

    getLocation() {
        return this.position.copy();
    }

    get lifetime() {
        return frameCount - this.birthTime;
    }


}
