import { NodeType, type NodeComponent, type VariableNodeComponent } from '../../types/NodeComponent'
import type { InterfaceComponent } from '../../types/InterfaceComponent'
import { LinkRule } from './LinkRule'
import { InvalidInsertionError, ItemIsAlreadyIncluded } from './Errors'
import { RuleValidationResult } from './LinkRuleValidator'
import { allValidList } from '../../utils/utility'

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
      (linkRule: LinkRule) => linkRule.constructor.name !== linkRuleToRemove.constructor.name
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
    return this.rules.some(
      (linkRule: LinkRule) => linkRule.constructor.name === ruleToCheck.constructor.name
    )
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

export class SameNodeTypeGroup extends GroupRule {
  private constructor() {
    super()
  }

  linkRuleValidation(
    sourceInterfaceComponent: InterfaceComponent,
    targetInterfaceComponent: InterfaceComponent
  ): boolean {
    return (
      sourceInterfaceComponent.parentNode?.NodeType ===
      targetInterfaceComponent.parentNode?.NodeType
    )
  }
  message(): string {
    return 'Only nodes of the same type can connect'
  }
}

export class IsVariableNodeGroupRule extends GroupRule {
  private constructor() {
    super()
  }

  linkRuleValidation(
    sourceInterfaceComponent: InterfaceComponent,
    targetInterfaceComponent: InterfaceComponent
  ): boolean {
    return (
      sourceInterfaceComponent.parentNode?.NodeType === NodeType.VARIABLE &&
      targetInterfaceComponent.parentNode?.NodeType === NodeType.VARIABLE
    )
  }
  message(): string {
    return `The two nodes are not both of type ${NodeType.VARIABLE}`
  }
}
