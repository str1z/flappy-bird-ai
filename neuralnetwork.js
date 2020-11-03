function sigmoid(x){
    return 1 / (Math.exp(-x) + 1)
}
class Matrix {
    constructor(width, height) {
        this.width = width
        this.height = height
        this.data = []
        for (let i = 0; i < height; i++) {
            this.data[i] = []
            for (let j = 0; j < width; j++) {
                this.data[i][j] = Math.random() * 2 - 1
            }

        }

    }

    static multInputs(inputs, matrix, biases, layer) {
        let result = []
        for (let i = 0; i < matrix.width; i++) {
            result[i] = 0
            for (let j = 0; j < matrix.height; j++) {
                //thats wrong... ohhhhhh
                result[i] += (matrix.data[j][i] * inputs[j])
            }
        }
        for (let i = 0; i < result.length; i++){
            result[i] += biases[layer][i]
            result[i] = sigmoid(result[i])
        }
        return result
    }

    mutate(threshold, variance) {// huh ohhhhh, you can also do ,whats this!!!
        for (let i in this.data) {
            for (let j in this.data[i]) {// it is like a if compacted with steroids
                if (Math.random() < threshold) {
                    this.data[i][j] = Math.random() < 0.9 ? this.data[i][j] + variance * (Math.random() * 2 - 1) : Math.random() * 2 - 1
                }
            }
        }
    }


    //again , copy should return a copy of itself, dont copy stuff in the matrix, copy the matrix to give it cuz its more convenient
    copy() {
        let copy = new Matrix(this.width, this.height)
        for (let i in this.data) {
            for (let j in this.data[i]) {
                copy.data[i][j] = this.data[i][j]
            }
        }
        return copy
    }

    copyMutate(matrix, mutateBy) {
        this.copy(matrix)
        this.mutate(mutateBy)
    }


}
function copyArray(array) {
    let result = array
    for (let i = 0; i < array.length; i++) {
        result[i] = array[i]
    }
    return result
}
function mutateArray(rate, variance, array) {
    for (let i = 0; i < array.length; i++) {
        if (Math.random() < rate) {
            array[i] = Math.random() < 0.9 ? array[i] + variance * (Math.random() * 2 - 1) : Math.random() * 2 -1 
        }
    }
}
class NeuralNetwork {
    constructor(formation) {
        this.formation = formation
        this.weights = []
        this.biases = []
        // tell me if what  i am doing is fine or not
        for (let x in formation) {
            this.biases[x] = []
            for (let y = 0; y < formation[x]; y++) {
                this.biases[x][y] = Math.random() * 2 - 1
            }
        }//actually its not important if its not a matrix, just create a function that copies a two dimensional array
        for (let a = 0; a < formation.length - 1; a++) {
            this.weights[a] = new Matrix(formation[a + 1], formation[a])
        }
    }

    feedForward(inputs) {
        let result = inputs
        for (let a = 0; a < this.formation.length - 1; a++) {
            result = Matrix.multInputs(result, this.weights[a], this.biases, a)
        }
        return result
    }

    mutate(rate,variance) {//better name lol, create method to mutate matrix
        for (let i in this.weights) {
            this.weights[i].mutate(rate,variance)
        }
        for (let i in this.biases) {
            mutateArray(this.biases[i],rate,variance)
        }
    }

    // mutateBias(shiftBy) {
    //     for (let i in this.biases) {
    //         for (let j in this.biases[i]) {
    //             this.biases[i][j] += Math.random() * shiftBy - shiftBy * 2
    //         }
    //     }
    // }
    /*let a = [[1,2,3],[2,3,1]]
    let b = a
    b[0][0] = 3
    b 
    >>[3,2,3],[2,3,1]
    a
    >>
    */
    //copy should return a copy of itself
    copy() {
        let copy = new NeuralNetwork(this.formation)
        for (let i in this.weights) {
            copy.weights[i] = this.weights[i].copy()
        }
        for (let i in this.biases) {
            copy.biases[i] = copyArray(this.biases[i])
        }
        return copy
        //whoops forgot to return it lolololol
    }
   

    
}
///u m yea what ? i was lost
// i dont know
/*
population.js:70 Uncaught TypeError: Cannot read property 'mutate' of undefined
    at Population.evolution (population.js:70)
    at Population.update (population.js:38)
    at render (engine.js:33)*/