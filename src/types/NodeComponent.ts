import { genId } from '@/utils/utility'
import { InterfaceComponent } from './InterfaceComponent'
import { Position } from './Position'

export abstract class NodeComponent {
  id: string
  name: string
  nodeType: string
  position: Position = new Position(0, 0)
  zIndex?: number
  inputInterfaces: InterfaceComponent[] = []
  outputInterfaces: InterfaceComponent[] = []
  optionInterfaces: InterfaceComponent[] = []

  constructor(id: string, name: string, nodeType: string) {
    this.id = id
    this.name = name
    this.nodeType = nodeType
  }

  protected abstract initInterfaces(): void

  addInputInterfaceComponent(interfaceComponent: InterfaceComponent): void {
    interfaceComponent.parentNode = this
    this.inputInterfaces.push(interfaceComponent)
  }
  addOutputInterfaceComponent(interfaceComponent: InterfaceComponent): void {
    interfaceComponent.parentNode = this
    this.outputInterfaces.push(interfaceComponent)
  }
  addOptionInterfaceComponent(interfaceComponent: InterfaceComponent): void {
    interfaceComponent.parentNode = this
    this.optionInterfaces.push(interfaceComponent)
  }
}

type VariableMutability = 'const' | 'let'
type VariableType = 'null' | 'boolean' | 'string' | 'number' | 'object' | 'array'

export enum NODE_TYPE {
  VARIABLE = 'variable',
  PRINT = 'print'
}

export enum VARIABLE_TYPE {
  BOOLEAN = 'boolean',
  STRING = 'string',
  NUMBER = 'number',
  OBJECT = 'object',
  ARRAY = 'array'
}

export class Variable {
  name: string
  value: any
  type: VariableType = 'number'
  mutability: VariableMutability = 'let'

  constructor(name: string) {
    this.value = 3.2
    this.name = name
  }
}

export class NodeComponentState {
  id: string
  variable?: Variable
  parentNode: NodeComponent
  inputInterfaces: InterfaceComponent[] = []
  outputInterfaces: InterfaceComponent[] = []
  optionInterfaces: InterfaceComponent[] = []

  constructor(id: string, node: NodeComponent) {
    this.id = id
    this.parentNode = node
  }

  addInputInterfaceComponent(interfaceComponent: InterfaceComponent): void {
    interfaceComponent.parentNode = this.parentNode
    this.inputInterfaces.push(interfaceComponent)
  }
  addOutputInterfaceComponent(interfaceComponent: InterfaceComponent): void {
    interfaceComponent.parentNode = this.parentNode
    this.outputInterfaces.push(interfaceComponent)
  }
  addOptionInterfaceComponent(interfaceComponent: InterfaceComponent): void {
    interfaceComponent.parentNode = this.parentNode
    this.optionInterfaces.push(interfaceComponent)
  }
}

export class VariableNodeComponent extends NodeComponent {
  variable: Variable
  currentVariable: Variable
  variableStates: Map<VariableType, NodeComponentState>
  currentVariableState: NodeComponentState

  constructor(id: string, name: string) {
    super(id, name, NODE_TYPE.VARIABLE)
    this.variable = new Variable(this.name)
    this.currentVariable = this.variable
    // Set current variable state
    this.variableStates = new Map<VariableType, NodeComponentState>()
    this.currentVariableState = this.initVariableStates()
    this.initInterfaces()
  }

  initInterfaces(): void {
    this.initVariableStates()

    if (this.currentVariableState === undefined) return

    this.currentVariableState.addOutputInterfaceComponent(
      new InterfaceComponent(genId(), { label: 'output' })
    )
    this.currentVariableState.addOptionInterfaceComponent(
      new InterfaceComponent(genId(), {
        label: 'type',
        component: 'DropDown',
        value: 'number',
        values: [
          {
            label: 'null',
            icon: 'number'
          },
          {
            label: 'boolean',
            icon: 'number'
          },
          {
            label: 'string',
            icon: 'string'
          },
          {
            label: 'number',
            icon: 'number'
          },
          {
            label: 'object',
            icon: 'number'
          },
          {
            label: 'array',
            icon: 'number'
          }
        ]
      })
    )

    this.currentVariableState.addOptionInterfaceComponent(
      new InterfaceComponent(genId(), {
        label: 'mutability',
        component: 'DropDown',
        value: 'let',
        values: [
          {
            label: 'let',
            icon: 'number'
          },
          {
            label: 'const',
            icon: 'number'
          }
        ]
      })
    )

    this.setCurrentVariableState(this.currentVariableState)
    this.outputInterfaces = this.currentVariableState.outputInterfaces
    this.optionInterfaces = this.currentVariableState.optionInterfaces
  }

  private initVariableStates() {
    // Number state
    const numberState = new NodeComponentState('number', this)
    numberState.addInputInterfaceComponent(
      new InterfaceComponent(genId(), { label: 'value', component: 'NumberInput', value: 2 })
    )
    this.variableStates.set('number', numberState)
    // String state
    const stringState = new NodeComponentState('string', this)
    stringState.addInputInterfaceComponent(
      new InterfaceComponent(genId(), { label: 'value', component: 'TextInput', value: 2 })
    )
    this.variableStates.set('string', stringState)
    // Boolean state
    const booleanState = new NodeComponentState('boolean', this)
    booleanState.addInputInterfaceComponent(
      new InterfaceComponent(genId(), {
        label: 'value',
        component: 'DropDown',
        value: false,
        values: [
          {
            label: 'true'
          },
          {
            label: 'false'
          }
        ]
      })
    )
    this.variableStates.set('boolean', booleanState)

    return numberState
  }

  setCurrentVariableState(variableState: NodeComponentState) {
    this.currentVariableState = variableState
    this.inputInterfaces = this.currentVariableState.inputInterfaces
  }

  passVariableToConnectedNode(variableNodeComponent: VariableNodeComponent) {
    // It has to be the target node
    variableNodeComponent.currentVariable = this.variable
  }

  updateVariableName(name: string) {
    this.variable.name = name
  }
  updateVariableValue(value: any) {
    this.variable.value = value
  }
  updateVariableType(type: VariableType) {
    this.variable.type = type
  }
  updateVariableMutability(mutability: VariableMutability) {
    this.variable.mutability = mutability
  }
}

export class PrintNodeComponent extends NodeComponent {
  variable: Variable
  currentVariable: Variable
  constructor(id: string) {
    super(id, NODE_TYPE.PRINT, NODE_TYPE.PRINT)
    this.variable = new Variable(this.name)
    this.currentVariable = this.variable
    this.initInterfaces()
  }

  initInterfaces(): void {
    this.addInputInterfaceComponent(new InterfaceComponent(genId(), { label: 'value' }))
  }
  updateVariableName(name: string) {
    this.variable.name = name
  }
  updateVariableValue(value: any) {
    this.variable.value = value
  }
  updateVariableType(type: VariableType) {
    this.variable.type = type
  }
  updateVariableMutability(mutability: VariableMutability) {
    this.variable.mutability = mutability
  }
}
