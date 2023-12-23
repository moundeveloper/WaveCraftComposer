export const genId = (): string => {
  const hexDigits = 'abcdef0123456789'
  const sections: number[] = [8, 4, 4, 4, 12]

  return sections
    .map((section) =>
      Array.from({ length: section }, () => hexDigits[Math.floor(Math.random() * 16)]).join('')
    )
    .join('-')
}

export const removeElementFromList = (list: any[], element: any): void => {
  const index = list.indexOf(element)
  list.splice(index, 1)
}
