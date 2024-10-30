<template>
    <div class="preview-container">
        <button @click="downloadPdf" class="btn btn-primary">Download PDF</button>
        <div class="document-container">
            <div class="document-wrapper" ref="documentPdf">
                <div class="document-header">
                    <img v-show="photo" :src="photo">
                    <h1>{{ details.firstName }} {{ details.lastName }}</h1> 
                    <h3>{{ details.jobTitle }}</h3> 
                    <p>{{ contactInfo }}</p>
                </div>
            
                <div class="document-body">
                    <h2 v-if="summary">Profile</h2>
                    <p style="margin-bottom:20px;">{{ summary }}</p>
                    <!-- Experiences section -->
                    <div v-if="experiences && experiences.length > 0" style="margin-bottom:20px;">
                        <h2>Experience</h2>
                        <div v-for="(experience, index) in experiences" :key="experience.id" class="experience-container">
                            <p><strong>{{ [experience.jobTitle, experience.employer].filter(value => value).join(', ') }}</strong>
                                &nbsp;{{ experience.city }}</p>
                            <p>{{ experience.startDate }}{{ experience.startDate || experience.endDate ? ' - ' : '' }}{{ experience.endDate }}</p>
                            <p>{{ experience.description }}</p>
                        </div>
                    </div>
                    
                    <!-- Education section -->
                    <div v-if="educations && educations.length > 0" style="margin-bottom:20px;">
                        <h2>Education</h2>
                        <div v-for="(edu, index) in educations" :key="edu.id">
                            <p><strong>{{ [edu.degree, edu.school].filter(value => value).join(', ') }}</strong>
                                &nbsp;{{ [edu.city, edu.country].filter(value => value).join(', ') }}</p>
                            <p>{{ edu.startDate }}{{ edu.startDate || edu.endDate ? ' - ' : '' }}{{ edu.endDate }}</p>
                            <p>{{ edu.description }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script> 
    import html2pdf from 'html2pdf.js';
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
        methods: {
            downloadPdf(){
                var document = this.$refs.documentPdf;
                var opt = {
                    margin: [10, 20],
                    filename: 'resume.pdf',
                    image: { type: 'jpeg', quality: 0.98 },
                    html2canvas: {
                        scale: 3, //resolution scale
                        useCORS: false, // Handle images from external sources
                    },
                    jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
                };
                html2pdf().set(opt).from(document).save();
            },
        },
    };
</script>

<style>
    .preview-container{
        display: flex;
        flex-direction: column;
        align-items: center;
        row-gap: 2rem;
        margin-top:1.5rem;
    }

    /* The page container with an aspect ratio of A4 sized page */
    .document-container {
        width: 210mm;
        height: 297mm;
        padding: 15mm 20mm; /* for preview */
        transform: scale(0.6);
        overflow-y: scroll;
        overflow-x: hidden;
        transform-origin: top center;
        background-color: white;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        
    }
    .document-wrapper {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        color: black;
        width: 100%;
        white-space: normal;
        overflow-wrap: break-word;
        font-family: Arial, sans-serif;
    }

    .document-header {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 100%;
    }

    .document-header img{
        width: 5em;
        height: 5em;
        object-fit: cover;
        border-radius: 50%;
        margin-bottom: 0.5em;
    }

    .document-wrapper h1{
        font-size: 1.7em;
        text-align: center;
    }

    .document-wrapper h2{
        font-size: 1.3em;
        text-align: left;
    }

    .document-wrapper h3{
        font-size: 1.1em;
        text-align: center;
    }

    .document-wrapper p {
        font-size: 0.7em;
        text-align: justify;
        margin: 0;
    }

    .document-body {
        align-self: flex-start;
        color:black;
        width: 100%;
    }

    .experience-container{
        margin-bottom: 10px;
    }
    
</style>