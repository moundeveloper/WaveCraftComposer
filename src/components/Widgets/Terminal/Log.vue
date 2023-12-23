<template>
    <div class="log-wraper">
        <span>{{ log.message }}</span>
    </div>
</template>

<script setup lang="ts">
import type { Log } from '@/stores/terminal';

const props = defineProps<{ log: Log }>()
</script>

<style scoped>
.log-wraper {
    padding: 1rem;
    background-color: var(--secondary-color);
}
</style>