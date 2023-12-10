<template>
    <div class="editor-wraper">
        <NodeWraper v-for="node in nodeEditorStore.nodes" :node="node" />
        <LinksWraper />
    </div>
</template>

<script setup lang="ts">
import { useNodeEditor } from '@/stores/nodeEditor';
/* import NodeWraper from './NodeWraper.vue';
import LinksWraper from './Links/LinksWraper.vue'; */

const nodeEditorStore = useNodeEditor()

</script>


<style scoped>
.editor-wraper {
    position: relative;
    width: 4000px;
    height: 4000px;
}

svg {
    width: fit-content;
    height: fit-content;
    position: absolute;
    z-index: -1;
    overflow: visible;
}

button {
    position: absolute;
    top: 90%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 3;
    padding: 0.5rem 1rem;
    text-transform: capitalize;
    border-radius: 0.5rem;
    font-size: 1.5rem;
    cursor: pointer;
}
</style>