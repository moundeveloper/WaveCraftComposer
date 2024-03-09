import { VariableNodeComponent } from './../NodeComponent'
import { useNodeEditor } from './../../stores/nodeEditor'
import type { InterfaceComponent } from '../InterfaceComponent'
import type { Link } from '../Link'

export abstract class LinkRule {
  abstract linkRuleValidation(
    sourceInterfaceComponent: InterfaceComponent,
    targetInterfaceComponent: InterfaceComponent
  ): boolean

  abstract message(): string
}

/**
 * Prevents a variable node from establishing a connection with interfaces of the same type.
 */
export class NotSameInterfaceType extends LinkRule {
  linkRuleValidation(
    sourceInterfaceComponent: InterfaceComponent,
    targetInterfaceComponent: InterfaceComponent
  ): boolean {
    return (
      this.isInputInterface(sourceInterfaceComponent) !==
      this.isInputInterface(targetInterfaceComponent)
    )
  }

  message(): string {
    return 'Interfaces of the same type cannot be linked together'
  }

  isInputInterface(interfaceComponent: InterfaceComponent) {
    return interfaceComponent.parentNode?.inputInterfaces.includes(interfaceComponent)
  }
}

/**
 * Prevents a variable node from establishing a connection when the variable type is different.
 */
export class SameNodeVariableType extends LinkRule {
  linkRuleValidation(
    sourceInterfaceComponent: InterfaceComponent,
    targetInterfaceComponent: InterfaceComponent
  ): boolean {
    if (
      sourceInterfaceComponent.parentNode instanceof VariableNodeComponent &&
      targetInterfaceComponent.parentNode instanceof VariableNodeComponent
    ) {
      return this.variableNodeComponentTypeCheck(
        sourceInterfaceComponent.parentNode,
        targetInterfaceComponent.parentNode
      )
    }
    return false
  }

  variableNodeComponentTypeCheck(
    sourceVariableNodeComponent: VariableNodeComponent,
    targetVariableNodeComponent: VariableNodeComponent
  ): boolean {
    console.log(
      sourceVariableNodeComponent.currentVariable.type,
      targetVariableNodeComponent.currentVariable.type
    )
    // Work in progress - this might get updated later on
    return (
      sourceVariableNodeComponent.currentVariable.type ===
      targetVariableNodeComponent.currentVariable.type
    )
  }

  message(): string {
    return 'Nodes with variables of different type cannot be linked together'
  }

  isInputInterface(interfaceComponent: InterfaceComponent) {
    return interfaceComponent.parentNode?.inputInterfaces.includes(interfaceComponent)
  }
}

/**
 * Prevents an interface from establishing a connection with an interface that belongs to the same parent node.
 */
export class NotSameInterfaceNode extends LinkRule {
  linkRuleValidation(
    sourceInterfaceComponent: InterfaceComponent,
    targetInterfaceComponent: InterfaceComponent
  ): boolean {
    return sourceInterfaceComponent.parentNode !== targetInterfaceComponent.parentNode
  }

  message(): string {
    return 'Interfaces of the same node cannot be linked together'
  }
}

/**
 * Prevents an input interface from establishing a connection with many output interfaces.
 */
export class NotSameInterfaceInput extends LinkRule {
  nodeEditorStore: any

  constructor() {
    super()
    this.nodeEditorStore = useNodeEditor()
  }

  linkRuleValidation(
    sourceInterfaceComponent: InterfaceComponent,
    targetInterfaceComponent: InterfaceComponent
  ): boolean {
    if (!this.isInputInterface(targetInterfaceComponent)) return true
    return this.interfaceHasLink(targetInterfaceComponent)
  }

  interfaceHasLink = (interfaceComponent: InterfaceComponent) => {
    return this.nodeEditorStore.links.some((link: Link) => {
      return (
        link.sourceInterfaceComponent === interfaceComponent ||
        link.targetInterfaceComponent === interfaceComponent
      )
    })
  }

  isInputInterface(interfaceComponent: InterfaceComponent) {
    return interfaceComponent.parentNode?.inputInterfaces.includes(interfaceComponent)
  }

  message(): string {
    return 'Interfaces of type input cannot be linked with multiple output interfaces'
  }
}

export interface RuleValidationResult {
  allValid: boolean
  successfulRules: LinkRule[]
  failedRules: LinkRule[]
}

/**
 * Validates link rules and prevents unwanted connection between nodes.
 */
export class LinkRulesValidator {
  linkRules: Array<LinkRule>
  constructor() {
    this.linkRules = []
  }

  registerLinkRule(linkRule: LinkRule) {
    this.linkRules.push(linkRule)
    return this
  }

  validateRules(
    sourceInterfaceComponent: InterfaceComponent,
    targetInterfaceComponent: InterfaceComponent
  ): RuleValidationResult {
    const failedRules: LinkRule[] = []
    const successfulRules: LinkRule[] = []

    const allValid = this.linkRules.every((rule) => {
      console.log(rule)
      const isValid = rule.linkRuleValidation(sourceInterfaceComponent, targetInterfaceComponent)
      if (!isValid) {
        failedRules.push(rule)
      } else {
        successfulRules.push(rule)
      }

      return isValid
    })

    return { allValid, successfulRules, failedRules }
  }
}
