'use client'

import { useEffect, useRef, useState } from 'react'
import { MorphIcon } from 'morphicons/react'
import {
  ArrowDown, ArrowLeft, ArrowRight, ArrowUpRight, ChevronDown, ChevronLeft,
  ChevronRight, Menu, Minus, Moon, Plus, Sun, X,
} from 'lucide'

const icons = {
  'arrow-down': ArrowDown,
  'arrow-left': ArrowLeft,
  'arrow-right': ArrowRight,
  'arrow-up-right': ArrowUpRight,
  'chevron-down': ChevronDown,
  'chevron-left': ChevronLeft,
  'chevron-right': ChevronRight,
  menu: Menu,
  minus: Minus,
  moon: Moon,
  plus: Plus,
  sun: Sun,
  close: X,
}

type IconName = keyof typeof icons

export function Icon({ name, hoverName, size = 18 }: {
  name: IconName; hoverName?: IconName; size?: number
}) {
  const container = useRef<HTMLSpanElement>(null)
  const [active, setActive] = useState(false)

  useEffect(() => {
    if (!hoverName) return
    const action = container.current?.closest('a, button')
    if (!action) return
    let hovered = false
    let focused = false
    const update = () => setActive(hovered || focused)
    const enter = (event: Event) => {
      if ((event as PointerEvent).pointerType === 'touch' || action.matches(':disabled')) return
      hovered = true
      update()
    }
    const leave = () => { hovered = false; update() }
    const focus = () => { focused = true; update() }
    const blur = () => { focused = false; update() }
    action.addEventListener('pointerenter', enter)
    action.addEventListener('pointerleave', leave)
    action.addEventListener('focusin', focus)
    action.addEventListener('focusout', blur)
    return () => {
      action.removeEventListener('pointerenter', enter)
      action.removeEventListener('pointerleave', leave)
      action.removeEventListener('focusin', focus)
      action.removeEventListener('focusout', blur)
    }
  }, [hoverName])

  const current = active && hoverName ? hoverName : name
  return <span ref={container} className="site-icon" aria-hidden="true" data-icon={name} data-active-icon={current} style={{ width: size, height: size }}>
    <MorphIcon icon={icons[current]} size={size} strokeWidth={1.5} color="currentColor" spring="snappy" reducedMotion="user" focusable="false" data-icon-engine="morphicons" />
  </span>
}

export function Arrow() {
  return <Icon name="arrow-up-right" hoverName="arrow-right" />
}
