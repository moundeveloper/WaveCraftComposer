<template>
  <NodeLayout :node="node" :node-config="nodeConfig">
    <template #header>
      <span :style="[!allowNameEdit ? { pointerEvents: 'none', userSelect: 'none' } : '']" ref="variableNameContent"
        :contenteditable="allowNameEdit" @keydown="handleKeyDown">{{ variableValues.variableName }}
      </span>
      <!--     <img src="../../assets/icons/edit-icon.svg" alt=""  /> -->

      <Icon icon-name="edit" @click="handleEdit" />
    </template>

    <template #additional>
      <button v-if="variableValues.VariableType === VariableType.ARRAY" class="primary-btn-c" @click="addArrayItem">
        add array-item
      </button>
    </template>
  </NodeLayout>
</template>

<script setup lang="ts">
import { useNodeEditor } from '../../stores/nodeEditor'
import { InterfaceComponent, InterfaceComponentTypeE, InterfaceTypeE } from '../../types/InterfaceComponent'
import {
  VariableMutability,
  VariableNodeComponent,
  VariableType
} from '../../types/node_component/NodeComponent'
import { genId } from '../../utils/utility'
import { reactive, ref, watchEffect, watch } from 'vue'
import type { Link } from '@/types/Link'
import { UIComponentE } from '../../types/InterfaceComponent'
import NodeLayout from './NodeLayout.vue'
import Icon from '../Icons/Icon.vue'

const props = defineProps<{
  node: VariableNodeComponent
}>()

const nodeEditorStore = useNodeEditor()

const variableValues = reactive({
  variableName: props.node.name,
  VariableType: props.node.variable.type,
  variableBehaviour: VariableMutability.CONST,
  data: {
    id: null,
    value: null
  }
})

const nodeConfig = {
  icon: "variable",
  backgroundColor: "--light-green"
}


const variableNameContent = ref<HTMLElement>()
const allowNameEdit = ref(false)


/* Bind interface-handler */
const bindInterfaceHandler = () => {
  const typeInterface = nodeEditorStore.getInterfaceByLabelFromNode(props.node, InterfaceTypeE.OPTION, 'type')
  const mutabilityInterface = nodeEditorStore.getInterfaceByLabelFromNode(props.node, InterfaceTypeE.OPTION, 'mutability')
  const valueInterface = nodeEditorStore.getInterfaceByLabelFromNode(props.node, InterfaceTypeE.INPUT, 'value')

  console.log("typeInterface: ", typeInterface)
  console.log("mutabilityInterface: ", mutabilityInterface)
  console.log("valueInterface: ", valueInterface)

  typeInterface?.setUpdateHandler(handleVariableType)
  mutabilityInterface?.setUpdateHandler(handleMutability)
  /* You have to unfortunately bind it to all of the variable type states :) and not just one interface ahahahah so this won't work xD*/

  props.node.variableStates.forEach((variableState) => {
    console.log("variableState: ", variableState)
    variableState.inputInterfaces.forEach((inputInterface) => {
      console.log("inputInterface: ", inputInterface)
      /* big problem here */
    })
  })
  valueInterface?.setUpdateHandler(handleVariableValue)
}

const handleEdit = () => {
  allowNameEdit.value = !allowNameEdit.value
}

const handleVariableValue = (data: any) => {
  props.node.currentVariable.value = data.value
  console.log("value: ", data.value)
}

const handleVariableType = (type: any) => {
  const oldType = variableValues.VariableType
  const newType = type.value
  variableValues.VariableType = type.value
  if (props.node.variableStates === undefined) return
  const variableState = props.node.variableStates.get(type.value)
  if (variableState === undefined) return
  props.node.setCurrentVariableState(variableState)

  revalidateVariableType(oldType, newType)
}

const handleMutability = (mutability: any) => {
  const oldMutability = props.node.variable.mutability
  const newMutability = mutability
  props.node.updateVariableMutability(mutability.value)
  revalidateMutability(oldMutability, newMutability)
}

const revalidateMutability = (
  oldMutability: VariableMutability,
  newMutability: VariableMutability
) => {
  if (oldMutability === newMutability) return
  console.log('##################################')
  console.log('Node variable mutability has changed from: ', oldMutability, ' to: ', newMutability)

  const links: Link[] = <Link[]>(
    nodeEditorStore.links.filter(
      (link) =>
        link.sourceInterfaceComponent.parentNode === props.node ||
        link.targetInterfaceComponent.parentNode === props.node
    )
  )

  if (links.length === 0) return

  links.forEach((link: Link) => {
    console.log('Link has been removed: ', link)
    nodeEditorStore.removeLink(link)
  })
}

const revalidateVariableType = (oldType: VariableType, newType: VariableType) => {
  if (oldType === newType) return
  console.log('##################################')
  console.log('Node variable type has changed from: ', oldType, ' to: ', newType)

  const links: Link[] = <Link[]>(
    nodeEditorStore.links.filter(
      (link) =>
        link.sourceInterfaceComponent.parentNode === props.node ||
        link.targetInterfaceComponent.parentNode === props.node
    )
  )

  if (links.length === 0) return

  links.forEach((link: Link) => {
    console.log('Link has been removed: ', link)
    nodeEditorStore.removeLink(link)
  })
}

const handleKeyDown = (event: KeyboardEvent) => {
  if (event.keyCode === 13 || event.key === 'Enter') {
    event.preventDefault()
    if (event.target === variableNameContent.value) {
      variableValues.variableName = variableNameContent.value?.innerText
      allowNameEdit.value = false
    }
  }
}

const addArrayItem = () => {
  props.node.inputInterfaces.push(
    new InterfaceComponent(
      genId(),
      {
        label: InterfaceComponentTypeE.MUTABILITY,
        component: UIComponentE.ARRAY_ITEM,
        value: VariableMutability.LET,
        values: [
          {
            label: VariableMutability.LET,
            icon: 'number'
          },
          {
            label: VariableMutability.CONST,
            icon: 'number'
          }
        ]
      },
      props.node
    )
  )
}

bindInterfaceHandler()

watchEffect(() => {
  // Update node properties
  props.node.name = variableValues.variableName
})

watch(
  () => props.node.currentVariable,
  (newVal, oldVal) => {
    console.log('something has changed:', newVal, ' from ', oldVal)
  }
)
</script>

<style scoped>
span {
  font-weight: 100;
  overflow: hidden;
  width: 60%;
  text-transform: capitalize;
}

.node-header {
  padding: 0.5rem 1rem;
  background-color: #7fbb43;
  border-top-left-radius: 0.25rem;
  border-top-right-radius: 0.25rem;
  grid-column: 1/4;
  height: 2.5rem;
  display: flex;
  align-items: center;
  gap: 1rem;
}

.node-header span {
  margin-right: auto;
  color: var(--primary-color);
  font-weight: 600;
  text-transform: none;
}

.node-header img {
  height: 1.1rem;
}

.node-field {
  display: flex;
  position: relative;
  align-items: flex-start;
  text-transform: capitalize;
  gap: 0.6rem;
  width: 100%;
  grid-column: 2/3;
}

.left-field {
  grid-column: 1/3;
  justify-self: flex-start;
}

.right-field {
  grid-column: 2/4;
  justify-self: flex-end;
  justify-content: flex-end;
}

.field {
  flex-grow: 1;
}

.interface {
  min-width: 0.6rem;
  aspect-ratio: 1/4;
  transform: translateY(-5%);
}

.in {
  background-color: var(--input-color);
}

.out {
  background-color: var(--output-color);
}

.primary-btn-c {
  grid-column: 2/3;
}
</style>
