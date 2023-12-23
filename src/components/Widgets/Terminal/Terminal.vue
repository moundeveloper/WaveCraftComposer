<template>
    <div class="terminal-wraper">
        <div class="resize-handle-terminal" ref="resizeHandle"></div>
        <TabWraper v-if="terminalConfig.height > 50" :tabs="tabs" :height="terminalConfig.height" />
        <div v-else class="default-terminal-toolbar">
            <span>Temporary</span>
        </div>
    </div>
</template>

<script setup lang="ts">
import TabWraper from "@/components/Shared/TabWraper.vue"
import { reactive, ref } from "vue";
import Debug from "@/components/Widgets/Terminal/Tabs/Debug.vue"
import Logs from "@/components/Widgets/Terminal/Tabs/Logs.vue"

const resizeHandle = ref()
const resizing = ref(false);
const MIN_HEIGHT = 50
const terminalConfig = reactive({
    height: 200
})
const tabs = [
    {
        label: 'Logs',
        hComponent: Logs
    },
    {
        label: 'Debug',
        hComponent: Debug
    },
]

const startResize = (event: MouseEvent) => {

    event.preventDefault()

    const target = event.target as HTMLElement;

    if (target !== resizeHandle.value) return

    document.body.style.cursor = 'n-resize';
    resizing.value = true;


    const onMouseMove = (event: MouseEvent) => {
        if (resizing.value) {
            const newHeight = window.innerHeight - event.clientY;

            if (newHeight < window.innerHeight) {
                terminalConfig.height = Math.max(newHeight, MIN_HEIGHT);
            }
        }
    };

    const onMouseUp = () => {
        document.body.style.cursor = 'auto';
        resizing.value = false;
        // Remove event listeners when resizing is done
        window.removeEventListener('mousemove', onMouseMove);
        window.removeEventListener('mouseup', onMouseUp);
    };

    // Add event listeners for mouse move and mouse up events
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
};

window.addEventListener('mousedown', startResize)


window.addEventListener('resize', (event) => {
    if (terminalConfig.height >= window.innerHeight) {
        terminalConfig.height = window.innerHeight;
    }
})

</script>

<style scoped>
.terminal-wraper {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: fit-content;
    z-index: 100;
    border-top: 1px solid var(--transparent-bg);
    background-color: var(--secondary-color);
}

.resize-handle-terminal {
    height: 0.25rem;
    background-color: var(--accent-color);
    opacity: 0;
    position: absolute;
    top: 0;
    width: 100%;
    transform: translateY(-50%);
    z-index: 10;
}

.resize-handle-terminal:hover {
    opacity: 1;
    cursor: n-resize;
}

.default-terminal-toolbar {
    padding: 0.5rem 1rem;
    user-select: none;
}
</style>