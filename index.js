const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = 1024
canvas.height = 576

const collisionsMap = []
for (let i = 0; i < collisions.length; i+=70) {
    collisionsMap.push(collisions.slice(i,70+i))
}

const battleZoneMap = []
for (let i = 0; i < battleZoneData.length; i+=70) {
    battleZoneMap.push(battleZoneData.slice(i,70+i))
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

const battleZone = []

battleZoneMap.forEach((row, i) => {
    row.forEach((symbol, j) => {
            if (symbol === 1025) {
                battleZone.push(
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
console.log(battleZone);

const image = new Image()
image.src = './images/pokemonMap.png'

const foregroundImage = new Image()
foregroundImage.src = './images/foreground.png'

const playerDownImage = new Image()
playerDownImage.src = './images/playerDown.png'

const playerUpImage = new Image()
playerUpImage.src = './images/playerUp.png'

const playerRightImage = new Image()
playerRightImage.src = './images/playerRight.png'

const playerLeftImage = new Image()
playerLeftImage.src = './images/playerLeft.png'

const player = new Sprite({
    position: {
        x: canvas.width / 2 - 192 / 4 / 2,
        y: canvas.height / 2 - 68 / 2
    },
    image: playerDownImage,
    frames: {
        max: 4
    },
    sprites: {
        up: playerUpImage,
        right: playerRightImage,
        left: playerLeftImage,
        down: playerDownImage,
    }
})

const background = new Sprite({
    position: {
        x: decalage.x,
        y: decalage.y,
    },
    image : image,
})

const foreground = new Sprite({
    position: {
        x: decalage.x,
        y: decalage.y,
    },
    image : foregroundImage,
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

const deplacable = [background, ...frontieres, ...battleZone, foreground]

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
    battleZone.forEach(battleZone => {
        battleZone.draw()
    })
    player.draw()
    foreground.draw()

    if (keys.z.pressed || keys.q.pressed || keys.s.pressed || keys.d.pressed) {
        for (let i = 0; i < battleZone.length; i++) {
            const battleZon = battleZone[i];
            const overlappingArea =
            (Math.min(
                player.position.x + player.width, 
                battleZon.position.x + battleZon.width
            ) -
             Math.max(player.position.x, battleZon.position.x)) * 
            (Math.min(
                player.position.y + player.height,
                battleZon.position.y + battleZon.height
            ) - 
                Math.max(player.position.y, battleZon.position.y));
            if (
                collisionRectangulaire({
                    rectangle1: player,
                    rectangle2: battleZon
                }) &&
                overlappingArea > (player.width * player.height) / 2
                && Math.random() < 0.01
            )  {
                console.log('Zone de combat détectée');
                break
            }
        }
    }

    let moving = true
    player.moving = false
    if (keys.z.pressed && lastKey == 'z') {
        player.moving = true
        player.image = player.sprites.up
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
                moving = false
                break
            }
        }

        if (moving)
        deplacable.forEach(deplacable => {
            deplacable.position.y += 3
        })
    }
    else if (keys.s.pressed && lastKey == 's') {
        player.moving = true
        player.image = player.sprites.down
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
                moving = false
                break
            }
        }
        if (moving)
        deplacable.forEach(deplacable => {
            deplacable.position.y -= 3
        })
    }
    else if (keys.q.pressed && lastKey == 'q') {
        player.moving = true
        player.image = player.sprites.left
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
                moving = false
                break
            }
        }
        if (moving)
        deplacable.forEach(deplacable => {
            deplacable.position.x += 3
        })
    }
    else if (keys.d.pressed && lastKey == 'd') {
        player.moving = true
        player.image = player.sprites.right
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
                moving = false
                break
            }
        }
        if (moving)
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
