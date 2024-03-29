import { NodeType, NodeComponent } from './node_component/NodeComponent'
import { genId } from '../utils/utility'
import { VariableNodeComponent, PrintNodeComponent } from './node_component/NodeComponent'

interface NodeOptions {
  name: string
}

export class NodeFactory {
  static createNode(type: NodeType, options: NodeOptions): NodeComponent {
    switch (type) {
      case NodeType.PRINT:
        return new PrintNodeComponent(genId())
      case NodeType.VARIABLE:
        return new VariableNodeComponent(genId(), options.name)
    }
  }
}
