<template>
    <Teleport to="body">
        <div ref="dialog" class="dialog" v-show="isDialogOpen" :style="{ top: dialogTop + 'px', left: dialogLeft + 'px' }">
            <slot name="activator" :closeDialog="closeDialog"></slot>
        </div>
    </Teleport>
</template>

<script setup lang="ts">
import { Position } from '@/types/Position';
import { ref, onMounted, onUnmounted, } from 'vue';

const dialog = ref()
const isDialogOpen = ref(false);
const dialogLeft = ref(0)
const dialogTop = ref(0)

const props = defineProps<{
    position: {
        x: number,
        y: number
    }
}>()

const handleKeyDown = (event: KeyboardEvent) => {
    if (event.shiftKey && event.key === 'A') {
        event.preventDefault();
        openDialog();
    }
};

const handleMouseOutside = (event: MouseEvent) => {
    closeDialog();
};

const openDialog = () => {
    isDialogOpen.value = true;
    dialogLeft.value = props.position.x
    dialogTop.value = props.position.y
    dialog.value.addEventListener('mouseleave', handleMouseOutside);
};

const closeDialog = () => {
    isDialogOpen.value = false;
    dialog.value.removeEventListener('mouseleave', handleMouseOutside);
};

onMounted(() => {
    document.addEventListener('keydown', handleKeyDown);
});

onUnmounted(() => {
    document.removeEventListener('keydown', handleKeyDown);
    dialog.value.removeEventListener('mouseleave', handleMouseOutside);
});

</script>

<style scoped>
.dialog {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: var(--primary-color);
    border-radius: 0.1rem;
    padding: 2rem;
    max-width: 30rem;
    min-width: 400px;
    width: clamp(350px, 3vw, 400px);
    z-index: 4;
    border-radius: 0.1rem;
    outline: 1px solid var(--tertiary-color);
}
</style>