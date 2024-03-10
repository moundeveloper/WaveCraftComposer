import { LinkRuleValidationProcessor } from './../types/link_rule_validation/ProcessValidations'
import { reactive } from 'vue'
import useTemporaryLink from './useTemporaryLink'
import { useNodeEditor } from '../stores/nodeEditor'
import { getElementPositionOffset } from '../utils/InterfaceElement'
import { InterfaceComponent } from '../types/InterfaceComponent'
import { LinkBuilder } from '../types/Link'
import { genId } from '../utils/utility'
import { getLinkRuleDict } from '../types/link_rule_validation/LinkRuleDict'

interface LinkingInterfaces {
  sourceInterface: InterfaceComponent | undefined
  targetInterface: InterfaceComponent | undefined
}

export default function useLinking() {
  const {
    isTemporaryLinkActive,
    temporaryLinkData,
    activateTemporaryLink,
    deactivateTemporaryLink,
    resetTemporaryLinkData
  } = useTemporaryLink()

  const nodeEditorStore = useNodeEditor()

  const linkingInterfaces = reactive<LinkingInterfaces>({
    sourceInterface: undefined,
    targetInterface: undefined
  })

  const initLinking = (event: MouseEvent) => {
    if (event.button === 1) return
    // Deactivate panning and zooming
    nodeEditorStore.togglePanZoom(false)
    const target = event.target as HTMLElement
    // Activate temporary link
    activateTemporaryLink()
    // Is the link already present in the link store and is it a target link?
    const nodeInterface = nodeEditorStore.getInterfaceById(target.id)

    if (!nodeInterface) return
    const linkTarget = nodeEditorStore.getLinkInterfaceTarget(nodeInterface)
    let sourcePosition
    if (linkTarget) {
      // If the link is present, remove it and set the source interface to the target link's source interface
      nodeEditorStore.removeLinkByInterface(nodeInterface)
      linkingInterfaces.sourceInterface = linkTarget.sourceInterfaceComponent
      temporaryLinkData.sourceInterface = linkingInterfaces.sourceInterface

      // Get the position of the target interface for setting starting position of temporary link
      sourcePosition = getElementPositionOffset(linkTarget.targetInterfaceComponent?.id)
    } else {
      // If the link is not present, set the source interface to the clicked node interface
      linkingInterfaces.sourceInterface = nodeInterface
      temporaryLinkData.sourceInterface = linkingInterfaces.sourceInterface

      // Get the position of the clicked interface for setting starting position of temporary link
      if (!linkingInterfaces.sourceInterface?.id) return
      sourcePosition = getElementPositionOffset(linkingInterfaces.sourceInterface?.id)
    }

    // Calculate the starting position of the temporary link based on mouse position and scale
    temporaryLinkData.startPostion.x = event.clientX / nodeEditorStore.scale - sourcePosition.x
    temporaryLinkData.startPostion.y = event.clientY / nodeEditorStore.scale - sourcePosition.y
  }

  const completeLinking = (event: MouseEvent) => {
    if (event.button === 1) return
    nodeEditorStore.togglePanZoom(true)
    deactivateTemporaryLink()
    resetTemporaryLinkData()

    const target = event.target as HTMLElement
    linkingInterfaces.targetInterface = nodeEditorStore.getInterfaceById(target.id)

    if (
      linkingInterfaces.sourceInterface instanceof InterfaceComponent &&
      linkingInterfaces.targetInterface instanceof InterfaceComponent
    ) {
      // Validate interfaces linking
      const allValidRules = LinkRuleValidationProcessor.getInstance().processValidations(
        getLinkRuleDict(nodeEditorStore),
        linkingInterfaces.sourceInterface,
        linkingInterfaces.targetInterface
      )

      if (allValidRules) {
        const link = new LinkBuilder().createLink(
          genId(),
          linkingInterfaces.sourceInterface,
          linkingInterfaces.targetInterface
        )
        nodeEditorStore.addLink(link)
        return
      }
    }
  }

  const notLinking = (event: MouseEvent) => {
    if (event.button === 1) return
    nodeEditorStore.togglePanZoom(true)
    deactivateTemporaryLink()
    temporaryLinkData.sourceInterface = undefined
  }

  return {
    initLinking,
    completeLinking,
    notLinking
  }
}
