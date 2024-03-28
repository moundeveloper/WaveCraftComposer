import { useNodeEditor } from '@/stores/nodeEditor'
import { type LinkRuleValidationDict } from './../../ProcessValidations'
import { NotSameInterfaceInputDict } from './NotSameInterfaceInputDict'
import { VariableMutabilityConstantDict } from './VariableMutabilityConstantDict'
import { NotSameInterfaceTypeDict } from './NotSameInterfaceTypeDict'
import { NotSameInterfaceNodeDict } from './NotSameInterfaceNodeDict'
import { SameNodeVariableTypeDict } from './SameNodeVariableTypeDict'

export enum LinkRuleDictE {
  NOT_SAME_INTERFACE_INPUT = 'NOT_SAME_INTERFACE_INPUT',
  NOT_SAME_INTERFACE_TYPE = 'NOT_SAME_INTERFACE_TYPE',
  NOT_SAME_INTERFACE_NODE = 'NOT_SAME_INTERFACE_NODE',
  SAME_NODE_VARIABLE_TYPE = 'SAME_NODE_VARIABLE_TYPE',
  VARIABLE_MUTABILITY_CONSTANT = 'VARIABLE_MUTABILITY_CONSTANT'
}

export const getLinkRuleDict = (selectedLinkRuleDict: LinkRuleDictE): LinkRuleValidationDict => {
  const nodeEditorStore = useNodeEditor()
  switch (selectedLinkRuleDict) {
    case LinkRuleDictE.NOT_SAME_INTERFACE_INPUT:
      return NotSameInterfaceInputDict(nodeEditorStore)
      break
    case LinkRuleDictE.NOT_SAME_INTERFACE_TYPE:
      return NotSameInterfaceTypeDict(nodeEditorStore)
      break
    case LinkRuleDictE.NOT_SAME_INTERFACE_NODE:
      return NotSameInterfaceNodeDict(nodeEditorStore)
      break
    case LinkRuleDictE.SAME_NODE_VARIABLE_TYPE:
      return SameNodeVariableTypeDict(nodeEditorStore)
      break
    case LinkRuleDictE.VARIABLE_MUTABILITY_CONSTANT:
      return VariableMutabilityConstantDict(nodeEditorStore)
      break
  }
}