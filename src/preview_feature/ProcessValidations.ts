import { isSubListContained } from '../utils/utility'
import { InterfaceComponent } from '../types/InterfaceComponent'
import { GroupRule, SameNodeTypeGroup } from './GroupRule'
import { NotSameInterfaceType, type LinkRule, SameNodeVariableType } from './LinkRule'
import { LinkRulesValidator, RuleValidationResult, type RulesValidation } from './LinkRuleValidator'

export interface LinkRuleValidationDict {
  message: string
  successfulRules: LinkRule[]
  OnSuccessfulRules: Function
  failedRules: LinkRule[]
  OnFailedRules: Function
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
  ) {
    const validations: RulesValidation = this.linkRuleValidator.validateGlobalRules(
      sourceInterfaceComponent,
      targetInterfaceComponent
    )

    console.log(validations)
    console.log(validations.groupRules)
    console.log(linkRuleValidationDictList)

    this.processLinkRuleValidationDict(validations, linkRuleValidationDictList)
  }

  processLinkRuleValidationDict(
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
      linkRuleValidationDict.OnSuccessfulRules()
    } else if (
      isSubListContained(linkRuleValidationDict.failedRules, ruleValidationResult.failedRules)
    ) {
      linkRuleValidationDict.OnFailedRules()
    }
  }
}
