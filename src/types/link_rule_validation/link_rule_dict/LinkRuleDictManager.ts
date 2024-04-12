import type { LinkRuleValidationDict } from '../ProcessValidations'

export class LinkRuleValidationDictManager {
  protected static instance: LinkRuleValidationDictManager | null = null
  private linkRuleValidationDicts: LinkRuleValidationDict[]

  protected constructor() {
    this.linkRuleValidationDicts = []
  }

  push(linkRuleValidationDict: LinkRuleValidationDict) {
    this.linkRuleValidationDicts.push(linkRuleValidationDict)
  }

  get(): LinkRuleValidationDict[] {
    return this.linkRuleValidationDicts
  }

  public static getInstance<T extends LinkRuleValidationDictManager>(): T {
    if (!this.instance) {
      this.instance = new (this as any)()
    }
    return this.instance as T
  }
}
