<template>
    <div class="education-editor">
        <h3>Education</h3>
        <div class="accordion" id="educationList">
            <div v-for="(education, index) in educations" :key="education.id" class="accordion-item" >
            <h2 class="accordion-header">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" :data-bs-target="'#' + education.id" aria-expanded="false" :aria-controls="education.id">
                    {{ education.school || education.degree ? [education.degree, education.school].filter(value => value).join(', '): '(Not specified)' }}
                </button>
            </h2>
            <div :id="education.id" class="accordion-collapse collapse" data-bs-parent="#educationList">
                <div class="accordion-body">
                    <education-component
                        :groupId="education.Id"
                        :groupIndex="index">
                    </education-component>
                </div>
            </div>
            </div>
        </div>
        <button @click="addEducation" class="btn button-add">+ Add Education</button>
    </div>
</template>

<script>
    export default {
        inject: ['educations'],
        provide(){
            return {
                updateEducationValue: this.updateEducationValue,
                deleteEducation: this.deleteEducation,
            };
        },
        data(){
            return{
                idCounter: 0,
            };
        },        
        methods: {
            addEducation(){
                const newEducation = {
                        id: 'edu' + this.idCounter++,
                        school: '',
                        degree: '',
                        startDate: '',
                        endDate: '',
                        city: '',
                        country: '',
                        description: ''
                    };
                this.educations.push(newEducation);
            },
            updateEducationValue(value, inputTitle, index){
                this.educations[index][inputTitle] = value;
            },
            deleteEducation(deleteIndex){
                this.educations.splice(deleteIndex, 1);
            }
        },
    }
</script>

<style>
    .education-editor {
        width: 100%;
    }
</style>
