'use client'

// Port of assets/js/scripts.js - the only JS the Jekyll site ships: the button toggles
// `is-active`, the off-canvas menu (`#main-menu-mobile`) toggles `open`, and the body
// toggles `lock-scroll`. DOM classes are manipulated directly so the rendered markup
// stays identical to Jekyll's.
import { useEffect, useRef } from 'react'

export function Hamburger() {
  const ref = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const button = ref.current
    if (!button) return
    const menu = document.getElementById('main-menu-mobile')
    const onClick = () => {
      menu?.classList.toggle('open')
      button.classList.toggle('is-active')
      document.body.classList.toggle('lock-scroll')
    }
    button.addEventListener('click', onClick)
    return () => button.removeEventListener('click', onClick)
  }, [])

  return (
    <button
      ref={ref}
      id="toggle-main-menu-mobile"
      className="hamburger hamburger--slider"
      type="button"
      aria-label="Mobile Menu"
    >
      <span className="hamburger-box">
        <span className="hamburger-inner" />
      </span>
    </button>
  )
}
