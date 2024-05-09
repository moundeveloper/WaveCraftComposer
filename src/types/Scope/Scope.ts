import type { NodeComponent } from '../node_component/NodeComponentIndex/NodeComponentIndex'
import { genId } from '../../utils/utility'

export enum ScopeType {
  GLOBAL = 'global',
  LOCAL = 'local'
}

export class Scope {
  id: string
  type: ScopeType
  parentScope?: Scope
  childrenScopes: Scope[]
  nodes: NodeComponent[]

  constructor(type: ScopeType) {
    this.id = genId()
    this.type = type
    this.nodes = []
    this.childrenScopes = []
  }

  setParentScope(scope: Scope) {
    if(this.type === ScopeType.GLOBAL) {
      throw new Error('Global scope cannot have a parent scope')
    }
    this.parentScope = scope
  }

  addChildScope(scope: Scope) {
    this.childrenScopes.push(scope)
  }

  insertNode(node: NodeComponent) {
    this.nodes.push(node)
  }
}

export class ScopeManager {
  private static globalScope: Scope | null = null // Singleton global scope

  static getGlobalScope(): Scope {
    if (!ScopeManager.globalScope) {
      ScopeManager.globalScope = new Scope(ScopeType.GLOBAL)
    }
    return ScopeManager.globalScope
  }

  static createLocalScope(): Scope {
    return new Scope(ScopeType.LOCAL)
  }
}
