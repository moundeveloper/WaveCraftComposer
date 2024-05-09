import type { InterfaceComponent } from '../../InterfaceComponent'
import { Position } from '../../Position'
import  { Scope } from "../../Scope/Scope";

export abstract class NodeComponent {
  scope?: Scope
  id: string
  name: string
  NodeType: string
  position: Position = new Position(0, 0)
  zIndex?: number
  inputInterfaces: InterfaceComponent[] = []
  outputInterfaces: InterfaceComponent[] = []
  optionInterfaces: InterfaceComponent[] = []

  protected constructor(id: string, name: string, NodeType: string) {
    this.id = id
    this.name = name
    this.NodeType = NodeType
  }

  protected abstract initInterfaces(): void

  addInputInterfaceComponent(interfaceComponent: InterfaceComponent): void {
    interfaceComponent.parentNode = this
    this.inputInterfaces.push(interfaceComponent)
  }
  addOutputInterfaceComponent(interfaceComponent: InterfaceComponent): void {
    interfaceComponent.parentNode = this
    this.outputInterfaces.push(interfaceComponent)
  }
  addOptionInterfaceComponent(interfaceComponent: InterfaceComponent): void {
    interfaceComponent.parentNode = this
    this.optionInterfaces.push(interfaceComponent)
  }

  setScope(scope: Scope): void {
    this.scope = scope
    this.scope.insertNode(this)
  }
}
