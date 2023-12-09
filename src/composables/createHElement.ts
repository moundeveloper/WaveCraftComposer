import { h } from 'vue'

interface HElementProps {
  data: object
  updateHandler?: Function
}

export const createHField = (name: string, props: HElementProps) => {
  return h(name, {
    data: props.data,
    updateHandler: props.updateHandler
  })
}
