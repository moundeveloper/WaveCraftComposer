import { NODE_TYPE, NodeComponent } from './NodeComponent'
import { genId } from '@/utils/utility'
import { VariableNodeComponent, PrintNodeComponent } from '@/types/NodeComponent'

interface NodeOptions {
  name: string
}

export class NodeFacotry {
  static createNode(type: NODE_TYPE, options: NodeOptions): NodeComponent {
    switch (type) {
      case NODE_TYPE.PRINT:
        return new PrintNodeComponent(genId())
      case NODE_TYPE.VARIABLE:
        return new VariableNodeComponent(genId(), options.name)
    }
  }
}
