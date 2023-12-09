<template>
    <svg class="path-wraper">
        <g fill="none" stroke="white" stroke-width="2">
            <Link v-for="link in nodeEditorStore.links" :link="link" />
            <TemporaryLink v-if="isTemporaryLinkActive" :temporaryLinkData="temporaryLinkData" />
        </g>
    </svg>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, reactive, ref, watch } from 'vue';
import { useNodeEditor } from '@/stores/nodeEditor';
import { LinkBuilder } from '@/types/Link';
import { genId } from '@/utils/utility';
import type { InterfaceComponent } from '@/types/InterfaceComponent';
import Link from './Link.vue';
import TemporaryLink from './TemporaryLink.vue';
import { Position } from '@/types/Position';
import type { TemporaryLinkData } from "./types";
import { getElementPositionOffset } from '@/utils/InterfaceElement';

interface LinkingInterfaces {
    sourceInterface: InterfaceComponent | undefined
    targetInterface: InterfaceComponent | undefined
}

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
        console.log(sourcePosition)
        console.log(temporaryLinkData.startPostion)
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

    if (linkingInterfaces.sourceInterface && linkingInterfaces.targetInterface) {
        const link = new LinkBuilder().createLink(genId(), linkingInterfaces.sourceInterface, linkingInterfaces.targetInterface)
        console.log(link)
        if (!link) return
        nodeEditorStore.addLink(link)
        return
    }

}

const notLinking = (event: MouseEvent) => {
    if (event.button === 1) return;
    togglePanZoom(true)
    isTemporaryLinkActive.value = false
    temporaryLinkData.sourceInterface = undefined
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