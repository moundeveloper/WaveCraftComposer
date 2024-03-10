import { isSubListContained } from '../../utils/utility'
import { InterfaceComponent } from '../../types/InterfaceComponent'
import { GroupRule, SameNodeTypeGroup } from './GroupRule'
import {
  NotSameInterfaceType,
  type LinkRule,
  SameNodeVariableType,
  NotSameInterfaceInput
} from './LinkRule'
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

  private processLinkRuleValidationDict(
    validations: RulesValidation,
    linkRuleValidationDictList: LinkRuleValidationDict[]
  ) {
    linkRuleValidationDictList.forEach((linkRuleValidationDict: LinkRuleValidationDict) => {
      // Global Rules Processing
      this.processLinkRules(validations.globalRules, linkRuleValidationDict)
      console.log('global rule')
      // Group Rules Processing
      validations.groupRules.forEach((groupRuleValidationResult: RuleValidationResult) => {
        if (
          groupRuleValidationResult.scopeRule.validation &&
          groupRuleValidationResult.scopeRule.rule instanceof GroupRule
        ) {
          console.log('group rule')
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
      console.log('mi chiamo success')
      linkRuleValidationDict.OnSuccessfulRules(
        ruleValidationResult.sourceInterface,
        ruleValidationResult.targetInterface,
        ruleValidationResult.successfulRules
      )
    } else if (
      isSubListContained(linkRuleValidationDict.failedRules, ruleValidationResult.failedRules)
    ) {
      console.log('mi chiamo failed')
      linkRuleValidationDict.OnFailedRules(
        ruleValidationResult.sourceInterface,
        ruleValidationResult.targetInterface,
        ruleValidationResult.failedRules
      )
    }
  }
}
