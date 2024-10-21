<template>
    <div class="education-editor">
        <h3>Education</h3>
        <div class="accordion" id="educationList">
            <div v-for="(education, index) in educations" :key="education.id" class="accordion-item" >
            <h2 class="accordion-header">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" :data-bs-target="'#edu' + education.id" aria-expanded="false" :aria-controls="'edu' + education.id">
                    {{ education.school || education.degree ? [education.degree, education.school].filter(value => value).join(', '): '(Not specified)' }}
                </button>
            </h2>
            <div :id="'edu' + education.id" class="accordion-collapse collapse" data-bs-parent="#educationList">
                <div class="accordion-body">
                    <education-component 
                        v-model:degree="educations[index].degree"
                        v-model:school="educations[index].school"
                        v-model:start-date="educations[index].startDate"
                        v-model:end-date="educations[index].endDate"
                        v-model:city="educations[index].city"
                        v-model:country="educations[index].country"
                        v-model:description="educations[index].description"
                        @delete-education="deleteEducation(education.id)"
                        ></education-component>
                </div>
            </div>
            </div>
        </div>
        <button @click="addEducation" class="btn button-add">+ Add Education</button>
    </div>
</template>

<script>
    export default {
        props: {
            educations: {
                type: Array,
                default: [],
            }
        },
        emits:[
            'delete-education',
            'update:educations'
        ],
        data(){
            return{
                idCounter: 0,
            };
        },        
        methods: {
            addEducation(){
                const education = {
                        id: this.idCounter++,
                        degree: '',
                        school: '',
                        startDate: '',
                        endDate: '',
                        city: '',
                        country: '',
                        description: ''
                    };
                this.educations.push(education);
                this.$emit('update:educations', this.educations);    
            },
            deleteEducation(deleteId){
                this.$emit('delete-education', deleteId);
            }
        },
    }
</script>

<style>
    .education-editor {
        width: 100%;
    }
</style>
