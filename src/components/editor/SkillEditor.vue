<template>
    <div class="skill-editor">
        <h3>Skills</h3>
        <div class="accordion" id="skillList">
            <div v-for="(skillItem, index) in skills" :key="skillItem.id" class="accordion-item">
                <h2 class="accordion-header">
                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" :data-bs-target="'#' + skillItem.id" aria-expanded="false" :aria-controls="skillItem.id">
                    {{ skillItem.name ? [skillItem.name, skillItem.level].filter(value => value).join(', '): '(Not specified)' }}
                    </button>
                    <base-button btnType="delete" @click="deleteSkill(index)" title="Delete">X</base-button>
                </h2>
                <div :id="skillItem.id" class="accordion-collapse collapse" data-bs-parent="#skillList">
                    <div class="accordion-body">
                        <skill-input-group
                            :groupId="skillItem.id"
                            :groupIndex="index">
                        </skill-input-group>
                    </div>
                </div>
            </div>
        </div>
        <base-button btnType="add" @click="addSkill">
            + Add Skill
        </base-button>
    </div>
</template>

<script>
import SkillInputGroup from './SkillInputGroup.vue';
    export default {
        components: {
            SkillInputGroup
        },
        inject: ['skills'],
        provide(){
            return{
                updateSkillValue: this.updateSkillValue,
            };
        },
        methods: {
            addSkill(){
                const newSkill = {
                    id: Date.now().toString(),
                    name: '',
                    level: ''
                }
                this.skills.push(newSkill);
            },
            updateSkillValue(value, field, index){
                this.skills[index][field] = value;
                localStorage.setItem('skills', JSON.stringify(this.skills));
            },
            deleteSkill(deleteIndex){
                const confirmed = confirm("Are you sure you want to delete this item? This action cannot be undone.");
                if(confirmed){
                    this.skills.splice(deleteIndex, 1);
                    localStorage.setItem('skills', JSON.stringify(this.skills));
                }
            },
        },
    }
</script>

<style scoped>
    .skill-editor{
        width: 100%;
    }

    .accordion-header{
        display: flex;
    }
</style>