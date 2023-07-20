import { testGoItem } from './script.js';

let resultado1 = testGoItem();

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === 'complete' && tab.url.includes('https://ctn.sistematodos.com.br/paginas/filiado/EditarFiliado.'))  {
      const notificationOptions = {
        type: 'basic',
        iconUrl: './images/icon128.png',
        title: 'Analise do Filiado',
        message: `Encontramos ${resultado1.prop1} problem${resultado1.prop2} no contrato.`
      };
  
      chrome.notifications.create(notificationOptions);
    }
  });
