import { LinkRuleValidationDictManager } from './LinkRuleDictManager'
import { LinkRuleDictE, getLinkRuleDict } from './LinkRuleDicts/GetLinkRuleDict'

export const initLinkDictRules = () => {
  const linkRuleValidationDictManager = LinkRuleValidationDictManager.getInstance()

  linkRuleValidationDictManager.push(getLinkRuleDict(LinkRuleDictE.NOT_SAME_INTERFACE_INPUT))
  linkRuleValidationDictManager.push(getLinkRuleDict(LinkRuleDictE.NOT_SAME_INTERFACE_NODE))
  linkRuleValidationDictManager.push(getLinkRuleDict(LinkRuleDictE.NOT_SAME_INTERFACE_TYPE))
  linkRuleValidationDictManager.push(getLinkRuleDict(LinkRuleDictE.SAME_NODE_VARIABLE_TYPE))
  linkRuleValidationDictManager.push(getLinkRuleDict(LinkRuleDictE.VARIABLE_MUTABILITY_CONSTANT))
}
