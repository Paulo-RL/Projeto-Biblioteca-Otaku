const vaz = document.getElementById(`textoVaz`);
const proCont = document.getElementById('Container');
    proCont.innerHTML=``
const cari = document.getElementById('CarinCont');
    cari.innerHTML = '';
function buscarPorLetras(vem, produtos) {
    var letras = vem.toLowerCase();
    var resultados = produtos.filter(function(resus) {
      var titulo = resus.title.toLowerCase();
      return titulo.includes(letras);
    });
    return resultados;
}
async function pes2() {
  var p = localStorage.getItem("p");
  if (p) {
    document.getElementById("bPp").value = p;
    var vem = document.getElementById("bPp").value;
    var base = await fetch('./base.json');
    base = await base.json()
    produtos = base.itens
    var resultados = buscarPorLetras(vem, produtos);
    show(resultados.length);
    serPag(resultados, resultados.length);
    localStorage.removeItem("p");
    p=null
  } else {
    hide();
    var t = document.getElementById("bPp").value;
    if (!t) {
    } else {
      pes3();
    }
  }
}

  
  async function pes3() {
      var vem = document.getElementById("bPp").value;
      const response = await fetch('./base.json');
        base = await response.json();
        let produtos = await base.itens
      var resultados = buscarPorLetras(vem, produtos);
      serPag(resultados, resultados.length);
  }
  
  function show(pesq, p) {
    var pesq2 = pesq;
    if (pesq2 == 0) {
      vaz.setAttribute("style", "visibility: visible;");
    } else if (pesq2 > 10) {
      vaz.setAttribute("style", "visibility: hidden;");
      var main = document.querySelector("html");
      main.style["overflow-y"] = "visible";
      const proPagButton = document.createElement('button');
      proPagButton.id = 'ProPag';
      proPagButton.classList.add('PP')
      proPagButton.textContent = 'Próxima página';
      proCont.appendChild(proPagButton);
    } else {
      vaz.setAttribute("style", "visibility: hidden;");
      var main = document.querySelector("html");
      main.style["overflow-y"] = "visible";
    }
  
    const proPagButton = document.getElementById('ProPag');
    if (proPagButton) {
      proPagButton.addEventListener('click', function() {
        p.splice(0, 10)
        proCont.removeChild(proPagButton);
        serPag(p, pesq)
        window.scrollTo({top: 0, behavior: "smooth"})
      });
    }
  }
  
  function serPag(produtos, pesq) {
    proCont.innerHTML = '';
    for (let i = 0; i < 10 && i < produtos.length; i++) {
      const prode = produtos[i];
  
      const prodCont = document.createElement('div');
      prodCont.classList.add('prodCont');
      prodCont.setAttribute('value', '1');
  
      prodCont.innerHTML = `
        <img class="prod" src="${prode.image}" alt="Produto ${i}">
        <p class="prodTit">${prode.title}</p>
        <p class="precoProd">R$${prode.price}</p>
        <button class="prodCa" id="ca${i}">Adicionar ao Carrinho</button>
        <button class="prodDe" id="pr${i}">Detalhes</button>
      `;
  
      const prodDeButton = prodCont.querySelector(`#pr${i}`);
    prodDeButton.addEventListener('click', function() {
      var id = prode.id;
      id -= 1;
      localStorage.setItem('d', id);
      console.log("salvo");
      trocarPagina2();
    });
  
      const prodCaButton = prodCont.querySelector(`#ca${i}`);
    prodCaButton.addEventListener('click', function() {
      const Item = prode.id;
      localStorage.setItem('CA', JSON.stringify(Item));
      IniciarCarin();
      prenCar();
    });
      
  
      proCont.appendChild(prodCont);
    }
  
    show(pesq, produtos);
  }


  async function prenCar() {
    var itens = JSON.parse(localStorage.getItem('DE')) || [];
    const cari = document.getElementById('CarinCont');
    const PFContainer = document.getElementById('PrecoFinal');
    const OIContainer = document.getElementById('OutrosItens');
  
    cari.innerHTML = '';
    PFContainer.textContent = '';
    OIContainer.textContent = '';
  
    console.log(itens);
    var precoF = 0;
    localStorage.setItem('LO', JSON.stringify(itens));
  
    if (itens.length > 0) {
      const limitedItens = itens.slice(0, 4);
      const limitedItemPromises = limitedItens.map(itemID => fetchItemDetails(itemID));
      const limitedItemResults = await Promise.all(limitedItemPromises);
  
      limitedItemResults.forEach(item => {
        cari.innerHTML += `
          <div class="caripro">
            <img src="${item.image}" class="imCari">
            <p class="ticari">${item.title}</p>
            <p class="pacari">R$${item.price}</p>
            <button class="recari" onclick="removerItem('${item.id}')">Remover produto</button>
          </div>
        `;
        precoF += parseFloat(item.price);
      });
  
      if (itens.length > 4) {
        const oiContainer = document.createElement('p');
        oiContainer.classList.add('OI');
        oiContainer.textContent = `Outros itens: ${itens.length - 4}`;
  
        OIContainer.appendChild(oiContainer);
      }
  
      PFContainer.textContent = `Preço final: R$${precoF.toFixed(2)}`;
    }
}


function hide(){
  var main=document.querySelector("html")
  main.style["overflow-y"] = "hidden";
}
document.getElementById('bPp').addEventListener("keydown", (e)=>{
  if(e.key=="Enter"){
      pes2()
  }
})
function trocarPagina2() {
window.location.href = "./detail.html";
}
