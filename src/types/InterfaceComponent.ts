import { NodeComponent } from './NodeComponent'

export interface DropDownFieldOptions {
  label: string
  icon?: string
}

export enum UIComponent {
  NUMBER_INPUT = 'NumberInput',
  TEXT_INPUT = 'TextInput',
  DROP_DOWN = 'DropDown',
  COLOR_PICKER = 'ColorPicker',
  TEXTAREA = 'Textarea',
  ARRAY_DEFAULT = 'ArrayDefault'
}

export interface ComponentOptions {
  label: string
  component?: string
  value?: any
  values?: Array<DropDownFieldOptions>
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
