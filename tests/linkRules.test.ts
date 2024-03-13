import { LinkRulesValidator } from './../src/types/link_rule_validation/LinkRuleValidator'
import {
  NotSameInterfaceInput,
  NotSameInterfaceNode,
  NotSameInterfaceType,
  SameNodeVariableType
} from '../src/types/link_rule_validation/link_rules/LinkRule'
import { NodeComponentFactory } from '../src/types/factory/NodeComponentFactory'
import { expect, test } from 'vitest'
import {
  NodeComponentState,
  VariableNodeComponent,
  NodeType,
  VariableType
} from '../src/types/NodeComponent'
import { InterfaceComponent } from '../src/types/InterfaceComponent'

// This test must be updated
// NotSameInterfaceType testing: 2 variable nodes - 1 input - 1 output
// I1 - input interface one - first node
// I2 - input interface one - second node
// O1 - output interface one - first node
// O2 - output interface one - second node

test('OK - validate interfaces linking of different type: I1 - O2', () => {
  const nodeOne = NodeComponentFactory.createNode(NodeType.VARIABLE, { name: 'one' })
  const nodeTwo = NodeComponentFactory.createNode(NodeType.VARIABLE, { name: 'two' })

  const linkRuleValidator = new LinkRulesValidator()
  linkRuleValidator.registerLinkRule(new NotSameInterfaceType())

  const inputOne = nodeOne?.inputInterfaces[0]
  const outputTwo = nodeTwo?.outputInterfaces[0]

  if (inputOne && outputTwo) {
    const { allValid, successfulRules, failedRules } = linkRuleValidator.validateRules(
      inputOne,
      outputTwo
    )
    expect(allValid).toBeTruthy()
  }
})

test('OK - validate interfaces linking of different type: I2 - O1', () => {
  const nodeOne = NodeComponentFactory.createNode(NodeType.VARIABLE, { name: 'one' })
  const nodeTwo = NodeComponentFactory.createNode(NodeType.VARIABLE, { name: 'two' })

  const linkRuleValidator = LinkRulesValidator.getInstance()
  linkRuleValidator.registerLinkRule(new NotSameInterfaceType())

  const inputTwo = nodeTwo?.inputInterfaces[0]
  const outputOne = nodeOne?.outputInterfaces[0]

  if (inputTwo && outputOne) {
    const { allValid, successfulRules, failedRules } = linkRuleValidator.validateRules(
      inputTwo,
      outputOne
    )
    expect(allValid).toBeTruthy()
  }
})

test('KO - validate interfaces linking of the same type: I1 - I2', () => {
  const nodeOne = NodeComponentFactory.createNode(NodeType.VARIABLE, { name: 'one' })
  const nodeTwo = NodeComponentFactory.createNode(NodeType.VARIABLE, { name: 'two' })

  const linkRuleValidator = new LinkRulesValidator()
  linkRuleValidator.registerLinkRule(new NotSameInterfaceType())

  const nodeOneInputInterface = nodeOne?.inputInterfaces[0]
  const nodeTwoInputInterface = nodeTwo?.inputInterfaces[0]

  if (nodeOneInputInterface && nodeTwoInputInterface) {
    const { allValid, successfulRules, failedRules } = linkRuleValidator.validateRules(
      nodeOneInputInterface,
      nodeTwoInputInterface
    )
    expect(allValid).toBeFalsy()
  }
})

test('KO - validate interfaces linking of the same type: O2 - O1', () => {
  const nodeOne = NodeComponentFactory.createNode(NodeType.VARIABLE, { name: 'one' })
  const nodeTwo = NodeComponentFactory.createNode(NodeType.VARIABLE, { name: 'two' })

  const linkRuleValidator = new LinkRulesValidator()
  linkRuleValidator.registerLinkRule(new NotSameInterfaceType())

  const nodeTwoOutputInterface = nodeTwo?.outputInterfaces[0]
  const nodeOneOutputInterface = nodeOne?.outputInterfaces[0]

  if (nodeTwoOutputInterface && nodeOneOutputInterface) {
    const { allValid, successfulRules, failedRules } = linkRuleValidator.validateRules(
      nodeTwoOutputInterface,
      nodeOneOutputInterface
    )
    expect(allValid).toBeFalsy()
  }
})

// NotSameInterfaceNode testing
test('OK - validate interfaces linking of different nodes with different interface type', () => {
  const nodeOne = NodeComponentFactory.createNode(NodeType.VARIABLE, { name: 'one' })
  const nodeTwo = NodeComponentFactory.createNode(NodeType.VARIABLE, { name: 'two' })

  const linkRuleValidator = new LinkRulesValidator()
  linkRuleValidator.registerLinkRule(new NotSameInterfaceNode())

  const nodeOneInputInterface = nodeTwo?.inputInterfaces[0]
  const nodeTwoInputInterface = nodeOne?.inputInterfaces[0]

  if (nodeOneInputInterface && nodeTwoInputInterface) {
    const { allValid, successfulRules, failedRules } = linkRuleValidator.validateRules(
      nodeOneInputInterface,
      nodeTwoInputInterface
    )
    expect(allValid).toBeTruthy()
  }
})

test('KO - validate interfaces linking of the same node with different interface type', () => {
  const nodeOne = NodeComponentFactory.createNode(NodeType.VARIABLE, { name: 'one' })

  const linkRuleValidator = new LinkRulesValidator()
  linkRuleValidator.registerLinkRule(new NotSameInterfaceNode())

  const nodeOneInputInterface = nodeOne?.inputInterfaces[0]
  const nodeOneOutputInterface = nodeOne?.outputInterfaces[0]

  if (nodeOneInputInterface && nodeOneOutputInterface) {
    const { allValid, successfulRules, failedRules } = linkRuleValidator.validateRules(
      nodeOneInputInterface,
      nodeOneOutputInterface
    )
    expect(allValid).toBeFalsy()
  }
})

// SameNodeVariableType testing

test('OK - validate interfaces linking of the same node variable type', () => {
  const nodeOne = <VariableNodeComponent>(
    NodeComponentFactory.createNode(NodeType.VARIABLE, { name: 'one' })
  )
  const nodeTwo = <VariableNodeComponent>(
    NodeComponentFactory.createNode(NodeType.VARIABLE, { name: 'two' })
  )

  const linkRuleValidator = new LinkRulesValidator()
  linkRuleValidator.registerLinkRule(new SameNodeVariableType())
  const nodeOneInputInterface = <InterfaceComponent>nodeOne?.inputInterfaces[0]
  const nodeOneOutputInterface = <InterfaceComponent>nodeTwo?.outputInterfaces[0]

  nodeOne.currentVariable.type = VariableType.NUMBER
  nodeTwo.currentVariable.type = VariableType.NUMBER

  const { allValid, successfulRules, failedRules } = linkRuleValidator.validateRules(
    nodeOneInputInterface,
    nodeOneOutputInterface
  )

  expect(allValid).toBeTruthy()
})

test('KO - validate interfaces linking of different node variable type', () => {
  const nodeOne = <VariableNodeComponent>(
    NodeComponentFactory.createNode(NodeType.VARIABLE, { name: 'one' })
  )
  const nodeTwo = <VariableNodeComponent>(
    NodeComponentFactory.createNode(NodeType.VARIABLE, { name: 'two' })
  )

  const linkRuleValidator = new LinkRulesValidator()
  linkRuleValidator.registerLinkRule(new SameNodeVariableType())
  const nodeOneInputInterface = <InterfaceComponent>nodeOne?.inputInterfaces[0]
  const nodeOneOutputInterface = <InterfaceComponent>nodeTwo?.outputInterfaces[0]

  const nodeOneStates = nodeOne.variableStates

  const booleanState = <NodeComponentState>nodeOneStates.get(VariableType.BOOLEAN)

  nodeOne.setCurrentVariableState(booleanState)

  const { allValid, successfulRules, failedRules } = linkRuleValidator.validateRules(
    nodeOneInputInterface,
    nodeOneOutputInterface
  )

  expect(allValid).toBeFalsy()
})

test('KO - validate interfaces linking of different node variable type', () => {
  const nodeOne = <VariableNodeComponent>(
    NodeComponentFactory.createNode(NodeType.VARIABLE, { name: 'one' })
  )
  const nodeTwo = <VariableNodeComponent>(
    NodeComponentFactory.createNode(NodeType.VARIABLE, { name: 'two' })
  )

  const linkRuleValidator = new LinkRulesValidator()
  linkRuleValidator.registerLinkRule(new SameNodeVariableType())
  const nodeOneInputInterface = <InterfaceComponent>nodeOne?.inputInterfaces[0]
  const nodeOneOutputInterface = <InterfaceComponent>nodeTwo?.outputInterfaces[0]

  const nodeOneStates = nodeOne.variableStates

  const booleanState = <NodeComponentState>nodeOneStates.get(VariableType.BOOLEAN)

  nodeOne.setCurrentVariableState(booleanState)

  const { allValid } = linkRuleValidator.validateRules(
    nodeOneInputInterface,
    nodeOneOutputInterface
  )

  expect(allValid).toBeFalsy()

  // Reset
  nodeOne.setCurrentVariableState(<NodeComponentState>nodeOneStates.get(VariableType.NUMBER))

  // Repetition
  const nodeTwoStates = nodeTwo.variableStates

  const stringState = <NodeComponentState>nodeTwoStates.get(VariableType.STRING)

  nodeTwo.setCurrentVariableState(stringState)

  const { allValid: allValid2 } = linkRuleValidator.validateRules(
    nodeOneInputInterface,
    nodeOneOutputInterface
  )

  expect(allValid2).toBeFalsy()
})
