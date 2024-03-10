<template>
    <svg class="path-wraper">
        <g fill="none" stroke="white" stroke-width="2">
            <Link v-for="link in nodeEditorStore.links" :link="link" :key="link.id" />
            <TemporaryLink v-if="isTemporaryLinkActive" :temporaryLinkData="temporaryLinkData" />
        </g>
    </svg>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, watchEffect } from 'vue';
import useLinking from '../../composables/useLinking';
import useTemporaryLink from '../../composables/useTemporaryLink';
import { useNodeEditor } from '../../stores/nodeEditor';
import Link from './Link.vue';
import TemporaryLink from './TemporaryLink.vue';
import { LinkRulesValidator } from '../../types/link_rule_validation/LinkRuleValidator';
import { NotSameInterfaceInput, NotSameInterfaceNode } from '../../types/link_rule_validation/LinkRule';

const nodeEditorStore = useNodeEditor();
const { isTemporaryLinkActive, temporaryLinkData } = useTemporaryLink();
const { initLinking, completeLinking, notLinking } = useLinking()
const linkRuleValidator = LinkRulesValidator.getInstance()
linkRuleValidator.registerGlobalLinkRule(NotSameInterfaceInput.getInstance())
linkRuleValidator.registerGlobalLinkRule(NotSameInterfaceNode.getInstance())

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
</script>
