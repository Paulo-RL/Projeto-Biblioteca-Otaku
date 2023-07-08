const vaz = document.getElementById(`textoVaz`);
const proCont = document.getElementById('Container');
    proCont.innerHTML=``
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
        if (p && p !== "null") {
          document.getElementById("bPp").value = p;
          var vem = document.getElementById("bPp").value;
          var base = await fetch('./base.json');
          base = await base.json()
          produtos= base.itens
          var resultados = buscarPorLetras(vem, produtos);
          show(resultados.length);
          serPag(resultados, resultados.length);
          localStorage.setItem("p", null);
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
    } else if (pesq2 > 15) {
      vaz.setAttribute("style", "visibility: hidden;");
      var main = document.querySelector("html");
      main.style["overflow-y"] = "visible";
      const proPagButton = document.createElement('button');
      proPagButton.id = 'ProPag';
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
        serPag(p, pesq)
      });
    }
  }
  
  function serPag(produtos, pesq) {
    console.log(produtos)
    proCont.innerHTML = '';
    for (let i = 0; i < 10; i++) {
      const prode = produtos[i];
  
      const prodCont = document.createElement('div');
      prodCont.classList.add('prodCont');
      prodCont.setAttribute('value', '1');
  
      prodCont.innerHTML = `
        <img class="prod" src="${prode.image}" alt="Produto ${i}">
        <p class="prodTit">${prode.title}</p>
        <p class="precoProd">R$${prode.price}</p>
        <button class="prodCa">Adicionar ao Carrinho</button>
        <button class="prodDe" id="pr${i}">Detalhes</button>
      `;
  
      const prodDeButton = prodCont.querySelector(`#pr${i}`);
      prodDeButton.addEventListener('click', function() {
        var id = produtos[i].id;
        id -= 1;
        console.log(id);
        localStorage.setItem('d', id);
        console.log("salvo");
        trocarPagina2();
      });
  
      proCont.appendChild(prodCont);
    }
  
    show(pesq, produtos);
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
/* proCont.innerHTML=``
    for (let i = 1; i <= pesq; i++) {
      prode=produtos[i-1]
      proCont.innerHTML+=`<div class="prodCont" value="1" id="prodcar1">
      <img class="prod" src=${prode['image']} alt="Produto 1">
        <p class="prodTit">${prode['title']}</p>
        <p class="precoProd">${prode['price']}</p>
        <button class="prodCa">Adicionar ao Carrinho</button>
        <button class="prodDe" onclick="trocarPagina2()">Detalhes</button>
  </div>` */