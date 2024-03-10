<template>
    <div class="log-wraper" :class="logStatus()">
        <span>{{ log.message }}</span>
    </div>
</template>

<script setup lang="ts">
import { Status, type Log } from '../../../stores/terminal';

const props = defineProps<{ log: Log }>()

const logStatus = () => {
    switch (props.log.status) {
        case Status.SUCCESS:
            return 'success-log';
        case Status.ERROR:
            return 'error-log';
        case Status.INFO:
            return 'info-log';
        default:
            return '';
    }
}
</script>

<style scoped>
.log-wraper {
    padding: 1rem;
    background-color: var(--background-color);
}

.error-log {
    background-color: var(--pastel-red);
}

.success-log {
    background-color: var(--light-green);
}

.info-log {
    background-color: var(--pastel-blue);
}
</style>