<template>
    <base-input-group>
        <base-input :inputId="titleId" @update-value="updateItemValue($event, 'title', groupIndex)">Title</base-input>
        <base-input :inputId="infoId" @update-value="updateItemValue($event, 'info', groupIndex)">Info</base-input>
        <base-input :inputId="startId" inputType="month" @update-value="updateItemValue($event, 'startDate', groupIndex)">Start Date</base-input>
        <base-input :inputId="endId" inputType="month" @update-value="updateItemValue($event, 'endDate', groupIndex)">End Date</base-input>
        <div class="item-description">
            <label :for="descriptionId" class="form-label text-secondary">Description</label>
            <textarea 
                @input="updateItemValue($event.target.value, 'description', groupIndex)"
                :id="descriptionId"
                class="form-control bg-secondary-subtle" 
                rows="4" maxlength="2000"></textarea>
        </div>
    </base-input-group>
</template>

<script>
    export default {
        props: ['groupId', 'groupIndex'],
        inject: ['updateItemValue'],
        data(){
            return{
                titleId: 'title' + this.groupId,
                infoId: 'info' + this.groupId,
                startId: 'startDate' + this.groupId,
                endId: 'endDate' + this.groupId,
                descriptionId: 'description' + this.groupId,
            };
        },
    }
</script>

<style scoped>
    .item-description{
        width: 100%;
        margin-bottom: 0.5rem;
    }
    
    label{
        font-size: 0.9rem;
    }
</style>