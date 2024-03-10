import { removeElementFromList } from '../../utils/utility'
import {
  LinkRule,
  NotSameInterfaceInput,
  NotSameInterfaceNode,
  NotSameInterfaceType
} from './LinkRule'
import type { LinkRuleValidationDict } from './ProcessValidations'
import type { InterfaceComponent } from '../InterfaceComponent'
import type { Link } from '../Link'

export const getLinkRuleDict = (nodeEditorStore: any): LinkRuleValidationDict[] => {
  const linkRuleValidationDict: LinkRuleValidationDict[] = [
    {
      message: 'Not same interface input',
      successfulRules: [NotSameInterfaceInput.getInstance()],
      OnSuccessfulRules: (
        sourceInterface: InterfaceComponent,
        targetInterface: InterfaceComponent,
        rule: LinkRule[]
      ) => {
        console.log('[SUCCESS] NotSameInterfaceInput')
      },
      failedRules: [NotSameInterfaceInput.getInstance()],
      OnFailedRules: (
        sourceInterface: InterfaceComponent,
        targetInterface: InterfaceComponent,
        rule: LinkRule[]
      ) => {
        const targetInterfaceLink = nodeEditorStore.links.find((link: Link) => {
          return (
            link.sourceInterfaceComponent === targetInterface ||
            link.targetInterfaceComponent === targetInterface
          )
        })
        console.log(targetInterfaceLink)

        if (targetInterfaceLink) {
          nodeEditorStore.removeLinkByInterface(targetInterface)
        } else {
          nodeEditorStore.removeLinkByInterface(sourceInterface)
        }

        console.log('[FAILURE] NotSameInterfaceInput')
      }
    },
    {
      message: 'Not same node',
      successfulRules: [NotSameInterfaceNode.getInstance()],
      OnSuccessfulRules: (
        sourceInterface: InterfaceComponent,
        targetInterface: InterfaceComponent,
        rule: LinkRule[]
      ) => {
        console.log('[SUCCESS] NotSameInterfaceNode')
      },
      failedRules: [NotSameInterfaceNode.getInstance()],
      OnFailedRules: (
        sourceInterface: InterfaceComponent,
        targetInterface: InterfaceComponent,
        rule: LinkRule[]
      ) => {
        console.log('[FAILURE] NotSameInterfaceNode')
      }
    }
  ]

  return linkRuleValidationDict
}
