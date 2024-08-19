import { LinkRule } from '../link_rule_index'
import type { InterfaceComponent } from '../../../InterfaceComponent'
import {  NodeComponent } from '../../../node_component/NodeComponent'
import { useNodeEditor } from '../../../../stores/nodeEditor'
import type { Scope } from '@/types/Scope/Scope'

/**
 * Prevents <something>.
 */
export class OnlyNodesOfSameScope extends LinkRule {
  nodeEditorStore: any

  constructor() {
    super()
    this.nodeEditorStore = useNodeEditor()
  }

  linkRuleValidation(
    sourceInterfaceComponent: InterfaceComponent,
    targetInterfaceComponent: InterfaceComponent
  ): boolean {
    return this.findNodeScope(sourceInterfaceComponent.parentNode) === this.findNodeScope(targetInterfaceComponent.parentNode)

  }

  findNodeScope(nodeToCompare: NodeComponent): Scope {
   const globalScope: Scope = this.nodeEditorStore.currentGlobalScope
   const node =  globalScope.nodes.find(node => node.id === nodeToCompare.id)
   return <Scope> node?.scope
  }

  message(): string {
    return 'Nodes of different scopes cannot be connected'
  }

  getName(): string {
    return 'OnlyNodesOfSameScope'
  }
}
