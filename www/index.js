import init, { render } from '../pkg/wasm_mandelbrot.js';

const canvas = document.getElementById('c');
const ctx = canvas.getContext('2d');
let view = { cx: -0.5, cy: 0.0, scale: 3.0 };

function draw() {
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;
    const pixels = render(canvas.width, canvas.height, view.cx, view.cy, view.scale, 200);
    const img = new ImageData(new Uint8ClampedArray(pixels), canvas.width, canvas.height);
    ctx.putImageData(img, 0, 0);
}

canvas.addEventListener('click', (e) => {
    const nx = e.clientX / canvas.clientWidth - 0.5;
    const ny = e.clientY / canvas.clientHeight - 0.5;
    const aspect = canvas.height / canvas.width;
    view.cx += nx * view.scale;
    view.cy += ny * view.scale * aspect;
    view.scale *= e.shiftKey ? 2 : 0.5;
    draw();
});

init().then(draw);
