import { getElementPositionOffset } from '../utils/InterfaceElement'
import { InterfaceComponent } from './InterfaceComponent'
import { VariableNodeComponent } from './NodeComponent'
import type { Position } from './Position'

export class Link {
  id: string
  sourceInterfaceComponent: InterfaceComponent
  targetInterfaceComponent: InterfaceComponent
  dPath: string | undefined

  constructor(
    id: string,
    sourceInterfaceComponent: InterfaceComponent,
    targetInterfaceComponent: InterfaceComponent
  ) {
    this.id = id
    this.sourceInterfaceComponent = sourceInterfaceComponent
    this.targetInterfaceComponent = targetInterfaceComponent

    // Init DPath
    this.dPath = this.getDPath()
    this.isVariable()
  }

  isVariable() {
    if (
      this.targetInterfaceComponent.parentNode instanceof VariableNodeComponent &&
      this.sourceInterfaceComponent.parentNode instanceof VariableNodeComponent
    ) {
      this.targetInterfaceComponent.parentNode.passVariableToConnectedNode(
        this.sourceInterfaceComponent.parentNode
      )
    }
  }

  getInputInterface(): InterfaceComponent {
    if (
      this.sourceInterfaceComponent.parentNode?.inputInterfaces.includes(
        this.sourceInterfaceComponent
      )
    ) {
      return this.sourceInterfaceComponent
    }
    return this.targetInterfaceComponent
  }

  generateDPath(startPos: Position, endPos: Position) {
    let x1 = startPos.x
    let y1 = startPos.y
    let x2 = endPos.x
    let y2 = endPos.y

    // Control Points setup for bezier curve
    const cy1 = y1
    const cy2 = y2

    const cx1 = x2
    const cx2 = x1

    const d = `M${x1} ${y1} C${cx1} ${cy1} ${cx2} ${cy2} ${x2} ${y2}`
    this.dPath = d
    return this.dPath
  }

  getDPath() {
    const sourcePos = getElementPositionOffset(this.sourceInterfaceComponent.id)
    const targetPos = getElementPositionOffset(this.targetInterfaceComponent.id)
    if (!(sourcePos && targetPos)) return
    return this.generateDPath(sourcePos, targetPos)
  }
}

export class LinkBuilder {
  createLink(
    id: string,
    sourceInterfaceComponent: InterfaceComponent,
    targetInterfaceComponent: InterfaceComponent
  ): Link {
    const link = new Link(id, sourceInterfaceComponent, targetInterfaceComponent)
    return link
  }
}
