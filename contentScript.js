

// Função que será executada quando um botão for clicado
function handleClick(event) {
    // Lógica para lidar com o clique do botão
    alert('Botão clicado!');
    console.log('ID do botão:', event.target.id);
    // Outras ações que você deseja realizar quando o botão for clicado
  }
  
    const xpath = '//*[@id="ContentPlaceHolder1_btnPesquisar"]';
    const element = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;


    
    element.addEventListener('submit', async(event) => {
    event.preventDefault();  
    alert('Botão clicado!')

});