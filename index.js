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
image.src = './images/pokemonMap.png'
console.log(image);

//arrow function
image.onload = () => {
    c.drawImage(image, -1100, -500);
}