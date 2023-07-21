function getCodigo(){
    const placeHolder = ['txbMatricula','gvContFiliados_lbCodigo_0']
    const xpath = (placeHolder) => {
        const xpath = `//*[@id="ContentPlaceHolder1_${placeHolder}"]`;
        const xpathResult = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
        const element = xpathResult && xpathResult.singleNodeValue;
        return element
    }
    let codigo =`${xpath(placeHolder[0]).value}_${xpath(placeHolder[1]).textContent}_`;
    return codigo
}

export{getCodigo}