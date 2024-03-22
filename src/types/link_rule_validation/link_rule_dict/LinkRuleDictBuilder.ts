import type { InterfaceComponent } from '../../InterfaceComponent'
import type { LinkRule } from '../link_rules/LinkRule'

type OnActionRule = (
  sourceInterface: InterfaceComponent,
  targetInterface: InterfaceComponent,
  rules: LinkRule[]
) => void

export interface LinkRuleValidationDict {
  message: string
  successfulRules: LinkRule[]
  OnSuccessfulRules: OnActionRule
  failedRules: LinkRule[]
  OnFailedRules: OnActionRule
}

export class LinkRuleDictBuilder {
  protected static instance: LinkRuleDictBuilder | null = null
  private message: string
  private successfulRules: LinkRule[]
  private OnSuccessfulRules: OnActionRule
  private failedRules: LinkRule[]
  private OnFailedRules: OnActionRule

  private constructor() {
    this.message = ''
    this.successfulRules = []
    this.failedRules = []
    this.OnSuccessfulRules = () => {}
    this.OnFailedRules = () => {}
  }

  public static getInstance<T extends LinkRuleDictBuilder>(): T {
    if (!this.instance) {
      this.instance = new (this as any)()
    }
    return this.instance as T
  }

  setMessage(message: string) {
    this.message = message
  }

  addSuccessfulLinkRule(linkRule: LinkRule) {
    this.successfulRules.push(linkRule)
    return this
  }

  addFailedLinkRule(linkRule: LinkRule) {
    this.failedRules.push(linkRule)
    return this
  }

  setOnSuccessfulRules(callback: OnActionRule) {
    this.OnSuccessfulRules = callback
    return this
  }

  setOnFailedRules(callback: OnActionRule) {
    this.OnFailedRules = callback
    return this
  }

  reset() {
    this.message = ''
    this.successfulRules = []
    this.failedRules = []
    this.OnSuccessfulRules = () => {}
    this.OnFailedRules = () => {}
  }

  build(): LinkRuleValidationDict {
    const linkRuleValidationDict = {
      message: this.message,
      successfulRules: this.successfulRules,
      OnSuccessfulRules: this.OnSuccessfulRules,
      failedRules: this.failedRules,
      OnFailedRules: this.OnFailedRules
    }
    this.reset()
    return linkRuleValidationDict
  }
}
