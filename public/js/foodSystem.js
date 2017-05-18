class FoodSystem {

    constructor(initialSize, maxX, maxY, obstacleSystem){

        this.food = [];

        for(let i = 0; i < initialSize; i++){

            let pos = newRandomPosition(10, maxX, maxY);

            while(obstacleSystem.isInsideObstacle(pos)){
                pos = newRandomPosition(10, maxX, maxY);
            }

            this.food.push(new Food(pos));
        }

    }

    update(){
        for (let i = this.food.length - 1; i >= 0; i--){
            this.food[i].update();
            if(this.food[i].dead){
                this.food.splice(i, 1, ...this.food[i].children)
            }
        }

    }

    display(){
        this.food.forEach(food => food.display());
    }

    get length(){
        return this.food.length;
    }

    get (index){
        return this.food[index];
    }

}
