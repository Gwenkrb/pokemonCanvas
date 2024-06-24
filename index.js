const canvas = document.querySelector('canvas')

const c = canvas.getContext('2d')

canvas.width = 1024
canvas.height = 576

const collisionsMap = []
for (let i = 0; i < collisions.length; i+=70) {
    collisionsMap.push(collisions.slice(i,70+i))
}

class Frontiere {
    static WIDTH = 48
    static HEIGHT = 48
    constructor({position}) {
        this.position = position
        this.width = 48
        this.height = 48
    }

    draw() {
        c.fillStyle = 'red'
        c.fillRect(this.position.x, this.position.y, this.width, this.height)
    }
}

const frontieres = []

const decalage = {
    x: -1100,
    y:-600
}

collisionsMap.forEach((row, i) => {
    row.forEach((symbol, j) => {
            if (symbol === 1025) {
                frontieres.push(
                    new Frontiere ({
                        position: {
                            x: j*Frontiere.WIDTH + decalage.x,
                            y: i*Frontiere.HEIGHT + decalage.y,
                        }
                    })
                )
            }
    })
})

console.log(frontieres);

const image = new Image()
image.src = './images/pokemonMap.png'

const playerImage = new Image()
playerImage.src = './images/playerDown.png'

class Sprite {
    constructor({position, image, velocity}) {
        this.position = position
        this.image = image
    }
    draw() {
        c.drawImage(this.image,this.position.x,this.position.y)
    }
}

const background = new Sprite({
    position: {
        x: decalage.x,
        y: decalage.y,
    },
    image : image
})

const keys = {
    z: {
        pressed : false
    },
    q: {
        pressed : false
    },
    s: {
        pressed : false
    },
    d: {
        pressed : false
    }
}

function animate() {
    window.requestAnimationFrame(animate)
    background.draw()
    frontieres.forEach(frontière => {
        frontière.draw()
    })
    c.drawImage(
        playerImage,
        0,
        0,
        playerImage.width/4,
        playerImage.height,
        canvas.width/2 - playerImage.width/4/2,
        canvas.height/2 - playerImage.height/2,
        playerImage.width/4,
        playerImage.height
    )
    if (keys.z.pressed && lastKey == 'z') background.position.y += 3
    else if (keys.s.pressed && lastKey == 's') background.position.y -= 3
    else if (keys.q.pressed && lastKey == 'q') background.position.x += 3
    else if (keys.d.pressed && lastKey == 'd') background.position.x -= 3
}
animate()

let lastKey = ''
window.addEventListener('keydown', (e) => {
    switch (e.key){
        case 'z':
        keys.z.pressed = true
        lastKey = 'z'
        break
        case 'q':
        keys.q.pressed = true
        lastKey = 'q'
        break
        case 's':
        keys.s.pressed = true
        lastKey = 's'
        break
        case 'd':
        keys.d.pressed = true
        lastKey = 'd'
        break
    }
})

window.addEventListener('keyup', (e) => {
    switch (e.key){
        case 'z':
        keys.z.pressed = false
        break
        case 'q':
        keys.q.pressed = false
        break
        case 's':
        keys.s.pressed = false
        break
        case 'd':
        keys.d.pressed = false
        break
    }
})
