import { NotSameInterfaceInput, OnlyNodesOfSameScope } from '../../link_rules/LinkRule'
import { LinkRuleDictBuilder } from '../LinkRuleDictBuilder'
import { genId } from '../../../../utils/utility'
import {
  LinkRule
} from '../../link_rules/LinkRule'
import type { LinkRuleValidationDict } from '../../ProcessValidations'
import type { InterfaceComponent } from '../../../InterfaceComponent'
import { LinkBuilder, type Link } from '../../../Link'
import { Status, useTerminal } from '../../../../stores/terminal'

export const OnlyNodesOfSameScopeDict = (nodeEditorStore: any): LinkRuleValidationDict => {
  const terminalStore = useTerminal()
  const linkRuleDictBuilder = LinkRuleDictBuilder.getInstance()
  const mainRule = OnlyNodesOfSameScope.getInstance()

  linkRuleDictBuilder.setMessage('Not same interface input')
  linkRuleDictBuilder.addSuccessfulLinkRule(mainRule)

  linkRuleDictBuilder.setOnSuccessfulRules(
    (
      sourceInterface: InterfaceComponent,
      targetInterface: InterfaceComponent,
      rules: LinkRule[]
    ) => {
      rules.forEach((rule: LinkRule) => {
        terminalStore.addLog({
          id: genId(),
          message: `The Rule ${rule.getName()} has been validated for the interfaces -> source: ${sourceInterface?.id}, target: ${targetInterface?.id}`,
          status: Status.SUCCESS
        })
      })
      console.log('[SUCCESS] '+ mainRule.getName())
    }
  )

  linkRuleDictBuilder.addFailedLinkRule(mainRule)

  linkRuleDictBuilder.setOnFailedRules(
    (
      sourceInterface: InterfaceComponent,
      targetInterface: InterfaceComponent,
      rules: LinkRule[]
    ) => {

      // SIP (Still In Progress)
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

      console.log('[FAILURE] '+ mainRule.getName())
    }
  )

  return linkRuleDictBuilder.build()
}
