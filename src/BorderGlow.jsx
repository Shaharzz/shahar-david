import { useCallback, useEffect, useRef } from 'react'
import './BorderGlow.css'

const parseHsl = (value) => {
  const match = value.match(/([\d.]+)\s*([\d.]+)%?\s*([\d.]+)%?/)
  return match ? match.slice(1).map(Number) : [40, 80, 80]
}

const glowVariables = (color, intensity) => {
  const [h, s, l] = parseHsl(color)
  const values = [100, 60, 50, 40, 30, 20, 10]
  const suffixes = ['', '-60', '-50', '-40', '-30', '-20', '-10']
  return Object.fromEntries(values.map((opacity, index) => [
    `--glow-color${suffixes[index]}`,
    `hsl(${h}deg ${s}% ${l}% / ${Math.min(opacity * intensity, 100)}%)`,
  ]))
}

const gradientVariables = (colors) => {
  const positions = ['80% 55%', '69% 34%', '8% 6%', '41% 38%', '86% 85%', '82% 18%', '51% 4%']
  const colorIndexes = [0, 1, 2, 0, 1, 2, 1]
  const variables = Object.fromEntries(positions.map((position, index) => [
    `--gradient-${['one', 'two', 'three', 'four', 'five', 'six', 'seven'][index]}`,
    `radial-gradient(at ${position}, ${colors[colorIndexes[index]]} 0px, transparent 50%)`,
  ]))
  return { ...variables, '--gradient-base': `linear-gradient(${colors[0]} 0 100%)` }
}

export default function BorderGlow({
  children,
  className = '',
  edgeSensitivity = 30,
  glowColor = '270 80 80',
  backgroundColor = '#17151d',
  borderRadius = 18,
  glowRadius = 30,
  glowIntensity = 1,
  coneSpread = 25,
  animated = false,
  colors = ['#a476ff', '#65d9fa', '#f472b6'],
  fillOpacity = 0.28,
}) {
  const cardRef = useRef(null)
  const center = useCallback((element) => {
    const { width, height } = element.getBoundingClientRect()
    return [width / 2, height / 2]
  }, [])

  const updatePointer = useCallback((event) => {
    const card = cardRef.current
    if (!card) return
    const rect = card.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top
    const [cx, cy] = center(card)
    const edge = Math.min(Math.max(Math.min(Math.abs(x - cx) / cx, Math.abs(y - cy) / cy), 0), 1)
    const angle = ((Math.atan2(y - cy, x - cx) * 180) / Math.PI + 180) % 360
    card.style.setProperty('--edge-proximity', `${(edge * 100).toFixed(2)}`)
    card.style.setProperty('--cursor-angle', `${angle}deg`)
  }, [center])

  useEffect(() => {
    if (!animated || !cardRef.current) return undefined
    const card = cardRef.current
    card.classList.add('sweep-active')
    card.style.setProperty('--edge-proximity', '100')
    const timer = setTimeout(() => {
      card.style.setProperty('--edge-proximity', '0')
      card.classList.remove('sweep-active')
    }, 1800)
    return () => clearTimeout(timer)
  }, [animated])

  const style = {
    '--card-bg': backgroundColor,
    '--edge-sensitivity': edgeSensitivity,
    '--border-radius': `${borderRadius}px`,
    '--glow-padding': `${glowRadius}px`,
    '--cone-spread': coneSpread,
    '--fill-opacity': fillOpacity,
    ...glowVariables(glowColor, glowIntensity),
    ...gradientVariables(colors),
  }

  return <div ref={cardRef} onPointerMove={updatePointer} className={`border-glow-card ${className}`} style={style}>
    <span className="edge-light" />
    <div className="border-glow-inner">{children}</div>
  </div>
}
