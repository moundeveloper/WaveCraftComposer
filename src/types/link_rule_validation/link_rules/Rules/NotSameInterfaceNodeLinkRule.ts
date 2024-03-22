import { LinkRule } from '../LinkRule'
import type { InterfaceComponent } from '../../../InterfaceComponent'

/**
 * Prevents an interface from establishing a connection with an interface that belongs to the same parent node.
 */
export class NotSameInterfaceNode extends LinkRule {
  linkRuleValidation(
    sourceInterfaceComponent: InterfaceComponent,
    targetInterfaceComponent: InterfaceComponent
  ): boolean {
    return sourceInterfaceComponent.parentNode !== targetInterfaceComponent.parentNode
  }

  message(): string {
    return 'Interfaces of the same node cannot be linked together'
  }
}
