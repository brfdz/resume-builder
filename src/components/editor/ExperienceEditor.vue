<template>
    <div class="experience-editor">
        <h3>Experience</h3>
        <div class="accordion" id="experienceList">
            <div v-for="(exp, index) in experiences" :key="exp.id" class="accordion-item" >
            <h2 class="accordion-header">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" :data-bs-target="'#' + exp.id" aria-expanded="false" :aria-controls="exp.id">
                    {{ exp.jobTitle ? exp.jobTitle: '(Not specified)' }}
                </button>
            </h2>
            <div :id="exp.id" class="accordion-collapse collapse" data-bs-parent="#experienceList">
                <div class="accordion-body">
                    <experience-component
                        :groupId="exp.id"
                        :groupIndex="index">
                    </experience-component>
                </div> 
            </div>
            </div>
        </div>
        <button @click="addExperience" class="btn button-add">+ Add Experience</button>
    </div>
</template>

<script>
    export default {
        inject: ['experiences'],
        provide(){
            return {
                updateExperienceValue: this.updateExperienceValue,
                deleteExperience: this.deleteExperience,
            };
        },
        data(){
            return{
                idCounter: 0,
            };
        },        
        methods: {
            addExperience(){
                const exp = {
                        id: 'exp' + this.idCounter++,
                        jobTitle: '',
                        employer: '',
                        startDate: '',
                        endDate: '',
                        city: '',
                        country: '',
                        description: ''
                    };
                this.experiences.push(exp);
            },
            updateExperienceValue(value, inputTitle, index){
                this.experiences[index][inputTitle] = value;
            },
            deleteExperience(deleteIndex){
                this.experiences.splice(deleteIndex, 1);
            }
        },
    }
</script>

<style scoped>
    .experience-editor {
        width: 100%;
    }

    .button-add{
        color:#0d6efd;
        background-color: white;
        font-weight: 500;
        width: 100%;
        margin: 1rem 0;
    }

    .button-add:hover {
        color: #0d6efd;
        background-color: #0d6dfd1b;
    }

    .button-add:active {
        border-color: white;
        color: #0d6efd;
        background-color: white;
    }
</style>
