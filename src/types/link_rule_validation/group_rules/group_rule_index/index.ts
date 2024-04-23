import type { InterfaceComponent } from '../../../../types/InterfaceComponent'
import { LinkRule } from '../../link_rules/LinkRule'
import { InvalidInsertionError, ItemIsAlreadyIncluded } from '../../Errors'
import { RuleValidationResult } from '../../LinkRuleValidator'
import { allValidList } from '../../../../utils/utility'

export abstract class GroupRule extends LinkRule {
  private rules: Array<LinkRule>

  protected constructor() {
    super()
    this.rules = []
  }

  public emptyRules() {
    this.rules = []
  }

  public isEmpty(): boolean {
    return this.rules.length === 0
  }

  public unregisterLinkRule(linkRuleToRemove: LinkRule) {
    this.rules = this.rules.filter(
      (linkRule: LinkRule) => linkRule.getName() !== linkRuleToRemove.getName()
    )
  }

  public registerLinkRule(linkRule: LinkRule) {
    if (linkRule instanceof GroupRule) {
      throw new InvalidInsertionError('Cannot insert a group rule')
    }

    if (this.linkRuleIsAlreadyIncluded(linkRule)) {
      throw new ItemIsAlreadyIncluded('Link rule is already included')
    }
    this.rules.push(linkRule)
    return this
  }

  public linkRuleIsAlreadyIncluded(ruleToCheck: LinkRule) {
    return this.rules.some((linkRule: LinkRule) => linkRule.getName() === ruleToCheck.getName())
  }

  public validateGroupRules(
    sourceInterfaceComponent: InterfaceComponent,
    targetInterfaceComponent: InterfaceComponent
  ): RuleValidationResult {
    const validation = this.linkRuleValidation(sourceInterfaceComponent, targetInterfaceComponent)
    if (!validation) {
      return new RuleValidationResult(
        sourceInterfaceComponent,
        targetInterfaceComponent
      ).setScopeRule(this, validation)
    }

    const failedRules: LinkRule[] = []
    const successfulRules: LinkRule[] = []

    const allValid = allValidList(
      this.rules,
      (rule: LinkRule) =>
        rule.linkRuleValidation(sourceInterfaceComponent, targetInterfaceComponent),
      (rule: LinkRule) => {
        successfulRules.push(rule)
      },
      (rule: LinkRule) => {
        failedRules.push(rule)
      }
    )

    return new RuleValidationResult(
      sourceInterfaceComponent,
      targetInterfaceComponent,
      allValid,
      successfulRules,
      failedRules
    ).setScopeRule(this, validation)
  }
}
