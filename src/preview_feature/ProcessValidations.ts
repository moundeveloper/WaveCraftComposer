import { InterfaceComponent } from '../types/InterfaceComponent'
import { SameNodeTypeGroup } from './GroupRule'
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
    sourceInterfaceComponent: InterfaceComponent,
    targetInterfaceComponent: InterfaceComponent
  ) {
    const validations: RulesValidation = this.linkRuleValidator.validateGlobalRules(
      sourceInterfaceComponent,
      targetInterfaceComponent
    )

    const linkRuleValidationDict: LinkRuleValidationDict = {
      message: 'Not same interface type and node same node type',
      successfulRules: [NotSameInterfaceType.getInstance(), SameNodeVariableType.getInstance()],
      OnSuccessfulRules: () => console.log('it works'),
      failedRules: [SameNodeVariableType.getInstance()],
      OnFailedRules: () => console.log('not working')
    }
    console.log(validations)
    console.log(linkRuleValidationDict)
    this.processGlobalRules(validations, linkRuleValidationDict)
    // TO-DO
  }

  private processGlobalRules(
    validations: RulesValidation,
    linkRuleValidationDict: LinkRuleValidationDict
  ) {
    if (!validations.globalRules.allValid) {
      const isWithin = validations.globalRules.failedRules.every(
        (failedRule: LinkRule) => linkRuleValidationDict.failedRules?.includes(failedRule)
      )

      console.log(isWithin)
      if (isWithin) {
        linkRuleValidationDict.OnFailedRules()
      }
    } else {
      const isWithin = validations.globalRules.successfulRules.every(
        (successfulRule: LinkRule) =>
          linkRuleValidationDict.successfulRules?.includes(successfulRule)
      )
      console.log(isWithin)
      if (isWithin) {
        linkRuleValidationDict.OnSuccessfulRules()
      }
    }
  }

  processLinkRuleValidationDict(
    validations: RulesValidation,
    linkRuleValidationDict: LinkRuleValidationDict[]
  ) {}

  private processGroupRules() {}
}
