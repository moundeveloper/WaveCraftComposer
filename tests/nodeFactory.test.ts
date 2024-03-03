import { NodeComponentFactory } from '../src/types/factory/NodeComponentFactory';
import { expect, test } from 'vitest'
import { PrintNodeComponent, VariableNodeComponent, NodeType } from '../src/types/NodeComponent';

test('OK - variable node from factory', () => {
    const node = NodeComponentFactory.createNode(NodeType.VARIABLE, {name: 'clock'})

    expect(node).toBeInstanceOf(VariableNodeComponent)
})


test('OK - print node from factory', () => {
    const node = NodeComponentFactory.createNode(NodeType.PRINT)

    expect(node).toBeInstanceOf(PrintNodeComponent)
})

test('KO - no variable node from factory', () => {
    const node = NodeComponentFactory.createNode(NodeType.VARIABLE)

    expect(node).toBe(null)
})
