import { InterfaceComponent } from '../../../types/InterfaceComponent'
import { genId } from '../../../utils/utility'
import {
  NodeComponent,
  Variable,
  NodeType,
  VariableType,
  VariableMutability
} from '../NodeComponent'

export class PrintNodeComponent extends NodeComponent {
  variable: Variable
  currentVariable: Variable
  constructor(id: string) {
    super(id, NodeType.PRINT, NodeType.PRINT)
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
