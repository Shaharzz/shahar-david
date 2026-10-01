import React, { useEffect, useRef, useState } from 'react'
import './GooeyNav.css'

export default function GooeyNav({
  items = [],
  animationTime = 600,
  particleCount = 8,
  particleDistances = [90, 10],
  particleR = 100,
  timeVariance = 300,
  colors = [1, 2, 3, 1, 2, 3, 1, 4],
  initialActiveIndex = 0,
}) {
  const containerRef = useRef(null)
  const navRef = useRef(null)
  const filterRef = useRef(null)
  const textRef = useRef(null)
  const [activeIndex, setActiveIndex] = useState(initialActiveIndex)

  const noise = (value = 1) => value / 2 - Math.random() * value
  const point = (distance, index, total) => {
    const angle = ((360 + noise(8)) / total) * index * (Math.PI / 180)
    return [distance * Math.cos(angle), distance * Math.sin(angle)]
  }

  const makeParticles = (element) => {
    element.style.setProperty('--time', `${animationTime * 2 + timeVariance}ms`)
    for (let index = 0; index < particleCount; index += 1) {
      const start = point(particleDistances[0], particleCount - index, particleCount)
      const end = point(particleDistances[1] + noise(7), particleCount - index, particleCount)
      const particle = document.createElement('span')
      const dot = document.createElement('span')
      particle.className = 'particle'
      dot.className = 'point'
      particle.style.setProperty('--start-x', `${start[0]}px`)
      particle.style.setProperty('--start-y', `${start[1]}px`)
      particle.style.setProperty('--end-x', `${end[0]}px`)
      particle.style.setProperty('--end-y', `${end[1]}px`)
      particle.style.setProperty('--time', `${animationTime * 2 + noise(timeVariance * 2)}ms`)
      particle.style.setProperty('--scale', `${1 + noise(0.2)}`)
      particle.style.setProperty('--color', `var(--gooey-color-${colors[Math.floor(Math.random() * colors.length)]}, white)`)
      particle.style.setProperty('--rotate', `${noise(particleR / 10) * 10}deg`)
      particle.appendChild(dot)
      setTimeout(() => {
        element.appendChild(particle)
        requestAnimationFrame(() => element.classList.add('active'))
        setTimeout(() => particle.remove(), animationTime * 2 + timeVariance)
      }, 30)
    }
  }

  const updatePosition = (element) => {
    if (!containerRef.current || !filterRef.current || !textRef.current) return
    const container = containerRef.current.getBoundingClientRect()
    const rect = element.getBoundingClientRect()
    const position = { left: `${rect.x - container.x}px`, top: `${rect.y - container.y}px`, width: `${rect.width}px`, height: `${rect.height}px` }
    Object.assign(filterRef.current.style, position)
    Object.assign(textRef.current.style, position)
    textRef.current.innerText = element.innerText
  }

  const handleClick = (event, index) => {
    const element = event.currentTarget
    if (activeIndex === index) return
    setActiveIndex(index)
    updatePosition(element)
    filterRef.current?.querySelectorAll('.particle').forEach((particle) => particle.remove())
    textRef.current?.classList.remove('active')
    void textRef.current?.offsetWidth
    textRef.current?.classList.add('active')
    if (filterRef.current) makeParticles(filterRef.current)
  }

  useEffect(() => {
    const active = navRef.current?.querySelectorAll('li')[activeIndex]
    if (active) updatePosition(active)
    const observer = new ResizeObserver(() => {
      const current = navRef.current?.querySelectorAll('li')[activeIndex]
      if (current) updatePosition(current)
    })
    if (containerRef.current) observer.observe(containerRef.current)
    return () => observer.disconnect()
  }, [activeIndex])

  return <div className="gooey-nav-container" ref={containerRef}>
    <nav><ul ref={navRef}>{items.map((item, index) => <li key={item.label} className={activeIndex === index ? 'active' : ''}><a href={item.href} onClick={(event) => handleClick(event, index)}>{item.label}</a></li>)}</ul></nav>
    <span className="gooey-effect filter" ref={filterRef} />
    <span className="gooey-effect text" ref={textRef} />
  </div>
}
