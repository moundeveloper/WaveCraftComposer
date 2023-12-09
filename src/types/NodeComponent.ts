import { genId } from '@/utils/utility'
import { InterfaceComponent } from './InterfaceComponent'
import { Position } from './Position'

export abstract class NodeComponent {
  id: string
  name: string
  nodeType: string
  position: Position = new Position(0, 0)
  inputInterfaces: InterfaceComponent[] = []
  outputInterfaces: InterfaceComponent[] = []
  optionInterfaces: InterfaceComponent[] = []

  constructor(id: string, name: string, nodeType: string) {
    this.id = id
    this.name = name
    this.nodeType = nodeType
    this.initInterfaces()
  }

  abstract initInterfaces(): void

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

export class Variable {
  name: string
  value: number
  type: VariableType = 'number'
  mutability: VariableMutability = 'let'

  constructor(name: string) {
    this.value = 3.2
    this.name = name
  }
}

export class NodeComponentState {
  id: string
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
    super(id, name, 'variable')
    this.variable = new Variable(this.name)
    this.currentVariable = this.variable
    // Set current variable state
    this.variableStates = new Map<VariableType, NodeComponentState>()
    this.currentVariableState = this.initVariableStates()
  }

  initInterfaces(): void {
    this.addInputInterfaceComponent(new InterfaceComponent(genId(), { label: 'value' }))
    this.addInputInterfaceComponent(new InterfaceComponent(genId(), { label: 'value' }))
    this.addOutputInterfaceComponent(
      new InterfaceComponent(genId(), { label: 'value', component: 'DefaultTemplate' })
    )
  }

  private initVariableStates() {
    // Number state
    const numberState = new NodeComponentState('number', this)
    this.variableStates.set('number', numberState)
    // String state
    const stringState = new NodeComponentState('string', this)
    this.variableStates.set('string', stringState)
    // Boolean state
    const booleanState = new NodeComponentState('boolean', this)
    this.variableStates.set('boolean', booleanState)
    return numberState
  }

  changeCurrentVariableState(id: VariableType) {
    const variableState = this.variableStates.get(id)
    if (!variableState) return
    this.currentVariableState = variableState
    this.inputInterfaces = this.currentVariableState.inputInterfaces
    this.outputInterfaces = this.currentVariableState.outputInterfaces
    this.optionInterfaces = this.currentVariableState.optionInterfaces
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
  constructor(id: string, name: string) {
    super(id, name, 'print')
    this.variable = new Variable(this.name)
    this.currentVariable = this.variable
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
