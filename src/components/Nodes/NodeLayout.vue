<template>
  <!-- Header -->
  <div class="node-header" :style="computedStyle">
    <Icon :icon-name="nodeConfig.icon" />
    <slot name="header">
      <span>{{ node.name }}
      </span>
    </slot>
  </div>

  <!-- Output fields -->
  <div v-for="outputInterface in node.outputInterfaces" class="node-field right-field">
    <div class="field">
      <FieldWraper :field="{
        data: {
          interface: outputInterface,
          options: outputInterface.options
        }
      }" />
    </div>
    <div :id="outputInterface.id" class="interface out"></div>
  </div>

  <!-- Fields -->
  <div v-for="optionInterface in node.optionInterfaces" class="node-field">
    <FieldWraper :field="{
      data: {
        interface: optionInterface,
        options: optionInterface.options
      },
      updateHandler: optionInterface.options.updateHandler
    }" />
  </div>

  <!-- Input fields -->
  <div v-for="inputInterface in node.inputInterfaces" class="node-field left-field">
    <div :id="inputInterface.id" class="interface in"></div>
    <div class="field">
      <FieldWraper :field="{
        data: {
          interface: inputInterface,
          options: inputInterface.options
        },
        updateHandler: inputInterface.options.updateHandler
      }" />
    </div>
  </div>

  <!-- Additional -->
  <slot name="additional">
  </slot>
</template>

<script setup lang="ts">
import FieldWraper from '../Fields/FieldWraper.vue'
import Icon from '../Icons/Icon.vue'
import {
  VariableNodeComponent
} from '../../types/node_component/NodeComponent'
import { computed } from 'vue';

interface NodeConfig {
  icon: string,
  backgroundColor: string
}

const props = defineProps<{
  node: VariableNodeComponent,
  nodeConfig: NodeConfig
}>()

const computedStyle = computed(() => ({
  backgroundColor: `var(${props.nodeConfig.backgroundColor})`
}))

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

.node-header span,
.node-header svg {
  pointer-events: none;
  user-select: none;
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