class ObstacleSystem {

    constructor(numberOfObstacles, width_, height_, obstacleImages_) {
        this.obstacles = [];

        for(let i = 0; i < numberOfObstacles; i++){

            let size = ~~random(40, 60);
            let pos = newRandomPosition(size, width_, height_);

            while(this.isInsideObstacle(pos, size) == true){
                pos = newRandomPosition(size, width_ , height_);
            }

            this.obstacles.push(new Obstacle(pos, random(obstacleImages_), size));

        }
    }

    isInsideObstacle(position, size = 0){

        return this.obstacles.some(obstacle => (dist(obstacle.position.x + obstacle.size / 2, obstacle.position.y + obstacle.size / 2, position.x, position.y) - size) < (obstacle.size / 2));

    }

    display(){

        this.obstacles.forEach(obstacle => obstacle.display());

    }

}
