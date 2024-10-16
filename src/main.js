import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'

import DocumentPreview from './components/DocumentPreview.vue';
import PersonalDetails from './components/PersonalDetails.vue';
import InputField from './components/InputField.vue';
import SummaryComponent from './components/SummaryComponent.vue';

const app = createApp(App);

app.component('personal-details', PersonalDetails);
app.component('document-preview', DocumentPreview);
app.component('input-field', InputField);
app.component('summary-component', SummaryComponent);

app.mount('#app');
