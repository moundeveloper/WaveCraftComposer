import { LinkRuleValidationDictManager } from './LinkRuleDictManager'
import { LinkRuleDictBuilder } from './LinkRuleDictBuilder'
import { genId, removeElementFromList } from '../../../utils/utility'
import {
  LinkRule,
  NotSameInterfaceInput,
  NotSameInterfaceNode,
  NotSameInterfaceType,
  SameNodeVariableType
} from '../link_rules/LinkRule'
import type { LinkRuleValidationDict } from '../ProcessValidations'
import type { InterfaceComponent } from '../../InterfaceComponent'
import { LinkBuilder, type Link } from '../../Link'
import { Status, useTerminal } from '../../../stores/terminal'
import { VariableMutabilityConstant } from '../link_rules/Rules/VariableMutabilityLinkRule'
import { LinkRuleDictE, getLinkRuleDict } from './LinkRuleDicts/GetLinkRuleDict'

export const initLinkDictRules = () => {
  const linkRuleValidationDictManager = LinkRuleValidationDictManager.getInstance()

  linkRuleValidationDictManager.push(getLinkRuleDict(LinkRuleDictE.NOT_SAME_INTERFACE_INPUT))
  linkRuleValidationDictManager.push(getLinkRuleDict(LinkRuleDictE.NOT_SAME_INTERFACE_NODE))
  linkRuleValidationDictManager.push(getLinkRuleDict(LinkRuleDictE.NOT_SAME_INTERFACE_TYPE))
  linkRuleValidationDictManager.push(getLinkRuleDict(LinkRuleDictE.SAME_NODE_VARIABLE_TYPE))
  linkRuleValidationDictManager.push(getLinkRuleDict(LinkRuleDictE.VARIABLE_MUTABILITY_CONSTANT))
}
