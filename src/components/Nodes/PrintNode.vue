<template>
    <div class="node-header">
        <img src="../../assets/icons/print-icon.svg" alt="">
        <span>{{ node.name }}
        </span>
    </div>

    <!-- Input fields -->
    <div v-for="input in node.inputInterfaces" class="node-field left-field">
        <div :id="input.id" class="interface in"></div>
        <div class="field ">
            <div class="print-in-wraper">
                <span>value</span>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { NodeComponent } from '@/types/NodeComponent';
const props = defineProps<{
    node: NodeComponent
}>()

</script>

<style  scoped>
.print-in-wraper {
    padding: 0.5rem;
}

span {
    font-weight: 100;
    overflow: hidden;
    width: 60%;
    text-transform: capitalize;
}

.node-header {
    padding: 0.5rem 1rem;
    background-color: #5458AD;
    border-top-left-radius: 0.25rem;
    border-top-right-radius: 0.25rem;
    grid-column: 1/4;
    height: 2.5rem;
    display: flex;
    align-items: center;
    gap: 1rem;
}

.node-header span {
    margin-right: auto;
    color: var(--primary-color);
    font-weight: 600;
    user-select: none;
    pointer-events: none;
}

.node-header img {
    height: 1.1rem;
}

.node-field {
    display: flex;
    position: relative;
    align-items: flex-start;
    text-transform: capitalize;
    gap: 0.4rem;
    width: 100%;
}


.left-field {
    grid-column: 1/3;
    justify-self: flex-start;
}

.right-field {
    z-index: 4;
    grid-column: 2/4;
    justify-self: flex-end;
    justify-content: flex-end;
}


.field {
    flex-grow: 1;
}

.interface {
    min-width: .6rem;
    aspect-ratio: 1/4;
    transform: translateY(-5%);
}

.in {
    background-color: var(--input-color);

}

.out {
    background-color: var(--output-color);
}
</style>