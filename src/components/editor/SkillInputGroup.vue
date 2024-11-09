<template>
    <base-input-group>
        <base-input :inputId="nameId" :value="skills[groupIndex]['name']" @update-value="updateSkillValue($event, 'name', groupIndex)">Skill</base-input>
        <base-input :inputId="levelId" :value="skills[groupIndex]['level']" @update-value="updateSkillValue($event, 'level', groupIndex)">Level</base-input>
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