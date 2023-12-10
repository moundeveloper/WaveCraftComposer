<template>
    <div class="default-template-wraper">
        {{ data?.options?.label || "Value" }}
    </div>
</template>

<script setup lang="ts">
import type { HElementProps } from './types';

defineProps<HElementProps>()
</script>

<style  scoped>
.default-template-wraper {
    padding: 0.5rem 1rem;
}
</style>