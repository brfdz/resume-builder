<template>
    <div class="skill-editor">
        <h3>Skills</h3>
        <div class="accordion" id="skillList">
            <div v-for="(skillItem, index) in skills" :key="skillItem.id" class="accordion-item">
                <h2 class="accordion-header">
                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" :data-bs-target="'#' + skillItem.id" aria-expanded="false" :aria-controls="skillItem.id">
                    {{ skillItem.name ? skillItem.name: '(Not specified)' }}
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
        data(){
            return{
                idCounter: 0,
            };
        },
        methods: {
            addSkill(){
                const newSkill = {
                    id: 'skill' + this.idCounter++,
                    name: '',
                    level: ''
                }
                this.skills.push(newSkill);
            },
            updateSkillValue(value, field, index){
                this.skills[index][field] = value;
            },
            deleteSkill(deleteIndex){
                const confirmed = confirm("Are you sure you want to delete this item?");
                if(confirmed){
                    this.skills.splice(deleteIndex, 1);
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