import { useEffect, useRef } from 'react';

export default function BackgroundShader() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    if (!gl) return;

    // Vertex shader source
    const vsSource = `
      attribute vec2 a_position;
      varying vec2 v_texCoord;
      void main() {
        v_texCoord = a_position * 0.5 + 0.5;
        gl_Position = vec4(a_position, 0.0, 1.0);
      }
    `;

    // Fragment shader source (floating hearts & sparkles pastel gradient)
    const fsSource = `
      precision highp float;
      varying vec2 v_texCoord;
      uniform float u_time;
      uniform vec2 u_resolution;

      float hash(vec2 p) {
          p = fract(p * vec2(123.34, 456.21));
          p += dot(p, p + 45.32);
          return fract(p.x * p.y);
      }

      float heart(vec2 p) {
          p.x *= 1.2;
          float a = atan(p.x, p.y) / 3.14159;
          float r = length(p);
          float h = abs(a);
          float d = (13.0*h - 22.0*h*h + 10.0*h*h*h) / (6.0-5.0*h);
          return smoothstep(d, d - 0.05, r);
      }

      void main() {
          vec2 uv = (gl_FragCoord.xy - 0.5 * u_resolution.xy) / min(u_resolution.y, u_resolution.x);
          
          // Soft pastel gradient background
          vec3 col1 = vec3(1.0, 0.94, 0.95); // Light Pink
          vec3 col2 = vec3(0.95, 0.9, 1.0);  // Lavender
          vec3 background = mix(col1, col2, uv.y + 0.5);
          
          vec3 finalCol = background;
          
          // Floating Hearts
          for(float i=0.0; i<15.0; i++) {
              float h = hash(vec2(i, 123.45));
              float t = u_time * (0.1 + h * 0.2) + h * 6.28;
              vec2 pos = vec2(
                  sin(t + h * 10.0) * 0.8,
                  fract(h * 5.0 + u_time * 0.05) * 2.5 - 1.25
              );
              float size = 0.05 + h * 0.1;
              float hShape = heart((uv - pos) / size);
              finalCol = mix(finalCol, vec3(1.0, 0.55, 0.63), hShape * 0.3);
          }
          
          // Sparkles
          for(float i=0.0; i<30.0; i++) {
              float h = hash(vec2(i, 678.90));
              vec2 pos = vec2(hash(vec2(i, 1.0)) * 2.0 - 1.0, hash(vec2(i, 2.0)) * 2.0 - 1.0);
              float t = u_time * 2.0 + h * 6.28;
              float sparkle = pow(max(0.0, sin(t)), 10.0) * 0.005 / length(uv - pos);
              finalCol += sparkle * vec3(1.0, 1.0, 0.8);
          }
          
          gl_FragColor = vec4(finalCol, 1.0);
      }
    `;

    // Compile shader helper
    const compileShader = (type: number, source: string): WebGLShader | null => {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error('Shader compile error:', gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    };

    const vs = compileShader(gl.VERTEX_SHADER, vsSource);
    const fs = compileShader(gl.FRAGMENT_SHADER, fsSource);
    if (!vs || !fs) return;

    const program = gl.createProgram();
    if (!program) return;

    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error('Program link error:', gl.getProgramInfoLog(program));
      return;
    }

    gl.useProgram(program);

    // Create quad vertices
    const vertices = new Float32Array([
      -1, -1, 
       1, -1, 
      -1,  1, 
       1,  1,
    ]);

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

    const positionLoc = gl.getAttribLocation(program, 'a_position');
    gl.enableVertexAttribArray(positionLoc);
    gl.vertexAttribPointer(positionLoc, 2, gl.FLOAT, false, 0, 0);

    const uTimeLoc = gl.getUniformLocation(program, 'u_time');
    const uResolutionLoc = gl.getUniformLocation(program, 'u_resolution');

    let animationFrameId: number;

    const resizeAndRender = (time: number) => {
      if (!canvasRef.current) return;
      
      const width = canvasRef.current.clientWidth || 800;
      const height = canvasRef.current.clientHeight || 600;

      if (canvasRef.current.width !== width || canvasRef.current.height !== height) {
        canvasRef.current.width = width;
        canvasRef.current.height = height;
        gl.viewport(0, 0, width, height);
      }

      gl.useProgram(program);
      if (uTimeLoc) {
        gl.uniform1f(uTimeLoc, time * 0.001);
      }
      if (uResolutionLoc) {
        gl.uniform2f(uResolutionLoc, width, height);
      }

      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      animationFrameId = requestAnimationFrame(resizeAndRender);
    };

    animationFrameId = requestAnimationFrame(resizeAndRender);

    const observer = new ResizeObserver(() => {
      if (canvasRef.current) {
        canvasRef.current.width = canvasRef.current.clientWidth;
        canvasRef.current.height = canvasRef.current.clientHeight;
        gl.viewport(0, 0, canvasRef.current.width, canvasRef.current.height);
      }
    });

    observer.observe(canvas);

    return () => {
      cancelAnimationFrame(animationFrameId);
      observer.disconnect();
      gl.deleteBuffer(buffer);
      gl.deleteProgram(program);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full -z-10 pointer-events-none block"
      style={{ mixBlendMode: 'normal' }}
    />
  );
}
