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
            :value="propValue"
            @input="sendData($event.target.value)"
            />
            
            <div v-if="inputType == 'month'" class="checker">
                <input type="checkbox" name="format" id="format" checked
                v-model="isFormatOpen" @change="toggleFormat"/>
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
           value: {
            type:String
           },
           dateValue: {
            type: String
           }
        },
        emits:['update-value'],
        data(){
            return{
                inputFieldType: this.inputType,
                isFormatOpen: true,
                dateRegex: /^\d{4}\-\d{2}$/,
                formattedDatePattern: /^(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec) \d{4}$/,
                monthMap: {
                    Jan: '01', Feb: '02', Mar: '03', Apr: '04', May: '05', Jun: '06',
                    Jul: '07', Aug: '08', Sep: '09', Oct: '10', Nov: '11', Dec: '12'
                },
                propValue: '',
            };
        },
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
                // format is closed
                else if(!this.isFormatOpen){
                    this.$emit('update-value', value);
                }
            },
            toggleFormat(){
                this.inputFieldType = this.isFormatOpen ? "month": "text";
                if(!this.isFormatOpen){
                    this.inputValue = '';
                }
                this.sendData(this.inputValue);
            },
            formatDate(inputDate){
                const [year, month] = inputDate.split('-');
                const date = new Date(year, month - 1);  
                const options = { year: 'numeric', month: 'short' };
                return date.toLocaleDateString('en-US', options);
            },
            reverseFormat(value){
                const [monthShort, year] = value.split(' ');
                const month = this.monthMap[monthShort];
                return year + '-' + month;
            },
        },
        mounted(){
            if(this.dateValue){
                if (this.formattedDatePattern.test(this.dateValue)) {
                    this.propValue = this.reverseFormat(this.dateValue);
                } 
                else{
                    this.isFormatOpen = false;
                    this.inputFieldType = "text";
                    this.propValue = this.dateValue;
                }
            }
            else{
                this.propValue = this.value;
            }
        },
        watch: {
            value(val){
                this.propValue = val;
            },
            dateValue(val){
                if(this.isFormatOpen && this.formattedDatePattern.test(val)){
                    this.propValue = this.reverseFormat(val);
                }
                else{
                    this.propValue = val;
                }
            },
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

    @media only screen and (max-width: 700px) { 
        .base-input {
            flex-basis: 100%;
        }
    }

</style>