<template>
    <div class="preview-container">
        <base-button @click="downloadPdf" class="btn-dark">Download PDF</base-button>
        <div class="document-container" :style="{ transform: `scale(${scaleFactor})` }">
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
                        <template #column-view>
                            <document-section-entry v-for="(skillItem, index) in skills" :key="skillItem.id" class="col-6"
                                :title="skillItem.name" :info="skillItem.level">
                            </document-section-entry>
                        </template>   
                    </document-section>

                    <document-section v-for="(section, key) in customSections" :key="section.id"
                    :header="section.sectionTitle">
                        <document-section-entry v-for="(item) in section" :key="item.id"
                        :title="item.title" :info="item.info" :entry-start-date="item.startDate" :entry-end-date="item.endDate">
                        {{ item.description }}
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
        inject: ['personalDetails','experiences', 'educations', 'skills', 'customSections'],
        data(){
            return {
                options: { year: 'numeric', month: 'long' },
                pixelPerMM: this.getPixelsPerMM(),
            };
            
        },
        props: {
            photo: String,
            summary: String,
            windowWidth: Number,
        },
        computed: {
            contactPlace(){
                return [this.personalDetails.city, this.personalDetails.country]
                .filter(value => value)
                .join(', ');
            },
            scaleFactor(){

                let windowWidthMM = this.windowWidth / this.pixelPerMM;
                let margin = 50;
                if(this.windowWidth > 1100){
                    windowWidthMM /= 2;
                }
                return (windowWidthMM - margin) / 210; 
            }
        },
        methods: {
            downloadPdf(){
                var document = this.$refs.documentPdf;
                var opt = {
                    margin: [15, 15],
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
            getPixelsPerMM(){
                const div = document.createElement('div');
                div.style.width = '1mm';
                document.body.appendChild(div);
                const pixelsPerMM = div.offsetWidth; // Width in pixels
                document.body.removeChild(div);
                return pixelsPerMM;
            }
        },
    };
</script>

<style scoped>
    .preview-container{
        display: flex;
        flex-direction: column;
        align-items: center;
        row-gap: 2rem;
        margin-top: 2rem;
    }

    /* The page container with an aspect ratio of A4 sized page */
    .document-container {
        width: 210mm;
        height: 297mm;
        padding: 15mm 15mm; /* for preview */
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
        width: 20mm;
        height: 20mm;
        object-fit: cover;
        border-radius: 10%;
    }

    .document-header h1 {
        font-size: 1.6rem;
        margin-bottom: 0.1rem;
    }

    .document-header h3 {
        font-size: 1.1rem;
    }
    
    .document-header p {
        font-size: 0.75rem;
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