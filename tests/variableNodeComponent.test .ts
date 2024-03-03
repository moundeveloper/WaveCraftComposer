import { Variable, VariableType } from './../src/types/NodeComponent';
import { expect, test } from 'vitest'
import { NodeComponentState, VariableNodeComponent, NodeType } from '../src/types/NodeComponent';
import { genId } from '../src/utils/utility';
import { InterfaceComponent } from '../src/types/InterfaceComponent';

test('OK - variable node current variable set', () => {
    const node = new VariableNodeComponent(genId(),'clock')

    expect(node).toBeInstanceOf(VariableNodeComponent)
    expect(node.currentVariableState).toBeInstanceOf(NodeComponentState)
    expect(node.currentVariableState.variable).toEqual(node.currentVariable)
})


test('OK - variable node type update ', () => {
    const node = new VariableNodeComponent(genId(),'clock')
    const stringVariable = new Variable(VariableType.STRING)
    stringVariable.type = VariableType.STRING
    stringVariable.value =  ''
    const newVariableState = new NodeComponentState(VariableType.STRING, node)
    newVariableState.variable = stringVariable
    const inputInterface = new InterfaceComponent(genId(), { label: 'value', component: 'TextInput', value: 2 })
    newVariableState.addInputInterfaceComponent(inputInterface)

    node.setCurrentVariableState(newVariableState)

    expect(node.currentVariableState).toEqual(newVariableState)
    expect(node.currentVariable).toEqual(newVariableState.variable)
    expect(node.variable).toEqual(newVariableState.variable)
    expect(node.inputInterfaces[0]).toEqual(inputInterface)
})

