import { LinkRuleDictBuilder } from './LinkRuleDictBuilder'
import { genId, removeElementFromList } from '../../../utils/utility'
import {
  LinkRule,
  NotSameInterfaceInput,
  NotSameInterfaceNode,
  NotSameInterfaceType,
  SameNodeVariableType
} from '../link_rules/LinkRule'
import type { LinkRuleValidationDict } from '../ProcessValidations'
import type { InterfaceComponent } from '../../InterfaceComponent'
import { LinkBuilder, type Link } from '../../Link'
import { Status, useTerminal } from '../../../stores/terminal'
import { VariableMutabilityConstant } from '../link_rules/Rules/VariableMutabilityLinkRule'

export class LinkRuleValidationDictManager {
  protected static instance: LinkRuleValidationDictManager | null = null
  private linkRuleValidationDicts: LinkRuleValidationDict[]

  protected constructor() {
    this.linkRuleValidationDicts = []
  }

  push(linkRuleValidationDict: LinkRuleValidationDict) {
    this.linkRuleValidationDicts.push(linkRuleValidationDict)
  }

  get(): LinkRuleValidationDict[] {
    return this.linkRuleValidationDicts
  }

  public static getInstance<T extends LinkRuleValidationDictManager>(): T {
    if (!this.instance) {
      this.instance = new (this as any)()
    }
    return this.instance as T
  }
}
