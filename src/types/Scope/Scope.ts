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
    if(scope.type === ScopeType.GLOBAL) {
      throw new Error('Global scope cannot be a child of another scope')
    }
    this.childrenScopes.push(scope)
  }

  insertNode(node: NodeComponent) {
    this.nodes.push(node)
  }
}

export class ScopeManager {
  private static globalScopes: Scope[] = []

  static getGlobalScope(globalScopeId: string | null = null): Scope {
    if (this.globalScopes.length === 0 || globalScopeId === null) {
      const globalScope = new Scope(ScopeType.GLOBAL)
      this.globalScopes.push(globalScope) 
      return globalScope
    }
    const globalScope = <Scope> this.globalScopes?.find((globalScope) => globalScope.id === globalScopeId)
    return globalScope
  }

  static createLocalScope(globalScopeId: string): Scope {
    const localScope = new Scope(ScopeType.LOCAL)
    const globalScope = this.getGlobalScope(globalScopeId)
    localScope.setParentScope(globalScope)
    globalScope.addChildScope(localScope)
    return localScope
  }
}


