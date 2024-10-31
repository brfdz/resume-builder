<template>
    <button :class="buttonStyle" class="btn">
        <slot></slot>
    </button>
</template>

<script>
    export default {
        props: {
            btnType: {
                type: String,
            }
        },
        computed: {
            buttonStyle(){
                if(this.btnType == 'delete'){
                    return "delete btn-outline-danger";
                }
                else if(this.btnType == 'add'){
                    return "add-button";
                }
                else{
                    return "btn-primary";
                }
            },
        }
    }
</script>

<style scoped>
    .add-button{
        color:#0d6efd;
        background-color: white;
        font-weight: 500;
        width: 100%;
        margin: 1rem 0;
    }

    .add-button:hover {
        color: #0d6efd;
        background-color: #0d6dfd1b;
    }

    .add-button:active {
        border-color: white;
        color: #0d6efd;
        background-color: white;
    }

    .delete{
        border:none;
        margin: 0.5rem;
        font-weight: 200;
        z-index: 5;
    }
</style>