<template>
    <div class="string-input-wrapper">
        <textarea rows="6" value="" @input="updateCurrentValue" placeholder="Type something here..."
            @focus="nodeEditor.canZoom = true" @blur="nodeEditor.canZoom = false">
        </textarea>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useNodeEditor } from "../../stores/nodeEditor.js"
import type { DataProps } from './types';

const currentValue = ref('');


const nodeEditor = useNodeEditor()

const props = defineProps<{
    data: DataProps,
    updateHandler: Function,
}>();


const updateCurrentValue = (event: Event) => {
    if (event && 'target' in event) {
        const target = event.target as HTMLInputElement;
        currentValue.value = target.value;
        props.updateHandler({ interfaceId: props.data.interface.id, value: currentValue.value });
    }
};



</script>

<style scoped>
textarea {
    width: 100%;
    background-color: var(--secondary-color);
    color: var(--tertiary-color);
    padding: 0.5rem;
    border-radius: 0.1rem;
    word-break: break-all;
    word-wrap: break-word;
    resize: none;
    border: none;
}
</style>
