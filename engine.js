let canvas = document.createElement('canvas')
document.body.appendChild(canvas)
let ctx = canvas.getContext('2d')
canvas.width = 720
canvas.height = 720
slider = document.querySelector('#speed')
document.querySelector('#genlabel').innerHTML = 1
document.querySelector('#highscorelabel').innerHTML = 1
document.querySelector('#averagelabel').innerHTML = 0

let score = 0
let highscore = 0
let average = 0




let pipes = new PipeArray(3,120,50,7.5,50)





let birds = new Population(1000, [3, 3, 1], pipes)

//let me = new Bird('white', pipes)


function render() {
    requestAnimationFrame(render)
    speed = 2 ** Number(slider.value)
    document.querySelector('#speedlabel').innerHTML = speed
    document.querySelector('#scorelabel').innerHTML = score
    ctx.fillStyle = 'black'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    for (let j = 0; j < speed; j++) {
        pipes.update()
        //me.update()
        birds.update(0.01)
    }

    pipes.display()
    //me.display()
    birds.display()





}
render()



