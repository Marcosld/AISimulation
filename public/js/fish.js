function Fish(x, y) {

    this.position = createVector(x, y);
    this.r = 12;
    this.maxspeed = 3;    // Maximum speed
    this.maxforce = 0.2;  // Maximum steering force
    this.acceleration = createVector(0, 0);
    this.velocity = createVector(random(-1, 1), random(-1, 1));
    this.target = null;
    this.maxHealth = 200;
    this.health = this.maxHealth;

    // ADN FORCES
    this.dna = [];
    // Food attraction
    this.dna[0] = random(1, 3);
    // Vision distance
    this.dna[1] = random(100, 400);
    // Vision angle width
    this.dna[2] = random(PI/2, 5*PI/4);
    // Rock attraction
    this.dna[3] = random(-2, 0.5);

    this.boundaries = function() {

        let dist = 20;

        let desired = null;

        // // If we actually are inside the field
        // if(this.position.x < )

        if (this.position.x < dist) {
            desired = createVector(this.maxspeed, this.velocity.y);
        }
        else if (this.position.x > width - dist) {
            desired = createVector(-this.maxspeed, this.velocity.y);
        }

        if (this.position.y < dist) {
            desired = createVector(this.velocity.x, this.maxspeed);
        }
        else if (this.position.y > height - dist) {
            desired = createVector(this.velocity.x, -this.maxspeed);
        }

        if (desired !== null) {
            desired.normalize();
            desired.mult(this.maxspeed);
            let boundaries = p5.Vector.sub(desired, this.velocity);
            boundaries.limit(this.maxforce);
            this.applyForce(boundaries);
        }
    };

    this.findTarget = function(targets){
        let recordDistance = Infinity;
        let closest = null;
        for (let i = 0; i < targets.length; i++) {
            let evaluatedTarget = targets.get(i);
            let evaluatedTargetLocation = evaluatedTarget.getLocation();
            let evaluatedDistance = dist(this.position.x, this.position.y, evaluatedTargetLocation.x, evaluatedTargetLocation.y);
            let evaluatedTargetVector = p5.Vector.sub(evaluatedTargetLocation, this.position);
            if (evaluatedDistance < recordDistance && evaluatedDistance <= this.dna[1] && (
                p5.Vector.angleBetween(this.velocity, evaluatedTargetVector) <= this.dna[2] / 2
            )){
                recordDistance = evaluatedDistance;
                closest = evaluatedTarget;
            }
        }
        if(closest)
            closest.spot();
        return closest;
    }

    this.findNearObstacles = function(targets) {
        let visibles = [];
        for (let i = 0; i < targets.length; i++){
            let evaluatedTarget = targets.get(i);
            let evaluatedTargetLocation = evaluatedTarget.getLocation();
            let evaluatedDistance = dist(this.position.x, this.position.y, evaluatedTargetLocation.x, evaluatedTargetLocation.y);
            let evaluatedTargetVector = p5.Vector.sub(evaluatedTargetLocation, this.position);
            if (evaluatedDistance <= this.dna[1] && (
                p5.Vector.angleBetween(this.velocity, evaluatedTargetVector) <= this.dna[2] / 2
            )){
                visibles.push(evaluatedTarget)
            }
        }
        return visibles;
    }

    this.applyBehaviors = function(food_, obstacles_) {

        // Chose a new target (food)
        this.food = this.findTarget(food_);

        // Find close rocks
        let obstacles = this.findNearObstacles(obstacles_);

        if(this.food){
            let attractionForce = this.getAttractionForce(this.food.getLocation());

            attractionForce.mult(this.dna[0]);

            this.applyForce(attractionForce);

            // Eat food if close enough
            if(p5.Vector.dist(this.position, this.food.getLocation()) < this.r){
                this.health += 60;
                this.food.eat();
            }
        }

        if(obstacles.length > 0){
            for(i in obstacles){
                let attractionForce = this.getAttractionForce(obstacles[i].getLocation());

                attractionForce.mult(this.dna[3]);

                this.applyForce(attractionForce);
            }
        }

        this.boundaries();

    };

    this.applyForce = function(force) {
        // We could add mass here if we want A = F / M
        this.acceleration.add(force);
    };

    // A method that calculates a steering force towards a target
    // STEER = DESIRED MINUS VELOCITY
    this.getAttractionForce = function(target) {
        var desired = p5.Vector.sub(target, this.position);  // A vector pointing from the location to the target

        // Normalize desired and scale to maximum speed
        desired.normalize();
        desired.mult(this.maxspeed);
        // Steering = Desired minus velocity
        var steer = p5.Vector.sub(desired,this.velocity);
        steer.limit(this.maxforce);  // Limit to maximum steering force
        return steer;
    };

    // Method to update
    this.update = function() {

        if(this.health > this.maxHealth){
            this.health = this.maxHealth;
        }

        this.health--;

        if(obstacleSystem.isInsideObstacle(this.position, this.r)){ // when crashes with obstacle gets pushed back
            this.health -= 60;
            // push the fish back strongly
            this.velocity.mult(-5);
        }

        // Update velocity
        this.velocity.add(this.acceleration);

        // Limit speed
        this.velocity.limit(this.maxspeed);

        this.position.add(this.velocity);

        // Reset accelertion to 0 each cycle
        this.acceleration.mult(0);
    };

    this.display = function() {
        drawFish(this.position.x, this.position.y, this.velocity, this.r, this.health, this.maxHealth);
        push();
        noStroke();
        fill('rgba(211, 211, 211, 0.3)');
        translate(this.position.x, this.position.y);
        rotate(atan2(this.velocity.y, this.velocity.x));
        arc(0, 0, this.dna[1] * 2, this.dna[1] * 2, -this.dna[2] / 2, this.dna[2] / 2);
        pop();
    };
}
