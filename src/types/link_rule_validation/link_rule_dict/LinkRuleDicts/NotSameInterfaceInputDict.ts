import { NotSameInterfaceInput } from '../../link_rules/LinkRule'
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

export const NotSameInterfaceInputDict = (nodeEditorStore: any): LinkRuleValidationDict => {
  const terminalStore = useTerminal()
  const linkRuleDictBuilder = LinkRuleDictBuilder.getInstance()

  linkRuleDictBuilder.setMessage('Not same interface input')
  linkRuleDictBuilder.addSuccessfulLinkRule(NotSameInterfaceInput.getInstance())

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
      console.log('[SUCCESS] NotSameInterfaceInput')
    }
  )

  linkRuleDictBuilder.addFailedLinkRule(NotSameInterfaceInput.getInstance())

  linkRuleDictBuilder.setOnFailedRules(
    (
      sourceInterface: InterfaceComponent,
      targetInterface: InterfaceComponent,
      rules: LinkRule[]
    ) => {
      const targetInterfaceLink = nodeEditorStore.links.find((link: Link) => {
        return (
          link.sourceInterfaceComponent === targetInterface ||
          link.targetInterfaceComponent === targetInterface
        )
      })

      if (targetInterfaceLink) {
        nodeEditorStore.removeLinkByInterface(targetInterface)
      } else {
        nodeEditorStore.removeLinkByInterface(sourceInterface)
      }

      const link = new LinkBuilder().createLink(genId(), sourceInterface, targetInterface)
      nodeEditorStore.addLink(link)

      rules.forEach((rule: LinkRule) => {
        terminalStore.addLog({
          id: genId(),
          message: rule.message(),
          status: Status.INFO
        })
      })

      console.log('[FAILURE] NotSameInterfaceInput')
    }
  )

  return linkRuleDictBuilder.build()
}
