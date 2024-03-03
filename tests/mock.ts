import { VariableNodeComponent } from "../src/types/NodeComponent"
import { genId } from "../src/utils/utility"

const node = new VariableNodeComponent(genId(),'clock')
console.log(node.currentVariableState)