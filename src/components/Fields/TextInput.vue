<template>
    <div class="string-input-wrapper">
        <textarea rows="6" value="" @input="updateCurrentValue" placeholder="Type something here..."
            @focus="nodeEditor.canZoom = true" @blur="nodeEditor.canZoom = false">
        </textarea>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { nodeEditor } from "../../stores/nodeEditor.js"
import { InterfaceC } from '../../classes/Interface';

const currentValue = ref('');

const props = defineProps({
    data: {
        interface: InterfaceC,
        options: Object
    },
    updateHandler: Function
})


const updateCurrentValue = (event) => {
    currentValue.value = event.target.value;
    props.updateHandler({ interfaceId: props.data.interface.id, value: currentValue.value })
};

</script>

<style scoped>
textarea {
    width: 100%;
    background-color: var(--secondary-color);
    color: var(--tertiary-color);
    padding: 0.5rem;
    user-select: text;
    border-radius: 0.1rem;
    word-break: break-all;
    word-wrap: break-word;
    resize: none;
    border: none;
}
</style>
