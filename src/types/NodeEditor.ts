import { NodeComponent } from "./NodeComponent";
import { InterfaceComponent } from "./InterfaceComponent";
import { Link, LinkBuilder } from "./Link";

export class NodeEditor {
  nodes: NodeComponent[];
  links: Link[];
  linkBuilder: LinkBuilder;

  constructor() {
    this.nodes = [];
    this.links = [];
    this.linkBuilder = new LinkBuilder();
  }

  addNode(node: NodeComponent) {
    this.nodes.push(node);
  }

  addLink(link: Link): void {
    const linkToRemove = this.linkBuilder.isInputInterfaceAlreadyConnected(
      link,
      this.links
    );
    if (linkToRemove) {
      this.removeLink(linkToRemove);
      console.log(
        `The following link ${linkToRemove.id} has been replaced by: ${link.id}!`
      );
    }
    this.links.push(link);
  }

  removeLink(linkToRemove: Link) {
    this.links = this.links.filter((link) => link !== linkToRemove);
  }

  removeNode(NodeToRemove: NodeComponent) {
    this.nodes = this.nodes.filter((node) => node !== NodeToRemove);
  }
}
