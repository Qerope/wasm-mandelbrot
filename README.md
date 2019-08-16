# wasm-mandelbrot

    cargo install wasm-pack
    wasm-pack build --target web --release
    python3 -m http.server   # open http://localhost:8000/www/

Click to zoom in, shift-click to zoom out. The iteration count grows with the
zoom level. `?js=1` renders with a plain JS implementation of the same loop
for comparison; wasm is a few times faster at deep zoom on my laptop.

f64 runs out of precision around 1e-14 zoom and the image turns blocky.
