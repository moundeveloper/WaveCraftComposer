<template>
    <div class="logs-wraper">
        <Log v-for="log in terminalStore.logs" :log="log" :key="log.id" />
    </div>
</template>

<script setup lang="ts">
import { useTerminal } from '@/stores/terminal';
import Log from '../Log.vue';


const terminalStore = useTerminal()
/* const maxHeight = computed(() => getElementHeightByID(id)) */
/* : style = "{ maxHeight: maxHeight + 'px' }" */
</script>

<style scoped>
.logs-wraper {
    height: 100%;
    overflow-y: scroll;
    padding: .5rem;
    display: flex;
    flex-direction: column;
    gap: .5rem;
}
</style>