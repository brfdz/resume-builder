<template>
    <div class="experience">
        <div class="input-container">
            <label for="jobTitle" class="form-label">Job Title</label>
            <input @input="$emit('update:jobTitle', $event.target.value)" 
                id="jobTitle" type="text" class="form-control bg-secondary-subtle"/>
        </div>
        <div class="input-container">
            <label for="employer" class="form-label">Employer</label>
            <input @input="$emit('update:employer', $event.target.value)" 
                id="employer" type="text" class="form-control bg-secondary-subtle"/>
        </div>
        <div class="input-container">
            <label for="dates" class="form-label">Start & End Dates</label>
            <div class="input-dates-container">
                <input @input="$emit('update:startDate', formattedStartDate)"
                    id="dates" type="month" class="form-control bg-secondary-subtle" 
                    v-model="startDate" />
                <input @input="$emit('update:endDate', formattedEndDate)"
                    id="dates" type="month" class="form-control bg-secondary-subtle"
                    v-model="endDate"/>
            </div>
        </div>
        <div class="input-container">
            <label for="city" class="form-label">City</label>
            <input @input="$emit('update:city', $event.target.value)"
                id="city" type="text" class="form-control bg-secondary-subtle"/>
        </div>
        <div class="input-desc">
            <label for="desc" class="form-label">Description</label>
            <textarea @input="$emit('update:description', $event.target.value)"
                id="desc" class="form-control bg-secondary-subtle" rows="4"></textarea>
        </div>
        <button class="btn btn-dark" @click="$emit('delete-experience')">Delete</button>
    </div>
</template>

<script>
    export default {
        emits: ['update:jobTitle',
                'update:employer',
                'update:startDate',
                'update:endDate',
                'update:city',
                'update:description',
                'delete-experience'
        ],
        data(){
            return{
                startDate: '',
                endDate: '',
            };
        },
        computed: {
            formattedStartDate(){
                if (this.startDate) {
                    return this.formatDate(this.startDate);
                } else {
                    return '';
                }
            },
            formattedEndDate(){
                if (this.endDate) {
                    return this.formatDate(this.endDate);
                } else {
                    return '';
                }
            }
        },
        methods: {
            formatDate(inputDate){
                const [year, month] = inputDate.split('-');
                const date = new Date(year, month - 1);  
                const options = { year: 'numeric', month: 'long' };
                return date.toLocaleDateString('en-US', options);
            },
        }
    }
</script>

<style>
    .experience{
        display: flex;
        flex-flow: wrap;
    }

    .input-container {
        flex: 0 0 calc(50% - 20px);
        margin: 0.5rem auto;
        margin-left: 0;
    }

    .input-desc {
        width: 100%;
        margin-bottom: 0.5rem;
    }

    .input-dates-container{
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        row-gap: 10px;
    }

    #dates{
        font-size: small;
    }
</style>