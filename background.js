// Ouvinte para mensagens enviadas pela página de conteúdo
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === 'tabUpdated') {        
        chrome.tabs.onUpdated.addListener(async(tabId, changeInfo, tab) => {
            if (changeInfo.status === 'complete' && tab.url.includes('https://ctn.sistematodos.com.br/paginas/filiado/EditarFiliado.'))  {
              const notificationOptions = {
                type: 'basic',
                iconUrl: './images/icon128.png',
                title: 'Analise do Filiado',
                message: `Encontramos ${mensagem.dados.informacoes.prop1} problem${mensagem.dados.informacoes.prop2} no contrato.`
              };
          
              chrome.notifications.create(notificationOptions);
            }
          });
      // Faça o que for necessário quando a página de conteúdo informar sobre a atualização da guia
      // Você pode chamar a API chrome.tabs.onUpdated aqui se necessário
      console.log(`Página atualizada: ${message.url}`);
    }
  });