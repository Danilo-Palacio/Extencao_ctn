// Seletor do campo de entrada de texto na sua extensão
const inputField = document.querySelector('#matricula');

// Ouvinte para o evento de alteração no campo de entrada
inputField.addEventListener('input', function(event) {
  const valorInput = event.target.value;
  
  // Armazena o valor do campo de entrada no localStorage
  localStorage.setItem('informacao', valorInput);
});


// Recupera a informação armazenada no localStorage
const informacaoArmazenada = localStorage.getItem('informacao');

// Preenche o campo de entrada com a informação armazenada, se existir
if (informacaoArmazenada) {
  inputField.value = informacaoArmazenada;
}



// Ouvinte para a extensão ser ativada
chrome.browserAction.onClicked.addListener(function(tab) {
  // Injeta um script na página ativa
  chrome.tabs.executeScript(tab.id, { file: 'content.js' });
});

// Ouvinte para receber a informação da página ativa
chrome.runtime.onMessage.addListener(function(request) {
  // Verifica se a mensagem recebida é a informação da página
  if (request.informacao) {
    // Armazena a informação no armazenamento local
    chrome.storage.local.set({ informacao: request.informacao }, function() {
      console.log('Informação da página salva com sucesso');
    });
  }
});


chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  // Processa a mensagem recebida do script.js
  console.log(request.informacao);
  alert('Mensagem recebida do script.js');
});


// Ouvinte para receber uma mensagem do popup.js
chrome.runtime.onMessage.addListener(function(request) {

  alert(link)
  // Verifica se a mensagem recebida é para abrir uma nova página
  if (request.action === 'openNewPage') {
    // Cria uma nova guia com a URL especificada
    chrome.tabs.create({ url: request.url });
    alert(link)
  }
});