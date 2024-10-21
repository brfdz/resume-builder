<template>
    <div class="experience-editor">
        <h3>Experience</h3>
        <div class="accordion" id="experienceList">
            <div v-for="(exp, index) in experiences" :key="exp.id" class="accordion-item" >
            <h2 class="accordion-header">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" :data-bs-target="'#exp' + index" aria-expanded="false" :aria-controls="'exp' + index">
                    {{ exp.jobTitle ? exp.jobTitle: '(Not specified)' }}
                </button>
            </h2>
            <div :id="'exp' + index" class="accordion-collapse collapse" data-bs-parent="#experienceList">
                <div class="accordion-body">
                    <experience-component 
                        v-model:job-title="experiences[index].jobTitle"
                        v-model:employer="experiences[index].employer"
                        v-model:start-date="experiences[index].startDate"
                        v-model:end-date="experiences[index].endDate"
                        v-model:city="experiences[index].city"
                        v-model:description="experiences[index].description"
                        @delete-experience="deleteExperience(exp.id)"
                        ></experience-component>
                </div>
            </div>
            </div>
        </div>
        <button @click="addExperience" class="btn button-add">+ Add Experience</button>
    </div>
</template>

<script>
    export default {
        props: {
            experiences: {
                type: Array,
                default: [],
            }
        },
        emits:[
            'delete-experience',
            'update:experiences'
        ],
        data(){
            return{
                idCounter: -1,
            };
        },        
        methods: {
            addExperience(){
                this.idCounter++;
                const exp = {
                        id: this.idCounter,
                        jobTitle: '',
                        employer: '',
                        startDate: '',
                        endDate: '',
                        city: '',
                        description: ''
                    };
                this.experiences.push(exp);
                this.$emit('update:experiences', this.experiences);    
            },
            deleteExperience(deleteId){
                this.$emit('delete-experience', deleteId);
            }
        },
    }
</script>

<style>
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
