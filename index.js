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
        c.fillStyle = 'rgba(255,0,0,0.2)'
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

const image = new Image()
image.src = './images/pokemonMap.png'

const playerImage = new Image()
playerImage.src = './images/playerDown.png'

class Sprite {
    constructor({position, image, velocity, frames = {max : 1}}) {
        this.position = position
        this.image = image
        this.frames = frames

        this.image.onload = () => {
            this.width = this.image.width / this.frames.max
            this.height = this.image.height
            console.log(this.width);
            console.log(this.height);
        }
    }
    draw() {
        //c.drawImage(this.image,this.position.x,this.position.y)
        c.drawImage(
            this.image,
            0,
            0,
            this.image.width/this.frames.max,
            this.image.height,
            this.position.x,
            this.position.y,
            this.image.width/this.frames.max,
            this.image.height
        )
    }
}

const player = new Sprite({
    position: {
        x: canvas.width / 2 - 192 / 4 / 2,
        y: canvas.height / 2 - 68 / 2
    },
    image: playerImage,
    frames: {
        max: 4
    }
})

const background = new Sprite({
    position: {
        x: decalage.x,
        y: decalage.y,
    },
    image : image,
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

const deplacable = [background, ...frontieres]

function collisionRectangulaire({rectangle1, rectangle2}) {
    return (rectangle1.position.x + rectangle1.width >= rectangle2.position.x &&
        rectangle1.position.x <= rectangle2.position.x + rectangle2.width &&
        rectangle1.position.y <= rectangle2.position.y + rectangle2.height &&
        rectangle1.position.y + rectangle1.height >= rectangle2.position.y)
}

function animate() {
    window.requestAnimationFrame(animate)
    background.draw()
    frontieres.forEach(frontiere => {
        frontiere.draw()
        
    })
    player.draw()

    let bouger = true
    if (keys.z.pressed && lastKey == 'z') {
        for (let i = 0; i < frontieres.length; i++) {
            const frontiere = frontieres[i]
            if (
                collisionRectangulaire({
                    rectangle1: player,
                    rectangle2: {...frontiere, position: {
                        x: frontiere.position.x,
                        y: frontiere.position.y + 3
                    }}
                })
            )  {
                console.log('collision');
                bouger = false
                break
            }
        }
        if (bouger)
        deplacable.forEach(deplacable => {
            deplacable.position.y += 3
        })
    }
    else if (keys.s.pressed && lastKey == 's') {
        for (let i = 0; i < frontieres.length; i++) {
            const frontiere = frontieres[i]
            if (
                collisionRectangulaire({
                    rectangle1: player,
                    rectangle2: {...frontiere, position: {
                        x: frontiere.position.x + 3,
                        y: frontiere.position.y 
                    }}
                })
            )  {
                console.log('collision');
                bouger = false
                break
            }
        }
        if (bouger)
        deplacable.forEach(deplacable => {
            deplacable.position.y -= 3
        })
    }
    else if (keys.q.pressed && lastKey == 'q') {
        for (let i = 0; i < frontieres.length; i++) {
            const frontiere = frontieres[i]
            if (
                collisionRectangulaire({
                    rectangle1: player,
                    rectangle2: {...frontiere, position: {
                        x: frontiere.position.x,
                        y: frontiere.position.y - 3
                    }}
                })
            )  {
                console.log('collision');
                bouger = false
                break
            }
        }
        if (bouger)
        deplacable.forEach(deplacable => {
            deplacable.position.x += 3
        })
    }
    else if (keys.d.pressed && lastKey == 'd') {
        for (let i = 0; i < frontieres.length; i++) {
            const frontiere = frontieres[i]
            if (
                collisionRectangulaire({
                    rectangle1: player,
                    rectangle2: {...frontiere, position: {
                        x: frontiere.position.x - 3,
                        y: frontiere.position.y
                    }}
                })
            )  {
                console.log('collision');
                bouger = false
                break
            }
        }
        if (bouger)
        deplacable.forEach(deplacable => {
            deplacable.position.x  -= 3
        })
    }
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
