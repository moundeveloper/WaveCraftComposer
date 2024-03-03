<template>
    <div class="widget-pannel-wraper">
        <h1>Diagnostic Pannel</h1>
        <p>Connect, run, display</p>
        <button class="primary-btn-c" @click="handleRun">run code</button>
        <div class="display">
            <p v-for="code in structure">{{ code }}</p>
        </div>
        <div class="code-result">
            <p>result:{{ codeResult }}</p>
        </div>
    </div>
</template>

<script setup>
import { getGraphSourcesTargets, traverseGraph, findLeftmostSourceElement } from "../classes/GraphNode.js"
import { convertNodeToCode, executeParsedCode } from "../classes/ConvertCode.js"
import { nodeEditor } from "../stores/nodeEditor";
import { ref } from "vue";

const structure = ref(null)
const codeResult = ref(null)

structure.value = getGraphSourcesTargets(nodeEditor.links)

const handleRun = () => {
    const adjacencyList = getGraphSourcesTargets(nodeEditor.links)

    const codeListRaw = [];

    const [[k, v]] = adjacencyList
    traverseGraph(findLeftmostSourceElement(adjacencyList), adjacencyList, (nodeKey, currentNode, visited) => {
        convertNodeToCode(nodeKey, codeListRaw);
    });

    structure.value = codeListRaw
    console.log(executeParsedCode(codeListRaw.join("\n")))
    codeResult.value = executeParsedCode(codeListRaw.join("\n"));
}

</script>

<style scoped>
.widget-pannel-wraper * {
    color: #232323;
}

.widget-pannel-wraper {
    width: 30rem;
    height: 100vh;
    background-color: var(--tertiary-color);
    z-index: 4;
    padding: 0.5rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.display,
.code-result {
    flex-grow: 1;
    border-radius: 0.1rem;
    outline: 1px solid var(--primary-color);
    padding: 0.5rem;
    pointer-events: visible;
}

.code-result {
    height: 5rem;
}

p {
    user-select: text;
}
</style>