import type {NodeComponent} from "@/types/node_component/NodeComponentIndex";

export enum ScopeType {
    GLOBAL = 'global',
    LOCAL = 'local'
}

export class Scope {
    type: ScopeType
    nodes: NodeComponent[]

    constructor(type: ScopeType) {
        this.type = type
        this.nodes = []
    }
}