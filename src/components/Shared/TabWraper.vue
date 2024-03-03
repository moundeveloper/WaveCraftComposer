<template>
    <div class="tab-wraper" :style="{ height: height + 'px' }">
        <div class="tabs">
            <div v-for="( tab, index ) in  tabs " :key="index" @click="selectTab(index)"
                :class="{ active: selectedTab === index }">
                <h2>
                    {{ tab.label }}
                </h2>
            </div>
        </div>
        <div class="tab-content" :id="id">
            <template v-for="( tab, index ) in  tabs" :key="index">
                <!-- Your tab content goes here -->
                <Tab v-if="selectedTab === index" />
            </template>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { createHComponent } from '@/composables/createHElement';

import { genId } from '@/utils/utility';

const selectedTab = ref(0);
const props = defineProps<{
    tabs: Array<{
        label: string,
        hComponent: object,
    }>,
    height: number
}>()

const id = genId()


const selectTab = (index: number) => {
    selectedTab.value = index;
};

const Tab = () => {
    return createHComponent(props.tabs[selectedTab.value].hComponent)
}

</script>

<style scoped>
.tab-wraper {
    border-top: 1px solid var(--accent-color);
    position: relative;
    display: flex;
    flex-direction: column;
}

.tabs {
    display: flex;
    background-color: var(--primary-accent-color);
}

.tabs div {
    cursor: pointer;
    padding: 8px 16px;
    border-bottom: none;
    background-color: var(--secondary-color);
}

.tabs div h2 {
    color: var(--tertiary-color);
    font-size: 1rem;
    user-select: none;
}

.tabs div.active {
    background-color: var(--tertiary-color);
}

.tabs div.active h2 {
    color: var(--secondary-color);
}

.tab-content {
    overflow: hidden;
    flex-grow: 1;
    background-color: var(--primary-color);
}

.tab-content * {
    outline: 1px solid white;
}
</style>