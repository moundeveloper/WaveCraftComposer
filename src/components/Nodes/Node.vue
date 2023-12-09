<template>
    <NodeComponentElement :node="node" />
</template>

<script setup lang="ts">
import { h } from 'vue'
import { NodeComponent } from '@/types/NodeComponent';
import PrintNode from "@/components/Nodes/PrintNode.vue"
import VariableNode from "@/components/Nodes/VariableNode.vue"


const props = defineProps<{
    node: NodeComponent
}>()

const createHNode = (element: object, node: NodeComponent) => {
    return h(element, {
        node
    })
}

const NodeComponentElement = () => {
    const nodeType = props.node.nodeType

    switch (nodeType) {
        case 'print':
            return createHNode(PrintNode, props.node);
            break;
        case 'variable':
            return createHNode(VariableNode, props.node);
            break;
        default:
            console.warn(`Unknown node of type: ${nodeType}`);
            break;
    }
}

</script>

<style  scoped></style>