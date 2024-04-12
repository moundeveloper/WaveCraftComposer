import type { InterfaceComponent } from '../../../../types/InterfaceComponent'
import { GroupRule } from '../group_rule_index'

export class SameNodeTypeGroup extends GroupRule {
  private constructor() {
    super()
  }

  linkRuleValidation(
    sourceInterfaceComponent: InterfaceComponent,
    targetInterfaceComponent: InterfaceComponent
  ): boolean {
    return (
      sourceInterfaceComponent.parentNode?.NodeType ===
      targetInterfaceComponent.parentNode?.NodeType
    )
  }
  message(): string {
    return 'Only nodes of the same type can connect'
  }
}
