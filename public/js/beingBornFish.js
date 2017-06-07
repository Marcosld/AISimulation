class BeingBornFish {

    constructor(pos, dna, velocity) {

        this.position = pos.copy();
        this.dna = dna;
        this.velocity = velocity.copy();
        this.borningTime = 300;
        this.startBornTime = frameCount;
        this.birthTime = this.startBornTime + this.borningTime;
        this.born = false;

    }

    update(){

        if(frameCount >= this.birthTime){
            this.born = true;
        }

    }

    display(){

        drawFish(this.position.x, this.position.y, this.velocity, this.size);

    }

    get size(){
        return map(frameCount, this.startBornTime, this.birthTime, 2, 12)
    }

}
