use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub fn render(width: u32, height: u32, cx: f64, cy: f64, scale: f64, max_iter: u32) -> Vec<u8> {
    let mut out = vec![255u8; (width * height * 4) as usize];
    let aspect = height as f64 / width as f64;
    for py in 0..height {
        for px in 0..width {
            let x0 = cx + (px as f64 / width as f64 - 0.5) * scale;
            let y0 = cy + (py as f64 / height as f64 - 0.5) * scale * aspect;
            let (mut x, mut y) = (0.0f64, 0.0f64);
            let mut i = 0;
            while i < max_iter && x * x + y * y <= 4.0 {
                let t = x * x - y * y + x0;
                y = 2.0 * x * y + y0;
                x = t;
                i += 1;
            }
            let t = if i == max_iter {
                0.0
            } else {
                // fractional escape count: i + 1 - log2(log2(|z|))
                i as f64 + 1.0 - ((x * x + y * y).ln() / 2.0).ln() / std::f64::consts::LN_2
            };
            let v = (255.0 * (t / max_iter as f64).sqrt()) as u8;
            let idx = ((py * width + px) * 4) as usize;
            out[idx] = v;
            out[idx + 1] = v;
            out[idx + 2] = v;
        }
    }
    out
}
