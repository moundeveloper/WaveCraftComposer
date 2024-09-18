<template>
    <NodeLayout :node="node" :node-config="nodeConfig">
    </NodeLayout>
</template>

<script setup lang="ts">
import { NodeComponent } from '../../types/node_component/NodeComponent';
const props = defineProps<{
    node: NodeComponent
}>()

const nodeConfig = {
    icon: "print",
    backgroundColor: "--violet"
}

</script>

<style scoped></style>