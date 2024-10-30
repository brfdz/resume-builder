<template>
    <div class="summary-container">
        <h3>Professional Summary</h3>
        <div>
            <label for="summary" class="form-label">Your Profile</label>
            <textarea class="form-control bg-secondary-subtle" id="summary" rows="4"
            @input="$emit('update:modelValue', $event.target.value)"></textarea>
        </div>
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