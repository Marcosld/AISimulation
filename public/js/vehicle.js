function Vehicle(x, y) {

    this.position = createVector(x, y);
    this.r = 12;
    this.maxspeed = 3;    // Maximum speed
    this.maxforce = 0.2;  // Maximum steering force
    this.acceleration = createVector(0, 0);
    this.velocity = createVector(0, 0);
    this.target = null;

    this.findTarget = function(targets){
        let recordDistance = Infinity;
        let closest = null;
        for (let i = 0; i < targets.length; i++) {
            let evaluatedTarget = targets.get(i);
            let evaluatedTargetLocation = evaluatedTarget.getLocation();
            let evaluatedDistance = dist(this.position.x, this.position.y, evaluatedTargetLocation.x, evaluatedTargetLocation.y);
            if (evaluatedDistance < recordDistance){
                recordDistance = evaluatedDistance;
                closest = evaluatedTarget;
            }
        }
        return closest;
    }

    this.applyBehaviors = function(targets) {

        // Chose a new target
        this.target = this.findTarget(targets);

        var seekForce = this.seek(this.target.getLocation());

        this.applyForce(seekForce);

        // Eat food if close enough and find a new target
        if(p5.Vector.dist(this.position, this.target.getLocation()) < 5){
            this.target.eat();
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
    };
}
