<template>
    <div class="education-editor">
        <h3>Education</h3>
        <div class="accordion" id="educationList">
            <div v-for="(education, index) in educations" :key="education.id" class="accordion-item" >
                <h2 class="accordion-header">
                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" :data-bs-target="'#' + education.id" aria-expanded="false" :aria-controls="education.id">
                        {{ education.school || education.degree ? [education.degree, education.school].filter(value => value).join(', '): '(Not specified)' }}
                    </button>
                    <!-- delete button -->
                    <base-button btnType="delete" @click="deleteEducation(index)" title="Delete">X</base-button>
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
        <base-button btnType="add" @click="addEducation">
            + Add Education
        </base-button>
    </div>
</template>

<script>
    export default {
        inject: ['educations'],
        provide(){
            return {
                updateEducationValue: this.updateEducationValue,
            };
        },
        methods: {
            addEducation(){
                const newEducation = {
                        id: Date.now().toString(), 
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
                localStorage.setItem('educations', JSON.stringify(this.educations));
            },
            deleteEducation(deleteIndex){
                const confirmed = confirm("Are you sure you want to delete this item? This action cannot be undone.");
                if(confirmed){
                    this.educations.splice(deleteIndex, 1);
                    localStorage.setItem('educations', JSON.stringify(this.educations));
                }
            }
        },
    }
</script>

<style scoped>
    .education-editor {
        width: 100%;
    }

    .accordion-header {
        display: flex;
    }

</style>
