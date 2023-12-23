import { getElementPositionOffset } from '@/utils/InterfaceElement'
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

  getInputInterface(linkBuilder: LinkBuilder): InterfaceComponent {
    if (linkBuilder.isInputInterface(this.sourceInterfaceComponent)) {
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

export abstract class LinkRule {
  sourceInterfaceComponent: InterfaceComponent
  targetInterfaceComponent: InterfaceComponent

  constructor(
    sourceInterfaceComponent: InterfaceComponent,
    targetInterfaceComponent: InterfaceComponent
  ) {
    this.sourceInterfaceComponent = sourceInterfaceComponent
    this.targetInterfaceComponent = targetInterfaceComponent
  }

  abstract linkRuleValidation(): boolean
}

export class NotSameInterfaceType extends LinkRule {
  linkRuleValidation(): boolean {
    return (
      this.isInputInterface(this.sourceInterfaceComponent) ===
      this.isInputInterface(this.targetInterfaceComponent)
    )
  }

  isInputInterface(interfaceComponent: InterfaceComponent) {
    return interfaceComponent.parentNode?.inputInterfaces.includes(interfaceComponent)
  }
}

export class LinkRulesValidator {
  linkRules: Array<LinkRule>

  constructor() {
    this.linkRules = []
  }

  registerLinkRule(linkRule: LinkRule) {
    this.linkRules.push(linkRule)
    return this
  }

  validateRules(): boolean {
    return this.linkRules.every((rule) => rule.linkRuleValidation())
  }
}

export class LinkBuilder {
  createLink(
    id: string,
    sourceInterfaceComponent: InterfaceComponent,
    targetInterfaceComponent: InterfaceComponent
  ): Link | null {
    // Check if the interfaces can connect
    if (this.checkValidInterfaces(sourceInterfaceComponent, targetInterfaceComponent)) {
      console.log(
        `It is not possible to connect interfaces of the same type between: ${sourceInterfaceComponent.id}-${targetInterfaceComponent.id}!`
      )
      return null
    }

    if (sourceInterfaceComponent.parentNode === targetInterfaceComponent.parentNode) {
      console.log(
        `It is not possible to connect interfaces within the same node: ${sourceInterfaceComponent.id}-${targetInterfaceComponent.id}!`
      )
      return null
    }

    const link = new Link(id, sourceInterfaceComponent, targetInterfaceComponent)
    // Variable Node?

    return link
  }

  checkValidInterfaces(
    sourceInterfaceComponent: InterfaceComponent,
    targetInterfaceComponent: InterfaceComponent
  ) {
    return (
      this.isInputInterface(sourceInterfaceComponent) ===
      this.isInputInterface(targetInterfaceComponent)
    )
  }

  isInputInterface(interfaceComponent: InterfaceComponent) {
    return interfaceComponent.parentNode?.inputInterfaces.includes(interfaceComponent)
  }

  isInputInterfaceAlreadyConnected(link: Link, links: Link[]) {
    const inputInterface = link.getInputInterface(this)
    return links.find((link) => link.getInputInterface(this) === inputInterface)
  }
}
