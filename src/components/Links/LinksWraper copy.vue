<template>
    <svg class="path-wraper">
        <g fill="none" stroke="white" stroke-width="2">
            <Link v-for="link in nodeEditorStore.links" :link="link" :key="link.id" />
            <TemporaryLink v-if="isTemporaryLinkActive" :temporaryLinkData="temporaryLinkData" />
        </g>
    </svg>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, reactive, ref } from 'vue';
import { useNodeEditor } from '@/stores/nodeEditor';
import { LinkRulesValidator, NotSameInterfaceType, LinkRule, NotSameInterfaceNode, NotSameInterfaceInput, SameNodeVariableType } from '@/types/LinkRules/LinkRule';
import { genId, removeElementFromList } from '@/utils/utility';
import { InterfaceComponent } from '@/types/InterfaceComponent';
import Link from './Link.vue';
import TemporaryLink from './TemporaryLink.vue';
import { Position } from '@/types/Position';
import type { TemporaryLinkData } from "./types";
import { getElementPositionOffset } from '@/utils/InterfaceElement';
import { LinkBuilder } from '@/types/Link';
import { useTerminal, Status } from '@/stores/terminal';

interface LinkingInterfaces {
    sourceInterface: InterfaceComponent | undefined
    targetInterface: InterfaceComponent | undefined
}
const emits = defineEmits(['linkingSuccessful', 'linkingFailed'])
const nodeEditorStore = useNodeEditor()
const isTemporaryLinkActive = ref(false)
const temporaryLinkData = reactive<TemporaryLinkData>({
    sourceInterface: undefined,
    startPostion: new Position(0, 0)
})

const linkingInterfaces = reactive<LinkingInterfaces>({
    sourceInterface: undefined,
    targetInterface: undefined
})

const terminalStore = useTerminal()

// Prepare link validation
const linkRuleValidator = new LinkRulesValidator()
linkRuleValidator.registerLinkRule(new NotSameInterfaceType())
linkRuleValidator.registerLinkRule(new NotSameInterfaceNode())
linkRuleValidator.registerLinkRule(new SameNodeVariableType())
/* linkRuleValidator.registerLinkRule(new NotSameInterfaceInput()) */

const initLinking = (event: MouseEvent) => {
    if (event.button === 1) return;
    togglePanZoom(false)
    const target = event.target as HTMLElement;
    isTemporaryLinkActive.value = !isTemporaryLinkActive.value
    // Is the link already present in the link store and is it a target link?
    const nodeInterface = nodeEditorStore.getInterfaceById(target.id)
    if (!nodeInterface) return
    const linkTarget = nodeEditorStore.getLinkInterfaceTarget(nodeInterface)
    let sourcePosition
    if (linkTarget) {
        nodeEditorStore.removeLinkByInterface(nodeInterface)
        linkingInterfaces.sourceInterface = linkTarget.sourceInterfaceComponent
        temporaryLinkData.sourceInterface = linkingInterfaces.sourceInterface
        // Fixed starting position for temporary-link
        sourcePosition = getElementPositionOffset(linkTarget.targetInterfaceComponent?.id)
    } else {
        linkingInterfaces.sourceInterface = nodeInterface
        temporaryLinkData.sourceInterface = linkingInterfaces.sourceInterface
        // Fixed starting position for temporary-link
        if (!linkingInterfaces.sourceInterface?.id) return
        sourcePosition = getElementPositionOffset(linkingInterfaces.sourceInterface?.id)
    }

    temporaryLinkData.startPostion.x = event.clientX / nodeEditorStore.scale - sourcePosition.x
    temporaryLinkData.startPostion.y = event.clientY / nodeEditorStore.scale - sourcePosition.y
}

const completeLinking = (event: MouseEvent) => {
    if (event.button === 1) return;
    togglePanZoom(true)
    isTemporaryLinkActive.value = !isTemporaryLinkActive.value
    temporaryLinkData.sourceInterface = undefined

    const target = event.target as HTMLElement;
    linkingInterfaces.targetInterface = nodeEditorStore.getInterfaceById(target.id)

    if (linkingInterfaces.sourceInterface instanceof InterfaceComponent
        && linkingInterfaces.targetInterface instanceof InterfaceComponent) {
        const { allValid, successfulRules, failedRules } = linkRuleValidator.validateRules(linkingInterfaces.sourceInterface, linkingInterfaces.targetInterface)
        console.log(successfulRules)
        successfulRules.forEach(rule => processSuccessfulRule(rule, successfulRules, linkingInterfaces.sourceInterface, linkingInterfaces.targetInterface))
        failedRules.forEach(rule => processFailedRule(rule, failedRules))
        if (failedRules.length === 0) {
            const link = new LinkBuilder().createLink(genId(), linkingInterfaces.sourceInterface, linkingInterfaces.targetInterface)
            nodeEditorStore.addLink(link)
            successfulRules.forEach(rule => {
                terminalStore.addLog({
                    id: genId(),
                    message: `The Rule ${rule.constructor.name} has been validated for the interfaces -> source: ${linkingInterfaces.sourceInterface?.id}, target: ${linkingInterfaces.targetInterface?.id}`,
                    status: Status.SUCCESS
                })
            })

            return
        }

        failedRules.forEach(rule => {
            terminalStore.addLog({
                id: genId(),
                message: rule.message(),
                status: Status.ERROR
            })
        })
    }
}

const notLinking = (event: MouseEvent) => {
    if (event.button === 1) return;
    togglePanZoom(true)
    isTemporaryLinkActive.value = false
    temporaryLinkData.sourceInterface = undefined
}


const processSuccessfulRule = (rule: LinkRule, rules: LinkRule[], sourceInterfaceComponent: InterfaceComponent,
    targetInterfaceComponent: InterfaceComponent) => {
    switch (true) {
        case rule instanceof NotSameInterfaceInput:
            // Code for NotSameInterfaceInput
            console.log("Processing successful NotSameInterfaceInput");
            console.log(nodeEditorStore.links)
            nodeEditorStore.removeLinkByInterface(targetInterfaceComponent)
            console.log(nodeEditorStore.links)
            break;

        case rule instanceof NotSameInterfaceNode:
            // Code for NotSameInterfaceInput
            console.log("Processing successful NotSameInterfaceNode");
            break;

        case rule instanceof NotSameInterfaceType:
            // Code for NotSameInterfaceInput
            console.log("Processing successful NotSameInterfaceType");
            break;

        case rule instanceof SameNodeVariableType:
        // Code for NotSameInterfaceInput
        console.log("Processing successful NotSameInterfaceType");
        break;

        default:
            // Code for the base Rule class
            console.log("No Rule subclass matches the rule");
            break;
    }
}
const processFailedRule = (rule: LinkRule, rules: LinkRule[]) => {
    switch (true) {
        case rule instanceof NotSameInterfaceInput:
            // Code for NotSameInterfaceInput
            console.log("Processing failed NotSameInterfaceInput");
            removeElementFromList(rules, rule)
            break;

        case rule instanceof NotSameInterfaceNode:
            // Code for NotSameInterfaceInput
            console.log("Processing failed NotSameInterfaceNode");
            break;

        case rule instanceof NotSameInterfaceType:
            // Code for NotSameInterfaceInput
            console.log("Processing failed NotSameInterfaceType");
            break;
            
        case rule instanceof SameNodeVariableType:
            // Code for NotSameInterfaceInput
            console.log("Processing successful NotSameInterfaceType");
            break;

        default:
            // Code for the base Rule class
            console.log("No Rule subclass matches the rule");
            break;
    }
}


const togglePanZoom = (value: boolean) => {
    nodeEditorStore.canZoom = value
    nodeEditorStore.canPan = value
}


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

<style scoped></style>