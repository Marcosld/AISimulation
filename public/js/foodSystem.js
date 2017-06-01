class FoodSystem {

    constructor(initialSize, maxX, maxY, obstacleSystem){

        this.food = [];
        this.beingBornFood = [];

        for(let i = 0; i < initialSize; i++){

            let pos = newRandomPosition(10, maxX, maxY);

            while(obstacleSystem.isInsideObstacle(pos, 10)){
                pos = newRandomPosition(10, maxX, maxY);
            }

            this.food.push(new Food(pos));
        }

    }

    update(){

        for (let i = this.food.length - 1; i >= 0; i--){
            this.food[i].update();
            if(this.food[i].dead){
                this.beingBornFood = this.beingBornFood.concat(this.food[i].children);
                this.food.splice(i, 1);
            }
        }

        for (let i = this.beingBornFood.length - 1; i >= 0; i--){
            this.beingBornFood[i].update();
            if(this.beingBornFood[i].born){
                this.food.push(new Food(this.beingBornFood[i].position, this.beingBornFood[i].dna));
                this.beingBornFood.splice(i, 1);
            }
        }

    }

    display(){
        this.food.forEach(food => food.display());
        this.beingBornFood.forEach(beingBornFood => beingBornFood.display());
    }

    get length(){
        return this.food.length;
    }

    get (index){
        return this.food[index];
    }

}
