<template>
    <div class="add-node-wraper">
        <h2>add node</h2>
        <p>select one of the available nodes</p>
        <div class="node-types">
            <div class="node-type" v-for="(NodeType, i) in NodeTypes" @click="handleOpenModal(NodeType)">
                <span>{{ NodeType }}</span>
            </div>
        </div>
        <Modal ref="modal">
            <template v-slot:activator="{ openModal, closeModal }">
                <div class="modal-wraper-input">
                    <h2>Insert node name</h2>
                    <input ref="inputComponent" v-model="inputValue" type="text" placeholder="Node name"
                        @keydown="handleKeyEnter">
                    <p>"press enter to confirm"</p>
                </div>
            </template>
        </Modal>
    </div>
</template>

<script setup lang="ts">
import { ref, nextTick } from "vue";
import { useNodeEditor } from "@/stores/nodeEditor";
import Modal from "@/components/Modal.vue";
import { NodeFacotry } from "@/types/NodeFactory";
import { NodeType } from '@/types/NodeComponent';

const modal = ref()
const selectedType = ref()
const NodeTypes = NodeType
const inputComponent = ref()
const inputValue = ref()
const nodeEditorStore = useNodeEditor()

const props = defineProps<{
    nodePostion: {
        x: number,
        y: number
    }
    closeDialog: Function
}>()

const handleOpenModal = (NodeType: string) => {
    props.closeDialog()
    selectedType.value = NodeType
    if (NodeType !== "variable") {
        createNode()
        return
    }
    modal.value.openModal()
    nextTick(() => {
        inputComponent.value.focus()
    })
}

const handleKeyEnter = (event: KeyboardEvent) => {
    if (event.keyCode === 13 || event.key === 'Enter') {
        createNode()
        inputValue.value = ""
        modal.value.closeModal()
    }
}

const createNode = () => {
    const newNode = NodeFacotry.createNode(selectedType.value, { name: inputValue.value })
    newNode.position.setPostion(props.nodePostion.x, props.nodePostion.y)
    nodeEditorStore.addNode(newNode)
}

</script>

<style  scoped>
.add-node-wraper {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2rem;
}


h2 {
    text-transform: capitalize;
}


.node-types {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    width: 100%;
}

.node-type {
    background-color: var(--accent-color);
    padding: 0.25rem;
    border-radius: 0.1rem;
    cursor: pointer;
    text-align: center;
}

.node-type:hover {
    background-color: var(--secondary-color);
}



.modal-wraper-input {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    align-items: center;
}


input {
    background-color: var(--primary-accent-color);
    padding: 0.25rem 0.5rem;
    border: none;
    border-radius: 0.1rem;
    text-align: center;
    width: 100%;
}
</style>