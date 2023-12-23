<template>
    <Teleport to="body">
        <div v-show="showModal" class="modal-wraper" @click="handleOutsideClick">
            <div class="modal-body" ref="modalBody">
                <slot name="activator" :openModal="openModal" :closeModal="closeModal"></slot>
            </div>
        </div>
    </Teleport>
</template>

<script setup lang="ts">
import { ref } from "vue";
const showModal = ref(false)
const modalBody = ref()

const openModal = () => {
    showModal.value = true
}
const closeModal = () => {
    showModal.value = false
}

const handleOutsideClick = (event: MouseEvent) => {
    if (!modalBody.value) return
    if (!modalBody.value.contains(event.target)) {
        closeModal()
    }
}

defineExpose({
    openModal, closeModal
})

</script>

<style scoped>
.modal-wraper {
    position: absolute;
    top: 0;
    left: 0;
    height: 100vh;
    width: 100%;
    background-color: var(--transparent-bg);
    z-index: 5;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    padding-top: 12rem;
}

.modal-body {
    background-color: var(--primary-color);
    border-radius: 0.1rem;
    padding: 2rem;
    width: clamp(350px, 3vw, 400px);
}
</style>