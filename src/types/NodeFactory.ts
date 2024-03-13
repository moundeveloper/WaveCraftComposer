import { NodeType, NodeComponent } from './NodeComponent'
import { genId } from '../utils/utility'
import { VariableNodeComponent, PrintNodeComponent } from '../types/NodeComponent'

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
