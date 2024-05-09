import {test} from 'vitest'
import {ScopeManager} from "../src/types/Scope/Scope";
import {NodeFactory} from "../src/types/NodeFactory";
import {NodeType} from "../src/types/node_component/node_utils/VariableNodeUtils";

test('OK - variable node from factory', () => {
    const globalScope = ScopeManager.getGlobalScope()

    console.log(globalScope)

    globalScope.insertNode( NodeFactory.createNode(NodeType.PRINT, {name: ''}))

    console.log(ScopeManager.getGlobalScope())
})
