class Cannonball{
    constructor(x, y){
        var options = {
            isStatic: true
        }
        this.r = 30;
        this.trajetoria = [];
        this.body = Bodies.circle(x, y, this.r, options);
        World.add(world, this.body);
        this.image = loadImage("./assets/cannonball.png");
    }
    shoot(){
        var newAngle = cannon.a - 20;
        newAngle = newAngle * (3.14/180);
        var velocity = p5.Vector.fromAngle(newAngle);
        velocity.mult(0.5);
        Matter.Body.setStatic(this.body, false);
        Matter.Body.setVelocity(this.body,{
            x:velocity.x*(180/3.14), y:velocity.y*(180/3.14)
        })
    }

    display(){
        var pos = this.body.position;
        push();
        imageMode(CENTER);
        image(this.image, pos.x, pos.y, this.r, this.r);
        pop();

        if(this.body.velocity.x>0 && pos.x>10){
            var position = [this.body.position.x, this.body.position.y];
            this.trajetoria.push(position);
        }
        for(var i = 0;i<this.trajetoria.length;i = i+1){
            image(this.image, this.trajetoria[i][0],this.trajetoria[i][1],5,5)
        }
    }
}