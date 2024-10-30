<template>
    <base-input-group>
        <base-input :inputId="schoolId" @update-value="updateEducationValue($event, 'school', groupIndex)">School</base-input>
        <base-input :inputId="degreeId" @update-value="updateEducationValue($event, 'degree', groupIndex)">Degree</base-input>
        <base-input :inputId="startId" inputType="month" @update-value="updateDateValue($event, 'startDate')">Start Date</base-input>
        <base-input :inputId="endId" inputType="month" @update-value="updateDateValue($event, 'endDate')">End Date</base-input>
        <base-input :inputId="cityId" @update-value="updateEducationValue($event, 'city', groupIndex)">City</base-input>
        <base-input :inputId="countryId" @update-value="updateEducationValue($event, 'country', groupIndex)">Country</base-input>
        <div class="education-description">
            <label :for="descriptionId" class="form-label">Description</label>
            <textarea 
                @input="updateEducationValue($event.target.value, 'description', groupIndex)"
                :id="descriptionId"
                class="form-control bg-secondary-subtle" 
                rows="4"></textarea>
        </div>
        <button class="btn btn-dark" @click="deleteEducation(groupIndex)">Delete</button>
    </base-input-group>
</template>

<script>
    export default {
        props: ['groupId', 'groupIndex'],
        inject: ['updateEducationValue', 'deleteEducation'],
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
        methods: {
            updateDateValue(value, field){
                if (!value){
                    return;
                } 
                const formattedDate = this.formatDate(value);
                this.updateEducationValue(formattedDate, field, this.groupIndex);
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
    .education-description{
        width: 100%;
        margin-bottom: 0.5rem;
    }
</style>