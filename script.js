let meuFormulario = document.getElementById("meuFormulario")
let matricula = document.getElementById("matricula");
let codigo = document.getElementById("codigo");
let result = document.getElementById("result");


let textoCopiado2 = ""

meuFormulario.addEventListener("submit", function(event) {
 
  event.preventDefault();  
  let texto = `${matricula.value}_${codigo.value}_`;
  result.textContent = texto;
  textoCopiado2 = texto;

  meuFormulario.style.height = "350px";
  matricula.value = ""
  codigo.value = ""
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    let tab = tabs[0];
    
    
  });
});

// Seletor do campo de entrada de texto na sua extensão
let inputField = matricula;

// Ouvinte para o evento de alteração no campo de entrada
inputField.addEventListener('input', function(event) {
  let valorInput = event.target.value;
  
  // Armazena o valor do campo de entrada no localStorage
  localStorage.setItem('informacao', valorInput);
});
// Recupera a informação armazenada no localStorage
let informacaoArmazenada = localStorage.getItem('informacao');

// Preenche o campo de entrada com a informação armazenada, se existir
if (informacaoArmazenada) {
  inputField.value = informacaoArmazenada;
}














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
    meuFormulario.style.height = "270px";
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
  idRelatorio.style.height = "270px";
}else{
  classDisplay.style.display = 'none';
  idRelatorio.style.height = "100%";
}
});

//Fim do modal













// Baixar Relatório
document.getElementById("baixarRelat").addEventListener('click', function() {
  let start= document.getElementById("start");
  let end = document.getElementById("end");
  let startFormatado = alterarFormatoData(start.value)
  let endFormatado = alterarFormatoData(end.value)

  let link = `https://ctn.sistematodos.com.br/paginas/filiado/relatorio/FiliacaoPorVendedor.aspx?dataInicio=${startFormatado}&dataFim=${endFormatado}`;

  chrome.tabs.create({ url: link });
});
// Altera o formato da data
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
  
      var dataFormatada = dia + "/" + mes + "/" + ano;
      return dataFormatada
    }
  }






// Este era pra copiar o texto
//document.getElementById("meuFormulario").addEventListener("enviar", function(event) {
  //event.preventDefault();
  //navigator.clipboard.writeText(textoCopiado2)

  //alert(`O texto é: ${textoCopiado2}`);
//});