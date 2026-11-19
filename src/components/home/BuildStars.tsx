"use client";

import { useEffect, useRef } from "react";

// Star streaks rushing out of a tunnel, drawn in WebGL 2 (same density, colours and speed as the template's dark panel).
const VERT = `#version 300 es
in vec2 p; void main() { gl_Position = vec4(p, 0.0, 1.0); }`;
const FRAG = `#version 300 es
precision highp float;
uniform vec2 res; uniform float time;
out vec4 outColor;
void main() {
  vec2 uv = (2.0 * gl_FragCoord.xy - res) / res.y / 0.8;
  float d = length(uv);
  float t = time * 0.5;
  float sharp = mix(0.3, 2.0, 0.6);
  vec4 tint = vec4(2.5, 2.5, 3.0, 0.0);
  float fade = smoothstep(0.0, 1.6, d);
  vec4 acc = vec4(0.0);
  for (float i = 21.0; i <= 50.0; i += 1.0) {
    vec2 q = vec2(atan(uv.x, uv.y), 1.0 / (d * 2.4 + 0.001)) * 60.0 / i;
    q.y += t;
    q += cos(i * vec2(9.0, 7.0));
    float dist = pow(max(length(sin(q * 3.0)), 0.01), sharp);
    acc += (i * cos(i + tint) + i) * 1.62e-4 * fade / dist;
  }
  acc = tanh(acc * acc);
  outColor = vec4(vec3(11.0, 11.0, 13.0) / 255.0 + acc.rgb, 1.0);
}`;

export default function BuildStars() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const gl = canvas?.getContext("webgl2", { antialias: false, premultipliedAlpha: false });
    if (!canvas || !gl) return;
    const shader = (type: number, src: string) => { const s = gl.createShader(type)!; gl.shaderSource(s, src); gl.compileShader(s); return s; };
    const prog = gl.createProgram()!;
    gl.attachShader(prog, shader(gl.VERTEX_SHADER, VERT));
    gl.attachShader(prog, shader(gl.FRAGMENT_SHADER, FRAG));
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return;
    gl.useProgram(prog);
    gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, "p");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
    const uRes = gl.getUniformLocation(prog, "res"), uTime = gl.getUniformLocation(prog, "time");

    const still = matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0, visible = false, elapsed = 0, last = performance.now();
    const draw = () => {
      const dpr = Math.min(devicePixelRatio || 1, 1);
      const w = Math.round(canvas.clientWidth * dpr), h = Math.round(canvas.clientHeight * dpr);
      if (canvas.width !== w || canvas.height !== h) { canvas.width = w; canvas.height = h; gl.viewport(0, 0, w, h); }
      gl.uniform2f(uRes, w, h);
      gl.uniform1f(uTime, elapsed);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };
    const loop = (now: number) => {
      elapsed += Math.min(0.1, (now - last) / 1000);
      last = now;
      draw();
      if (visible && !still) raf = requestAnimationFrame(loop);
    };
    // Only animate while the panel is on screen.
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      cancelAnimationFrame(raf);
      if (visible) { last = performance.now(); raf = requestAnimationFrame(loop); }
    });
    io.observe(canvas);
    draw();
    return () => { io.disconnect(); cancelAnimationFrame(raf); };
  }, []);

  return <canvas ref={ref} aria-hidden="true" className="absolute inset-0 block size-full" />;
}
