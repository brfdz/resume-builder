<template>
    <div class="personal-container">
        <h3>Personal Details</h3>
        <div class="personal-inputs">
            <div class="input-container" 
            v-for="(value, key) in localDetails" :key="key">
              <input-field
                v-model="localDetails[key]"
                :field="key"
                :label="formatLabel(key)"
               ></input-field>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            modelValue: Object
        },
        emits: ['update:modelValue'],
        computed: {
            localDetails: {
                get(){
                    return this.modelValue;
                },
                set(value){
                    this.$emit('update:modelValue', value);
                }
            }
        },
        methods: {
            formatLabel(text) {
                // format the input label from camel case to title case
                const result = text.replace(/([A-Z])/g, ' $1');
                return result.charAt(0).toUpperCase() + result.slice(1);
            }
        },
    };
</script>

<style>
    .personal-inputs{
        display: flex;
        flex-flow: wrap;
    }

    .input-container {
        flex: 0 0 calc(50% - 20px);
        margin: 0.5rem auto;
        margin-left: 0;
    }
</style>