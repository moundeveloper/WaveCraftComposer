import { NotSameInterfaceInput } from './../../link_rules/LinkRule'
import { LinkRuleDictBuilder } from '../LinkRuleDictBuilder'
import { genId, removeElementFromList } from '../../../../utils/utility'
import {
  LinkRule,
  NotSameInterfaceNode,
  NotSameInterfaceType,
  SameNodeVariableType
} from '../../link_rules/LinkRule'
import type { LinkRuleValidationDict } from '../../ProcessValidations'
import type { InterfaceComponent } from '../../../InterfaceComponent'
import { LinkBuilder, type Link } from '../../../Link'
import { Status, useTerminal } from '../../../../stores/terminal'
import { VariableMutabilityConstant } from '../../link_rules/Rules/VariableMutabilityLinkRule'

export const SameNodeVariableTypeDict = (nodeEditorStore: any): LinkRuleValidationDict => {
  const terminalStore = useTerminal()
  const linkRuleDictBuilder = LinkRuleDictBuilder.getInstance()

  linkRuleDictBuilder.setMessage('Not same node variable type')
  linkRuleDictBuilder.addSuccessfulLinkRule(SameNodeVariableType.getInstance())

  linkRuleDictBuilder.setOnSuccessfulRules(
    (
      sourceInterface: InterfaceComponent,
      targetInterface: InterfaceComponent,
      rules: LinkRule[]
    ) => {
      rules.forEach((rule: LinkRule) => {
        terminalStore.addLog({
          id: genId(),
          message: `The Rule ${rule.constructor.name} has been validated for the interfaces -> source: ${sourceInterface?.id}, target: ${targetInterface?.id}`,
          status: Status.SUCCESS
        })
      })
      console.log('[SUCCESS] SameNodeVariableType')
    }
  )

  linkRuleDictBuilder.addFailedLinkRule(SameNodeVariableType.getInstance())

  linkRuleDictBuilder.setOnFailedRules(
    (
      sourceInterface: InterfaceComponent,
      targetInterface: InterfaceComponent,
      rules: LinkRule[]
    ) => {
      rules.forEach((rule: LinkRule) => {
        terminalStore.addLog({
          id: genId(),
          message: rule.message(),
          status: Status.ERROR
        })
      })
      console.log('[FAILURE] SameNodeVariableType')
    }
  )

  return linkRuleDictBuilder.build()
}
