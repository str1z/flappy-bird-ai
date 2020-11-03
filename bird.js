

class Bird {
    constructor(color,pipeArray) {
        if (color == undefined){
            console.warn('no color bro')
            debugger
        }
        this.y = canvas.height /2
        this.color = color
        this.pipeArray = pipeArray
        this.size = 36
        this.yvel = 0
      
        this.x = 100
    }

    jump() {
        this.yvel = -9

    }

    display() {

      
        ctx.strokeStyle = this.color
        
        ctx.strokeRect(this.x, this.y, this.size, this.size)

    
    }

    update(){

        let current = this


        //YO
        // you make them all jump ? ok......
        //can you explain this?
        //for test purposes yes!!!! and they all die
        window.onkeydown = function (e) {
            if (e.keyCode == 32) {
                current.jump()

            }
        }


        if (this.yvel < 20) {
            this.yvel += 0.5

        }



        this.y += this.yvel

        

        if (this.inCollisionPipes()){
            //console.log('u ded')
            //debugger
        }


    }

    inCollisionPipe(pipes) {



        if (this.x + this.size > pipes.x && this.x < pipes.x + pipes.width) {
            if (this.y > pipes.topY && this.y + this.size < pipes.bottomY) {
                

            }else{
            //debugger
               return true

            }

        }

      

    }

    
    inCollisionPipes(){
        if (this.y < 0||this.y > canvas.height){
            return true
        }
        return this.inCollisionPipe(this.pipeArray.array[Bird.nextPipeIndex(this.pipeArray, this.x, this.size)])
    }

    static nextPipeIndex(pipeArray, xPos, size){
        
        let distance = 10000
        let index
        for (let i = 0; i < pipeArray.array.length; i++){
            if (pipeArray.array[i].x + size > xPos && pipeArray.array[i].x < distance){
                distance = pipeArray.array[i].x
                index = i

                
            }
        }
        return(index)
      
    }

    static nextPipeDistance(pipeArray, xPos){
        let distance = 10000
        for (let i = 0; i < pipeArray.array.length; i++){
            if (pipeArray.array[i].x > xPos && pipeArray.array[i].x < distance){
                distance = pipeArray.array[i].x            
            }
        }
        return(distance - xPos)

    }

    getNextTopYOffset(){
        return this.y - this.pipeArray.array[Bird.nextPipeIndex(this.pipeArray,this.x,this.size)].topY
    }

    getNextBottomYOffset(){
        return this.pipeArray.array[Bird.nextPipeIndex(this.pipeArray, this.x,this.size)].bottomY - this.y
    }

    getInputs(){
        return [Bird.nextPipeDistance(this.pipeArray, this.x, this.size),this.getNextTopYOffset(this.pipeArray),this.getNextBottomYOffset(this.pipeArray)]
    }

    getNNReadyInput(){

        let results = []
        let inputs = this.getInputs()

        for (let i in inputs){
            results[i] = 1 / (inputs[i] + 1)
        }
        return results
    }

    


}