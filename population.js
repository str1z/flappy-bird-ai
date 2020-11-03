class Population {
    constructor(amount, nnformation, pipeArray) {
        this.array = []
        this.amount = amount
        this.pipeArray = pipeArray
        this.gen = 1
        for (let i = 0; i < amount; i++) {
            let NN = new NeuralNetwork(nnformation)
            
            let randomColor = `hsl(${Math.random() * 360}, 100%, 60%)`
            let bird = new Bird(randomColor, pipeArray)
            this.array[i] = new Entity(bird, NN)

        }

    }
    getAliveIndexes() {
        let alives = []
        for (let i in this.array) {
            if (this.array[i].active == true) {
                alives.push(i)
            }
        }
        return alives
    }

    display() {
        for (let i of this.array) {
            i.display()
        }
    }

    update(elitism) {
        for (let i of this.array) {
            i.update()


        }

        this.evolution(elitism)
     

    }

    getAliveCount() {
        return this.getAliveIndexes().length
    }

    bringBackLife() {
        for (let i of this.array) {
            i.active = true
            i.restartPos()
            i.distance = 0
            this.pipeArray.restartPosition()
        }
    }

    evolution(elitism) {
        if (this.getAliveCount() == 0) {
         
            this.array = this.array.sort((a, b) => { return b.distance - a.distance }) // sorts from big to small distance
            let desiredLen = Math.ceil(this.array.length * elitism)
            let elites = this.array.slice(0, desiredLen) //makes a copy of the array from 0 to the desiredLen
            
            this.array = []
            for (let i = 0; i < this.amount - elites.length; i++) {
                
                let parent = pickRandom(elites)
               
                let child = parent.nn.copy()
                child.mutate(0.3, 0.1)
                let newBird = new Bird(parent.bird.color, this.pipeArray)//reload// k, does it work?
                let newEntity = new Entity(newBird, child)
                this.array.push(newEntity)
            }
            for (let i = 0; i < elites.length; i++) {
                elites[i].restart()
                this.array.push(elites[i])
            }
            
            document.querySelector('#genlabel').innerHTML = this.gen
            if (highscore < score){
                highscore = score
                document.querySelector('#highscorelabel').innerHTML = highscore
            }
            average += score
            let ascore = Math.round(average / this.gen)
            document.querySelector('#averagelabel').innerHTML = ascore
            this.pipeArray.restartPosition()
            this.gen ++

        }

    }

}
function pickRandom(arr) {
    
   
    let result = arr[Math.floor(arr.length * Math.random())]
    
    return result
}
