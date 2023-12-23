<template>
    <div :id="node.id"
        :style="`left:${position.x}px; top: ${position.y}px; z-index: ${nodeEditorStore.getNode(node.id)?.zIndex};`"
        class="node-wraper" @mousedown="startDrag">
        <Node :node="node" />
    </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import Node from "@/components/Nodes/Node.vue"
import { NodeComponent } from '@/types/NodeComponent';
import { Position } from '@/types/Position';
import { useNodeEditor } from '@/stores/nodeEditor';

const props = defineProps<{
    node: NodeComponent
}>()

const nodeEditorStore = useNodeEditor()

const nodeStartingPosition = props.node.position
const startPosition = reactive(new Position(0, 0));
const currentPosition = reactive(nodeStartingPosition);
const position = reactive(nodeStartingPosition);

// Handle dragging responsiveness
const dragStore = reactive({
    isDragging: false,
    enable() {
        this.isDragging = true;
    },
    disable() {
        this.isDragging = false;
    },
});

function startDrag(event: MouseEvent) {
    if (event.button === 1) return;
    // Update the flag and record the initial mouse positions
    const allowedClassNames = ["node-wraper", "node-header", "field"]
    const target = event.target as HTMLElement;
    if (!allowedClassNames.includes(target.className)) return

    startPosition.x = event.clientX / nodeEditorStore.scale - currentPosition.x;
    startPosition.y = event.clientY / nodeEditorStore.scale - currentPosition.y;

    dragStore.enable()
    document.body.classList.add('move-cursor');
    updateZIndex()
    // Add listeners for moving the node
    window.addEventListener("mousemove", drag)
    window.addEventListener("mouseup", endDrag)
}

function drag(event: MouseEvent) {
    if (dragStore.isDragging) {
        // Update the position values based on the mouse movement
        currentPosition.x = event.clientX / nodeEditorStore.scale - startPosition.x;
        currentPosition.y = event.clientY / nodeEditorStore.scale - startPosition.y;
        position.x = currentPosition.x;
        position.y = currentPosition.y;
    }
}

function endDrag(event: MouseEvent) {
    // Reset the dragging flag
    dragStore.disable()
    document.body.classList.remove('move-cursor');
    // Remove listeners for moving the node
    window.removeEventListener("mousemove", drag)
    window.removeEventListener("mouseup", endDrag)
}

const updateZIndex = () => {
    // Update z-index based on the clicked node
    const validIndices: number[] = nodeEditorStore.nodes
        .filter(node => node.zIndex !== null)
        .map(node => node.zIndex as number);

    const maxZIndex: number | undefined = validIndices.length > 0 ? Math.max(...validIndices) : undefined;

    // Shift z-index values for all nodes
    const nodeToUpdate = nodeEditorStore.getNode(props.node.id)
    if (nodeToUpdate?.zIndex && props.node.zIndex) {
        nodeToUpdate.zIndex = maxZIndex
    }

    nodeEditorStore.nodes.forEach(node => {
        if (node.zIndex && node.id !== props.node.id) {
            node.zIndex = Math.max(node.zIndex - 1, 1);
        }
    });
};

</script>


<style scoped>
.node-wraper {
    position: absolute;
    left: 0;
    top: 0;
    width: 20rem;
    background-color: var(--primary-color);
    border-radius: 0.1rem;
    font-family: Arial, Helvetica, sans-serif;
    color: var(--tertiary-color);
    display: grid;
    grid-template-columns: 1.25rem 1fr 1.25rem;
    grid-auto-flow: row;
    gap: 1rem 0;
    padding-bottom: 1rem;
    box-shadow: 0px 0px 100px rgba(0, 0, 0, 0.5);
    user-select: none;
}
</style>