export const getElementByID = (id) => {
  return document.getElementById(id)
}
export const getElementPosition = (element) => {
  const rect = element.getBoundingClientRect()
  return { x: rect.left, y: rect.top }
}
export const getElementPositionViewportById = (id) => {
  const element = document.getElementById(id)
  const rect = element.getBoundingClientRect()
  return { xV: rect.left + rect.width / 2, yV: rect.top + rect.height / 2 }
}

export const getElementPositionCentered = (element) => {
  const rect = element.getBoundingClientRect()
  return { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 }
}

export const setPathDByID = (id, d) => {
  const path = document.querySelector(`#${id}`)
  path.setAttribute('d', d)
}
