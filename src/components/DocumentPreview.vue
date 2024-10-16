<template>
    <div class="document-container">
        <div class="document-wrapper">
            <div class="document-header">
                <h1>{{ details.firstName }} {{ details.lastName }}</h1> 
                <h2>{{ details.jobTitle }}</h2> 
                <p>{{ contactInfo }}</p>
            </div>
            <div class="document-body">
                <h2 v-if="summary">Profile</h2>
                <p>{{ summary }}</p>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            details: {
                type: Object
            },
            summary: String,
        },
        computed: {
            contactInfo(){
                return [this.details.city, this.details.country, this.details.phone, this.details.email]
                .filter(value => value)
                .join(', ');
            },
        },
    };
</script>

<style>
    .document-wrapper {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin: 2rem 4rem;
        color: black;
    }

    .document-header {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    .document-wrapper h1{
        font-size: 1.1em;
    }

    .document-wrapper h2{
        font-size: 0.6em;
    }

    .document-wrapper p {
        font-size: 0.5em;
    }

    /* The page container with an aspect ratio of A4 sized page */
    .document-container {
        max-height: 90vh; 
        max-width: 50vw;
        aspect-ratio: 1 / 1.414; /* A4 aspect ratio (210mm x 297mm) */
        background-color: white;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        overflow: hidden;
    }
</style>