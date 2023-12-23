import { h } from 'vue'

interface HElementProps {
  data: object
  updateHandler?: Function
}

export const createHField = (element: object, props: HElementProps) => {
  return h(element, {
    data: props.data,
    updateHandler: props.updateHandler
  })
}

export const createHComponent = (element: object, props: Object | null = null) => {
  return h(element, {
    data: props
  })
}
