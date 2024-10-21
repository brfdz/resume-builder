<template>
    <div class="document-container">
        <div class="document-wrapper">
            <div class="document-header">
                <img v-show="photo" :src="photo">
                <h1>{{ details.firstName }} {{ details.lastName }}</h1> 
                <h2>{{ details.jobTitle }}</h2> 
                <p>{{ contactInfo }}</p>
            </div>
            <div class="document-body">
                <h2 v-if="summary">Profile</h2>
                <p>{{ summary }}</p>
                <!-- Experiences section -->
                <div v-if="experiences && experiences.length > 0">
                    <h2>Experience</h2>
                    <div v-for="(experience, index) in experiences" :key="experience.id">
                        <p><strong>{{ [experience.jobTitle, experience.employer, experience.city].filter(value => value).join(', ') }}</strong></p>
                        <p>{{ experience.startDate }}{{ experience.startDate || experience.endDate ? ' - ' : '' }}{{ experience.endDate }}</p>
                        <p>{{ experience.description }}</p>
                    </div>
                </div>
                
                <!-- Education section -->
                <div v-if="educations && educations.length > 0">
                    <h2>Education</h2>
                    <div v-for="(edu, index) in educations" :key="edu.id">
                        <p><strong>{{ [edu.degree, edu.school].filter(value => value).join(', ') }}</strong></p>
                        <p>{{ [edu.city, edu.country].filter(value => value).join(', ') }}</p>
                        <p>{{ edu.startDate }}{{ edu.startDate || edu.endDate ? ' - ' : '' }}{{ edu.endDate }}</p>
                        <p>{{ edu.description }}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script> 
    export default {
        data(){
            return {
                options: { year: 'numeric', month: 'long' },
            };
        },
        props: {
            details: {
                type: Object
            },
            photo: String,
            summary: String,
            experiences: Array,
            educations: Array,
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

    .document-header img{
        width: 3rem;
        height: 3rem;
        margin-bottom: 0.5rem;
        border-radius: 50%;
        object-fit: cover;
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

    .document-body {
        align-self: flex-start;
    }
</style>