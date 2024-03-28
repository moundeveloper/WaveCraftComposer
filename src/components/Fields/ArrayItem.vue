<template>
  <div class="array-wraper">
    <FieldWraper
      v-for="(subInterface, i) in data.options.subInterfaces"
      :field="{
        fieldName: subInterface.options.component,
        data: {
          interface: subInterface,
          options: subInterface.options
        },
        updateHandler: selectHandler(subInterface.options.component)
      }"
      :key="i"
    />

    <button class="delete-interface-btn" @click="deleteArrayInterface()">
      <img src="../../assets/icons/delete.svg" alt="" />
    </button>
  </div>
  <button class="primary-btn-c">add array-item</button>
</template>

<script setup lang="ts">
import { reactive, watch } from 'vue'
import { InterfaceComponent } from '../../types/InterfaceComponent'
import type { NodeComponent } from '@/types/NodeComponent'
import { useNodeEditor } from '@/stores/nodeEditor'

const nodeEditor = useNodeEditor()
const props = defineProps<{
  data: {
    interface: InterfaceComponent
    options: {
      label: String
      subInterfaces: Array<InterfaceComponent>
    }
  }
  updateHandler: Function
}>()

const currentState = reactive({
  interfaceType: 'number',
  interfaceComponent: 'NumberInput'
})

const selectHandler = (component: any) => {
  /*   if (component === 'DropDown') {
    return handleUpdatedType
  }
  return handleUpdatedValue */
}

const handleUpdatedValue = ({ value }: any) => {
  console.log('log from value: ' + value)
  /* props.interface.setInterfaceValue(value) */
}

const handleUpdatedType = ({ value }: any) => {
  /*   console.log('log from type: ' + value)
  props.data.interface.setCurrentState(value) */
}

const deleteArrayInterface = () => {
  const node = props.data.interface.parentNode
  const state = node.getStateByType('array')
  state.inputs = state.inputs.filter((input) => input.id !== props.data.interface.id)
  node.setCurrentState('array')
}

// Make the delink work for when an array item gets deleted
// Make array item not add interfaces if it's already connected by another
// variable and also make it for variable node as well

/* watch(props.data.interface, (newVal) => {
  // De-link all nodes if variable-type doesn't match anymore
  console.log(nodeEditor.isInterfaceConnected(props.data.interface))
  const link = nodeEditor.findLinkConnectedByInterface(props.data.interface)
  if (!link) return
  const path = nodeEditor.removeConnectedTargetLink(link)
  path.remove()
}) */
</script>

<style scoped>
.drop-down {
  margin-bottom: 1rem;
}

.array-wraper {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.delete-interface-btn {
  font-size: 0.7rem;
  position: absolute;
  top: 0.75rem;
  right: -1.2rem;
  background-color: transparent;
  border: none;
  outline: none;
  color: var(--tertiary-color);
  cursor: pointer;
}
</style>
