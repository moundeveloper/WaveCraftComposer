import type { InterfaceComponent } from '../../../InterfaceComponent'

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
