import { NodeComponent } from '../types/NodeComponent'
import { InterfaceComponent } from '../types/InterfaceComponent'
import type { LinkRule } from '../types/LinkRules/LinkRule'
import { GroupRule } from './GroupRule'
import { ItemIsAlreadyIncluded } from './Errors'

export class RuleValidationResult {
  allValid: boolean
  successfullRules: LinkRule[]
  failedRules: LinkRule[]

  constructor(allValid: boolean, successfullRules: LinkRule[], failedRules: LinkRule[]) {
    this.allValid = allValid
    this.successfullRules = successfullRules
    this.failedRules = failedRules
  }
}

export class LinkRulesValidator {
  protected static instance: LinkRulesValidator | null = null
  private globalRules: Array<LinkRule>
  private groupRules: Array<GroupRule>

  private constructor() {
    this.globalRules = []
    this.groupRules = []
  }

  public static getInstance<T extends LinkRulesValidator>(): T {
    if (!this.instance) {
      this.instance = new (this as any)()
    }
    return this.instance as T
  }

  registerGlobalLinkRule(linkRule: LinkRule) {
    if (this.globalRuleIsAlreadyIncluded(linkRule)) {
      throw new ItemIsAlreadyIncluded('Global link rule is already included')
    }
    this.globalRules.push(linkRule)
    return this
  }

  registerGroupRule(groupRule: GroupRule) {
    if (this.groupRuleIsAlreadyIncluded(groupRule)) {
      throw new ItemIsAlreadyIncluded('Group link rule is already included')
    }
    this.groupRules.push(groupRule)
    return this
  }

  groupRuleIsAlreadyIncluded(groupRuleToCheck: GroupRule) {
    return this.groupRules.some(
      (groupRule: GroupRule) => groupRule.constructor.name === groupRuleToCheck.constructor.name
    )
  }

  globalRuleIsAlreadyIncluded(ruleToCheck: LinkRule) {
    return this.globalRules.some(
      (globalRule: LinkRule) => globalRule.constructor.name === ruleToCheck.constructor.name
    )
  }

  registerRuleIntoGroupRule(groupRuleToInsertTo: GroupRule, linkRule: LinkRule) {
    const groupRule = this.groupRules.find(
      (groupRule: GroupRule) => groupRule.constructor.name === groupRuleToInsertTo.constructor.name
    )
    if (!groupRule) return
    groupRule.registerLinkRule(linkRule)
  }

  validateGlobalRules(
    sourceInterfaceComponent: InterfaceComponent,
    targetInterfaceComponent: InterfaceComponent
  ): RuleValidationResult[] {
    const failedRules: LinkRule[] = []
    const successfullRules: LinkRule[] = []

    const allValid = this.globalRules.every((rule) => {
      const isValid = rule.linkRuleValidation(sourceInterfaceComponent, targetInterfaceComponent)
      if (!isValid) {
        failedRules.push(rule)
      } else {
        successfullRules.push(rule)
      }

      return isValid
    })

    const globalRules = new RuleValidationResult(allValid, successfullRules, failedRules)

    const validatedGroupRules: RuleValidationResult[] = this.processGroupRules(
      sourceInterfaceComponent,
      targetInterfaceComponent
    )

    return [globalRules, ...validatedGroupRules]
  }

  private processGroupRules(
    sourceInterfaceComponent: InterfaceComponent,
    targetInterfaceComponent: InterfaceComponent
  ): RuleValidationResult[] {
    return this.groupRules.map((groupRule: GroupRule) =>
      groupRule.validateGroupRules(sourceInterfaceComponent, targetInterfaceComponent)
    )
  }
}
