<template>
    <base-input-group>
        <base-input :inputId="nameId" :value="skills[groupIndex]['name']" @update-value="updateSkillValue($event, 'name', groupIndex)">Skill</base-input>
        <div class="level-select">
            <label :for="levelId" class="form-label text-secondary">Level</label>
            <select class="form-select bg-secondary-subtle" 
                    :id="levelId"
                    v-model="skills[groupIndex]['level']"
                    @change="updateSkillValue($event.target.value, 'level', groupIndex)">
                <option value="Novice">Novice</option>
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Proficient">Proficient</option>
                <option value="Expert">Expert</option>
            </select>
        </div>
    </base-input-group>
</template>

<script>
    export default {
        props: ['groupId', 'groupIndex'],
        inject: ['updateSkillValue', 'skills'],
        data(){
            return{
                nameId: 'name' + this.groupId,
                levelId: 'level' + this.groupId,
            };
        },
    };
</script>

<style scope>
    .level-select{
        flex: 0 0 calc(50% - 20px);
        display: flex;
        flex-direction: column;
        margin: 0.5rem auto;
        margin-left: 0;
    }

    select{
        height: 3rem;
    }

    label {
        font-size: 0.9rem;
    }
</style>