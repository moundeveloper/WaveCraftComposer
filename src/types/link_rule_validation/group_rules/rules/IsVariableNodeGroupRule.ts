import type { InterfaceComponent } from '../../../../types/InterfaceComponent'
import { NodeType } from '../../../../types/node_component/NodeComponent'
import { GroupRule } from '../group_rule_index'

export class IsVariableNodeGroupRule extends GroupRule {
  private constructor() {
    super()
  }

  linkRuleValidation(
    sourceInterfaceComponent: InterfaceComponent,
    targetInterfaceComponent: InterfaceComponent
  ): boolean {
    return (
      sourceInterfaceComponent.parentNode?.NodeType === NodeType.VARIABLE &&
      targetInterfaceComponent.parentNode?.NodeType === NodeType.VARIABLE
    )
  }
  message(): string {
    return `The two nodes are not both of type ${NodeType.VARIABLE}`
  }
}
