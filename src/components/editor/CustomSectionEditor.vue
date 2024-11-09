<template>
     <div class="custom-editor">
        <div class="section-head">
            <input v-model="sectionTitle" type="text" placeholder="Untitled" class="form-control section-title"/>
            <base-button @click="deleteSection(sectionId)" btnType="delete" class="delete-section-btn">Delete</base-button>
        </div>
        <div class="accordion" :id="sectionId + 'itemList'">
            <div v-for="(item, index) in itemList" :key="item.id" class="accordion-item" >
                <h2 class="accordion-header">
                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" :data-bs-target="'#' + item.id" aria-expanded="false" :aria-controls="item.id">
                        {{ item.title? item.title: '(Not specified)' }}
                    </button>
                    <base-button btnType="delete" @click="deleteItem(index)" title="Delete">X</base-button>
                </h2>
                <div :id="item.id" class="accordion-collapse collapse" :data-bs-parent="'#' + sectionId + 'itemList'">
                    <div class="accordion-body">
                        <custom-input-group
                            :groupId="item.id"
                            :groupIndex="index">
                    </custom-input-group>
                    </div> 
                </div>
            </div>
        </div>
        <base-button btnType="add" @click="addItem">
            + Add Item
        </base-button>
    </div>
</template>


<script>
import CustomInputGroup from './CustomInputGroup.vue';
    export default {
        components:{
            CustomInputGroup
        },
        inject: ['customSections'],
        provide(){
            return{
                updateItemValue: this.updateItemValue,
            };
        },
        props: {
            sectionId: String,
        },
        data(){
            return{
                sectionTitle: this.customSections[this.sectionId]['sectionTitle'],
                itemList: this.customSections[this.sectionId]['sectionList'],
            };
        }, 
        watch: {
            sectionTitle(value){
                this.customSections[this.sectionId]['sectionTitle'] = value;
            },    
        },    
        methods: {
            addItem(){
                const item = {
                        id: Date.now().toString(),
                        title: '',
                        startDate: '',
                        endDate: '',
                        info: '',
                        description: ''
                    };
                this.itemList.push(item);
                localStorage.setItem('customSections', JSON.stringify(this.customSections));
            },
            updateItemValue(value, inputTitle, index){
                this.itemList[index][inputTitle] = value;
                localStorage.setItem('customSections', JSON.stringify(this.customSections));
            },
            deleteItem(deleteIndex){
                const confirmed = confirm("Are you sure you want to delete this item? This action cannot be undone.");
                if(confirmed){
                    this.itemList.splice(deleteIndex, 1);
                    localStorage.setItem('customSections', JSON.stringify(this.customSections));
                }
            },
            deleteSection(sectionId){
                const confirmed = confirm("Are you sure you want to delete this section? This action cannot be undone.");
                if(confirmed){
                    delete this.customSections[sectionId];
                    localStorage.setItem('customSections', JSON.stringify(this.customSections));
                }
            }
        },
    }
    
</script>

<style scoped>
    .custom-editor {
        width: 100%;
    }

    .section-title{
        font-size: 1.3rem;
        transition: all .3s;
        border-style: none;
        padding: 0 1rem 0 0;
        font-weight: 500;
    }

    .section-title input {
        width: 100%;
    }

    .section-title:hover{
        background-color:rgb(240, 240, 240); 
    }

    .delete-section-btn{
        border-radius: 30px;
    }

    .accordion-header{
        display: flex;
    }

    .section-head{
        display: flex;
    }
</style>