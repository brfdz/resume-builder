<template>
    <div class="input-field">
        <label :for="field" class="form-label">{{ label }}</label>
        <input  
            type="text" class="form-control bg-secondary-subtle"
            :id="field" 
            :value="modelValue"
            @input="$emit('update:modelValue', $event.target.value)"
            :disabled="label =='Photo'"> 
    </div>
</template>

<script>
    export default {
        props:{
            modelValue: {
                type:String,
                required: true},
            field: {
                type: String,
                required: true},
            label: String,    
        },
        emits: ['update:modelValue'],
    };
</script>

<style>

    .input-field {
        display: flex;
        flex-direction: column;
    }

    input {
        height: 3rem;
    }
</style>