<template>
    <div class="dropdown-wraper" ref="dropdownMenu">
        <div class="dropdown-header" @click="handleDropDown">
            {{ data.options?.label }}
            <span> {{ selected }}</span>
            <img src="../../assets/icons/down-arrow-icon.svg" alt="" />
        </div>
        <div v-show="currentState === states.OPENED" class="dropdown-body">
            <ul>
                <li class="dropdown-option" v-for="(fieldOption, i) in data.options?.values" :key="i"
                    @click="handleDropDownSelection(fieldOption.label)">
                    <WaveCraftIcon v-if="fieldOption.icon !== undefined" :icon-name="fieldOption.icon" />
                    {{ fieldOption.label }}
                </li>
            </ul>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue';
import type { DataProps } from './types';
import WaveCraftIcon from "@/components/Shared/WaveCraftIcon.vue"

const props = defineProps<{
    data: DataProps,
    updateHandler: Function,
}>();

const states = {
    CLOSED: 'closed',
    OPENED: 'opened',
};

const currentState = ref(states.CLOSED);
const dropdownMenu = ref<HTMLElement | null>(null);
const selected = ref<string | null>(props.data.options?.value);

const handleDropDown = (event: MouseEvent) => {
    if (event.target !== dropdownMenu.value)
        if (currentState.value === states.CLOSED) {
            currentState.value = states.OPENED;
            return;
        }
    currentState.value = states.CLOSED;
};

const handleDropDownSelection = (value: any) => {
    selected.value = value;
    currentState.value = states.CLOSED;

    if (props.data.interface) {
        props.updateHandler({ interfaceId: props.data.interface.id, value: selected.value });
        return;
    }
    props.updateHandler(selected.value);
};

const handleClickOutside = (event: MouseEvent) => {
    if (dropdownMenu.value === null) return
    if (!dropdownMenu.value.contains(event.target as Node)) {
        currentState.value = states.CLOSED;
    }
};

onMounted(() => {
    window.addEventListener('click', handleClickOutside);
});

onBeforeUnmount(() => {
    window.removeEventListener('click', handleClickOutside);
});
</script>

<style scoped>
img {
    width: 0.8rem;
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
    list-style: none;
    padding: 0;
}

li {
    padding: 0.25rem 0.5rem;
    border-radius: 0.1rem;
    cursor: pointer;
}

.dropdown-option {
    display: flex;
    gap: 1rem;
}

li:hover {
    background-color: var(--secondary-color);
}
</style>
