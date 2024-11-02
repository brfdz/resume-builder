<template>
    <div class="base-input">
        <label class="form-label text-secondary" :for="inputId">
            <slot></slot>
        </label>
        <slot name="input">
            <input class="form-control bg-secondary-subtle"
            :type="inputType"
            :id="inputId"
            :name="inputId"
            @input="$emit('update-value', $event.target.value)"/>
        </slot>
    </div>
</template>

<script>
    export default {
        props: {
           inputType: {
            type: String,
            default: 'text'
           },
           inputId:{
            type: String,
           },
        },
        emits:['update-value'],
    };
</script>

<style scoped>
    .base-input {
        flex: 0 0 calc(50% - 20px);
        display: flex;
        flex-direction: column;
        margin: 0.5rem auto;
        margin-left: 0;
    }

    input {
        height: 3rem;
    }

    label {
        font-size: 0.9rem;
    }
</style>