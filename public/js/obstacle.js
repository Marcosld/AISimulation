class Obstacle {

    constructor(pos, obstacleImage, size) {
        this.image = obstacleImage;
        this.size = size;
        this.position = pos;
    }

    display(){
        image(this.image, this.position.x, this.position.y, this.size, this.size);
    }

}
