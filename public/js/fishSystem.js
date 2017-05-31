class FishSystem {
    constructor(initialSize, maxX, maxY, foodSystem, obstacleSystem) {

        this.foodSystem = foodSystem;
        this.obstacleSystem = obstacleSystem;
        this.fishes = [];

        for(let i = 0; i < initialSize; i++){

            let pos = newRandomPosition(25, maxX, maxY);

            while(obstacleSystem.isInsideObstacle(pos, 25)){
                pos = newRandomPosition(25, maxX, maxY);
            }

            this.fishes.push(new Fish(pos));

        }

    }

    update(){

        for (let i = this.fishes.length - 1; i >= 0; i--) {
            this.fishes[i].applyBehaviors(this.foodSystem, this.obstacleSystem);
            this.fishes[i].update();
            this.fishes[i].display();
            if(this.fishes[i].children.length > 0){
                this.fishes = this.fishes.concat(this.fishes[i].children);
                this.fishes[i].children = [];
            }
            if(this.fishes[i].health <= 0){
                this.fishes.splice(i, 1);
            }
        }

    }

    display(){
        this.fishes.forEach(fish => fish.display());
    }

    get length(){
        return this.fishes.length;
    }

    get(index){
        return this.fishes[index];
    }

}
