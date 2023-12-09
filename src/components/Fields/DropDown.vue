<template>
    <div class="dropdown-wraper" ref="dropdownMenu">
        <div class="dropdown-header" @click="handleDropDown">
            {{ data.options.label }}
            <span> {{ selected }}</span>
            <img src="../../assets/icons/down-arrow-icon.svg" alt="">
        </div>
        <div v-show="currentState === states.OPENED" class="dropdown-body">
            <ul>
                <li v-for="(value, i) in data.options.values" :key="i" @click="handleDropDownSelection(value)">{{ value }}
                </li>
            </ul>
        </div>
    </div>
</template>

<script setup lang="ts">
import { InterfaceC } from '../../classes/Interface';
import type { FieldProps } from "./types"

const props = defineProps({
    data: {
        interface: InterfaceC,
        options: {
            label: String,
            values: Array
        }
    },
    updateHandler: Function
})

const states = {
    CLOSED: "closed", OPENED: "opened"
}

const currentState = ref(states.CLOSED)
const dropdownMenu = ref(null)
const selected = ref(props.data.interface?.type || props.data.options.values[0])

const handleDropDown = (event) => {
    if (event.target !== dropdownMenu)

        if (currentState.value === states.CLOSED) {
            currentState.value = states.OPENED
            return
        }

    currentState.value = states.CLOSED
}

const handleDropDownSelection = (value) => {
    selected.value = value
    currentState.value = states.CLOSED

    if (props.data.interface) {
        props.updateHandler({ interfaceId: props.data.interface.id, value: selected.value })
        return
    }
    props.updateHandler(selected.value)
}

const handleClickOutside = (event) => {
    if (!dropdownMenu.value.contains(event.target)) {
        currentState.value = states.CLOSED;
    }
}


onMounted(() => {
    window.addEventListener('click', handleClickOutside);
});

onBeforeUnmount(() => {
    window.removeEventListener('click', handleClickOutside);
});


</script>

<style  scoped>
ul {
    list-style: none;
}

img {
    width: .8rem;
}


.dropdown-wraper {
    width: 100%;
    position: relative;
}

.dropdown-header {
    display: flex;
    align-items: center;
    padding: 0.5rem 1rem;
    background-color: var(--primary-accent-color);
    border-radius: 0.1rem;
    cursor: pointer;
}

.dropdown-header span {
    margin-left: auto;
    margin-right: 1rem;
}

.dropdown-body {
    position: absolute;
    margin-top: 0.5rem;
    background-color: var(--primary-accent-color);
    width: 100%;
    padding: 0.5rem 0.5rem;
    z-index: 2;
}

ul {
    display: flex;
    flex-direction: column;
}

li {
    padding: 0.25rem 0.5rem;
    border-radius: 0.1rem;
    cursor: pointer;
}

li:hover {
    background-color: var(--secondary-color);
}
</style>