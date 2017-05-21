class BeingBornFood{

    constructor(pos, velocity){

        this.initialPos = pos;
        this.position = this.initialPos.copy()
        this.borningTime = 60;
        this.startBornTime = frameCount;
        this.birthTime = this.startBornTime + this.borningTime;
        this.initialSize = 10;
        this.bornSize = 3;
        this.born = false;

        this.velocity = velocity;
        this.acceleration = 0.9;

    }

    update(){


        if(frameCount >= this.birthTime){
            this.born = true;
        }

        this.size = map(this.beingBorningTime, 0, this.borningTime, this.bornSize, this.initialSize);
        this.position.add(this.velocity.x, this.velocity.y);

        if(obstacleSystem.isInsideObstacle(this.position, this.size)){
            this.velocity.mult(-0.9);
            this.position.add(this.velocity.x, this.velocity.y);
        }

        let crashing = isOutsideMap(this.position, this.size);

        if(crashing.x){
            this.velocity.x = this.velocity.x * -0.9;
            this.position.add(this.velocity.x, this.velocity.y);
        }

        if(crashing.y){
            this.velocity.y = this.velocity.y * -0.9;
            this.position.add(this.velocity.x, this.velocity.y);
        }

        this.velocity.mult(this.acceleration);
    }

    display() {
        fill(0, 255, 0);
        noStroke();
        push();
        translate(this.position.x, this.position.y);
        ellipse(0, 0, this.size);
        pop();
    }

    get beingBorningTime(){
        return frameCount - this.startBornTime;
    }

}
