<template>
    <base-input-group>
        <base-input :inputId="schoolId" @update-value="updateEducationValue($event, 'school', groupIndex)">School</base-input>
        <base-input :inputId="degreeId" @update-value="updateEducationValue($event, 'degree', groupIndex)">Degree</base-input>
        <base-input :inputId="startId" inputType="month" @update-value="updateEducationValue($event, 'startDate', groupIndex)">Start Date</base-input>
        <base-input :inputId="endId" inputType="month" @update-value="updateEducationValue($event, 'endDate', groupIndex)">End Date</base-input>
        <base-input :inputId="cityId" @update-value="updateEducationValue($event, 'city', groupIndex)">City</base-input>
        <base-input :inputId="countryId" @update-value="updateEducationValue($event, 'country', groupIndex)">Country</base-input>
        <div class="education-description">
            <label :for="descriptionId" class="form-label text-secondary">Description</label>
            <textarea 
                @input="updateEducationValue($event.target.value, 'description', groupIndex)"
                :id="descriptionId"
                class="form-control bg-secondary-subtle" 
                rows="4"></textarea>
        </div>
    </base-input-group>
</template>

<script>
    export default {
        props: ['groupId', 'groupIndex'],
        inject: ['updateEducationValue'],
        data(){
            return{
                schoolId: 'school' + this.groupId,
                degreeId: 'degree' + this.groupId,
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
    .education-description{
        width: 100%;
        margin-bottom: 0.5rem;
    }
    
    label{
        font-size: 0.9rem;
    }
</style>