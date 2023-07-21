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

  
function executeScriptAsync(tabId, func, args){
    return new Promise((resolve,reject) =>{

        chrome.scripting.executeScript(
            {target: {tabId}, function: func, args},
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

  async function getAffiliateInfo(tab){
      let contador = 0 ;
  
      for (let prop in filiado) {
          if (filiado.hasOwnProperty(prop)) {
              try{
                  const linkXpath = `//*[@id="ContentPlaceHolder1_${filiado[prop]}"]`;
                  const result = await executeScriptAsync(tab.id, codeInputs, linkXpath);
                  let codigo = result[0].result;
                  let retorno = `Propriedade: ${prop}, Valor: ${codigo}`;
                  contador += 1;
                  if(codigo !== ''){                   
                      contador += 1;
                  }
              } catch (error){
                  console.log(error);
              }
          }
      }
  
      let plural = contador > 1 ? 'as' : 'a';
  
      return {prop1: contador, prop2: plural}
  };
  

  
  export {getAffiliateInfo };
  /*
  chrome.tabs.onUpdated.addListener(async(tabId, changeInfo, tab) => {
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
  
  
  */
  
  /*
      let scan = {
        tipoDocumento : `//*[@id="corpoPesquisa"]/tr[0]/td[2]`,
        arquivoOriginal : '//*[@id="dsArquivoOriginal"]',
        dataCriacao : '//*[@id="corpoPesquisa"]/tr[1]/td[3]',
      };
    */