<template>
    <div class="base-input">
        <label class="form-label" :for="inputId">
            <slot></slot>
        </label>
        <input class="form-control bg-secondary-subtle"
        :type="inputType"
        :id="inputId"
        :name="inputId"
        @input="$emit('update-value', $event.target.value)"/>
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
            required: true,
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
</style>