import { useState } from 'react'

interface ResizableParams {
  elementId: string
  min?: number
  max?: number
}

export const useResizable = ({ elementId, min = 0, max = 9999 }: ResizableParams) => {
  const [initialPos, setInitialPos] = useState(0)
  const [initialSize, setInitialSize] = useState(0)

  const onDragStart = (e: any) => {
    let resizable = document.getElementById(elementId)

    setInitialPos(e.clientX)
    setInitialSize(resizable?.offsetWidth || 0)
  }

  const onDrag = (e: any) => {
    let resizable = document.getElementById(elementId)
    if (!resizable || e.clientX < min || e.clientX > max) {
      return
    }
    resizable.style.width = `${initialSize + parseInt(e.clientX - initialPos)}px`
  }

  return { onDragStart, onDrag }
}
