import type { InterfaceComponent } from '../../InterfaceComponent'
import { NotSameInterfaceInput } from './rules/NotSameInterfaceInput'
import { NotSameInterfaceNode } from './rules/NotSameInterfaceNode'
import { NotSameInterfaceType } from './rules/NotSameInterfaceType'
import { SameNodeVariableType } from './rules/SameNodeVariableType'
import { LinkRule } from './link_rule_index'

export class NotAWorkingRule extends LinkRule {
  linkRuleValidation(
    sourceInterfaceComponent: InterfaceComponent,
    targetInterfaceComponent: InterfaceComponent
  ): boolean {
    return false
  }

  message(): string {
    return 'This rule is just  a dummy'
  }

  getName(): string {
    return 'NotAWorkingRule'
  }
}

export {
  NotSameInterfaceInput,
  NotSameInterfaceNode,
  NotSameInterfaceType,
  SameNodeVariableType,
  LinkRule
}
