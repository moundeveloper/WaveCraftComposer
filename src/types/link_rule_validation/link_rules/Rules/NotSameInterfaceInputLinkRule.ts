import { LinkRule } from '../LinkRule'
import type { InterfaceComponent } from '../../../InterfaceComponent'
import { VariableNodeComponent, VariableMutability } from '../../../NodeComponent'
import { useNodeEditor } from '../../../../stores/nodeEditor'
import type { Link } from '../../../Link'

/**
 * Prevents an input interface from establishing a connection with many output interfaces.
 */
export class NotSameInterfaceInput extends LinkRule {
  nodeEditorStore: any

  constructor() {
    super()
    this.nodeEditorStore = useNodeEditor()
  }

  linkRuleValidation(
    sourceInterfaceComponent: InterfaceComponent,
    targetInterfaceComponent: InterfaceComponent
  ): boolean {
    // Target interface has a link and it is an input -> false
    // Source interface has a link and it is an input -> false
    // Source or target aren't input interfaces and don't have a link -> true
    if (this.isInputInterface(sourceInterfaceComponent)) {
      return !this.interfaceHasLink(sourceInterfaceComponent)
    }

    if (this.isInputInterface(targetInterfaceComponent)) {
      return !this.interfaceHasLink(targetInterfaceComponent)
    }

    return true
  }

  interfaceHasLink = (interfaceComponent: InterfaceComponent) => {
    return this.nodeEditorStore.links.some((link: Link) => {
      return (
        link.sourceInterfaceComponent === interfaceComponent ||
        link.targetInterfaceComponent === interfaceComponent
      )
    })
  }

  isInputInterface(interfaceComponent: InterfaceComponent) {
    return interfaceComponent.parentNode?.inputInterfaces.includes(interfaceComponent)
  }

  message(): string {
    return 'Interfaces of type input cannot be linked with multiple output interfaces'
  }
}
