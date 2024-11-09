<template>
    <div class="custom-manager">
        <custom-section-editor v-for="(section, key) in customSections" :key="key"
        :sectionId="key">
        </custom-section-editor>
    </div>
    <base-button @click="addNewSection" class="add-section-button btn-outline-success">Add Custom Section</base-button>
</template>

<script>
import CustomSectionEditor from './CustomSectionEditor.vue';

    export default {
        components: {
            CustomSectionEditor,
        },
        inject: ['customSections'],
        methods: {
            addNewSection(){
                const id = Date.now().toString();
                this.customSections[id] = {
                    sectionTitle: '',
                    sectionList: [],
                };
                localStorage.setItem('customSections', JSON.stringify(this.customSections));
            },
        }
    }
</script>

<style scope>
    .custom-manager{
        width: 100%;
    }

    .add-section-button {
        width: 60%;
        padding: 10px 0;
        margin: auto;
        margin-top: 2rem;
        transition: all .4s;
        border-style: none;
        background-color:  rgba(191, 217, 191, 0.66);
    }

    .add-section-button:hover{
        width: 100%;
        background-color: rgba(94, 149, 94, 0.951);
    }
</style>