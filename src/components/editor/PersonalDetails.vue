<template>
    <div class="personal-container">
        <h3>Personal Details</h3>
        <div class="personal-inputs">
            <!-- Photo input -->
            <div class="input-field input-container">
                <label for="photo" class="form-label">Photo</label>
                <div class="photo-edit-container">
                    <input type="file" accept="image/*"
                    class="form-control bg-secondary-subtle"
                    id="photo-input" 
                    ref="photoInput"
                    @change="handlePhotoUpload($event)"> 
                    <button v-show="photoFile" class="remove-photo btn btn-outline-danger"
                        @click="removePhoto">X</button>
                </div>
            </div>
            <!-- other personal details inputs -->
            <div class="input-container" 
            v-for="(value, key) in localDetails" :key="key">
              <input-field
                v-model="localDetails[key]"
                :field="key"
                :label="formatLabel(key)"
               ></input-field>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            modelValue: Object
        },
        emits: ['update:modelValue',
                'update:photo'
        ],
        data(){
            return{
                photoFile: null,
            };
        },
        computed: {
            localDetails: {
                get(){
                    return this.modelValue;
                },
                set(value){
                    this.$emit('update:modelValue', value);
                }
            }
        },
        methods: {
            handlePhotoUpload(e){
                this.photoFile = e.target.files[0];
                this.$emit('update:photo',URL.createObjectURL(this.photoFile));
            },
            removePhoto(){
                URL.revokeObjectURL(this.photoFile);
                this.photoFile = null;
                this.$emit('update:photo', null);
                this.$refs.photoInput.value = null; // Clear file input
            },
            formatLabel(text) {
                // format the input label from camel case to title case
                const result = text.replace(/([A-Z])/g, ' $1');
                return result.charAt(0).toUpperCase() + result.slice(1);
            }
        },
    };
</script>

<style>
    .personal-inputs{
        display: flex;
        flex-flow: wrap;
    }

    .input-container {
        flex: 0 0 calc(50% - 20px);
        margin: 0.5rem auto;
        margin-left: 0;
    }

    .photo-edit-container{
        display: flex;
        column-gap: 5px;
    }

    .form-control[type=file]::file-selector-button {
        height: -webkit-fill-available;
    }

    .remove-photo{
        border: none;
    }
</style>