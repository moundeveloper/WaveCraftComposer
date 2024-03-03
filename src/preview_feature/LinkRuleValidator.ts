import { NodeComponent } from '../types/NodeComponent'
import { InterfaceComponent } from '../types/InterfaceComponent'
import type { LinkRule, RuleValidationResult } from '../types/LinkRules/LinkRule'
import { GroupRule } from './GroupRule'
import { ItemIsAlreadyIncluded } from './Errors'

interface ValidationResult {
  globalRuleValidation: RuleValidationResult
  groupRules: GroupRuleValidationResult[]
}


interface GroupRuleValidationResult {
  groupRuleValidations: RuleValidationResult[]
}

export class LinkRulesValidator {
  globalRules: Array<LinkRule>
  groupRules: Array<GroupRule>

  constructor() {
    this.globalRules = []
    this.groupRules = []
  }
 
  registerGlobalLinkRule(linkRule: LinkRule) {
    if(this.globalRuleIsAlreadyIncluded(linkRule)) {
      throw new ItemIsAlreadyIncluded('Global link rule is already included');
    }
    this.globalRules.push(linkRule)
    return this
  }

  registerGroupRule(groupRule: GroupRule) {
    if(this.groupRuleIsAlreadyIncluded(groupRule)) {
      throw new ItemIsAlreadyIncluded('Group link rule is already included');
    }
    this.groupRules.push(groupRule)
    return this
  }

  groupRuleIsAlreadyIncluded(groupRuleToCheck: GroupRule) {
    return this.groupRules.some((groupRule: GroupRule) => groupRule.constructor.name === groupRuleToCheck.constructor.name);
  }

  globalRuleIsAlreadyIncluded(ruleToCheck: LinkRule) {
    return this.globalRules.some((globalRule: LinkRule) => globalRule.constructor.name === ruleToCheck.constructor.name);
  }

  
  registerRuleIntoGroupRule(groupRuleName: string,linkRule: LinkRule) {
    const groupRule = this.groupRules.find((groupRule: GroupRule) => groupRule.constructor.name === groupRuleName)
    if(!groupRule) return
    groupRule.registerLinkRule(linkRule)
  }

  validateGlobalRules(
    sourceInterfaceComponent: InterfaceComponent,
    targetInterfaceComponent: InterfaceComponent
  ): RuleValidationResult {
    const failedRules: LinkRule[] = []
    const successfullRules: LinkRule[] = []

    const allValid = this.globalRules.every((rule) => {
      console.log(rule)
      const isValid = rule.linkRuleValidation(sourceInterfaceComponent, targetInterfaceComponent)
      if (!isValid) {
        failedRules.push(rule)
      } else {
        successfullRules.push(rule)
      }

      return isValid
    })

    this.groupRules.some((groupRule: GroupRule) => {
      groupRule.validateGroupRules(sourceInterfaceComponent, targetInterfaceComponent)
    })

    return { allValid, successfullRules, failedRules }
  }
}
