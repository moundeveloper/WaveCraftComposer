import {
  InvalidInsertionError,
  ItemIsAlreadyIncluded
} from '../../src/types/link_rule_validation/Errors'
import { SameNodeTypeGroup } from '../../src/types/link_rule_validation/GroupRule'
import { SameNodeVariableType } from '../../src/types/link_rule_validation/LinkRule'
import { InterfaceComponent } from '../../src/types/InterfaceComponent'
import { NodeType, VariableNodeComponent, VariableType } from '../../src/types/NodeComponent'
import { NodeComponentFactory } from '../../src/types/factory/NodeComponentFactory'
import { expect, test } from 'vitest'

test('Preview - GroupRule: check if rules are emptied', () => {
  const rule: SameNodeTypeGroup = SameNodeTypeGroup.getInstance()
  rule.registerLinkRule(SameNodeVariableType.getInstance())
  rule.emptyRules()

  expect(rule.isEmpty()).toBeTruthy()
})

test('Preview - GroupRule: check if rule is removed.', () => {
  const rule: SameNodeTypeGroup = SameNodeTypeGroup.getInstance()
  rule.emptyRules()

  rule.registerLinkRule(SameNodeVariableType.getInstance())
  rule.unregisterLinkRule(SameNodeVariableType.getInstance())

  expect(rule.linkRuleIsAlreadyIncluded(SameNodeVariableType.getInstance())).toBeFalsy()
})

test('Preview - GroupRule: check if registering the same group rule throws the error "ItemIsAlreadyIncluded".', () => {
  const rule: SameNodeTypeGroup = SameNodeTypeGroup.getInstance()
  rule.emptyRules()

  rule.registerLinkRule(SameNodeVariableType.getInstance())

  const throwError = () => {
    rule.registerLinkRule(SameNodeVariableType.getInstance())
  }

  expect(throwError).toThrowError(ItemIsAlreadyIncluded)
})

test('Preview - GroupRule: check if rules are validated.', () => {
  const rule: SameNodeTypeGroup = SameNodeTypeGroup.getInstance()
  rule.emptyRules()

  rule.registerLinkRule(SameNodeVariableType.getInstance())

  const nodeOne = <VariableNodeComponent>(
    NodeComponentFactory.createNode(NodeType.VARIABLE, { name: 'one' })
  )
  const nodeTwo = <VariableNodeComponent>(
    NodeComponentFactory.createNode(NodeType.VARIABLE, { name: 'two' })
  )

  const nodeOneInterface = <InterfaceComponent>nodeOne?.inputInterfaces[0]
  const nodeTwoInterface = <InterfaceComponent>nodeTwo?.outputInterfaces[0]

  nodeOne.currentVariable.type = VariableType.NUMBER
  nodeTwo.currentVariable.type = VariableType.NUMBER

  const { allValid, successfulRules, failedRules } = rule.validateGroupRules(
    nodeOneInterface,
    nodeTwoInterface
  )

  expect(allValid).toBeTruthy()
  expect(failedRules).toEqual([])
})

test('Preview - GroupRule: check if rules are not validated.', () => {
  const rule: SameNodeTypeGroup = SameNodeTypeGroup.getInstance()
  rule.emptyRules()

  rule.registerLinkRule(SameNodeVariableType.getInstance())

  const nodeOne = <VariableNodeComponent>(
    NodeComponentFactory.createNode(NodeType.VARIABLE, { name: 'one' })
  )
  const nodeTwo = <VariableNodeComponent>(
    NodeComponentFactory.createNode(NodeType.PRINT, { name: 'two' })
  )

  const nodeOneInputInterface = <InterfaceComponent>nodeTwo?.inputInterfaces[0]
  const nodeOneOutputInterface = <InterfaceComponent>nodeOne?.outputInterfaces[0]

  const { allValid, successfulRules, failedRules } = rule.validateGroupRules(
    nodeOneInputInterface,
    nodeOneOutputInterface
  )

  expect(allValid).toBeFalsy()
  expect(successfulRules).toEqual([])
  expect(failedRules).toEqual([])
})

test('Preview - GroupRule: check if the rule to register is a group rule and should throw error.', () => {
  const rule: SameNodeTypeGroup = SameNodeTypeGroup.getInstance()
  rule.emptyRules()

  const throwError = () => {
    rule.registerLinkRule(rule)
  }

  expect(throwError).toThrowError(InvalidInsertionError)
})
