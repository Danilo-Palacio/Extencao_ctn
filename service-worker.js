
import './script.js';
import {getAffiliateInfo } from './script.js';

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === 'complete' && tab.url.includes('https://ctn.sistematodos.com.br/paginas/filiado/EditarFiliado.'))  {
      const notificationOptions = {
        type: 'basic',
        iconUrl: './images/icon128.png',
        title: 'Analise do Filiado',
        message: `Encontramos ${getAffiliateInfo.prop1} problem${getAffiliateInfo.prop2} no contrato.`
      };
  
      chrome.notifications.create(notificationOptions);
    }
  });

  