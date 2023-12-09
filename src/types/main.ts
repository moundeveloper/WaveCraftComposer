import { NodeComponent, VariableNodeComponent } from './NodeComponent'
import { InterfaceComponent } from './InterfaceComponent'
import { Link, LinkBuilder } from './Link'
import { NodeEditor } from './NodeEditor'

const nodeComponent = new NodeComponent('N1', 'variable')
const nodeComponent2 = new NodeComponent('N2', 'variable')
const variableNodeComponent = new VariableNodeComponent('N3', 'variable')
const variableNodeComponent2 = new VariableNodeComponent('N4', 'variable')
const variableNodeComponent3 = new VariableNodeComponent('N5', 'variable')

const interfaceComponent = new InterfaceComponent('I1', {
  name: 'dropdown',
  label: 'types'
})
const interfaceComponent2 = new InterfaceComponent('I2', {
  name: 'dropdown',
  label: 'types'
})
const interfaceComponent3 = new InterfaceComponent('I3', {
  name: 'dropdown',
  label: 'types'
})
const interfaceComponent4 = new InterfaceComponent('I4', {
  name: 'dropdown',
  label: 'types'
})

variableNodeComponent.addInputInterfaceComponent(interfaceComponent2)
variableNodeComponent2.addOutputInterfaceComponent(interfaceComponent3)
variableNodeComponent3.addOutputInterfaceComponent(interfaceComponent)
variableNodeComponent3.addInputInterfaceComponent(interfaceComponent4)

const linkBuilder = new LinkBuilder()

const nodeEditor = new NodeEditor()

const link = nodeEditor.linkBuilder.createLink('L1', interfaceComponent3, interfaceComponent2)

const link2 = nodeEditor.linkBuilder.createLink('L2', interfaceComponent, interfaceComponent2)
const link3 = nodeEditor.linkBuilder.createLink('L3', interfaceComponent4, interfaceComponent3)

/* if (link) {
  nodeEditor.addLink(link);
} */

console.log(nodeEditor.links)

/* if (link2) {
  nodeEditor.addLink(link2);
} */

/* if (link3) {
  nodeEditor.addLink(link3);
} */

console.log(variableNodeComponent.inputInterfaces[0].options)
