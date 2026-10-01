import { useEffect, useRef } from 'react'
import { Renderer, Program, Triangle, Mesh } from 'ogl'
import './SideRays.css'

const hexToRgb = (hex) => {
  const match = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  return match ? [parseInt(match[1], 16) / 255, parseInt(match[2], 16) / 255, parseInt(match[3], 16) / 255] : [1, 1, 1]
}

const originFlip = (origin) => ({
  'top-left': [1, 0],
  'bottom-right': [0, 1],
  'bottom-left': [1, 1],
  'top-right': [0, 0],
}[origin])

export default function SideRays({
  speed = 2.5,
  rayColor1 = '#a476ff',
  rayColor2 = '#4169e1',
  intensity = 2,
  spread = 2,
  origin = 'top-right',
  tilt = 0,
  saturation = 1.5,
  blend = 0.75,
  falloff = 1.6,
  opacity = 1,
  className = '',
}) {
  const containerRef = useRef(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return undefined
    let frame
    let renderer
    let observer
    let running = false

    const vertex = `attribute vec2 position; void main(){gl_Position=vec4(position,0.0,1.0);}`
    const fragment = `precision highp float;
      uniform float iTime; uniform vec2 iResolution; uniform float iSpeed;
      uniform vec3 iRayColor1; uniform vec3 iRayColor2; uniform float iIntensity;
      uniform float iSpread; uniform float iFlipX; uniform float iFlipY; uniform float iTilt;
      uniform float iSaturation; uniform float iBlend; uniform float iFalloff; uniform float iOpacity;
      float ray(vec2 source,vec2 direction,vec2 coord,float seedA,float seedB,float rate){
        vec2 delta=coord-source; float angle=dot(normalize(delta),direction);
        return clamp((.45+.15*sin(angle*seedA+iTime*rate))+(.3+.2*cos(-angle*seedB+iTime*rate)),0.,1.)*
          clamp((iResolution.x-length(delta))/iResolution.x,.5,1.);
      }
      void main(){
        vec2 frag=gl_FragCoord.xy; if(iFlipX>.5)frag.x=iResolution.x-frag.x;if(iFlipY>.5)frag.y=iResolution.y-frag.y;
        vec2 coord=vec2(frag.x,iResolution.y-frag.y);vec2 source=vec2(iResolution.x*1.1,-.5*iResolution.y);
        float a=iTilt*3.14159265/180.;float c=cos(a),s=sin(a);vec2 rel=coord-source;
        vec2 tilted=vec2(rel.x*c-rel.y*s,rel.x*s+rel.y*c)+source;float half=iSpread*.275;
        vec2 d1=normalize(vec2(cos(.785398+half),sin(.785398+half)));
        vec2 d2=normalize(vec2(cos(.785398-half),sin(.785398-half)));
        vec4 one=vec4(iRayColor1,1.)*ray(source,d1,tilted,36.2214,21.11349,iSpeed);
        vec4 two=vec4(iRayColor2,1.)*ray(source,d2,tilted,22.3991,18.0234,iSpeed*.2);
        vec4 color=one*(1.-iBlend)*.9+two*iBlend*.9;
        float distanceToLight=length(frag-vec2(source.x,iResolution.y-source.y))/iResolution.y;
        color.rgb*=iIntensity*.4/pow(max(distanceToLight,.001),iFalloff);
        float gray=dot(color.rgb,vec3(.299,.587,.114));color.rgb=mix(vec3(gray),color.rgb,iSaturation);
        color.a=max(color.r,max(color.g,color.b))*iOpacity;gl_FragColor=color;
      }`

    const setup = () => {
      renderer = new Renderer({ dpr: Math.min(window.devicePixelRatio, 2), alpha: true })
      const gl = renderer.gl
      gl.canvas.style.width = '100%'
      gl.canvas.style.height = '100%'
      container.replaceChildren(gl.canvas)
      const uniforms = {
        iTime: { value: 0 }, iResolution: { value: [1, 1] }, iSpeed: { value: speed },
        iRayColor1: { value: hexToRgb(rayColor1) }, iRayColor2: { value: hexToRgb(rayColor2) },
        iIntensity: { value: intensity }, iSpread: { value: spread }, iFlipX: { value: originFlip(origin)[0] },
        iFlipY: { value: originFlip(origin)[1] }, iTilt: { value: tilt }, iSaturation: { value: saturation },
        iBlend: { value: blend }, iFalloff: { value: falloff }, iOpacity: { value: opacity },
      }
      const mesh = new Mesh(gl, { geometry: new Triangle(gl), program: new Program(gl, { vertex, fragment, uniforms }) })
      const resize = () => {
        const width = container.clientWidth
        const height = container.clientHeight
        renderer.setSize(width, height)
        uniforms.iResolution.value = [width * renderer.dpr, height * renderer.dpr]
      }
      const loop = (time) => {
        if (!running) return
        uniforms.iTime.value = time * 0.001
        renderer.render({ scene: mesh })
        frame = requestAnimationFrame(loop)
      }
      const start = (entries) => {
        running = entries[0].isIntersecting
        if (running && !frame) frame = requestAnimationFrame(loop)
        if (!running && frame) { cancelAnimationFrame(frame); frame = undefined }
      }
      observer = new IntersectionObserver(start, { threshold: 0.05 })
      observer.observe(container)
      window.addEventListener('resize', resize)
      resize()
    }
    setup()
    return () => {
      running = false
      if (frame) cancelAnimationFrame(frame)
      observer?.disconnect()
      window.removeEventListener('resize', () => {})
      renderer?.gl.getExtension('WEBGL_lose_context')?.loseContext()
      container.replaceChildren()
    }
  }, [speed, rayColor1, rayColor2, intensity, spread, origin, tilt, saturation, blend, falloff, opacity])

  return <div ref={containerRef} className={`side-rays-container ${className}`.trim()} aria-hidden="true" />
}
