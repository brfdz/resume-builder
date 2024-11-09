<template>
    <div class="summary-container">
        <h3>Professional Summary</h3>
        <base-input>
            Your Profile
            <template #input>
                <textarea class="form-control bg-secondary-subtle" id="summary" rows="4" maxlength="2000"
                :value=propValue @input="updateSummary($event.target.value)"></textarea>
            </template>
        </base-input>
    </div>
</template>

<script>
    export default {
        props: {
            modelValue: {
                type: String,
                default: ''
            }
        },
        emits: ['update:modelValue'],
        watch: {
            modelValue(val){
                this.propValue = val;
            },
        },
        data(){
            return {
                propValue: '',
            };
        },
        methods: {
            updateSummary(value){
                this.$emit('update:modelValue', value);
                localStorage.setItem('profSummary', value);
            }
        },
    }
</script>

<style>
    .summary-container {
        width: 100%;
    }
</style>