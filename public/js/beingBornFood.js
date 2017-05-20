class BeingBornFood{

    constructor(pos, velocity){

        this.initialPos = pos;
        this.position = this.initialPos.copy()
        this.borningTime = 180;
        this.startBornTime = frameCount;
        this.birthTime = this.startBornTime + this.borningTime;
        this.initialSize = 10;
        this.bornSize = 1;
        this.born = false;

        this.initialVelocity = velocity;

    }

    update(){

        if(this.birthTime >= frameCount){
            this.born = true;
        }

        this.size = map(this.beingBorningTime, 0, this.borningTime, this.bornSize, this.initialSize);
        this.position.set(
            ~~map(this.beingBorningTime, 0, this.borningTime, this.initialPos.x, this.initialPos.x + this.initialVelocity.x),
            ~~map(this.beingBorningTime, 0, this.borningTime, this.initialPos.y, this.initialPos.y + this.initialVelocity.y)
        )

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
