import { LinkRule } from '../LinkRule'
import type { InterfaceComponent } from '../../../InterfaceComponent'
import { VariableNodeComponent, VariableMutability } from '../../../NodeComponent'
/**
 * Prevents a variable node from establishing a connection when the variable type is different.
 */
export class SameNodeVariableType extends LinkRule {
  linkRuleValidation(
    sourceInterfaceComponent: InterfaceComponent,
    targetInterfaceComponent: InterfaceComponent
  ): boolean {
    if (
      sourceInterfaceComponent.parentNode instanceof VariableNodeComponent &&
      targetInterfaceComponent.parentNode instanceof VariableNodeComponent
    ) {
      return this.variableNodeComponentTypeCheck(
        sourceInterfaceComponent.parentNode,
        targetInterfaceComponent.parentNode
      )
    }
    return false
  }

  variableNodeComponentTypeCheck(
    sourceVariableNodeComponent: VariableNodeComponent,
    targetVariableNodeComponent: VariableNodeComponent
  ): boolean {
    console.log(
      sourceVariableNodeComponent.currentVariable.type,
      targetVariableNodeComponent.currentVariable.type
    )
    // Work in progress - this might be changed later on
    return (
      sourceVariableNodeComponent.currentVariable.type ===
      targetVariableNodeComponent.currentVariable.type
    )
  }

  message(): string {
    return 'Nodes with variables of different type cannot be linked together'
  }

  isInputInterface(interfaceComponent: InterfaceComponent) {
    return interfaceComponent.parentNode?.inputInterfaces.includes(interfaceComponent)
  }
}
