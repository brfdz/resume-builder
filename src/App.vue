<template>
  <section class="editor-container">
      <h1 class="display-5">Create Resume</h1>
      <personal-details 
        v-model="personalDetails"
        v-model:photo="photo"></personal-details>
      <summary-component v-model="profSummary"></summary-component>
      <experience-editor v-model:experiences="experiences"
        @delete-experience="deleteExperience"></experience-editor>
        <education-editor v-model:educations="educations"
        @delete-education="deleteEducation"></education-editor>
  </section>
  <section class="preview bg-secondary">
        <document-preview 
        :details="personalDetails"
        :photo="photo"
        :summary="profSummary"
        :experiences="experiences"
        :educations="educations"
        ></document-preview>
  </section>
</template>

<script>
  export default {
    data() {
      return {
        personalDetails: 
        {
          jobTitle: '',
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          country: '',
          city: '',
        },
        profSummary: '',
        experiences: [],
        educations: [],
        photo: null,
      };
    },
    methods: {
      printDetails(){
       console.log(this.experiences);
      },
      deleteExperience(deleteId){
        this.experiences = this.experiences.filter(exp => exp.id != deleteId);
      },
      deleteEducation(deleteId){
        this.educations = this.educations.filter(edu => edu.id != deleteId);
      },
    }
  };

</script>

<style>
  #app {
    display: flex;
  }
  .editor-container{
    position: fixed;
    left:0;
    top:0;
    bottom:0;
    overflow-y:auto;
    overflow-x:hidden;

    display: flex;
    flex-direction: column;
    align-items: flex-start;
    row-gap: 3rem;
    background-color: rgb(255, 255, 255);

    width: 50%;
    height:100vh;
    padding: 3rem;
  }

  .editor-container h1{
    margin-bottom: 1.5rem;
    align-self: center;
  }

  .preview{
    position: fixed;
    right:0;
    top:0;
    bottom: 0;
    width:50%;
    padding: 2rem 5rem;
  }
</style>