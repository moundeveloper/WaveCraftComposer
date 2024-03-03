<template>
    <div class="container" id="panning-container" @mousedown="mousedown" @wheel="zoom">
        <div class="panning" ref="panning">
            <slot />
        </div>
        <div class="grid-pattern" id="grid-pattern"
            :style="`background-position: ${translate.translateX / zoomFactor}px ${translate.translateY / zoomFactor}px; scale: ${zoomFactor};`">
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, reactive, type Ref } from 'vue';
import { useNodeEditor } from "@/stores/nodeEditor";
import { Position } from '@/types/Position';

const nodeEditorStore = useNodeEditor()

// Panning references
const panning: Ref<HTMLElement | null> = ref(null);
const zoomFactor = ref(1)
let localCanPan = false
const translate = reactive({ scale: zoomFactor.value, translateX: 0, translateY: 0 });
const initialContentsPos = new Position();
const pinnedMousePosition = new Position();
const mousePosition = new Position();

const containerExists = (callback: Function) => {
    const container: HTMLElement | null = document.getElementById("panning-container")
    if (container) {
        callback(container)
    }
}

const getpanning = (): HTMLElement | null => {
    return document.getElementById("panning-container")
}

const mousedown = (event: MouseEvent) => {
    if (event.button === 1) {
        initialContentsPos.x = translate.translateX;
        initialContentsPos.y = translate.translateY;
        pinnedMousePosition.x = event.clientX;
        pinnedMousePosition.y = event.clientY;
        localCanPan = true;
        document.body.classList.add('panning-cursor');
    }

    // Add Panning listeners
    containerExists((container: HTMLElement) => {
        container.addEventListener("mousemove", mousemove);
        container.addEventListener("mouseup", mouseup);
    })
};

const mousemove = (event: MouseEvent) => {
    mousePosition.x = event.clientX;
    mousePosition.y = event.clientY;
    if (localCanPan && nodeEditorStore.canPan) {
        const diffX = mousePosition.x - pinnedMousePosition.x;
        const diffY = mousePosition.y - pinnedMousePosition.y;
        translate.translateX = initialContentsPos.x + diffX;
        translate.translateY = initialContentsPos.y + diffY;
    }
    update();
};

const mouseup = (event: MouseEvent) => {
    localCanPan = false;
    document.body.classList.remove('panning-cursor');

    // Remove Panning listeners
    containerExists((container: HTMLElement) => {
        container.addEventListener("mousemove", mousemove);
        container.addEventListener("mouseup", mouseup);
    })
};

const zoom = (event: WheelEvent) => {
    if (!nodeEditorStore.canZoom) return
    const maxZoomOut = 0.2
    const maxZoomIn = 3
    const limiter = 1000;
    if (
        zoomFactor.value - event.deltaY / limiter > maxZoomIn ||
        zoomFactor.value - event.deltaY / limiter < maxZoomOut
    ) {
        return;
    }

    const oldZoomFactor = zoomFactor.value;
    zoomFactor.value -= event.deltaY / limiter;

    const container: HTMLElement | null = getpanning()
    if (!container) return
    const gridSize: DOMRect = container.getBoundingClientRect();

    mousePosition.x = event.clientX - gridSize.x;
    mousePosition.y = event.clientY - gridSize.y;

    // Recalculate pos based on the scale
    nodeEditorStore.updateScale(zoomFactor.value)
    translate.scale = zoomFactor.value;

    const contentMousePosX = mousePosition.x - translate.translateX;
    const contentMousePosY = mousePosition.y - translate.translateY;
    const x = mousePosition.x - contentMousePosX * (zoomFactor.value / oldZoomFactor);
    const y = mousePosition.y - contentMousePosY * (zoomFactor.value / oldZoomFactor);

    translate.translateX = x;
    translate.translateY = y;

    update();
};

const update = () => {
    const matrix = `matrix(${translate.scale},0,0,${translate.scale},${translate.translateX},${translate.translateY})`;
    if (!panning.value) return
    panning.value.style.transform = matrix;
};

</script>

<style >
.panning-zooming-wraper {
    position: relative;
}

.container {
    position: relative;
    top: 0;
    left: 0;
    overflow: hidden;
    width: 100%;
    height: 100%;
}

.panning {
    position: absolute;
    transform-origin: 0 0;
    z-index: 2;
}

.grid-pattern {
    width: 500vw;
    height: 500vh;
    background-size: 40px 40px;
    border-radius: white 10px solid;
    background-image: radial-gradient(circle, #bbbbbb 1px, rgba(0, 0, 0, 0) 1px);
    transform-origin: 0 0;
}
</style>
