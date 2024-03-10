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
import { NotSameInterfaceInput, NotSameInterfaceNode, NotSameInterfaceType, SameNodeVariableType } from '../../types/link_rule_validation/LinkRule';
import { SameNodeTypeGroup } from '../../types/link_rule_validation/GroupRule';
import type { Link } from '@/types/Link';
import { getLinkRuleDict } from '@/types/link_rule_validation/LinkRuleDict';
import { LinkRuleValidationProcessor } from '@/types/link_rule_validation/ProcessValidations';

const nodeEditorStore = useNodeEditor();
const { isTemporaryLinkActive, temporaryLinkData } = useTemporaryLink();
const { initLinking, completeLinking, notLinking } = useLinking()

// Init linking rules
const linkRuleValidator = LinkRulesValidator.getInstance()
linkRuleValidator.registerGlobalLinkRule(NotSameInterfaceInput.getInstance())
linkRuleValidator.registerGlobalLinkRule(NotSameInterfaceNode.getInstance())
linkRuleValidator.registerGlobalLinkRule(NotSameInterfaceType.getInstance())
linkRuleValidator.registerGroupRule(SameNodeTypeGroup.getInstance())
linkRuleValidator.registerRuleIntoGroupRule(SameNodeTypeGroup.getInstance(), SameNodeVariableType.getInstance())


watch(() => nodeEditorStore.links, (newLinks) => {
    if (newLinks) {
        newLinks.forEach((link) => {
            const typeLink = <Link>link
            console.log('It has changed')
            console.log(typeLink)
            LinkRuleValidationProcessor.getInstance().processValidations(
                getLinkRuleDict(nodeEditorStore),
                typeLink.sourceInterfaceComponent,
                typeLink.targetInterfaceComponent
            )
        });
    }
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
