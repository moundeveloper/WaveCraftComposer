<template>
    <Icon />
</template>

<script setup lang="ts">
import VariableIcon from './VariableIcon.vue';
import PrintIcon from './PrintIcon.vue';
import { createHComponent } from '@/composables/createHElement';

const props = defineProps<{
    iconName: string
}>()

const Icon = () => {
    const iconName = props.iconName
    switch (iconName) {
        case 'variable':
            return createHComponent(VariableIcon)
            break
        case 'print':
            return createHComponent(PrintIcon)
            break
            break
        default:
            return createHComponent(VariableIcon)
            break
    }
}
</script>
