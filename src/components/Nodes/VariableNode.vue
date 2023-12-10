<template>
    <div class="node-header">
        <img src="../../assets/icons/variable-icon.svg" alt="">
        <span :style="[!allowNameEdit ? { pointerEvents: 'none', userSelect: 'none' } : '']" ref="variableNameContent"
            :contenteditable="allowNameEdit" @keydown="handleKeyDown">{{ variableValues.variableName }}
        </span>
        <img src="../../assets/icons/edit-icon.svg" alt="" @click="handleEdit">
    </div>


    <!-- Output fields -->
    <div v-for="outputInterface in node.outputInterfaces " class="node-field right-field">
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
    <div v-for=" optionInterface  in  node.optionInterfaces " class="node-field">
        <div class="field">
            <FieldWraper :field="{
                data: {
                    interface: optionInterface,
                    options: optionInterface.options
                }
            }" />
        </div>
    </div>

    <!-- Input fields -->
    <div v-for=" inputInterface  in  node.inputInterfaces " class="node-field left-field">
        <div :id="inputInterface.id" class="interface in"></div>
        <div class="field ">
            <FieldWraper :field="{
                data: {
                    interface: inputInterface,
                    options: inputInterface.options
                }, updateHandler: (something: any) => {
                    console.log(something)
                }
            }" />
        </div>
    </div>
    <button v-if="variableValues.variableType === 'array'" class="primary-btn-c">add
        array-item</button>
</template>

<script setup lang="ts">
import FieldWraper from '../Fields/FieldWraper.vue';
import { useNodeEditor } from '@/stores/nodeEditor';
import type { VariableNodeComponent } from '@/types/NodeComponent';
import { computed, reactive, ref, watch, watchEffect } from 'vue';

const props = defineProps<{
    node: VariableNodeComponent
}>()

const nodeEditorStore = useNodeEditor()

const variableValues = reactive({
    variableName: props.node.name,
    variableType: props.node.variable.type,
    variableBehaviour: 'const',
    data: {
        id: null,
        value: null
    }
})

const variableType = computed(() => props.node.variable.type)

const variableNameContent = ref<HTMLElement>()
const allowNameEdit = ref(false)

const handleEdit = () => {
    allowNameEdit.value = !allowNameEdit.value
}

const handleKeyDown = (event: KeyboardEvent) => {
    if (event.keyCode === 13 || event.key === 'Enter') {
        event.preventDefault();
        if (event.target === variableNameContent.value) {
            variableValues.variableName = variableNameContent.value?.innerText
            allowNameEdit.value = false
        }
    }
}

watchEffect(() => {
    // Update node properties
    props.node.name = variableValues.variableName
})

</script>

<style  scoped>
span {
    font-weight: 100;
    overflow: hidden;
    width: 60%;
    text-transform: capitalize;
}

.node-header {
    padding: 0.5rem 1rem;
    background-color: #7FBB43;
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
    user-select: text;
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
    min-width: .6rem;
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