<template>
    <div class="array-wraper">
        <FieldWraper v-for="(subInterface, i) in data.options.subInterfaces" :field="{
            fieldName: subInterface.component,
            data: {
                interface: subInterface,
                options: subInterface.options
            }, updateHandler:
                selectHandler(subInterface.component)
        }" :key="i" />

        <button class="delete-interface-btn" @click="deleteArrayInterface()">
            <img src="../../assets/icons/delete.svg" alt="">
        </button>
    </div>
</template>

<script setup>
import { InterfaceC } from '../../classes/Interface';
import { nodeEditor } from '../../stores/nodeEditor';

const props = defineProps({
    data: {
        interface: InterfaceC,
        options: {
            label: String,
            subInterfaces: Array[InterfaceC]
        }
    },
    updateHandler: Function
})


const currentState = reactive({
    interfaceType: "number",
    interfaceComponent: "NumberInput"
})

const selectHandler = (component) => {
    if (component === "DropDown") {
        return handleUpdatedType
    }
    return handleUpdatedValue
}


const handleUpdatedValue = ({ value }) => {
    console.log("log from value: " + value)
    /* props.interface.setInterfaceValue(value) */
}

const handleUpdatedType = ({ value }) => {
    console.log("log from type: " + value)
    props.data.interface.setCurrentState(value)
}

const deleteArrayInterface = () => {
    const node = nodeEditor.nodes.find(node => node.inputs.find(input => input.id === props.data.interface.id))
    const state = node.getStateByType("array")
    state.inputs = state.inputs.filter(input => input.id !== props.data.interface.id)
    node.setCurrentState("array")
}

// Make the delink work for when an array item gets deleted
// Make array item not add interfaces if it's already connected by another
// variable and also make it for variable node as well


watch(props.data.interface, (newVal) => {
    // De-link all nodes if variable-type doesn't match anymore
    console.log(nodeEditor.isInterfaceConnected(props.data.interface))
    const link = nodeEditor.findLinkConnectedByInterface(props.data.interface)
    if (!link) return
    const path = nodeEditor.removeConnectedTargetLink(link)
    path.remove()
});

</script>

<style scoped>
.drop-down {
    margin-bottom: 1rem;
}

.array-wraper {
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.delete-interface-btn {
    font-size: .7rem;
    position: absolute;
    top: 0.75rem;
    right: -0.85rem;
    background-color: transparent;
    border: none;
    outline: none;
    color: var(--tertiary-color);
    cursor: pointer;
}
</style>