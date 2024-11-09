<template>
    <div class="experience-editor">
        <h3>Experience</h3>
        <div class="accordion" id="experienceList">
            <div v-for="(exp, index) in experiences" :key="exp.id" class="accordion-item" >
            <h2 class="accordion-header">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" :data-bs-target="'#' + exp.id" aria-expanded="false" :aria-controls="exp.id">
                    {{ exp.jobTitle ? exp.jobTitle: '(Not specified)' }}
                </button>
                <base-button btnType="delete" @click="deleteExperience(index)" title="Delete">X</base-button>
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
        <base-button btnType="add" @click="addExperience">
            + Add Experience
        </base-button>
    </div>
</template>

<script>
    export default {
        inject: ['experiences'],
        provide(){
            return {
                updateExperienceValue: this.updateExperienceValue,
            };
        },
        methods: {
            addExperience(){
                const exp = {
                        id: Date.now().toString(),
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
                localStorage.setItem('experiences', JSON.stringify(this.experiences));
            },
            deleteExperience(deleteIndex){
                const confirmed = confirm("Are you sure you want to delete this item? This action cannot be undone.");
                if(confirmed){
                    this.experiences.splice(deleteIndex, 1);
                    localStorage.setItem('experiences', JSON.stringify(this.experiences));
                }
            }
        },
    }
</script>

<style scoped>
    .experience-editor {
        width: 100%;
    }
    .accordion-header{
        display: flex;
    }
</style>
