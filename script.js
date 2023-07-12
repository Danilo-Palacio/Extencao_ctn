let meuFormulario = document.getElementById("meuFormulario")
let matricula = document.getElementById("matricula");
let codigo = document.getElementById("codigo");
let resultado = document.getElementById("result");
let icon = document.getElementById("icon")

// chrome.action.setIcon({imageData: imageData}, () => { /* ... */ });

icon.addEventListener('submit', async(event) => {
  event.preventDefault();  
  
  const canvas = new OffscreenCanvas(16, 16);
  const context = canvas.getContext('2d');
  
  // Crie uma nova instância de Image
  const image = new Image();

  image.onload = () => {
    // Quando a imagem for carregada, desenhe-a no canvas
    context.drawImage(image, 0, 0);
    
    // Obtenha os dados da imagem desenhada no canvas
    const imageData = context.getImageData(0, 0, 16, 16);
    
    // Use chrome.action.setIcon() para definir o ícone com a imagem
    chrome.action.setIcon({imageData}, () => {/*...*/});
  }; 
  
  image.src = '16_red.png';
});

chrome.tabs.onActivated.addListener(activeInfo => {
  chrome.tabs.get(activeInfo.tabId, tab => {
    if (tab.url.includes('https://ctn.sistematodos.com.br/paginas/filiado/ListaFiliado.aspx')) {

      console.log("ativo content")
      // Injeta um script na guia ativa para detectar cliques nos botões
      chrome.tabs.executeScript(tab.id, { file: 'contentScript.js' });
      const element = document.querySelector('#ContentPlaceHolder1_btnPesquisar')
   
      element.addEventListener('submit', async(event) => {
      event.preventDefault();  
      alert('Botão clicado!')});
    }
  })
});
  



let textoCopiado2 = "";

const getCodigo = () =>{

  let xpathMatricula = '//*[@id="ContentPlaceHolder1_txbMatricula"]';
  let resultMatricula = document.evaluate(xpathMatricula, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
  let elementMatricula = resultMatricula.singleNodeValue;

  
  let xpathCodigo = '//*[@id="ContentPlaceHolder1_gvContFiliados_lbCodigo_0"]';
  let resultCodigo = document.evaluate(xpathCodigo, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
  let elementCodigo = resultCodigo.singleNodeValue ;
  

  let codigo =`${elementMatricula.value}_${elementCodigo.innerText}_`;
  return codigo
}

meuFormulario.addEventListener('submit', async(event) => {
  event.preventDefault();  

  const [tab] = await chrome.tabs.query({ active: true, currentWindow:true });

  chrome.scripting.executeScript({
    target:{ tabId: tab.id},
    function: getCodigo,
  }, (result) => {
      if (!chrome.runtime.lastError && result && result[0] && result[0].result) {
        var codigo = result[0].result;
        // Faça algo com o valor retornado (codigo)
        resultado.textContent = codigo;
        meuFormulario.style.height = "180px";
        console.log(codigo);
        navigator.clipboard.writeText(codigo)
      }
  });
});




//Funções para abrir e fechar o modal
document.getElementById("title").addEventListener( 'click', function(){ 
  let classDisplay = document.getElementById("display");
  
  if (classDisplay.style.display === 'none'|| classDisplay.style.display === ''){
    classDisplay.style.cssText  = 
      'display: flex;' +
      'align-content: flex-start;'+
      'flex-wrap: wrap;' +
      'justify-content: space-between;' +
      'align-items: center;'
    meuFormulario.style.height = "150px";
  }else{
    classDisplay.style.display = 'none';
    meuFormulario.style.height = "100%";
  }
});
document.getElementById("title1").addEventListener( 'click', function(){ 
  let classDisplay = document.getElementById("display1"); 
  let idRelatorio = document.getElementById("relatorio")

if (classDisplay.style.display === 'none'|| classDisplay.style.display === ''){
  classDisplay.style.cssText  = 
    'display: flex;' +
    'align-content: flex-start;'+
    'flex-wrap: wrap;' +
    'justify-content: space-between;' +
    'align-items: center;'
  idRelatorio.style.height = "395px";
}else{
  classDisplay.style.display = 'none';
  idRelatorio.style.height = "100%";
}
});

//Fim do modal



//Baixar Relatório Filiado
document.getElementById("baixarFiliacao").addEventListener('click', function() {
  let start= document.getElementById("start");
  let end = document.getElementById("end");
  let startFormatado = alterarFormatoData(start.value)
  let endFormatado = alterarFormatoData(end.value)

  let linkFiliacao = `https://ctn.sistematodos.com.br/paginas/filiado/relatorio/FiliacaoPorVendedor.aspx?dataInicio=${startFormatado}&dataFim=${endFormatado}`;
  chrome.tabs.create({ url: linkFiliacao});
});

//Baixar Relatório Migração
document.getElementById("baixarMigracao").addEventListener('click', function() {
  let referenciaMigracao = document.getElementById("referencia");
  let referenciaMigracaoFormatado = alterarFormatoMigracao(referenciaMigracao.value)
  
  let linkMigracao = `https://ctn.sistematodos.com.br/paginas/filiado/relatorio/RelatorioFiliadosMigrados.aspx?referencia=${referenciaMigracaoFormatado}`
  chrome.tabs.create({ url: linkMigracao });
  
});

  function alterarFormatoData(data) {
    var valor = data;
      if (valor) {
      var data = new Date(valor);
      var dia = data.getDate() + 1;
      var mes = data.getMonth() + 1; // Adiciona +1, pois os meses em JavaScript são baseados em zero (janeiro é 0)
      var ano = data.getFullYear();
      if (mes < 10) {
        mes = "0" + mes;
      }
      if (dia < 10){
        dia = "0" + dia;
      }
        var dataFormatada = dia + "/" + mes + "/" + ano;
      return dataFormatada
    }
  }
  

  function alterarFormatoMigracao(data){
    var valor = data;
    if (valor){
      var data = new Date(valor);
      var mes = data.getMonth() + 2;
      var ano = data.getFullYear();
      if (mes < 10) {
        mes = "0" + mes ;
      }
      let dataFormatada = ano +"/"+ mes;
      return dataFormatada
    }
  }


