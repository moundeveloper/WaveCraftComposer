import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { Position } from '../types/Position'
import { NodeComponent } from '../types/node_component/NodeComponent'
import { Link } from '../types/Link'
import { InterfaceTypeE, type InterfaceComponent } from '../types/InterfaceComponent'
import { ScopeManager } from '@/types/Scope/Scope'

export const useNodeEditor = defineStore('node-editor', () => {
  const canZoom = ref(true)
  const canPan = ref(true)
  const scale = ref(1)
  const nodes = ref<Array<NodeComponent>>([])
  const links = ref<Array<Link>>([])
  const panningPos = ref(new Position())
  const zIndexMax = ref(1)
  const currentGlobalScope = ref(ScopeManager.getGlobalScope())

  // Actions
  const updateScale = (newScale: number) => {
    scale.value = newScale
  }

  const updatePanningPos = (pos: Position) => {
    panningPos.value = pos
  }

  const setGlobalScope = (globalScopeId: string) => {
    currentGlobalScope.value = ScopeManager.getGlobalScope(globalScopeId)
  }

  const addNode = (node: NodeComponent) => {
    node.zIndex = zIndexMax.value
    nodes.value.push(node)
    zIndexMax.value++
  }

  const clear = () => {
    nodes.value = []
    links.value = []
  }

  const addLink = (link: Link) => {
    links.value.push(link)
  }

  const getInterfaceByLabelFromNode = (
    node: NodeComponent,
    interfaceType: InterfaceTypeE,
    label: string
  ): InterfaceComponent | undefined => {
    switch (interfaceType) {
      case InterfaceTypeE.INPUT:
        // Search in inputInterfaces
        const inputInterface = node.inputInterfaces.find(
          (inputInterface) => inputInterface.options.label === label
        )
        if (inputInterface) {
          return inputInterface
        }
        break
      case InterfaceTypeE.OPTION:
        // Search in outputInterfaces
        const optionInterface = node.optionInterfaces.find(
          (optionInterface) => optionInterface.options.label === label
        )
        if (optionInterface) {
          return optionInterface
        }
        break
      case InterfaceTypeE.OUTPUT:
        // Search in outputInterfaces
        const outputInterface = node.outputInterfaces.find(
          (outputInterface) => outputInterface.options.label === label
        )
        if (outputInterface) {
          return outputInterface
        }
        break
    }

    // If the interface is not found, return undefined
    return
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
  }

  const removeLinkByNode = (nodeComponent: NodeComponent) => {
    links.value = links.value.filter(
      (link) => link.targetInterfaceComponent.parentNode !== nodeComponent
    )
    links.value = links.value.filter(
      (link) => link.sourceInterfaceComponent.parentNode !== nodeComponent
    )
  }

  const removeLink = (linkToRemove: Link) => {
    links.value = links.value.filter((link) => link !== linkToRemove)
  }

  const getLinkInterfaceTarget = (interfaceComponent: InterfaceComponent) => {
    return links.value.find((link) => link.targetInterfaceComponent === interfaceComponent)
  }

  const isInterfaceConnected = (interfaceComponent: InterfaceComponent) => {
    return links.value.some((link) => link.targetInterfaceComponent === interfaceComponent)
  }

  const getNode = (id: string) => {
    return nodes.value.find((node) => node.id === id)
  }

  const togglePanZoom = (value: boolean) => {
    canZoom.value = value
    canPan.value = value
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
    currentGlobalScope,
    addNode,
    addLink,
    getInterfaceById,
    getInterfaceByLabelFromNode,
    getLinkInterfaceTarget,
    removeLinkByInterface,
    getNode,
    clear,
    togglePanZoom,
    removeLinkByNode,
    removeLink,
    isInterfaceConnected,
    setGlobalScope
  }
})
