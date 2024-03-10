import { VariableNodeComponent } from './../NodeComponent'
import { useNodeEditor } from './../../stores/nodeEditor'
import type { InterfaceComponent } from '../InterfaceComponent'
import type { Link } from '../Link'

export abstract class LinkRule {
  protected static instance: LinkRule | null = null

  abstract linkRuleValidation(
    sourceInterfaceComponent: InterfaceComponent,
    targetInterfaceComponent: InterfaceComponent
  ): boolean

  abstract message(): string

  public static getInstance<T extends LinkRule>(): T {
    if (!this.instance) {
      this.instance = new (this as any)()
    }
    return this.instance as T
  }
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
    // Work in progress - this might be changed later on
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
    // Target interface has a link and it is an input -> false
    // Source interface has a link and it is an input -> false
    // Source or target aren't input interfaces and don't have a link -> true
    if (this.isInputInterface(sourceInterfaceComponent)) {
      return !this.interfaceHasLink(sourceInterfaceComponent)
    }

    if (this.isInputInterface(targetInterfaceComponent)) {
      return !this.interfaceHasLink(targetInterfaceComponent)
    }

    return true
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

export class NotAWorkingRule extends LinkRule {
  linkRuleValidation(
    sourceInterfaceComponent: InterfaceComponent,
    targetInterfaceComponent: InterfaceComponent
  ): boolean {
    return false
  }

  message(): string {
    return 'This rule is just  a dummy'
  }
}
