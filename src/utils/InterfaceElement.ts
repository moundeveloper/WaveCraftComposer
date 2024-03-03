import { Position } from '../types/Position'

export const getElementPositionOffset = (id: string) => {
  const result = findGrandparentElementById(id)
  if (!result) throw new Error(`There is no element that correspond to the id: ${id}`)
  const { element, parent, grandparent } = result

  return new Position(
    grandparent.offsetLeft + parent.offsetLeft + element.offsetLeft + element.clientWidth / 2,
    grandparent.offsetTop + parent.offsetTop + element.offsetTop + element.clientHeight / 2
  )
}

export const findGrandparentElementById = (elementId: string) => {
  const element = document.getElementById(elementId)
  if (!element) {
    console.error(`Element with ID '${elementId}' not found.`)
    return
  }

  const parent = element.parentElement
  if (!parent) {
    console.error(`Parent of element with ID '${elementId}' not found.`)
    return null
  }

  const grandparent = parent.parentElement
  if (!grandparent) {
    console.error(`Grandparent of element with ID '${elementId}' not found.`)
    return null
  }

  return { element, parent, grandparent }
}

export const generateDPath = (startPos: Position, endPos: Position) => {
  let x1 = startPos.x
  let y1 = startPos.y
  let x2 = endPos.x
  let y2 = endPos.y

  // Control Points setup for bezier curve
  const cy1 = y1
  const cy2 = y2

  const cx1 = x2
  const cx2 = x1

  const d = `M${x1} ${y1} C${cx1} ${cy1} ${cx2} ${cy2} ${x2} ${y2}`
  return d
}
