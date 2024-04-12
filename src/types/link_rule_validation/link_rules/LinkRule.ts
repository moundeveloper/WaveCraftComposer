import type { InterfaceComponent } from '../../InterfaceComponent'
import { NotSameInterfaceInput } from './rules/NotSameInterfaceInputLinkRule'
import { NotSameInterfaceNode } from './rules/NotSameInterfaceNodeLinkRule'
import { NotSameInterfaceType } from './rules/NotSameInterfaceTypeLinkRule'
import { SameNodeVariableType } from './rules/SameNodeVariableTypeLinkRule'
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
}

export {
  NotSameInterfaceInput,
  NotSameInterfaceNode,
  NotSameInterfaceType,
  SameNodeVariableType,
  LinkRule
}
