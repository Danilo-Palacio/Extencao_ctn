
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

  /*
    let scan = {
      tipoDocumento : `//*[@id="corpoPesquisa"]/tr[0]/td[2]`,
      arquivoOriginal : '//*[@id="dsArquivoOriginal"]',
      dataCriacao : '//*[@id="corpoPesquisa"]/tr[1]/td[3]',
    };
  */

const getInputs = (locations) => {
    let xpathInput = locations;
    let resultInput = document.evaluate(xpathInput, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
    let elementInput = resultInput.singleNodeValue;
    let codigo = elementInput.value;
    return codigo
}
async function getAffiliateInfo(tab){
    let contador = 0 ;

    let xpathInput = locations;
    let resultInput = document.evaluate(xpathInput, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
    let elementInput = resultInput.singleNodeValue;
    let codeInput = elementInput.value;

    for (let prop in filiado) {

        if (filiado.hasOwnProperty(prop)) {
            try{
                const linkXpath = `//*[@id="ContentPlaceHolder1_${filiado[prop]}"]`
                const result = await executeScriptAsync(tab.id, codeInput, linkXpath);
                let codigo = result[0].result;
                let retorno = `Propriedade: ${prop}, Valor: ${codigo}`;
                contador += 1;
                if(codigo !== ''){                   
                    contador += 1
                }
            } catch (error){
                console.log(error);
            }
        }
    let plural = contador > 1? as:a;

    return {prop1: contador, prop2: plural}
    }
    return {prop1: contador, prop2: plural}
};
export{getAffiliateInfo};

async function goItem(tab){
    let contador = 0 ;
    for (let prop in filiado) {
        if (filiado.hasOwnProperty(prop)) {
            try{
                const linkXpath = `//*[@id="ContentPlaceHolder1_${filiado[prop]}"]`
                const result = await executeScriptAsync(tab.id, getInputs, [linkXpath]);
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

document.getElementById("icon").addEventListener('submit', async(event) => {
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

  goItem(tab)
  console.log("notificação")
  image.src = 'images/16_red.png';
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === 'complete' && tab.url.includes('https://ctn.sistematodos.com.br/paginas/filiado/EditarFiliado.')) {
      // Código a ser executado quando a guia é atualizada com a URL específica
      alert(`Guia ${tabId} atualizada em ${tab.url}`);
      ("ativo content")
      showStayHydratedNotification()
      // Outras ações desejadas...
    }
});

const getCodigo = () =>{
    const placeHolder = ['txbMatricula','gvContFiliados_lbCodigo_0']
    const xpath = (placeHolder) =>{
        const xpath = `//*[@id="ContentPlaceHolder1_${placeHolder}"]`;
        const result = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
        const element = result.singleNodeValue;
        return element
    }
    let codigo =`${xpath(placeHolder[0]).value}_${xpath(placeHolder[1]).innerText}_`;
    return codigo
}

let generateCode = document.getElementById("generateCode");

generateCode.addEventListener('submit', async(event) => {
  event.preventDefault();  

  const [tab] = await chrome.tabs.query({ active: true, currentWindow:true });

  chrome.scripting.executeScript({
    target:{ tabId: tab.id},
    function: getCodigo,
        }, (result) => {
            if (!chrome.runtime.lastError && result && result[0] && result[0].result) {
                let codigo = result[0].result;
                document.getElementById("resultCode").textContent = codigo;
                generateCode.style.height = "180px";
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


