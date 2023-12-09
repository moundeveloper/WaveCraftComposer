import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { Position } from '@/types/Position'
import { NodeComponent } from '@/types/NodeComponent'
import { Link } from '@/types/Link'
import type { InterfaceComponent } from '@/types/InterfaceComponent'

export const useNodeEditor = defineStore('node-editor', () => {
  const canZoom = ref(true)
  const canPan = ref(true)
  const scale = ref(1)
  const nodes = ref<Array<NodeComponent>>([])
  const links = ref<Array<Link>>([])
  const panningPos = ref(new Position())

  // Actions
  const updateScale = (newScale: number) => {
    scale.value = newScale
  }

  const updatePanningPos = (pos: Position) => {
    panningPos.value = pos
  }

  const addNode = (node: NodeComponent) => {
    nodes.value.push(node)
  }
  const addLink = (link: Link) => {
    links.value.push(link)
  }

  const getInterfaceById = (interfaceIdToFind: string): InterfaceComponent | undefined => {
    for (const node of nodes.value) {
      // Search in inputInterfaces
      const inputInterface = node.inputInterfaces.find(
        (inputInterface) => inputInterface.id === interfaceIdToFind
      )
      if (inputInterface) {
        return inputInterface
      }

      // Search in outputInterfaces
      const outputInterface = node.outputInterfaces.find(
        (outputInterface) => outputInterface.id === interfaceIdToFind
      )
      if (outputInterface) {
        return outputInterface
      }
    }

    // If the interface is not found, return undefined
    return
  }

  const removeLinkByInterface = (interfaceComponent: InterfaceComponent) => {
    links.value = links.value.filter((link) => link.targetInterfaceComponent !== interfaceComponent)
    links.value = links.value.filter((link) => link.sourceInterfaceComponent !== interfaceComponent)
    return
  }

  const getLinkInterfaceTarget = (interfaceComponent: InterfaceComponent) => {
    return links.value.find((link) => link.targetInterfaceComponent === interfaceComponent)
  }

  return {
    canPan,
    canZoom,
    scale,
    panningPos,
    links,
    nodes,
    updateScale,
    updatePanningPos,
    addNode,
    addLink,
    getInterfaceById,
    getLinkInterfaceTarget,
    removeLinkByInterface
  }
})
