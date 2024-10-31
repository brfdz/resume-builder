<template>
    <div class="personal-container">
        <h3>Personal Details</h3>
            <base-input-group>
                <!-- Photo input -->
                 <base-input>
                    Photo
                    <template #input>
                        <div class="photo-edit-container">
                            <input type="file" accept="image/*"
                                class="form-control bg-secondary-subtle"
                                id="photo-input" 
                                ref="photoInput"
                                @change="handlePhotoUpload($event)"> 
                            <base-button v-show="photoFile" btnType="delete" @click="removePhoto" title="Delete">X</base-button>
                        </div>
                    </template>
                </base-input>
                <!-- other personal details inputs -->
                <base-input v-for="(item, key) in personalDetails" :key="key"
                    :inputId="key" @update-value="setPersonalValue($event, key)">
                        {{ formatLabel(key) }}
                </base-input>
            </base-input-group>
        
    </div>
</template>

<script>
    export default {
        inject: ['personalDetails'],
        emits: ['update:photo'],
        data(){
            return{
                photoFile: null,
            };
        },
        methods: {
            setPersonalValue(value, field){
                this.personalDetails[field] = value;
            },
            handlePhotoUpload(e){
                this.photoFile = e.target.files[0];
                this.$emit('update:photo',URL.createObjectURL(this.photoFile));
            },
            removePhoto(){
                const confirmed = confirm("Are you sure you want to delete photo?");
                if(confirmed){
                    URL.revokeObjectURL(this.photoFile);
                    this.photoFile = null;
                    this.$emit('update:photo', null);
                    this.$refs.photoInput.value = null; // Clear file input
                }
            },
            formatLabel(text) {
                // format the input label from camel case to title case
                const result = text.replace(/([A-Z])/g, ' $1');
                return result.charAt(0).toUpperCase() + result.slice(1);
            }
        },
    };
</script>

<style scoped>  
    .photo-edit-container{
        height: 3rem;
        display: flex;
        align-items: center;
        column-gap: 5px;
    }

    .photo-edit-container input {
        height: 100%;
    }

    .form-control[type=file]::file-selector-button {
        height: -webkit-fill-available;
    }

    .remove-photo{
        border: none;
    }
</style>