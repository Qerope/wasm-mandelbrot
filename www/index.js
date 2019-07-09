import init, { render } from '../pkg/wasm_mandelbrot.js';

const canvas = document.getElementById('c');
const ctx = canvas.getContext('2d');

function draw() {
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;
    const pixels = render(canvas.width, canvas.height, -0.5, 0.0, 3.0, 200);
    const img = new ImageData(new Uint8ClampedArray(pixels), canvas.width, canvas.height);
    ctx.putImageData(img, 0, 0);
}

init().then(draw);
