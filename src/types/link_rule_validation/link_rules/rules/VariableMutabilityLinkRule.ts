import { LinkRule } from '../link_rule_index'
import type { InterfaceComponent } from '../../../InterfaceComponent'
import { VariableNodeComponent, VariableMutability } from '../../../node_component/NodeComponent'

export class VariableMutabilityConstant extends LinkRule {
  linkRuleValidation(
    sourceInterfaceComponent: InterfaceComponent,
    targetInterfaceComponent: InterfaceComponent
  ): boolean {
    if (
      sourceInterfaceComponent.parentNode instanceof VariableNodeComponent &&
      targetInterfaceComponent.parentNode instanceof VariableNodeComponent
    ) {
      return this.isMutabilityConstant(
        sourceInterfaceComponent.parentNode,
        targetInterfaceComponent.parentNode
      )
    }

    return false
  }

  message(): string {
    return 'Cannot override value of a constant variable'
  }

  private isMutabilityConstant(
    sourceVariableNode: VariableNodeComponent,
    targetVariableNode: VariableNodeComponent
  ) {
    console.log('sono caio', targetVariableNode.variable.mutability)
    return targetVariableNode.variable.mutability !== VariableMutability.CONST
  }
}
