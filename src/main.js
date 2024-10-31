import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'

import DocumentPreview from './components/DocumentPreview.vue';
import PersonalDetails from './components/editor/PersonalDetails.vue';
import SummaryComponent from './components/editor/SummaryComponent.vue';
import ExperienceEditor from './components/editor/ExperienceEditor.vue';
import ExperienceComponent from './components/editor/ExperienceComponent.vue';
import EducationComponent from './components/editor/EducationComponent.vue';
import EducationEditor from './components/editor/EducationEditor.vue';
import SkillEditor from './components/editor/SkillEditor.vue';

import BaseInput from './components/editor/BaseInput.vue';
import BaseInputGroup from './components/editor/BaseInputGroup.vue';
import BaseButton from './components/BaseButton.vue';

const app = createApp(App);

app.component('personal-details', PersonalDetails);
app.component('document-preview', DocumentPreview);
app.component('summary-component', SummaryComponent);
app.component('experience-editor', ExperienceEditor);
app.component('experience-component', ExperienceComponent);
app.component('education-component', EducationComponent);
app.component('education-editor', EducationEditor);
app.component('skill-editor', SkillEditor);

app.component('base-input', BaseInput);
app.component('base-input-group', BaseInputGroup);
app.component('base-button', BaseButton);

app.mount('#app');
