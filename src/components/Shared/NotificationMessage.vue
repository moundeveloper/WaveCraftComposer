<!-- NotificationMessage.vue -->
<template>
    <Teleport to="body">
        <div v-if="notification.visible" :class="['notification', notification.type]">
            <p class="title">{{ notification.title }}</p>
            <p class="description">{{ notification.description }}</p>
        </div>
    </Teleport>
</template>

<script setup lang="ts">
import { ref } from 'vue';


const notification = ref({
    visible: false,
    type: '',
    title: '',
    description: ''
});

let timeoutId: any = null;

const showNotification = (type: string, title: string, description: string) => {
    // Clear previous timeout if it exists
    if (timeoutId) {
        clearTimeout(timeoutId);
    }

    // Set notification properties
    notification.value.visible = true;
    notification.value.type = type;
    notification.value.title = title;
    notification.value.description = description;

    // Hide notification after 5 seconds
    timeoutId = setTimeout(() => {
        hideNotification();
    }, 5000);
};

const hideNotification = () => {
    // Hide the notification
    notification.value.visible = false;
    // Clear the timeout
    if (timeoutId) {
        clearTimeout(timeoutId);
    }
};

defineExpose({ showNotification, hideNotification });
</script>

<style scoped>
.notification {
    position: absolute;
    margin: 1rem;
    bottom: 0;
    right: 0;
    padding: 1rem;
    border-radius: 0.5rem;
    color: #fff;
    font-weight: bold;
    z-index: 9999;
}

.error {
    background-color: red;
}

.warning {
    background-color: orange;
}

.success {
    background-color: green;
}

.info {
    background-color: rgb(0, 92, 128);
}

.title {
    margin: 0;
    font-size: 18px;
}

.description {
    margin: 0;
    font-size: 14px;
}
</style>
