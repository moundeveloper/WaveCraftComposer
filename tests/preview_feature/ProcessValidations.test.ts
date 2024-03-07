import { SameNodeTypeGroup } from '../../src/preview_feature/GroupRule'
import {
  NotAWorkingRule,
  NotSameInterfaceType,
  SameNodeVariableType
} from '../../src/preview_feature/LinkRule'
import { LinkRuleValidationProcessor } from '../../src/preview_feature/ProcessValidations'
import { InterfaceComponent } from '../../src/types/InterfaceComponent'
import { NodeType, VariableNodeComponent, VariableType } from '../../src/types/NodeComponent'
import { NodeComponentFactory } from '../../src/types/factory/NodeComponentFactory'
import { LinkRulesValidator } from './../../src/preview_feature/LinkRuleValidator'
import { expect, test } from 'vitest'

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
  validator.registerGlobalLinkRule(SameNodeVariableType.getInstance())
  validator.registerGlobalLinkRule(NotAWorkingRule.getInstance())
  /*   validator.registerGroupRule(SameNodeTypeGroup.getInstance())
  validator.registerRuleIntoGroupRule(
    SameNodeTypeGroup.getInstance(),
    SameNodeVariableType.getInstance()
  ) */
  const linkRuleValidationProcessor = LinkRuleValidationProcessor.getInstance()
  linkRuleValidationProcessor.processValidations(inputOne, outputTwo)
})
