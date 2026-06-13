"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import styles from "./scan.module.css"

const WIDTH = 1600
const HEIGHT = 900

const VERT = `#version 300 es
in vec2 aPos;
out vec2 vUv;
void main() {
  vUv = aPos * 0.5 + 0.5;
  gl_Position = vec4(aPos, 0.0, 1.0);
}`

/**
 * Fragment shader = 1:1 translation of the original three/tsl node graph:
 *   tMap     = texture(raw, uv + depth.r * uPointer * 0.01)
 *   tUv      = vec2(uv.x * aspect, uv.y)
 *   tiledUv  = mod(tUv * 120, 2) - 1
 *   bright   = cellNoise(floor(tUv * 120 / 2))
 *   dot      = smoothstep(0.5, 0.49, length(tiledUv)) * bright
 *   flow     = 1 - smoothstep(0, 0.02, abs(depth.r - uProgress))
 *   mask     = dot * flow * vec3(10, 0, 0)
 *   final    = blendScreen(tMap, mask)
 */
const FRAG = `#version 300 es
precision highp float;
in vec2 vUv;
out vec4 outColor;

uniform sampler2D uRaw;
uniform sampler2D uDepth;
uniform float uProgress;
uniform vec2 uPointer;
uniform float uAspect;

float hash21(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}

void main() {
  vec2 uv = vUv;
  float strength = 0.01;

  float depthR = texture(uDepth, uv).r;

  vec2 displaced = uv + depthR * uPointer * strength;
  vec3 tMap = texture(uRaw, displaced).rgb;

  vec2 tUv = vec2(uv.x * uAspect, uv.y);
  vec2 tiling = vec2(120.0);
  vec2 tiledUv = mod(tUv * tiling, 2.0) - 1.0;

  float brightness = hash21(floor(tUv * tiling / 2.0));

  float dist = length(tiledUv);
  float dotv = smoothstep(0.5, 0.49, dist) * brightness;

  float flow = 1.0 - smoothstep(0.0, 0.02, abs(depthR - uProgress));

  vec3 mask = vec3(dotv * flow) * vec3(10.0, 0.0, 0.0);

  vec3 final = 1.0 - (1.0 - tMap) * (1.0 - mask);

  outColor = vec4(final, 1.0);
}`

/** Procedural placeholder image + matching depth map (TEMPORARY).
 *  Replace with real /assets raw + depth PNGs later — the shader just needs two
 *  textures where the depth's red channel encodes distance. */
function makeTextures() {
  const draw = (paint: (ctx: CanvasRenderingContext2D) => void) => {
    const c = document.createElement("canvas")
    c.width = WIDTH
    c.height = HEIGHT
    const ctx = c.getContext("2d")!
    paint(ctx)
    return c
  }

  const raw = draw((ctx) => {
    const g = ctx.createLinearGradient(0, 0, 0, HEIGHT)
    g.addColorStop(0, "#0d0e0d")
    g.addColorStop(0.55, "#121312")
    g.addColorStop(1, "#0a0b0a")
    ctx.fillStyle = g
    ctx.fillRect(0, 0, WIDTH, HEIGHT)

    const glow = ctx.createRadialGradient(
      WIDTH * 0.5,
      HEIGHT * 0.42,
      40,
      WIDTH * 0.5,
      HEIGHT * 0.42,
      HEIGHT * 0.75
    )
    glow.addColorStop(0, "rgba(166,125,67,0.45)")
    glow.addColorStop(1, "rgba(166,125,67,0)")
    ctx.fillStyle = glow
    ctx.fillRect(0, 0, WIDTH, HEIGHT)

    ctx.strokeStyle = "rgba(166,125,67,0.10)"
    ctx.lineWidth = 1
    for (let x = 0; x <= WIDTH; x += 64) {
      ctx.beginPath()
      ctx.moveTo(x, 0)
      ctx.lineTo(x, HEIGHT)
      ctx.stroke()
    }
  })

  const depth = draw((ctx) => {
    ctx.fillStyle = "#000"
    ctx.fillRect(0, 0, WIDTH, HEIGHT)
    const r = ctx.createRadialGradient(
      WIDTH * 0.5,
      HEIGHT * 0.5,
      20,
      WIDTH * 0.5,
      HEIGHT * 0.5,
      Math.max(WIDTH, HEIGHT) * 0.62
    )
    r.addColorStop(0, "#ffffff")
    r.addColorStop(0.5, "#9a9a9a")
    r.addColorStop(1, "#000000")
    ctx.fillStyle = r
    ctx.fillRect(0, 0, WIDTH, HEIGHT)
  })

  return { raw, depth }
}

/**
 * Block 5 — Scan Effect finale (WebGL2 port of the WebGPU/TSL original).
 */
export default function RassvetScanFinale() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const gl = canvas.getContext("webgl2", {
      antialias: true,
      premultipliedAlpha: false,
    })
    if (!gl) {
      // No WebGL2: leave the CSS gradient stage as a graceful fallback.
      return
    }

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches

    const compile = (type: number, src: string) => {
      const sh = gl.createShader(type)!
      gl.shaderSource(sh, src)
      gl.compileShader(sh)
      return sh
    }

    const program = gl.createProgram()!
    gl.attachShader(program, compile(gl.VERTEX_SHADER, VERT))
    gl.attachShader(program, compile(gl.FRAGMENT_SHADER, FRAG))
    gl.linkProgram(program)
    gl.useProgram(program)

    // Fullscreen triangle
    const buf = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buf)
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 3, -1, -1, 3]),
      gl.STATIC_DRAW
    )
    const aPos = gl.getAttribLocation(program, "aPos")
    gl.enableVertexAttribArray(aPos)
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0)

    const { raw, depth } = makeTextures()
    const makeTex = (img: HTMLCanvasElement, unit: number) => {
      const tex = gl.createTexture()
      gl.activeTexture(gl.TEXTURE0 + unit)
      gl.bindTexture(gl.TEXTURE_2D, tex)
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR)
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR)
      gl.texImage2D(
        gl.TEXTURE_2D,
        0,
        gl.RGBA,
        gl.RGBA,
        gl.UNSIGNED_BYTE,
        img
      )
      return tex
    }
    makeTex(raw, 0)
    makeTex(depth, 1)

    const uRaw = gl.getUniformLocation(program, "uRaw")
    const uDepth = gl.getUniformLocation(program, "uDepth")
    const uProgress = gl.getUniformLocation(program, "uProgress")
    const uPointer = gl.getUniformLocation(program, "uPointer")
    const uAspect = gl.getUniformLocation(program, "uAspect")
    gl.uniform1i(uRaw, 0)
    gl.uniform1i(uDepth, 1)
    gl.uniform1f(uAspect, WIDTH / HEIGHT)

    const state = { progress: reduced ? 0.5 : 0, px: 0, py: 0 }

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      const w = Math.max(1, Math.floor(canvas.clientWidth * dpr))
      const h = Math.max(1, Math.floor(canvas.clientHeight * dpr))
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w
        canvas.height = h
      }
      gl.viewport(0, 0, canvas.width, canvas.height)
    }

    const onPointer = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect()
      state.px = ((e.clientX - rect.left) / rect.width) * 2 - 1
      state.py = -(((e.clientY - rect.top) / rect.height) * 2 - 1)
    }
    if (!reduced) window.addEventListener("pointermove", onPointer)

    const render = () => {
      resize()
      gl.uniform1f(uProgress, state.progress)
      gl.uniform2f(uPointer, state.px, state.py)
      gl.drawArrays(gl.TRIANGLES, 0, 3)
    }

    let tween: gsap.core.Tween | null = null
    let raf = 0

    if (reduced) {
      render()
    } else {
      // Matches the original: uProgress 0 -> 1, looping, duration 3, power1.out
      tween = gsap.to(state, {
        progress: 1,
        repeat: -1,
        duration: 3,
        ease: "power1.out",
      })
      const loop = () => {
        render()
        raf = requestAnimationFrame(loop)
      }
      raf = requestAnimationFrame(loop)
    }

    return () => {
      if (raf) cancelAnimationFrame(raf)
      if (tween) tween.kill()
      window.removeEventListener("pointermove", onPointer)
      gl.getExtension("WEBGL_lose_context")?.loseContext()
    }
  }, [])

  return (
    <section className={styles.root}>
      <div className="content-container">
        <div className={styles.stage}>
          <canvas ref={canvasRef} className={styles.canvas} />
          <div className={styles.overlay}>
            <div className={styles.overlayInner}>
              <h2 className={styles.title}>Новая коллекция</h2>
              <p className={styles.desc}>Сканируй. Найди свою форму.</p>
              <div className={styles.actions}>
                <LocalizedClientLink href="/store" className="btn-primary">
                  Перейти в каталог
                </LocalizedClientLink>
                <LocalizedClientLink href="/store" className="btn-secondary">
                  Смотреть новую коллекцию
                </LocalizedClientLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
