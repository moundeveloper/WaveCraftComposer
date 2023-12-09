import { InterfaceComponent } from '@/types/InterfaceComponent'
import type { ComponentOptions } from '@/types/InterfaceComponent'

export interface DataProps {
  interface: InterfaceComponent
  options?: ComponentOptions
}
export interface HElementProps {
  data: DataProps
  updateHandler?: Function
}
