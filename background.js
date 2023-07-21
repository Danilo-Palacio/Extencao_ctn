// Ouvinte para mensagens enviadas pela página de conteúdo
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === 'tabUpdated') {
        alert("Pagina aberta")
      // Faça o que for necessário quando a página de conteúdo informar sobre a atualização da guia
      // Você pode chamar a API chrome.tabs.onUpdated aqui se necessário
      console.log(`Página atualizada: ${message.url}`);
    }
  });