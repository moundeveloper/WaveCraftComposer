<template>
    <div class="icon">

        <svg v-if="iconName === 'number'" :width="`${size}px`" :fill="color" xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24">
            <g fill="none">
                <path
                    d="M11.256 12.999l.238-1.5h1.481l-.237 1.5h-1.482zM17.75 2a2.25 2.25 0 0 1 2.245 2.096L20 4.25v15.498a2.25 2.25 0 0 1-2.096 2.245l-.154.005H6.25a2.25 2.25 0 0 1-2.245-2.096L4 19.748V4.25a2.25 2.25 0 0 1 2.096-2.245L6.25 2h11.5zm-5.355 13.16a.75.75 0 1 0 1.482.234l.142-.895h.731a.75.75 0 0 0 0-1.5h-.494l.238-1.5h.756a.75.75 0 0 0 0-1.5h-.519l.162-1.025a.75.75 0 1 0-1.481-.234l-.2 1.259h-1.48l.161-1.025a.75.75 0 1 0-1.481-.234l-.2 1.259H9.25a.75.75 0 0 0 0 1.5h.725l-.237 1.5H8.75a.75.75 0 0 0 0 1.5h.75l-.105.66a.75.75 0 0 0 1.482.235l.142-.895H12.5l-.105.66z"
                    :fill="color"></path>
            </g>
        </svg>

        <svg v-if="iconName === 'string'" :width="`${size}px`" :fill="color" xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 48 48">
            <g fill="none">
                <path
                    d="M4 12.75A4.75 4.75 0 0 1 8.75 8h30.5A4.75 4.75 0 0 1 44 12.75v22.5A4.75 4.75 0 0 1 39.25 40H8.75A4.75 4.75 0 0 1 4 35.25v-22.5zm9.25 9.75a1.25 1.25 0 1 0 0 2.5h17.5a1.25 1.25 0 1 0 0-2.5h-17.5zM12 30.25c0 .69.56 1.25 1.25 1.25h13.5a1.25 1.25 0 1 0 0-2.5h-13.5c-.69 0-1.25.56-1.25 1.25zM13.25 16a1.25 1.25 0 1 0 0 2.5h9.5a1.25 1.25 0 1 0 0-2.5h-9.5z"
                    :fill="color"></path>
            </g>
        </svg>

        <svg v-else-if="iconName === 'arrow-up'" :width="`${size}px`" :fill="color" xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24">
            <path d="M0 0h24v24H0z" fill="none" />
            <path d="M5 10l7-7 7 7H5z" :fill="color" />
        </svg>


        <svg v-else-if="iconName === 'arrow-down'" :width="`${size}px`" :fill="color" xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24">
            <path d="M0 0h24v24H0z" fill="none" />
            <path d="M5 14l7 7 7-7H5z" :fill="color" />
        </svg>
        <!-- Add more icons with additional v-else-if blocks as needed -->
    </div>
</template>

<script setup lang="ts">

;

const props = withDefaults(defineProps<{
    iconName: string;
    size?: string;
    color?: string;
}>(), {
    size: "20",
    color: "white",
});
</script>

<style scoped>
.icon {
    display: inline-block;
}
</style>
