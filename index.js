const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = 1024
canvas.height = 576

c.fillStyle = 'white';
//(start position x, start position y, width, height)
c.fillRect(0, 0, canvas.width, canvas.height);

//instead of declaring our image on html, we did it on JS this way
const image = new Image();
//forgot the . in the path that's why it didn't work
image.src = './images/pokemonMap.png';

const playerImage = new Image();
playerImage.src = './images/playerDown.png'

//arrow function
image.onload = () => {
    c.drawImage(image, -1170, -550)
    c.drawImage(playerImage,
        //croping arguments
        0,
        0,
        playerImage.width/4,
        playerImage.height,
        //position arguments
        (canvas.width/2) - (playerImage.width/4)/2,
        (canvas.height/2)-(playerImage.height/2 ),
        playerImage.width/4,
        playerImage.height,
    )
}
