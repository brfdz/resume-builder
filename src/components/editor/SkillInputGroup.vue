<template>
    <base-input-group>
        <base-input :inputId="nameId" @update-value="updateSkillValue($event, 'name', groupIndex)">Skill</base-input>
        <base-input :inputId="levelId"@update-value="updateSkillValue($event, 'level', groupIndex)">Level</base-input>
    </base-input-group>
</template>

<script>
    export default {
        props: ['groupId', 'groupIndex'],
        inject: ['updateSkillValue'],
        data(){
            return{
                nameId: 'name' + this.groupId,
                levelId: 'level' + this.groupId,
            };
        },
    };
</script>