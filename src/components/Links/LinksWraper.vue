<template>
    <svg class="path-wraper">
        <g fill="none" stroke="white" stroke-width="2">
            <NodeLink v-for="link in nodeEditorStore.links" :link="link" :key="link.id" />
            <TemporaryLink v-if="isTemporaryLinkActive" :temporaryLinkData="temporaryLinkData" />
        </g>
    </svg>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, watch } from 'vue';
import useLinking from '../../composables/useLinking';
import useTemporaryLink from '../../composables/useTemporaryLink';
import { useNodeEditor } from '../../stores/nodeEditor';
import NodeLink from './NodeLink.vue';
import TemporaryLink from './TemporaryLink.vue';
import { LinkRulesValidator } from '../../types/link_rule_validation/LinkRuleValidator';

import type { Link } from '@/types/Link';
import { LinkRuleValidationProcessor } from '@/types/link_rule_validation/ProcessValidations';

const nodeEditorStore = useNodeEditor();
const { isTemporaryLinkActive, temporaryLinkData } = useTemporaryLink();
const { initLinking, completeLinking, notLinking } = useLinking()


watch(() => nodeEditorStore.nodes.length, (newNodes) => {
    const interfaceElements = document.querySelectorAll('.interface');
    const elementsArray: Element[] = [...interfaceElements];
    elementsArray.forEach((interfaceElement) => {
        interfaceElement.addEventListener("mousedown", initLinking)
        interfaceElement.addEventListener("mouseup", completeLinking)
    })
});



interface Element {
    removeEventListener(type: 'mousedown' | 'mouseup', listener: (event: MouseEvent) => any, options?: boolean | EventListenerOptions): void;
    addEventListener(type: 'mousedown' | 'mouseup', listener: (event: MouseEvent) => any, options?: boolean | EventListenerOptions): void;
}

onMounted(() => {
    const interfaceElements = document.querySelectorAll('.interface');
    const elementsArray: Element[] = [...interfaceElements];
    elementsArray.forEach((interfaceElement) => {
        interfaceElement.addEventListener("mousedown", initLinking)
        interfaceElement.addEventListener("mouseup", completeLinking)
    })
    window.addEventListener("mouseup", notLinking)
})

onUnmounted(() => {
    const interfaceElements = document.querySelectorAll('.interface');
    const elementsArray: Element[] = [...interfaceElements];
    elementsArray.forEach((interfaceElement) => {
        interfaceElement.removeEventListener("mousedown", initLinking)
        interfaceElement.removeEventListener("mouseup", completeLinking)
    })
    window.removeEventListener("mouseup", notLinking)
})
</script>./NodeLink.vue
