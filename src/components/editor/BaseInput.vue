<template>
    <div class="base-input">
        <label class="form-label text-secondary" :for="inputId">
            <slot></slot>
        </label>
        <slot name="input">
            <input class="form-control bg-secondary-subtle"
            :type="inputFieldType"
            :id="inputId"
            :name="inputId"
            :placeholder=" inputFieldType == 'month'? 'YYYY-MM': null"
            v-model="inputValue"/>
            <div v-if="inputType == 'month'" class="checker">
                <input type="checkbox" name="format" id="format" checked
                v-model="isFormatOpen"/>
                <label for="format">Format</label>
            </div>
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
        methods:{
            sendData(value){
                if(this.inputType != 'month'){
                    this.$emit('update-value', value);
                    return;
                }
                // Format date value
                if (!value){
                    value= '';
                    this.$emit('update-value', value);
                    return;
                }   
                else if(this.dateRegex.test(value) && this.isFormatOpen){ 
                    const formattedDate = this.formatDate(value);
                    this.$emit('update-value', formattedDate);
                    return;
                }
                // input from browsers that don't support the "month" type or format is closed
                this.$emit('update-value', value);
            },
            formatDate(inputDate){
                const [year, month] = inputDate.split('-');
                const date = new Date(year, month - 1);  
                const options = { year: 'numeric', month: 'short' };
                return date.toLocaleDateString('en-US', options);
            },
        },
        watch: {
            inputValue(value){
                this.sendData(value);
            },
            isFormatOpen(format, prevFormat){
                this.inputFieldType = format ? "month": "text";
                if(!prevFormat){
                    this.inputValue = '';
                }
                this.sendData(this.inputValue);
            },
        },
        data(){
            return{
                inputFieldType: this.inputType,
                inputValue: '',
                isFormatOpen: true,
                dateRegex: /^\d{4}\-\d{2}$/,
            };
        },
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

    .checker{
        display: flex;
        align-items: center;
        column-gap: 5px;
        margin-top: 0.5rem;
    }

    .checker label{
        font-size: 0.7rem;
        color: #0d6efd;
    }

    .checker input {
        height: 1rem;
        /* accent-color:  rgb(209, 30,53); */
    }
</style>