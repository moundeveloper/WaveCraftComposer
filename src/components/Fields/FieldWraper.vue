<template>
    <Field />
</template>

<script setup lang="ts">
import DropDown from './DropDown.vue';
import NumberInput from '@/components/Fields/NumberInput.vue';
import TextInput from './TextInput.vue';
/* import ArrayItem from './ArrayItem.vue'; */
import type { InterfaceComponent, ComponentOptions } from '@/types/InterfaceComponent';
import { createHField } from '@/composables/createHElement';
import type { HElementProps } from "./types"
import DefaultTemplate from './DefaultTemplate.vue';

const props = defineProps<{ field: HElementProps }>();

const Field = () => {
    const fieldName = props.field.data.options?.component

    switch (fieldName) {
        case 'NumberInput':
            return createHField(NumberInput, props.field);
            break;
        case 'DropDown':
            return createHField(DropDown, props.field);
            break;
        case 'TextInput':
            return createHField(TextInput, props.field);
            break;
        case "DefaultTemplate":
            return createHField(DefaultTemplate, props.field);
            break;
        /*         case "ArrayItem":
                    return createHField(ArrayItem, props.field);
                    break; */
        default:
            return createHField(DefaultTemplate, props.field);
            break;
    }
}

</script>