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

interface RuleValidationResult {
  allValid: boolean
  successfullRules: LinkRule[]
  failedRules: LinkRule[]
}

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
    const successfullRules: LinkRule[] = []

    const allValid = this.linkRules.every((rule) => {
      const isValid = rule.linkRuleValidation(sourceInterfaceComponent, targetInterfaceComponent)
      if (!isValid) {
        failedRules.push(rule)
      } else {
        successfullRules.push(rule)
      }

      return isValid
    })

    return { allValid, successfullRules, failedRules }
  }
}
