import { useState, useLayoutEffect } from 'react'

const HORIZONTAL = 'horizontal'
const VERTICAL = 'vertical'
export const useIsOverflow = (ref, orientation = HORIZONTAL) => {
  const [isOverflowX, setIsOverflowX] = useState(undefined)
  const [isOverflowY, setIsOverflowY] = useState(undefined)

  useLayoutEffect(() => {
    const { current } = ref

    const trigger = () => {
      if (orientation === HORIZONTAL) {
        const hasOverflow = current.scrollWidth > current.clientWidth
        setIsOverflowX(hasOverflow)
      } else {
        const hasOverflow = current.scrollHeight > current.clientHeight
        setIsOverflowY(hasOverflow)
      }
    }

    if (current) {
      if ('ResizeObserver' in window) {
        new ResizeObserver(trigger).observe(current)
      }

      trigger()
    }
  }, [ref, orientation])

  return { isOverflowX, isOverflowY }
}
