export function renderJs(width, height, cx, cy, scale, maxIter) {
    const out = new Uint8Array(width * height * 4).fill(255);
    const aspect = height / width;
    for (let py = 0; py < height; py++) {
        for (let px = 0; px < width; px++) {
            const x0 = cx + (px / width - 0.5) * scale;
            const y0 = cy + (py / height - 0.5) * scale * aspect;
            let x = 0, y = 0, i = 0;
            while (i < maxIter && x * x + y * y <= 4) {
                const t = x * x - y * y + x0;
                y = 2 * x * y + y0;
                x = t;
                i++;
            }
            const t = i === maxIter ? 0 : i + 1 - Math.log2(Math.log(x * x + y * y) / 2);
            const idx = (py * width + px) * 4;
            for (let k = 0; k < 3; k++) {
                out[idx + k] = i === maxIter ? 0 : 127.5 + 127.5 * Math.cos(0.15 * t + 2 * k);
            }
        }
    }
    return out;
}
