import { LinkRule } from '../link_rule_index'
import type { InterfaceComponent } from '../../../InterfaceComponent'
import { VariableNodeComponent, VariableMutability } from '../../../node_component/NodeComponent'

/**
 * Prevents a variable node from establishing a connection with interfaces of the same type.
 */
export class NotSameInterfaceType extends LinkRule {
  linkRuleValidation(
    sourceInterfaceComponent: InterfaceComponent,
    targetInterfaceComponent: InterfaceComponent
  ): boolean {
    return (
      this.isInputInterface(sourceInterfaceComponent) !==
      this.isInputInterface(targetInterfaceComponent)
    )
  }

  message(): string {
    return 'Interfaces of the same type cannot be linked together'
  }

  getName(): string {
    return 'NotSameInterfaceType'
  }

  isInputInterface(interfaceComponent: InterfaceComponent) {
    return interfaceComponent.parentNode?.inputInterfaces.includes(interfaceComponent)
  }
}
