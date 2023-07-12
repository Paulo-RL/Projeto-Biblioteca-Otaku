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
    var base = await fetch('/Otaku proj/Biblioteca otaku/base.json');
    base = await base.json()
    produtos = base.itens
    var resultados = buscarPorLetras(vem, produtos);
    serPag(resultados);
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
      const response = await fetch('/Otaku proj/Biblioteca otaku/base.json');
        base = await response.json();
        let produtos = await base.itens
      var resultados = buscarPorLetras(vem, produtos);
      serPag(resultados);
  }
  
  function show(pesq) {
    var pesq2 = pesq.length;
    if (pesq2 === 0) {
      vaz.setAttribute("style", "visibility: visible;");
    } else if (pesq2 > 10) {
      vaz.setAttribute("style", "visibility: hidden;");
      var main = document.querySelector("html");
      main.style["overflow-y"] = "visible";
      const proPagButton = document.getElementById('ProPag');
      if (!proPagButton) {
        const proPagButton = document.createElement('button');
        proPagButton.id = 'ProPag';
        proPagButton.classList.add('PP');
        proPagButton.textContent = 'Próxima página';
        proCont.appendChild(proPagButton);
      }
    } else {
      vaz.setAttribute("style", "visibility: hidden;");
      var main = document.querySelector("html");
      main.style["overflow-y"] = "visible";
    }
  
    const proPagButton = document.getElementById('ProPag');
    if (proPagButton) {
      proPagButton.addEventListener('click', function() {
        pesq.splice(0, 10);
        proCont.removeChild(document.getElementById('ProPag'));
        serPag(pesq);
        window.scrollTo({ top: 0, behavior: "smooth" });
      });
    }
  } 
  function serPag(produtos) {
    proCont.innerHTML = '';
    for (let i = 0; i < 10 && i < produtos.length; i++) {
      const prode = produtos[i];
  
      const prodCont = document.createElement('div');
      prodCont.classList.add('prodCont');
      prodCont.setAttribute('value', '1');
  
      prodCont.innerHTML = `
        <img class="prod" src="${prode.image}" alt="Produto ${i}">
        <p class="prodTit">${prode.title}</p>
        <p class="precoProd">R$${parseFloat(prode.price).toFixed(2)}</p>
        <button class="prodCa" id="ca${i}">Adicionar ao Carrinho</button>
        <button class="prodDe" id="pr${i}">Detalhes</button>
      `;
  
      const prodDeButton = prodCont.querySelector(`#pr${i}`);
    prodDeButton.addEventListener('click', function() {
      var id = prode.id;
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
  
    show(produtos);
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
window.location.href = "/Otaku proj/Biblioteca otaku/detalhes/detail.html";
}
