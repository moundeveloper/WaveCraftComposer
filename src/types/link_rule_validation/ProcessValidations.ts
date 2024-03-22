import { allValidList, isSubListContained } from '../../utils/utility'
import { InterfaceComponent } from '../../types/InterfaceComponent'
import { GroupRule, SameNodeTypeGroup } from './GroupRule'
import {
  NotSameInterfaceType,
  type LinkRule,
  SameNodeVariableType,
  NotSameInterfaceInput
} from './link_rules/LinkRule'
import { LinkRulesValidator, RuleValidationResult, type RulesValidation } from './LinkRuleValidator'

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

export class LinkRuleValidationProcessor {
  protected static instance: LinkRuleValidationProcessor | null = null
  private linkRuleValidator: LinkRulesValidator

  private constructor() {
    this.linkRuleValidator = LinkRulesValidator.getInstance()
  }

  public static getInstance<T extends LinkRuleValidationProcessor>(): T {
    if (!this.instance) {
      this.instance = new (this as any)()
    }
    return this.instance as T
  }

  processValidations(
    linkRuleValidationDictList: LinkRuleValidationDict[],
    sourceInterfaceComponent: InterfaceComponent,
    targetInterfaceComponent: InterfaceComponent
  ): boolean {
    const ruleValidations: RulesValidation = this.linkRuleValidator.validateLinkRules(
      sourceInterfaceComponent,
      targetInterfaceComponent
    )

    console.log('bruh', ruleValidations)

    this.processLinkRuleValidationDict(ruleValidations, linkRuleValidationDictList)

    console.log(ruleValidations)
    return this.processRulesValidation(ruleValidations)
  }

  private processRulesValidation(rulesValidations: RulesValidation): boolean {
    const { allValid: allValidGlobalRules } = rulesValidations.globalRules

    const filteredGroupRulesValidation = rulesValidations.groupRules.filter(
      (groupRuleValidaiton) => groupRuleValidaiton.scopeRule.validation
    )
    if (filteredGroupRulesValidation.length === 0) return allValidGlobalRules

    const allValidGroup = allValidList(
      filteredGroupRulesValidation,
      (ruleValidationResult: RuleValidationResult) => {
        return ruleValidationResult.scopeRule.validation && ruleValidationResult.allValid
      },
      (ruleValidationResult: RuleValidationResult) => {},
      (ruleValidationResult: RuleValidationResult) => {}
    )
    return allValidGlobalRules && allValidGroup
  }

  private processLinkRuleValidationDict(
    validations: RulesValidation,
    linkRuleValidationDictList: LinkRuleValidationDict[]
  ) {
    linkRuleValidationDictList.forEach((linkRuleValidationDict: LinkRuleValidationDict) => {
      // Global Rules Processing
      this.processLinkRules(validations.globalRules, linkRuleValidationDict)
      // Group Rules Processing
      validations.groupRules.forEach((groupRuleValidationResult: RuleValidationResult) => {
        if (
          groupRuleValidationResult.scopeRule.validation &&
          groupRuleValidationResult.scopeRule.rule instanceof GroupRule
        ) {
          this.processLinkRules(groupRuleValidationResult, linkRuleValidationDict)
        }
      })
    })
  }

  private processLinkRules(
    ruleValidationResult: RuleValidationResult,
    linkRuleValidationDict: LinkRuleValidationDict
  ) {
    if (
      isSubListContained(
        linkRuleValidationDict.successfulRules,
        ruleValidationResult.successfulRules
      )
    ) {
      console.log(linkRuleValidationDict)
      linkRuleValidationDict.OnSuccessfulRules(
        ruleValidationResult.sourceInterface,
        ruleValidationResult.targetInterface,
        linkRuleValidationDict.successfulRules
      )
    } else if (
      isSubListContained(linkRuleValidationDict.failedRules, ruleValidationResult.failedRules)
    ) {
      linkRuleValidationDict.OnFailedRules(
        ruleValidationResult.sourceInterface,
        ruleValidationResult.targetInterface,
        linkRuleValidationDict.failedRules
      )
    }
  }
}
