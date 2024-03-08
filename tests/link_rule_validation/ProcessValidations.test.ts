import { SameNodeTypeGroup } from '../../src/types/link_rule_validation/GroupRule'
import {
  NotAWorkingRule,
  NotSameInterfaceType,
  SameNodeVariableType
} from '../../src/types/link_rule_validation/LinkRule'
import {
  LinkRuleValidationDict,
  LinkRuleValidationProcessor
} from '../../src/types/link_rule_validation/ProcessValidations'
import { InterfaceComponent } from '../../src/types/InterfaceComponent'
import { NodeType, VariableNodeComponent, VariableType } from '../../src/types/NodeComponent'
import { NodeComponentFactory } from '../../src/types/factory/NodeComponentFactory'
import { LinkRulesValidator } from './../../src/types/link_rule_validation/LinkRuleValidator'
import { expect, test } from 'vitest'

test('Test validateGlobalRules validates the rules correctly', () => {
  const validator = LinkRulesValidator.getInstance()
  const nodeOne = <VariableNodeComponent>(
    NodeComponentFactory.createNode(NodeType.VARIABLE, { name: 'bozo' })
  )
  const nodeTwo = <VariableNodeComponent>(
    NodeComponentFactory.createNode(NodeType.VARIABLE, { name: 'bozo2' })
  )
  /*  const nodeTwo = <VariableNodeComponent>NodeComponentFactory.createNode(NodeType.PRINT) */

  /* nodeOne.currentVariable.type = VariableType.NUMBER */

  const interfaceOne = <InterfaceComponent>nodeOne?.outputInterfaces[0]
  const interfaceTwo = <InterfaceComponent>nodeTwo?.inputInterfaces[0]

  const linkRuleValidationDictList: LinkRuleValidationDict[] = []

  const linkRuleValidationDict: LinkRuleValidationDict = {
    message: 'Not same interface type',
    successfulRules: [NotSameInterfaceType.getInstance(), NotAWorkingRule.getInstance()],
    OnSuccessfulRules: () =>
      console.log('[Success] - Le interfacce sono correttamente di tipo diverso'),
    failedRules: [NotSameInterfaceType.getInstance()],
    OnFailedRules: () => console.log('[Error] - Le interfacce sono dello stesso tipo')
  }

  const linkRuleValidationDict2: LinkRuleValidationDict = {
    message: 'Same node type',
    successfulRules: [SameNodeVariableType.getInstance()],
    OnSuccessfulRules: () => console.log('[Success] - The nodes are of the same category'),
    failedRules: [SameNodeVariableType.getInstance()],
    OnFailedRules: () => console.log('[Error] - The nodes are not of the same category')
  }

  linkRuleValidationDictList.push(linkRuleValidationDict, linkRuleValidationDict2)

  validator.registerGlobalLinkRule(NotSameInterfaceType.getInstance())
  validator.registerGlobalLinkRule(NotAWorkingRule.getInstance())

  console.log(validator.getGlobalRules())
  validator.registerGroupRule(SameNodeTypeGroup.getInstance())
  validator.registerRuleIntoGroupRule(
    SameNodeTypeGroup.getInstance(),
    SameNodeVariableType.getInstance()
  )
  const linkRuleValidationProcessor = LinkRuleValidationProcessor.getInstance()
  linkRuleValidationProcessor.processValidations(
    linkRuleValidationDictList,
    interfaceOne,
    interfaceTwo
  )
})
