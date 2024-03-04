import { NodeComponent } from '../types/NodeComponent'
import { InterfaceComponent } from '../types/InterfaceComponent'
import type { LinkRule } from '../types/LinkRules/LinkRule'
import { GroupRule } from './GroupRule'
import { ItemIsAlreadyIncluded } from './Errors'

/**
 * Validates link rules and prevents unwanted connection between nodes.
 * @class RuleValidationResult
 */
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

  /**
   * Get the instance of the LinkRulesValidator
   * @static
   * @template T
   * @return {*}  {T}
   * @memberof LinkRulesValidator
   */
  public static getInstance<T extends LinkRulesValidator>(): T {
    if (!this.instance) {
      this.instance = new (this as any)()
    }
    return this.instance as T
  }

/**
 * Insert a LinkRule inside the global rules list
 * @param {LinkRule} linkRule
 * @return {*} 
 * @memberof LinkRulesValidator
 */
registerGlobalLinkRule(linkRule: LinkRule): any {
    if (this.globalRuleIsAlreadyIncluded(linkRule)) {
      throw new ItemIsAlreadyIncluded('Global link rule is already included')
    }
    this.globalRules.push(linkRule)
    return this
  }
  
/**
 * Insert a LinkRule inside the group rules list
 * @param {GroupRule} groupRule
 * @return {*} 
 * @memberof LinkRulesValidator
 */
registerGroupRule(groupRule: GroupRule): any {
    if (this.groupRuleIsAlreadyIncluded(groupRule)) {
      throw new ItemIsAlreadyIncluded('Group link rule is already included')
    }
    this.groupRules.push(groupRule)
    return this
  }

/**
 * Check if a LinkRule is already included in the group rules list
 * @param {GroupRule} groupRuleToCheck
 * @return {*}  {boolean}
 * @memberof LinkRulesValidator
 */
groupRuleIsAlreadyIncluded(groupRuleToCheck: GroupRule):boolean {
    return this.groupRules.some(
      (groupRule: GroupRule) => groupRule.constructor.name === groupRuleToCheck.constructor.name
    )
  }

/**
 * Check if a LinkRule is already included in the global rules list
 * @param {LinkRule} ruleToCheck
 * @return {*}  {boolean}
 * @memberof LinkRulesValidator
 */
globalRuleIsAlreadyIncluded(ruleToCheck: LinkRule): boolean {
    return this.globalRules.some(
      (globalRule: LinkRule) => globalRule.constructor.name === ruleToCheck.constructor.name
    )
  }
  
/**
 * Insert a LinkRule inside a GroupRule
 * @param {GroupRule} groupRuleToInsertTo
 * @param {LinkRule} linkRule
 * @memberof LinkRulesValidator
 */
registerRuleIntoGroupRule(groupRuleToInsertTo: GroupRule, linkRule: LinkRule) {
    const groupRule = this.groupRules.find(
      (groupRule: GroupRule) => groupRule.constructor.name === groupRuleToInsertTo.constructor.name
    )
    if (!groupRule) return
    groupRule.registerLinkRule(linkRule)
  }

  public resetAll() {
    this.emptyGlobalRules()
    this.emptyAllGroupRulesRules()
    this.emptyGroupRules()
  }

  public emptyGlobalRules(): boolean {
    this.globalRules = []
    return true
  }

  public emptyGroupRules(): boolean {
    this.groupRules = []
    return true
  }

  public emptyAllGroupRulesRules(): boolean {
    if(this.groupRules.length === 0) {
      return false
    }

    this.groupRules.forEach((groupRule: GroupRule)=>{
      groupRule.emptyRules()
    })

    return true
  }

  public emptyGroupRuleRules(groupRuleToEmpty: GroupRule): boolean {
    const groupRule = this.groupRules.find((groupRule: GroupRule) => groupRule.constructor.name === groupRuleToEmpty.constructor.name)
    if(!groupRule) {
      return false
    }
    groupRule.emptyRules()
    return true
  }

  public isGlobalRulesEmpty(): boolean {
    return this.globalRules.length === 0
  }
  public isGroupRulesEmpty(): boolean {
    return this.groupRules.length === 0
  }

/**
 * Validate each global rule and group rule and each rule inside a group rule
 * @param {InterfaceComponent} sourceInterfaceComponent
 * @param {InterfaceComponent} targetInterfaceComponent
 * @return {*}  {RuleValidationResult[]}
 * @memberof LinkRulesValidator
 */
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
