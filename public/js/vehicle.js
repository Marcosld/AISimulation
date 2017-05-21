function Vehicle(x, y) {

    this.position = createVector(x, y);
    this.r = 12;
    this.maxspeed = 3;    // Maximum speed
    this.maxforce = 0.2;  // Maximum steering force
    this.acceleration = createVector(0, 0);
    this.velocity = createVector(random(-1, 1), random(-1, 1));
    this.target = null;

    // ADN FORCES
    this.dna = [];
    // Food attraction
    this.dna[0] = random(1, 5);
    // Vision distance
    this.dna[1] = random(50, 200);
    // Vision angle width
    this.dna[2] = random(PI/2, 5*PI/4);

    this.findTarget = function(targets){
        let recordDistance = Infinity;
        let closest = null;
        for (let i = 0; i < targets.length; i++) {
            let evaluatedTarget = targets.get(i);
            let evaluatedTargetLocation = evaluatedTarget.getLocation();
            let evaluatedDistance = dist(this.position.x, this.position.y, evaluatedTargetLocation.x, evaluatedTargetLocation.y);
            let evaluatedDistanceAngle = p5.Vector.sub(evaluatedTargetLocation, this.position).heading() + HALF_PI;
            let direction = this.velocity.heading() + HALF_PI;
            if (evaluatedDistance < recordDistance && evaluatedDistance <= this.dna[1] && (
                evaluatedDistanceAngle > (direction - (this.dna[2] / 2)) &&
                evaluatedDistanceAngle < (direction + (this.dna[2] / 2))
            )){
                recordDistance = evaluatedDistance;
                closest = evaluatedTarget;
            }
        }
        if(closest)
        closest.spot();
        return closest;
    }

    this.applyBehaviors = function(targets) {

        // Chose a new target
        this.target = this.findTarget(targets);

        if(this.target){
            var seekForce = this.seek(this.target.getLocation());

            seekForce.mult(this.dna[0]);

            this.applyForce(seekForce);

            // Eat food if close enough
            if(p5.Vector.dist(this.position, this.target.getLocation()) < this.r){
                this.target.eat();
            }
        }

    };

    this.applyForce = function(force) {
        // We could add mass here if we want A = F / M
        this.acceleration.add(force);
    };

    // A method that calculates a steering force towards a target
    // STEER = DESIRED MINUS VELOCITY
    this.seek = function(target) {
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

        if(obstacleSystem.isInsideObstacle(this.position, this.r)){ // when crashes with obstacle gets pushed back
            this.velocity.mult(-1); // Go back to where it was
            this.position.add(this.velocity);
            this.velocity.mult(0.3)
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
        drawFish(this.position.x, this.position.y, this.velocity, this.r);
        push();
        noStroke();
        fill('rgba(211, 211, 211, 0.3)');
        translate(this.position.x, this.position.y);
        rotate(atan2(this.velocity.y, this.velocity.x));
        arc(0, 0, this.dna[1] * 2, this.dna[1] * 2, -this.dna[2] / 2, this.dna[2] / 2);
        pop();
    };
}
