class ObstacleSystem {

    constructor(numberOfObstacles, width_, height_, obstacleImages_) {
        this.obstacles = [];

        for(let i = 0; i < numberOfObstacles; i++){

            let size = ~~random(40, 60);
            let pos = newRandomPosition(size, width_, height_);

            while(this.isInsideObstacle(pos) == true){
                pos = newRandomPosition(size, width_ , height_);
            }

            this.obstacles.push(new Obstacle(pos, random(obstacleImages_), size));

        }
    }

    isInsideObstacle(position){

        return this.obstacles.some(obstacle => dist(obstacle.position.x, obstacle.position.y, position.x, position.y) < obstacle.size);

    }

    display(){

        this.obstacles.forEach(obstacle => obstacle.display());

    }

}
