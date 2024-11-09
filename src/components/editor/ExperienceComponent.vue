<template>
     <base-input-group>
        <base-input :inputId="jobTitleId" :value="experiences[groupIndex]['jobTitle']" @update-value="updateExperienceValue($event, 'jobTitle', groupIndex)">Job Title</base-input>
        <base-input :inputId="employerId" :value="experiences[groupIndex]['employer']" @update-value="updateExperienceValue($event, 'employer', groupIndex)">Employer</base-input>
        <base-input :inputId="startId" :dateValue="experiences[groupIndex]['startDate']" inputType="month" @update-value="updateExperienceValue($event, 'startDate', groupIndex)">Start Date</base-input>
        <base-input :inputId="endId" :dateValue="experiences[groupIndex]['endDate']" inputType="month" @update-value="updateExperienceValue($event, 'endDate', groupIndex)">End Date</base-input>
        <base-input :inputId="cityId" :value="experiences[groupIndex]['city']" @update-value="updateExperienceValue($event, 'city', groupIndex)">City</base-input>
        <base-input :inputId="countryId" :value="experiences[groupIndex]['country']" @update-value="updateExperienceValue($event, 'country', groupIndex)">Country</base-input>
        <div class="experience-description">
            <label :for="descriptionId" class="form-label text-secondary">Description</label>
            <textarea 
                @input="updateExperienceValue($event.target.value, 'description', groupIndex)"
                :value="experiences[groupIndex]['description']"
                :id="descriptionId"
                class="form-control bg-secondary-subtle" 
                rows="4" maxlength="2000"></textarea>
        </div>
    </base-input-group> 
</template>

<script>
    export default {
        props: ['groupId', 'groupIndex'],
        inject: ['updateExperienceValue', 'experiences'],
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
    }
</script>

<style scoped>
    .experience-description{
        width: 100%;
        margin-bottom: 0.5rem;
    }

    label{
        font-size: 0.9rem;
    }
</style>