<template>
    <div class="number-input-wraper">
        <button @click="handleSubtract">
            <img src="../../assets/icons/down-arrow-icon.svg" alt="">
        </button>
        <div class="number-input-body" @mousedown="startDrag" @mousemove="handleDrag" @mouseup="stopDrag"
            @dblclick="handleDoubleClick">
            <span>{{ data.options?.label }}</span>
            <span>{{ computedValue }}</span>
        </div>
        <button @click="handleAdd">
            <img src="../../assets/icons/down-arrow-icon.svg" alt="">
        </button>
        <div ref="editableElement" v-if="editable" @keydown="handleKeyDown" @blur="handleClickOutside"
            class="editable-value" contenteditable="true">
            {{ computedValue }}</div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, nextTick, watch } from 'vue';
import type { DataProps } from './types';


const props = defineProps<{
    data: DataProps,
    updateHandler: Function,
}>();

const currentValue = ref(props.data.options?.value)
const editable = ref(false)
const editableElement = ref<HTMLElement | null>(null)

let isDragging = false
let startX = 0;
let startValue = 0;

const computedValue = computed(() => {
    return currentValue.value.toFixed(3);
});

const handleSubtract = () => {
    currentValue.value--
}
const handleAdd = () => {
    currentValue.value++
}

const handleDoubleClick = () => {
    editable.value = !editable.value
    nextTick(() => {
        if (editableElement.value === null) return
        editableElement.value.focus()
        selectElementContent(editableElement.value);
    })

}

const selectElementContent = (element: HTMLElement) => {
    const range = document.createRange();
    range.selectNodeContents(element);

    const selection = window.getSelection();
    if (selection === null) return
    selection.removeAllRanges();
    selection.addRange(range);
};


const handleKeyDown = (event: KeyboardEvent) => {
    if (event.keyCode === 13 || event.key === 'Enter') {
        event.preventDefault();
        if (event.target === editableElement.value) {
            const value = editableElement.value?.innerText
            if (value === undefined) return
            if (!isNaN(parseInt(value))) {
                currentValue.value = +value
            }
            editable.value = false
        }
    }
}

const handleClickOutside = (event: FocusEvent) => {
    const value = editableElement.value?.innerText
    if (value === undefined) return
    if (!isNaN(parseInt(value))) {
        currentValue.value = +value
    }
    editable.value = false
}


const startDrag = (event: MouseEvent) => {
    isDragging = true;
    startX = event.clientX;
    startValue = parseFloat(currentValue.value);
};

const handleDrag = (event: MouseEvent) => {
    if (!isDragging) return;
    const diffX = event.clientX - startX;
    const newValue = startValue + (diffX / 1000);
    currentValue.value = newValue;
};

const stopDrag = () => {
    isDragging = false;
};

watch(currentValue, (newValue) => {
    props.updateHandler({ interfaceId: props.data.interface.id, value: newValue })
})

</script>

<style scoped>
.number-input-wraper {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 2rem;
    overflow: hidden;
    border-radius: 0.1rem;
    position: relative;
}

.number-input-wraper>* {
    height: 100%;
}

button {
    background-color: var(--accent-color);
    border: none;
    cursor: pointer;
    padding-inline: 0.2rem;
}

button:active {
    background-color: var(--secondary-color);
}

button:first-child img {
    transform: rotate(90deg);
}

button:last-child img {
    transform: rotate(270deg);
}

.number-input-body {
    background-color: var(--secondary-color);
    flex-grow: 1;
    display: flex;
    align-items: center;
    padding-inline: 0.5rem;
    justify-content: space-between;
}

.editable-value {
    position: absolute;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    background-color: var(--secondary-color);
    padding-inline: 0.5rem;
}

.editable-value:focus-visible {
    outline-color: var(--tertiary-color);
}
</style>