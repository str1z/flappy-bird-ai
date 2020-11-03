

class Pipes {
    constructor(topY, bottomY, speed, x, pipeWidth) {
        this.topY = topY
        this.bottomY = bottomY
        this.speed = speed
        this.x = x
        this.width = pipeWidth
        this.initX = x
    }

    display() {
        
        ctx.strokeStyle = 'white'
        ctx.strokeRect(this.x, 0, this.width, this.topY)
        ctx.strokeRect(this.x, this.bottomY, this.width, canvas.height)

    }

    update(variation, btwHeight) {
        this.x -= this.speed
        if (this.x < -this.width) {
            this.x = canvas.width
            this.randomize(variation, btwHeight)
            score++
            
            
        }
    }

    randomize(variation, btwHeight) {

        let centerBtw = canvas.height / 2 + Math.random() * 2 * variation - variation
 
        this.topY = centerBtw - (btwHeight / 2)
        this.bottomY = centerBtw + (btwHeight / 2)
        
        
    }

    restartPos(){
        this.x = this.initX
    
    }


}

class PipeArray {
    constructor(nPipes, btwHeight, variation, speed, pipeWidth) {
        this.pipeWidth = pipeWidth
        this.nPipes = nPipes
        this.btwHeight = btwHeight
        this.spacing = canvas.width / nPipes
        this.array = []
        this.variation = variation
        this.speed = speed
        
        // reverse it back// the spacing is off
        
  
        for (let i = 0; i < nPipes; i++) {
            let centerBtw = canvas.height / 2 + (Math.random() * 2-1) * variation 
            let topY = centerBtw - (btwHeight / 2)
            let bottomY = centerBtw + (btwHeight / 2)

            this.array[i] = new Pipes(topY, bottomY, speed, canvas.width + this.spacing * i + i * pipeWidth / 4, pipeWidth)


        }
    }

    display() {
        for (let i of this.array) {
            i.display()
            
        }
          
    }

    update() {
        for (let i of this.array) {
            i.update(this.variation, this.btwHeight)
        }
        
    }

    restartPosition(){
        for(let i of this.array){
            i.restartPos()

        }
        score = 0
    }
}

