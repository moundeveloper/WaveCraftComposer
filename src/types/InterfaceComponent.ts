import { NodeComponent } from './node_component/NodeComponent'

export interface DropDownFieldOptions {
  label: string
  icon?: string
}

export enum InterfaceTypeE {
  INPUT = 'input',
  OPTION = 'option',
  OUTPUT = 'output'
}

export enum UIComponentE {
  NUMBER_INPUT = 'NumberInput',
  TEXT_INPUT = 'TextInput',
  DROP_DOWN = 'DropDown',
  COLOR_PICKER = 'ColorPicker',
  TEXTAREA = 'Textarea',
  ARRAY_DEFAULT = 'ArrayDefault',
  ARRAY_ITEM = 'ArrayItem'
}

export enum InterfaceComponentTypeE {
  DEFAULT_VALUE = 'value',
  VARIABLE_TYPE = 'type',
  MUTABILITY = 'mutability'
}

export interface ComponentOptions {
  label: InterfaceComponentTypeE
  component?: UIComponentE
  value?: any
  values?: Array<DropDownFieldOptions>
  updateHandler?: Function
}

export class InterfaceComponent {
  id: string
  options: ComponentOptions
  parentNode: NodeComponent
  constructor(id: string, options: ComponentOptions, parentNode: NodeComponent) {
    this.id = id
    this.options = options
    this.parentNode = parentNode
  }

  setUpdateHandler(updateHandler: Function) {
    this.options.updateHandler = updateHandler
  }
}
