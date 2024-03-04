import { GroupRule, SameNodeTypeGroup } from '../../src/preview_feature/GroupRule'
import { NotSameInterfaceType, SameNodeVariableType } from '../../src/preview_feature/LinkRule'
import { InterfaceComponent } from '../../src/types/InterfaceComponent'
import { NodeType, VariableNodeComponent, VariableType } from '../../src/types/NodeComponent'
import { NodeComponentFactory } from '../../src/types/factory/NodeComponentFactory'
import { LinkRulesValidator } from './../../src/preview_feature/LinkRuleValidator'
import { expect, test } from 'vitest'


test('Test singleton instance LinkRuleValidator', () => {
  const linkRulesValidatorA = LinkRulesValidator.getInstance()
  const linkRulesValidatorB = LinkRulesValidator.getInstance()

  expect(linkRulesValidatorA).toBeInstanceOf(LinkRulesValidator)
  expect(linkRulesValidatorB).toBeInstanceOf(LinkRulesValidator)
  expect(linkRulesValidatorA).toBe(linkRulesValidatorB)
})

test('Test registerGlobalLinkRule is inserted', () => {
  const linkRulesValidator = LinkRulesValidator.getInstance()
  linkRulesValidator.emptyGlobalRules()
  linkRulesValidator.emptyGroupRules()

  linkRulesValidator.registerGlobalLinkRule(NotSameInterfaceType.getInstance())
  const result = linkRulesValidator.globalRuleIsAlreadyIncluded(NotSameInterfaceType.getInstance())
  expect(result).toBeTruthy()
})

// Test registerGroupRule is inserted
test('', () => {
  const linkRulesValidator = LinkRulesValidator.getInstance()
  linkRulesValidator.resetAll()

  linkRulesValidator.registerGlobalLinkRule(NotSameInterfaceType.getInstance())
  const result = linkRulesValidator.globalRuleIsAlreadyIncluded(NotSameInterfaceType.getInstance())
  expect(result).toBeTruthy()
})
// Test globalRuleIsAlreadyIncluded is KO or OK

test('', () => {
  
})
// Test groupRuleIsAlreadyIncluded is KO or OK

test('', () => {
  
})
// Test registerRuleIntoGroupRule is inserted inside a group rule

test('', () => {
  
})
// Test validateGlobalRules validates the rules correctly

test('', () => {
  
})


/* test('Preview - LinkRuleValidator', () => {
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
  const validation = validator.validateGlobalRules(inputOne, outputTwo)

  console.log(validation)
  expect(validation).toBeInstanceOf(Array)


}) */
