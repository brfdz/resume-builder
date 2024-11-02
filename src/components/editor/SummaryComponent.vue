<template>
    <div class="summary-container">
        <h3>Professional Summary</h3>
        <base-input>
            Your Profile
            <template #input>
                <textarea class="form-control bg-secondary-subtle" id="summary" rows="4"
                    @input="$emit('update:modelValue', $event.target.value)"></textarea>
            </template>
        </base-input>
    </div>
</template>

<script>
    export default {
        props: {
            summary: {
                type: String,
                default: ''
            }
        },
        emits: ['update:modelValue']
    }
</script>

<style>
    .summary-container {
        width: 100%;
    }

</style>