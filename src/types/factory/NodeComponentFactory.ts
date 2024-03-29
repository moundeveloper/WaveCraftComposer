import {
  NodeType,
  PrintNodeComponent,
  VariableNodeComponent
} from '../node_component/NodeComponent'
import type { NodeComponent } from '../node_component/NodeComponent'
import { genId } from '../../utils/utility'

interface Options {
  name: string
}

export class NodeComponentFactory {
  static createNode(type: NodeType, options: Options | null = null): NodeComponent | null {
    let node: NodeComponent | null = null

    switch (type) {
      case NodeType.VARIABLE:
        node = options ? new VariableNodeComponent(genId(), options.name) : null
        break
      case NodeType.PRINT:
        node = new PrintNodeComponent(genId())
        break
    }

    return node
  }
}
