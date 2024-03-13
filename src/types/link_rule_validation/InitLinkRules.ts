import { SameNodeTypeGroup } from './GroupRule'
import {
  NotSameInterfaceInput,
  NotSameInterfaceNode,
  NotSameInterfaceType,
  SameNodeVariableType
} from './LinkRule'
import { LinkRulesValidator } from './LinkRuleValidator'

export const initLinkRules = (): void => {
  const linkRuleValidator = LinkRulesValidator.getInstance()
  linkRuleValidator.registerGlobalLinkRule(NotSameInterfaceInput.getInstance())
  linkRuleValidator.registerGlobalLinkRule(NotSameInterfaceNode.getInstance())
  linkRuleValidator.registerGlobalLinkRule(NotSameInterfaceType.getInstance())
  linkRuleValidator.registerGroupRule(SameNodeTypeGroup.getInstance())
  linkRuleValidator.registerRuleIntoGroupRule(
    SameNodeTypeGroup.getInstance(),
    SameNodeVariableType.getInstance()
  )
}
