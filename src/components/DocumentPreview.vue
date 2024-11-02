<template>
    <div class="preview-container">
        <base-button @click="downloadPdf">Download PDF</base-button>
        <div class="document-container">
            <div class="document-wrapper" ref="documentPdf">
                <div class="document-header">
                    <img v-show="photo" :src="photo">
                    <div class="person-header">
                        <h1>{{ personalDetails.firstName }} {{ personalDetails.lastName }}</h1> 
                        <h3>{{ personalDetails.jobTitle }}</h3> 
                    </div>
                    <div class="contact">
                        <p>{{ personalDetails.email }}</p>
                        <p>{{ personalDetails.phone }}</p>
                        <p>{{ contactPlace }}</p>
                    </div>
                </div>
            
                <div class="document-body">
                    <document-section v-if="summary">
                        <document-section-entry>{{ summary }}</document-section-entry>
                    </document-section>

                    <document-section v-if="experiences && experiences.length > 0"
                    header="Experiences">
                        <document-section-entry v-for="(experience, index) in experiences" :key="experience.id"
                            :title="experience.jobTitle" :title-secondary="experience.employer"
                            :info="experience.city" :info-secondary="experience.country"
                            :entry-start-date="experience.startDate" :entry-end-date="experience.endDate">
                                {{ experience.description }}
                        </document-section-entry>
                    </document-section>
                    
                    <document-section v-if="educations && educations.length > 0"
                    header="Education">
                        <document-section-entry v-for="(edu, index) in educations" :key="edu.id"
                            :title="edu.degree" :title-secondary="edu.school"
                            :info="edu.city" :info-secondary="edu.country"
                            :entry-start-date="edu.startDate" :entry-end-date="edu.endDate">
                                {{ edu.description }}
                        </document-section-entry>
                    </document-section>
                    
                    <document-section v-if="skills && skills.length >0"
                    header="Skills">
                        <document-section-entry v-for="(skillItem, index) in skills" :key="skillItem.id"
                            :title="skillItem.name" :info="skillItem.level">
                        </document-section-entry>
                    </document-section>
                </div>
            </div>
        </div>
    </div>
</template>

<script> 
    import html2pdf from 'html2pdf.js';
    import DocumentSectionEntry from './DocumentSectionEntry.vue';
    import DocumentSection from './DocumentSection.vue';

    export default {
        components: {
            DocumentSectionEntry,
            DocumentSection
        },
        inject: ['personalDetails','experiences', 'educations', 'skills'],
        data(){
            return {
                options: { year: 'numeric', month: 'long' },
            };
        },
        props: {
            photo: String,
            summary: String,
        },
        computed: {
            contactPlace(){
                return [this.personalDetails.city, this.personalDetails.country]
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

<style scoped>
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
        justify-content: space-between;
        align-items: center;
        column-gap: 2rem;
        width: 100%;
        margin-bottom: 1rem;
    }

    .document-header img{
        width: 5em;
        height: 5em;
        object-fit: cover;
        border-radius: 10%;
    }

    .document-header h1 {
        font-size: 1.5rem;
        margin-bottom: 0.1rem;
    }

    .document-header h3 {
        font-size: 0.9rem;
    }
    
    .document-header p {
        font-size: 0.6rem;
        margin-bottom: 0;
    }

    .person-header {
        flex-grow: 1;
    }

    .contact {
        text-align: right;
    }

    .document-body {
        align-self: flex-start;
        color:black;
        width: 100%;
    }
    
</style>