<template>
    <div class="number-input-wraper">
        <button @click="handleSubtract">
            <img src="../../assets/icons/down-arrow-icon.svg" alt="">
        </button>
        <div class="number-input-body" @mousedown="startDrag" @mousemove="handleDrag" @mouseup="stopDrag"
            @dblclick="handleDoubleClick">
            <span>{{ data.options.label }}</span>
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

<script setup>
import { ref, computed, nextTick, watch } from 'vue';
import { InterfaceC } from '../../classes/Interface';


const props = defineProps({
    data: {
        interface: InterfaceC,
        options: {
            label: String,
            defaultValue: Number
        }
    },
    updateHandler: Function
})

const currentValue = ref(props.data.options.defaultValue)
const editable = ref(false)
const editableElement = ref(null)

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
        editableElement.value.focus()
        selectElementContent(editableElement.value);
    })

}

const selectElementContent = (element) => {
    const range = document.createRange();
    range.selectNodeContents(element);

    const selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);
};


const handleKeyDown = (event) => {
    if (event.keyCode === 13 || event.key === 'Enter') {
        event.preventDefault();
        if (event.target === editableElement.value) {
            const value = editableElement.value?.innerText
            if (!isNaN(value)) {
                currentValue.value = +value
            }
            editable.value = false
        }
    }
}

const handleClickOutside = (event) => {
    const value = editableElement.value?.innerText
    if (!isNaN(value)) {
        currentValue.value = +value
    }
    editable.value = false
}


const startDrag = (event) => {
    isDragging = true;
    startX = event.clientX;
    startValue = parseFloat(currentValue.value);
};

const handleDrag = (event) => {
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