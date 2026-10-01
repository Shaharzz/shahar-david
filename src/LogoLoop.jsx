import React, { useEffect, useMemo, useRef, useState } from 'react'
import './LogoLoop.css'

const toLength = (value) => typeof value === 'number' ? `${value}px` : value

export default function LogoLoop({
  logos, speed = 120, direction = 'left', width = '100%', logoHeight = 28,
  gap = 32, hoverSpeed = 0, fadeOut = false, fadeOutColor, scaleOnHover = false,
  ariaLabel = 'Technology logos',
}) {
  const rootRef = useRef(null)
  const trackRef = useRef(null)
  const sequenceRef = useRef(null)
  const offsetRef = useRef(0)
  const velocityRef = useRef(0)
  const lastTimeRef = useRef(null)
  const [copyCount, setCopyCount] = useState(2)
  const [hovered, setHovered] = useState(false)
  const vertical = direction === 'up' || direction === 'down'
  const target = useMemo(() => {
    const multiplier = direction === 'left' || direction === 'up' ? 1 : -1
    return Math.abs(speed) * multiplier * (speed < 0 ? -1 : 1)
  }, [speed, direction])

  useEffect(() => {
    const resize = () => {
      const root = rootRef.current
      const sequence = sequenceRef.current
      if (!root || !sequence) return
      const size = vertical ? sequence.offsetHeight : sequence.offsetWidth
      const viewport = vertical ? root.parentElement?.clientHeight || root.clientHeight : root.clientWidth
      if (size) setCopyCount(Math.max(2, Math.ceil(viewport / size) + 2))
    }
    resize()
    const observer = new ResizeObserver(resize)
    observer.observe(rootRef.current)
    observer.observe(sequenceRef.current)
    return () => observer.disconnect()
  }, [vertical, logos, gap, logoHeight])

  useEffect(() => {
    const track = trackRef.current
    const sequence = sequenceRef.current
    if (!track || !sequence) return undefined
    let frame
    const animate = (time) => {
      if (lastTimeRef.current === null) lastTimeRef.current = time
      const delta = Math.min(50, time - lastTimeRef.current) / 1000
      lastTimeRef.current = time
      const desired = hovered ? hoverSpeed : target
      velocityRef.current += (desired - velocityRef.current) * (1 - Math.exp(-delta / 0.25))
      const size = vertical ? sequence.offsetHeight : sequence.offsetWidth
      if (size) {
        offsetRef.current = (offsetRef.current + velocityRef.current * delta + size) % size
        track.style.transform = vertical
          ? `translate3d(0, ${-offsetRef.current}px, 0)`
          : `translate3d(${-offsetRef.current}px, 0, 0)`
      }
      frame = requestAnimationFrame(animate)
    }
    frame = requestAnimationFrame(animate)
    return () => { cancelAnimationFrame(frame); lastTimeRef.current = null }
  }, [target, hoverSpeed, hovered, vertical, copyCount])

  const item = (logo, index) => {
    const content = logo.node || <img src={logo.src} alt={logo.alt || ''} loading="lazy" draggable="false" />
    return <li className="logoloop__item" key={`${index}-${logo.title || logo.alt || 'logo'}`}>
      {logo.href ? <a href={logo.href} title={logo.title} target="_blank" rel="noreferrer">{content}</a> : content}
    </li>
  }

  return <div ref={rootRef} className={`logoloop ${vertical ? 'logoloop--vertical' : ''} ${fadeOut ? 'logoloop--fade' : ''} ${scaleOnHover ? 'logoloop--scale-hover' : ''}`} style={{ width: vertical ? toLength(width) : toLength(width) || '100%', '--logoloop-gap': `${gap}px`, '--logoloop-logoHeight': `${logoHeight}px`, '--logoloop-fadeColor': fadeOutColor }} role="region" aria-label={ariaLabel} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
    <div className="logoloop__track" ref={trackRef}>
      {Array.from({ length: copyCount }, (_, copy) => <ul className="logoloop__list" ref={copy === 0 ? sequenceRef : undefined} aria-hidden={copy > 0} key={copy}>{logos.map(item)}</ul>)}
    </div>
  </div>
}
