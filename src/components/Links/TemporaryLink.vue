<template>
    <path :d="interfacesDpath" />
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue"
import type { TemporaryLinkData } from "./types";
import { generateDPath, getElementPositionOffset } from "@/utils/InterfaceElement";
import { Position } from "@/types/Position";
import type { InterfaceComponent } from "@/types/InterfaceComponent";
import { useNodeEditor } from "@/stores/nodeEditor";

const nodeEditorStore = useNodeEditor()
const interfacesDpath = ref<string | undefined>()
const props = defineProps<{
    temporaryLinkData: TemporaryLinkData
}>()

const processDPath = (sourceInterface: InterfaceComponent, targetPosition: Position) => {
    const sourcePos = getElementPositionOffset(sourceInterface?.id)
    if (!sourcePos) return

    return generateDPath(sourcePos, targetPosition)
}

const temporaryLinkHandler = (event: MouseEvent) => {
    if (event.button === 1) return;
    const fixedX = event.clientX / nodeEditorStore.scale - props.temporaryLinkData.startPostion.x
    const fixedY = event.clientY / nodeEditorStore.scale - props.temporaryLinkData.startPostion.y
    const mousePosition = new Position(fixedX, fixedY)
    if (!props.temporaryLinkData.sourceInterface) return
    interfacesDpath.value = processDPath(props.temporaryLinkData.sourceInterface, mousePosition)
}

onMounted(() => {
    window.addEventListener("mousemove", temporaryLinkHandler)
})
onUnmounted(() => {
    window.removeEventListener("mousemove", temporaryLinkHandler)
})

</script>
