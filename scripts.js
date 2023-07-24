import { getCodigo } from './funcaoGerarCodigo.js';



const icon = document.querySelector("#icon");
const generateCode = document.getElementById("generateCode");
const spaceCodeGenetator = document.getElementById("spaceCodeGenetator");

const filiado = {
  matricula : 'txbMatricula', 
  dataFiliacao : 'txbDtInclusao',
  nomeCompleto : 'txbNomeFiliado',
  dataNascimento: 'txbDtNascFiliado_txbData',
  sexo : 'ddlSexoFiliado',
  estadoCivil : 'ddlEstadoCivilFiliado',
  identidade : 'txbIdentFiliado',
  timeCoração : 'ddlTimeCoracaoFiliado',
  email: 'txbEmailFiliado',
  telefone: 'txbTelFiliado',
  // se a coluna 2 tiver a data igual ou superior a data de filiação, é true
  };

  const codeInputs = (locations) => {
    let xpathInput = locations;
    let resultInput = document.evaluate(xpathInput, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
    let elementInput = resultInput.singleNodeValue;
    let codigo = elementInput.value;
    return codigo
}

async function mostrarItens(tab){
    let contador = 0 ;
    for (let prop in filiado) {
        if (filiado.hasOwnProperty(prop)) {
            try{
                const linkXpath = `//*[@id="ContentPlaceHolder1_${filiado[prop]}"]`
                const result = await executeScriptAsync(tab.id, codeInputs, [linkXpath]);
                let codigo = result[0].result;
                let retorno = `Propriedade: ${prop}, Valor: ${codigo}`;
                contador += 1;
                if(codigo !== ''){                   
                    const newElement = document.createElement('div');
                    newElement.textContent = retorno;
                    newElement.style.color = 'green';
                    iconResult.insertAdjacentElement('afterend', newElement);

                } else {
                    const newElement = document.createElement('div');
                    newElement.textContent = retorno;
                    newElement.style.color = 'red';
                    iconResult.insertAdjacentElement('afterend', newElement);
                }
            } catch (error){
                console.log(error);
            }  
        }
      }
      contador = 0;
}
function executeScriptAsync(tabId, func, args){
    return new Promise((resolve,reject) =>{

        chrome.scripting.executeScript({target: {tabId}, function: func, args},
            (result) => {
                if (chrome.runtime.lastError){
                    reject(chrome.runtime.lastError);
                } else {
                    resolve(result);
                }
            }
            );
    });
}
icon.addEventListener('submit', async(event) => {
    event.preventDefault();  
    const [tab] = await chrome.tabs.query({ active: true, currentWindow:true });
    const canvas = new OffscreenCanvas(16, 16);
    const context = canvas.getContext('2d');
    const image = new Image();

    image.onload = () => {
      context.drawImage(image, 0, 0);
      const imageData = context.getImageData(0, 0, 16, 16);
      chrome.action.setIcon({imageData}, () => {/*...*/});
    };

    mostrarItens(tab)
    console.log("clicou no icon e vai mostrar os itens")
    image.src = 'images/16_red.png';
});




//Função de Gerar Codigo
generateCode.addEventListener('submit', async(event) => {
  event.preventDefault();  
  const [tab] = await chrome.tabs.query({ active: true, currentWindow:true });
  chrome.scripting.executeScript({
      target:{ tabId: tab.id},
      function: getCodigo,
      },(result) => {   
              let codigo = result[0].result;
              spaceCodeGenetator.textContent = codigo;
              generateCode.style.height = "180px";
              console.log(codigo);
              navigator.clipboard.writeText(codigo)
  });
});


window.addEventListener('load', () => {
  const mensagem = {
    tipo: 'minha_mensagem',
    dados: {
      informacoes: 'informacoes importantes',
    }
  };
  // Envie uma mensagem para o background script para informar sobre a atualização da guia
  chrome.runtime.sendMessage({ type: 'tabUpdated', url: window.location.href, mensagem });
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
      generateCode.style.height = "150px";
  }else{
    classDisplay.style.display = 'none';
    generateCode.style.height = "100%";
  }
});
document.getElementById("title1").addEventListener( 'click', function(){ 
  let classDisplay = document.getElementById("display1"); 
  let idReport = document.getElementById("report")

if (classDisplay.style.display === 'none'|| classDisplay.style.display === ''){
  classDisplay.style.cssText  = 
    'display: flex;' +
    'align-content: flex-start;'+
    'flex-wrap: wrap;' +
    'justify-content: space-between;' +
    'align-items: center;'
    idReport.style.height = "395px";
}else{
  classDisplay.style.display = 'none';
  idReport.style.height = "100%";
}
});
//Fim do modal

let type;

//Baixar Relatório Filiado
document.querySelector("#baixarFiliacao").addEventListener('submit', async(event) => {
  event.preventDefault();
  const start = document.getElementById("start");
  const end = document.getElementById("end");
  type = "baixarFiliacao";
  const startFormatado = alterarFormatoData(start.value, type)
  const endFormatado = alterarFormatoData(end.value, type)

  const linkFiliacao = `https://ctn.sistematodos.com.br/paginas/filiado/relatorio/FiliacaoPorVendedor.aspx?dataInicio=${startFormatado}&dataFim=${endFormatado}`;
  chrome.tabs.create({ url: linkFiliacao});
});

//Baixar Relatório Migração
document.querySelector("#baixarMigracao").addEventListener('submit', async(event) => {
  event.preventDefault();
  const referenciaMigracao = document.getElementById("referencia");
  type = "baixarMigracao";
  const referenciaMigracaoFormatado = alterarFormatoData(referenciaMigracao.value, type)
  
  let linkMigracao = `https://ctn.sistematodos.com.br/paginas/filiado/relatorio/RelatorioFiliadosMigrados.aspx?referencia=${referenciaMigracaoFormatado}`
  //chrome.tabs.create({ url: linkMigracao });
  console.log(linkMigracao)
  console.log(referenciaMigracaoFormatado)
  console.log(referenciaMigracao)
});


function alterarFormatoData(data, type) {
  const valor = data;
      if (valor) {
        let data = new Date(valor);
        let mes = data.getMonth() + 1; // Adiciona +1, pois os meses em JavaScript são baseados em zero (janeiro é 0)
        let ano = data.getFullYear();
        let dia = data.getDate() + 1;

            if (mes < 10) {
              mes = "0" + mes;
            }
            if (dia < 10){
              dia = "0" + dia;
            }
            if( type === "baixarFiliado"){
              let dataFormatada = dia + "/" + mes + "/" + ano;
              return dataFormatada
            }else{
              let dataFormatada = ano +"/"+ mes;
              return dataFormatada
            }
            


      }
}