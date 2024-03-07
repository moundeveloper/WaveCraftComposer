import type { InterfaceComponent } from '../types/InterfaceComponent'
import { VariableNodeComponent } from '../types/NodeComponent'

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

export class NotAWorkingRule extends LinkRule {
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
