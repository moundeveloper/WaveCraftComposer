<template>
    <div class="default-template-wraper">
        {{ data.options.label || "Value" }}
    </div>
</template>

<script setup lang="ts">
import type { ComponentOptions } from '@/types/InterfaceComponent';
import type { FieldProps } from './types';

const props = defineProps<FieldProps>()
</script>

<style  scoped>
.default-template-wraper {
    padding: 0.5rem 1rem;
}
</style>