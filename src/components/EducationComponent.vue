<template>
    <div class="education">
        <div class="input-container">
            <label for="degree" class="form-label">Degree</label>
            <input @input="$emit('update:degree', $event.target.value)" 
                id="degree" type="text" class="form-control bg-secondary-subtle"/>
        </div>
        <div class="input-container">
            <label for="school" class="form-label">School</label>
            <input @input="$emit('update:school', $event.target.value)" 
                id="school" type="text" class="form-control bg-secondary-subtle"/>
        </div>
        <div class="input-container">
            <label for="date-edu-start" class="form-label">Start Date</label>
            <input @input="$emit('update:startDate', formattedStartDate)"
                id="date-edu-start" type="month" class="form-control bg-secondary-subtle" 
                v-model="startDate" />
        </div>
        <div class="input-container">
            <label for="date-edu-end" class="form-label">End Date</label>
            <input @input="$emit('update:endDate', formattedEndDate)"
                    id="date-edu-end" type="month" class="form-control bg-secondary-subtle"
                    v-model="endDate"/>
        </div>
        <div class="input-container">
            <label for="city" class="form-label">City</label>
            <input @input="$emit('update:city', $event.target.value)"
                id="city" type="text" class="form-control bg-secondary-subtle"/>
        </div>
        <div class="input-container">
            <label for="country" class="form-label">Country</label>
            <input @input="$emit('update:country', $event.target.value)"
                id="country" type="text" class="form-control bg-secondary-subtle"/>
        </div>
        <div class="input-desc">
            <label for="desc" class="form-label">Description</label>
            <textarea @input="$emit('update:description', $event.target.value)"
                id="desc" class="form-control bg-secondary-subtle" rows="4"></textarea>
        </div>
        <button class="btn btn-dark" @click="$emit('delete-education')">Delete</button>
    </div>
</template>

<script>
    export default {
        emits: ['update:degree',
                'update:school',
                'update:startDate',
                'update:endDate',
                'update:city',
                'update:country',
                'update:description',
                'delete-education'
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
    .education{
        display: flex;
        flex-flow: wrap;
    }
</style>