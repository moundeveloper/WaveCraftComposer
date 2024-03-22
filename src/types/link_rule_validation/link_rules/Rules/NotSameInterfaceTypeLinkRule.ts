import { LinkRule } from '../LinkRule'
import type { InterfaceComponent } from '../../../InterfaceComponent'
import { VariableNodeComponent, VariableMutability } from '../../../NodeComponent'

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

  isInputInterface(interfaceComponent: InterfaceComponent) {
    return interfaceComponent.parentNode?.inputInterfaces.includes(interfaceComponent)
  }
}
