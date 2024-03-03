import { SameNodeTypeGroup } from '../../src/preview_feature/GroupRule'
import { NodeType } from '../../src/types/NodeComponent'
import { NodeComponentFactory } from '../../src/types/factory/NodeComponentFactory'
import { LinkRulesValidator } from './../../src/preview_feature/LinkRuleValidator'
import { expect, test } from 'vitest'

test('Preview - LinkRuleValidator', () => {
  const validator = LinkRulesValidator.getInstance()
  const nodeOne = NodeComponentFactory.createNode(NodeType.VARIABLE)
  const nodeTwo = NodeComponentFactory.createNode(NodeType.VARIABLE)

  console.log(validator)
})
