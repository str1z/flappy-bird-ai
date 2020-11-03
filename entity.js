class Entity {
    constructor(bird, nn) {
        this.bird = bird
        this.nn = nn
        this.active = true
        this.distance = 0
    }

    getOutput() {

        return this.nn.feedForward(this.bird.getNNReadyInput())

    }
    restart(){
        this.restartPos()
        this.active = true
        this.distance = 0
    }
    getAction() {
        //console.log(this.getOutput())
        if (this.getOutput() > 0.5) {
            this.bird.jump()

        }
    }

    display() {

        if (this.active == true) {
            this.bird.display()
        }

    }

    restartPos() {
        this.bird.y = canvas.height / 2
    }

    checkCollisionPipes() {
        if (this.bird.inCollisionPipes()) {
            this.active = false
        }
    }

    update() {
        if (this.active == true) {
            this.checkCollisionPipes()
            this.getAction()
            this.bird.update()
            this.distance++
        }

    }



    entityCopyMutate(entity, mutateBy, shiftBy) {
        this.nn.copyMutate(entity.nn, mutateBy, shiftBy)
        //your function has 2 parameters and you pass in 3..???!!
       

    }


}
