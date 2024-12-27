import { loadSocialData, initSocialModalListeners } from './modules/socialModal.js';
import * as visual from './visual.js';
import * as githubIntegration from './githubIntegration.js';
import * as publications from './publications.js';
import * as translation from './translation.js';

const socialData = await loadSocialData();  // Carrega os dados

initSocialModalListeners(socialData);

export { visual, githubIntegration, publications, translation };