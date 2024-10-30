<template>
     <base-input-group>
        <base-input :inputId="jobTitleId" @update-value="updateExperienceValue($event, 'jobTitle', groupIndex)">Job Title</base-input>
        <base-input :inputId="employerId" @update-value="updateExperienceValue($event, 'employer', groupIndex)">Employer</base-input>
        <base-input :inputId="startId" inputType="month" @update-value="updateDateValue($event, 'startDate')">Start Date</base-input>
        <base-input :inputId="endId" inputType="month" @update-value="updateDateValue($event,'endDate')">End Date</base-input>
        <base-input :inputId="cityId" @update-value="updateExperienceValue($event, 'city', groupIndex)">City</base-input>
        <base-input :inputId="countryId" @update-value="updateExperienceValue($event, 'country', groupIndex)">Country</base-input>
        <div class="experience-description">
            <label :for="descriptionId" class="form-label">Description</label>
            <textarea 
                @input="updateExperienceValue($event.target.value, 'description', groupIndex)"
                :id="descriptionId"
                class="form-control bg-secondary-subtle" 
                rows="4"></textarea>
        </div>
        <button class="btn btn-dark" @click="deleteExperience(groupIndex)">Delete</button>
    </base-input-group> 
</template>

<script>
    export default {
        props: ['groupId', 'groupIndex'],
        inject: ['updateExperienceValue', 'deleteExperience'],
        data(){
            return{
                jobTitleId: 'jobTitle' + this.groupId,
                employerId: 'employer' + this.groupId,
                startId: 'startDate' + this.groupId,
                endId: 'endDate' + this.groupId,
                cityId: 'city' + this.groupId,
                countryId: 'country' + this.groupId,
                descriptionId: 'description' + this.groupId,
            };
        },
        methods: {
            updateDateValue(value, field){
                if (!value){
                    return;
                } 
                const formattedDate = this.formatDate(value);
                this.updateExperienceValue(formattedDate, field, this.groupIndex);
            },
            formatDate(inputDate){
                const [year, month] = inputDate.split('-');
                const date = new Date(year, month - 1);  
                const options = { year: 'numeric', month: 'long' };
                return date.toLocaleDateString('en-US', options);
            },
        }
    }
</script>

<style scoped>
    .experience-description{
        width: 100%;
        margin-bottom: 0.5rem;
    }
</style>