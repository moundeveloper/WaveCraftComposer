export const getElementByID = (id: string) => {
  return document.getElementById(id)
}

export const getElementHeightByID = (id) => {
  return document.getElementById(id)?.clientHeight
}

export const getElementPosition = (element: HTMLElement) => {
  const rect = element.getBoundingClientRect()
  return { x: rect.left, y: rect.top }
}
export const getElementPositionViewportById = (id: string) => {
  const element = document.getElementById(id)
  const rect = element.getBoundingClientRect()
  return { xV: rect.left + rect.width / 2, yV: rect.top + rect.height / 2 }
}

export const getElementPositionCentered = (element: HTMLElement) => {
  const rect = element.getBoundingClientRect()
  return { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 }
}

export const setPathDByID = (id: string, d: string) => {
  const path = document.querySelector(`#${id}`)
  if (!path) return
  path.setAttribute('d', d)
}
