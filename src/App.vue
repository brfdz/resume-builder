<template>
  <section class="editor-container" v-show="windowWidth > 1100 || !showPreview">
      <h1 class="display-5">Create Resume</h1>
      <personal-details v-model:photo="photo"></personal-details>
      <summary-component v-model="profSummary"></summary-component>
      <experience-editor></experience-editor>
      <education-editor></education-editor>
      <skill-editor></skill-editor>
      <custom-sections-manager></custom-sections-manager>
  </section>
  <section class="preview" v-show="windowWidth > 1100 || showPreview">
        <document-preview 
        :photo="photo"
        :summary="profSummary"
        :windowWidth="windowWidth"
        ></document-preview>
  </section>
  <base-button class="change-view" @click="toggleViews">
    {{ toggleBtnTitle }}
  </base-button>
  <base-modal 
    v-if="showModal"
    @startStored="retrieveStoredData"
    @clearData="clearStorage"></base-modal>
</template>

<script>
export default {
    provide() {
      return {
        experiences: this.experiences,
        educations: this.educations,
        personalDetails: this.personalDetails,
        skills: this.skills,
        customSections: this.customSections,
      };
    },
    data() {
      return {
        personalDetails: 
        {
          jobTitle: '',
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          city: '',
          country: '',
        },
        profSummary: '',
        experiences: [],
        educations: [],
        skills: [],
        photo: null,
        windowWidth: window.innerWidth,
        showPreview: false,
        customSections: {},
        showModal: true,
      };
    },
    methods: {
      toggleViews(){
        this.showPreview = !this.showPreview;
      },
      onWindowResized(){
        this.windowWidth = window.innerWidth;
      },
      clearStorage(){
        localStorage.clear();
        this.showModal = false;
      },
      retrieveStoredData(){
        this.showModal = false;

        //Retrieve personal details
        const savedDetails = localStorage.getItem('personalDetails'); 
        if (savedDetails) {
          Object.assign(this.personalDetails,JSON.parse(savedDetails));
        }

        //Retrieve experiences
        const savedExperiences = localStorage.getItem('experiences');
        if(savedExperiences) {
          Object.assign(this.experiences, JSON.parse(savedExperiences));
        }

        //Retrieve educations
        const savedEducations = localStorage.getItem('educations');
        if(savedEducations) {
          Object.assign(this.educations, JSON.parse(savedEducations));
        }

        //Retrieve skills
        const savedSkills = localStorage.getItem('skills');
        if(savedSkills) {
          Object.assign(this.skills, JSON.parse(savedSkills));
        }

        //Retrieve summary
        const savedSummary = localStorage.getItem('profSummary');
        if(savedSummary) {
          this.profSummary = savedSummary;
        }

        //Retrieve photo
        const savedPhoto = localStorage.getItem('photo');
        if(savedPhoto) {
          this.photo = savedPhoto;
        }

        //Retrieve custom sections
        const savedCustom = localStorage.getItem('customSections');
        if(this.customSections){
          Object.assign(this.customSections, JSON.parse(savedCustom));
        }
      }
    },
    computed: {
      toggleBtnTitle(){
        return this.showPreview ? 'Editor' : 'Preview';
      },
    },
    mounted(){
      window.addEventListener('resize', this.onWindowResized);

      if(localStorage.length > 0){
        const modal = new bootstrap.Modal('#appModal');
        modal.show();
      }
      else{
        this.showModal = false;
      }
    },
    beforeDestroy(){
      window.removeEventListener('resize', this.onWindowResized);
    },
  };

</script>

<style>
  #app {
    display: flex;
  }
  .editor-container{
    position: fixed;
    left: 0;
    top: 0;
    bottom: 0;
    overflow-y: auto;
    overflow-x: hidden;

    display: flex;
    flex-direction: column;
    align-items: flex-start;
    row-gap: 2rem;
    background-color: rgb(255, 255, 255);

    width: 50%;
    height:100vh;
    padding: 3rem;
    padding-bottom: 5rem;
  }

  .editor-container h1{
    font-size: 2rem;
    margin: 1rem 0;
    align-self: center;
  }

  .editor-container h3{
    font-size: 1.3rem;
  }
  .preview{
    position: fixed;
    right:0;
    top:0;
    bottom: 0;
    width:50%;
    overflow-y:auto;
    overflow-x:hidden;
    background-color: rgb(131,134,140);
  }

  .change-view {
    display:none;
    position:fixed;
    bottom: 3rem;
    right: 3rem;
    padding: 8px 25px;
    opacity: 60%;
    border-radius: 20px;
    transition: all .3s
  }

  /* 
        Change it to single section view style
  */
  @media only screen and (max-width: 1100px) { 
    .preview {
      width: 100%;
      padding-bottom: 10rem;
      overflow-y: scroll;
    }

    .editor-container{
      position: static;
      width: 1000%;
      margin: auto;
      padding: 3rem;
      padding-bottom: 7rem;
      overflow-y: scroll;
    }

    .change-view {
      display: block;
    }

    .change-view:hover {
      opacity: 100%;
      box-shadow: rgba(0, 0, 0, 0.3) 0px 3px 8px;
    }
  }
</style>