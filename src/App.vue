<template>
  <section class="editor-container">
      <h1 class="display-5">Create Resume</h1>
      <personal-details v-model="personalDetails"></personal-details>
  </section>
  <section class="preview bg-secondary">
        <document-preview :details="personalDetails"></document-preview>
  </section>
</template>

<script>
  export default {
    data() {
      return {
        personalDetails: 
        {
          jobTitle: '',
          photo: '',
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          country: '',
          city: '',
        },
      };
    },
    methods: {
      printDetails(){
       console.log(this.personalDetails);
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
    align-items: center;
    background-color: rgb(255, 255, 255);

    width: 50%;
    height:100vh;
    padding: 3rem;
  }

  .editor-container h1{
    margin-bottom: 1.5rem;
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