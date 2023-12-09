import { NodeComponent } from './NodeComponent'

export interface ComponentOptions {
  label: string
  component?: string
  value?: any
  values?: Array<any>
}

export class InterfaceComponent {
  id: string
  options: ComponentOptions
  parentNode: NodeComponent | null = null
  constructor(id: string, options: ComponentOptions) {
    this.id = id
    this.options = options
  }
}
