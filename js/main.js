import { loadSocialData, initSocialModalListeners } from './modules/socialModal.js';

const socialData = await loadSocialData();  // Carrega os dados

initSocialModalListeners(socialData);  