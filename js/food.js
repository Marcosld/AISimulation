class Food {

    constructor(pos, dna = null) {
        this.dead = false;
        this.position = pos;
        this.initialSize = 10;
        this.maxSize = 20;
        this.birthTime = frameCount;
        if(dna){
            let mutation = ~~random(1, 50);
            this.dna = dna;
            if(mutation < 2){
                this.dna[mutation].mutate(this);
            }
            this.reproductionTime = this.dna[0].prop;
            this.childrenNumber = this.dna[1].prop;
        }else{
            this.reproductionTime = ~~random(500, 900);
            this.childrenNumber = ~~random(2, 5);
            this.dna = [
                {
                    prop: this.reproductionTime,
                    mutate: function(food){
                        food.dna[0].prop += ~~random(-300, 300);
                        food.dna[0].prop = Math.abs(food.dna[0].prop);
                    }
                },
                {
                    prop: this.childrenNumber,
                    mutate: function(food){
                        food.dna[1].prop += ~~random(-3, 3);
                        food.dna[1].prop = Math.abs(food.dna[1].prop);
                    }
                }
            ];
        }
        this.children = [];
        this.color = [118, 255, 3]
    }

    display() {
        fill(...this.color);
        noStroke();
        push();
        translate(this.position.x, this.position.y);
        ellipse(0, 0, this.size);
        pop();
        this.color = [118, 255, 3];
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
            this.children.push(new BeingBornFood(
                this.position, createVector(random(-10, 10), random(-10, 10)), this.dna
            ));
        }
    }

    getLocation() {
        return this.position.copy();
    }

    get lifetime() {
        return frameCount - this.birthTime;
    }

    spot(){
        this.color = [255, 0, 0];
    }


}
