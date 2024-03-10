import { genId, removeElementFromList } from '../../utils/utility'
import {
  LinkRule,
  NotSameInterfaceInput,
  NotSameInterfaceNode,
  NotSameInterfaceType,
  SameNodeVariableType
} from './LinkRule'
import type { LinkRuleValidationDict } from './ProcessValidations'
import type { InterfaceComponent } from '../InterfaceComponent'
import { LinkBuilder, type Link } from '../Link'
import { Status, useTerminal } from '../../stores/terminal'

export const getLinkRuleDict = (nodeEditorStore: any): LinkRuleValidationDict[] => {
  const terminalStore = useTerminal()
  const linkRuleValidationDict: LinkRuleValidationDict[] = [
    {
      message: 'Not same interface input',
      successfulRules: [NotSameInterfaceInput.getInstance()],
      OnSuccessfulRules: (
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
      },
      failedRules: [NotSameInterfaceInput.getInstance()],
      OnFailedRules: (
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
    },
    {
      message: 'Not same node',
      successfulRules: [NotSameInterfaceNode.getInstance()],
      OnSuccessfulRules: (
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
        console.log('[SUCCESS] NotSameInterfaceNode')
      },
      failedRules: [NotSameInterfaceNode.getInstance()],
      OnFailedRules: (
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
        console.log('[FAILURE] NotSameInterfaceNode')
      }
    },
    {
      message: 'Not same interface type',
      successfulRules: [NotSameInterfaceType.getInstance()],
      OnSuccessfulRules: (
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
        console.log('[SUCCESS] NotSameInterfaceType')
      },
      failedRules: [NotSameInterfaceType.getInstance()],
      OnFailedRules: (
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
        console.log('[FAILURE] NotSameInterfaceType')
      }
    },
    {
      message: 'Not same interface type',
      successfulRules: [SameNodeVariableType.getInstance()],
      OnSuccessfulRules: (
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
      },
      failedRules: [SameNodeVariableType.getInstance()],
      OnFailedRules: (
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
    }
  ]

  return linkRuleValidationDict
}
