// Recupera a informação relevante da página
let xpath = '//*[@id="ContentPlaceHolder1_txbMatricula"]'
const informacaoDaPagina = xpath.value; // Defina a lógica para obter a informação da página

// Envia a informação para a extensão
chrome.runtime.sendMessage({ informacao: informacaoDaPagina });