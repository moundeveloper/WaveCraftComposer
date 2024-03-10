<template>
    <path :d="interfacesDpath" />
</template>

<script setup lang="ts">
import { watch, ref } from "vue"
import { Link } from '@/types/Link';

const props = defineProps<{
    link: Link
}>()

const interfacesDpath = ref(props.link.getDPath())

watch([props.link.sourceInterfaceComponent.parentNode?.position, props.link.targetInterfaceComponent.parentNode?.position], () => {
    interfacesDpath.value = props.link.getDPath()
})

</script>

<style scoped></style>