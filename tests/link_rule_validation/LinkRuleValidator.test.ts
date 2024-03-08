import { ItemIsAlreadyIncluded, NotFoundError } from '../../src/types/link_rule_validation/Errors'
import { GroupRule, SameNodeTypeGroup } from '../../src/types/link_rule_validation/GroupRule'
import {
  LinkRule,
  NotSameInterfaceType,
  SameNodeVariableType
} from '../../src/types/link_rule_validation/LinkRule'
import { InterfaceComponent } from '../../src/types/InterfaceComponent'
import { NodeType, VariableNodeComponent, VariableType } from '../../src/types/NodeComponent'
import { NodeComponentFactory } from '../../src/types/factory/NodeComponentFactory'
import {
  LinkRulesValidator,
  type RulesValidation
} from './../../src/types/link_rule_validation/LinkRuleValidator'
import { expect, test } from 'vitest'

test('Test singleton instance LinkRuleValidator', () => {
  const linkRulesValidatorA = LinkRulesValidator.getInstance()
  const linkRulesValidatorB = LinkRulesValidator.getInstance()

  expect(linkRulesValidatorA).toBeInstanceOf(LinkRulesValidator)
  expect(linkRulesValidatorB).toBeInstanceOf(LinkRulesValidator)
  expect(linkRulesValidatorA).toBe(linkRulesValidatorB)
})

test('Test registerGlobalLinkRule is inserted OK', () => {
  const linkRulesValidator = LinkRulesValidator.getInstance().resetAll()

  const result = linkRulesValidator.registerGlobalLinkRule(NotSameInterfaceType.getInstance())

  const globalRules = linkRulesValidator.getGlobalRules()
  const globalRule = globalRules.find(
    (globalRule: LinkRule) => globalRule === NotSameInterfaceType.getInstance()
  )

  expect(globalRule).not.toBeUndefined()
  expect(result).toBeTruthy()
})

test('Test registerGlobalLinkRule is inserted KO ItemIsAlreadyIncluded', () => {
  const linkRulesValidator = LinkRulesValidator.getInstance().resetAll()

  linkRulesValidator.registerGlobalLinkRule(NotSameInterfaceType.getInstance())

  const throwError = () => {
    linkRulesValidator.registerGlobalLinkRule(NotSameInterfaceType.getInstance())
  }

  expect(throwError).toThrowError(ItemIsAlreadyIncluded)
})

test('Test globalRuleIsAlreadyIncluded is OK', () => {
  const linkRulesValidator = LinkRulesValidator.getInstance().resetAll()

  linkRulesValidator.registerGlobalLinkRule(NotSameInterfaceType.getInstance())
  const result = linkRulesValidator.globalRuleIsAlreadyIncluded(NotSameInterfaceType.getInstance())
  expect(result).toBeTruthy()
})
test('Test globalRuleIsAlreadyIncluded is KO', () => {
  const linkRulesValidator = LinkRulesValidator.getInstance().resetAll()

  const result = linkRulesValidator.globalRuleIsAlreadyIncluded(NotSameInterfaceType.getInstance())
  expect(result).toBeFalsy()
})

test('Test registerGroupLinkRule is inserted OK', () => {
  const linkRulesValidator = LinkRulesValidator.getInstance().resetAll()

  const result = linkRulesValidator.registerGroupRule(SameNodeTypeGroup.getInstance())

  const groupRules = linkRulesValidator.getGroupRules()
  const groupRule = groupRules.find(
    (groupRule: LinkRule) => groupRule === SameNodeTypeGroup.getInstance()
  )

  expect(groupRule).not.toBeUndefined()
  expect(result).toBeTruthy()
})

test('Test registerGroupLinkRule is inserted KO ItemIsAlreadyIncluded', () => {
  const linkRulesValidator = LinkRulesValidator.getInstance().resetAll()

  linkRulesValidator.registerGroupRule(SameNodeTypeGroup.getInstance())

  const throwError = () => {
    linkRulesValidator.registerGroupRule(SameNodeTypeGroup.getInstance())
  }

  expect(throwError).toThrowError(ItemIsAlreadyIncluded)
})

test('Test groupRuleIsAlreadyIncluded is OK', () => {
  const linkRulesValidator = LinkRulesValidator.getInstance().resetAll()

  linkRulesValidator.registerGroupRule(SameNodeTypeGroup.getInstance())
  const result = linkRulesValidator.groupRuleIsAlreadyIncluded(SameNodeTypeGroup.getInstance())
  expect(result).toBeTruthy()
})
test('Test groupRuleIsAlreadyIncluded is KO', () => {
  const linkRulesValidator = LinkRulesValidator.getInstance().resetAll()

  const result = linkRulesValidator.groupRuleIsAlreadyIncluded(SameNodeTypeGroup.getInstance())
  expect(result).toBeFalsy()
})

test('Test registerRuleIntoGroupRule is inserted inside a group rule OK', () => {
  const linkRulesValidator = LinkRulesValidator.getInstance().resetAll()

  linkRulesValidator.registerGroupRule(SameNodeTypeGroup.getInstance())
  const result = linkRulesValidator.registerRuleIntoGroupRule(
    SameNodeTypeGroup.getInstance(),
    SameNodeVariableType.getInstance()
  )

  expect(result).toBeInstanceOf(GroupRule)
  expect(result).contains(SameNodeVariableType.getInstance())
})

test('Test registerRuleIntoGroupRule is inserted inside a group rule KO', () => {
  const linkRulesValidator = LinkRulesValidator.getInstance().resetAll()

  const throwError = () => {
    linkRulesValidator.registerRuleIntoGroupRule(
      SameNodeTypeGroup.getInstance(),
      SameNodeVariableType.getInstance()
    )
  }

  expect(throwError).toThrowError(NotFoundError)
})

test('Test validateGlobalRules validates the rules correctly', () => {
  const validator = LinkRulesValidator.getInstance()
  const nodeOne = <VariableNodeComponent>(
    NodeComponentFactory.createNode(NodeType.VARIABLE, { name: 'bozo' })
  )
  const nodeTwo = <VariableNodeComponent>(
    NodeComponentFactory.createNode(NodeType.VARIABLE, { name: 'bozo2' })
  )

  nodeOne.currentVariable.type = VariableType.BOOLEAN

  const inputOne = <InterfaceComponent>nodeOne?.inputInterfaces[0]
  const outputTwo = <InterfaceComponent>nodeTwo?.outputInterfaces[0]

  validator.registerGlobalLinkRule(NotSameInterfaceType.getInstance())
  validator.registerGroupRule(SameNodeTypeGroup.getInstance())
  validator.registerRuleIntoGroupRule(
    SameNodeTypeGroup.getInstance(),
    SameNodeVariableType.getInstance()
  )
  const validation: RulesValidation = validator.validateGlobalRules(inputOne, outputTwo)

  expect(validation).toBeInstanceOf(Object)
})
