function pes() {
  localStorage.setItem('p', document.getElementById('impPT').value);
}

function trocarPagina() {
  window.location.href = "./Search.html";
}


function filtro() {
    console.log(produtosAPI['category']['Manga'])
    /* if(pagMark <3){
    var fi = document.getElementById(`f1`).value;
    console.log(fi);
    lerAPI(fi);}
    else{
        var fi = document.getElementById(`f1`).value;
        console.log(fi);
        var pa = document.getElementById(`f2`).value;
        localStorage.setItem('q', pa)
        console.log();
        lerAPI(fi); 
    } */
  }
async function lerAPI(filtro = ""){
    var pagMark= 1
    if(pagMark==2){
    let produtosAPI

    let url = "https://fakestoreapi.com/products";
    if (filtro) {
      url += `/category/${filtro}`;
    }
    const response = await fetch(url);
    produtosAPI = await response.json();
    changeCard(produtosAPI);}
    else if(pagMark==3){
    let produtosAPI
    let p = localStorage.getItem('q')
    let url = "https://diwserver.vps.webdock.cloud/products";
    if (filtro && p==1) {
        url += `/category/${filtro}`;
      }
      else if (filtro && p !== "1") {
        url += `/category/${filtro}?page=${p}`;
      }
      
    response = await fetch(url);
    produtosAPI = await response.json();
    changeCard(produtosAPI);
    }
    else{
      const response = await fetch('./base.json');
      base = await response.json();
        let produtosAPI = await base.itens
        let carrossa = await base.carr
        changeCard(produtosAPI);
        changeCar(carrossa)
    }
} 
async function loadCard(){
        document.getElementById(`carossa`).style.visibility="hidden";
        document.getElementById(`f2`).style.display="none";
        document.getElementById(`f3`).style.display="none";
        document.getElementById(`f1`).style.display="none";
        document.getElementById(`fl`).style.display="none";
        document.getElementById(`fb`).style.display="none";
        async function lerAPI2(){
          const response = await fetch('./base.json');
          base = await response.json();
            let produtosAPI = await base.itens
                changeMP(produtosAPI)
/*                 console.log(produtosAPI) */
        }
    lerAPI()
    lerAPI2()
    /* else if(pagMark==3){
        document.getElementById(`organ`).style.display="grid";
        document.getElementById(`carossa`).style.visibility="hidden";
        document.getElementById(`f2`).innerHTML=`<option selected value="1">paginas</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>`
        document.getElementById(`f3`).style.display="none";
        document.getElementById(`f2`).style.display="block";
        document.getElementById(`f1`).style.display="block";
        document.getElementById(`fl`).style.display="block";
        document.getElementById(`fb`).style.display="block";
        document.getElementById(`f1`).innerHTML=`<option selected value="">Categoria</option>
        <option value="Footwear%20-%20Shoes">Sapatos</option>
        <option value="Accessories%20-%20Accessories">Acessorios</option>
        <option value="Footwear%20-%20Flip%20Flops">Chinelos</option>
        <option value="Accessories%20-%20Watches">Relogios</option>`
        async function lerAPI2(){
            let produtosAPI2 = await fetch('https://diwserver.vps.webdock.cloud/products?page=496')
                produtosAPI2 = await produtosAPI2.json()
                changeMP(produtosAPI2)
            let produtosAPI3 = await fetch('https://diwserver.vps.webdock.cloud/products?page=500')
                produtosAPI3 = await produtosAPI3.json()
                changeCX(produtosAPI3)
        }
        function changeMP(produtosAPI){
            for(let i=1;i<7;i++){
                document.getElementById(`MPI${i}`).innerHTML=`<img src="${produtosAPI['products'][(i)]['image']}" height="110px" width="80px" class="imgMP" alt="Imagem melhores produtos SSS-Class Suicide Hunter">`
                document.getElementById(`MPC${i}`).innerHTML=`<p class="tituloMP">${produtosAPI['products'][(i)]['title']}</p>
                <p class="estrelasMP">
                    <i class='fas fa-star'></i>
                    <i class='fas fa-star'></i>
                    <i class='fas fa-star'></i>
                    <i class='fas fa-star'></i>
                    <i class='fas fa-star'></i>
                </p>
                <p>R$${produtosAPI['products'][(i)]['price']}</p>`
            }
        }
        function changeCX(produtosAPI){
            for(let i=1;i<5;i++){
                document.getElementById(`cx${i}`).innerHTML=`<img src="${produtosAPI['products'][(i)]['image']}" alt="" class="CardCAR1">
                <p class="test1">${produtosAPI['products'][(i)]['title']}</p>`
            }
        }
    lerAPI()
    lerAPI2()
    }
    else{
        document.getElementById(`organ`).style.display="grid";
        document.getElementById(`carossa`).style.visibility="hidden";
        document.getElementById(`f2`).style.display="none";
        document.getElementById(`f3`).style.display="none";
        document.getElementById(`f1`).style.display="block";
        document.getElementById(`fl`).style.display="block";
        document.getElementById(`fb`).style.display="block";
        document.getElementById(`f1`).innerHTML=`<option selected value="">Categoria</option>
        <option value="electronics">Eletronicos</option>
        <option value="jewelery">Joalheiria</option>
        <option value="men's clothing">Vestuario masculino</option>
        <option value="women's clothing">Vestuario feminino</option>`
        async function lerAPI2(){
            let produtosAPI = await fetch('https://fakestoreapi.com/products')
                produtosAPI = await produtosAPI.json()
                changeMP(produtosAPI)
                changeCX(produtosAPI)
        }
        function changeMP(produtosAPI){
            for(let i=1;i<7;i++){
                document.getElementById(`MPI${i}`).innerHTML=`<img src="${produtosAPI[(i+9)]['image']}" height="110px" width="80px" class="imgMP" alt="Imagem melhores produtos SSS-Class Suicide Hunter">`
                document.getElementById(`MPC${i}`).innerHTML=`<p class="tituloMP">${produtosAPI[(i+9)]['title']}</p>
                <p class="estrelasMP">
                    <i class='fas fa-star'></i>
                    <i class='fas fa-star'></i>
                    <i class='fas fa-star'></i>
                    <i class='fas fa-star'></i>
                    <i class='fas fa-star'></i>
                </p>
                <p>R$${produtosAPI[(i+9)]['price']}</p>`
            }
        }
        function changeCX(produtosAPI){
            for(let i=1;i<5;i++){
                document.getElementById(`cx${i}`).innerHTML=`<img src="${produtosAPI[(i+9+6)]['image']}" alt="" class="CardCAR1">
                <p class="test1">${produtosAPI[(i+9+6)]['title']}</p>`
            }
        }
    lerAPI()
    lerAPI2()
} */
}
function changeMP(produto) {
  const mp = document.getElementById('mpCont');
  mp.innerHTML = '';

  for (let i = 0; i < 6; i++) {
    const index = i + 12;
    const stars = stCount(produto[index].rating.rate)
    const mpiHTML = `
      <div class="col-3 col-md-5 col-lg-3 border-bottom border-danger" id="MPI${i + 1}">
        <img src="${produto[index].image}" height="110px" width="80px" class="imgMP" alt="Imagem melhores produtos ${produto[index].title}">
      </div>
      <div class="col-9 col-md-7 col-lg-9 border-bottom border-danger" id="MPC${i + 1}">
        <a href="./detail.html" id="g${i + 1}">
          <p class="tituloMP">${produto[index].title}</p>
        </a>
        <p class="estrelasMP">
          ${stars}
        </p>
        <p>R$${produto[index].price}</p>
      </div>
    `;

    mp.insertAdjacentHTML('beforeend', mpiHTML);

    const linkElement2 = document.getElementById(`g${i + 1}`);
    linkElement2.addEventListener("click", (function(id) {
      return function() {
        id-=1
        localStorage.setItem('d', id);
      };
    })(produto[index].id));
  }
}
function changeCar(produtos) {
  const ind = document.getElementById('cInd');
  ind.innerHTML = '<button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>';

  const ins = document.getElementById('cIns');
  ins.innerHTML = `
    <div class="carousel-item active">
      <a href="./detail.html" id="c0">
        <img src="${produtos[0].image}" height="400px" width="600px" class="d-block w-100" alt="Imagem do anime overlord do carosel de imagens">
      </a>
    </div>
  `;

  for (let i = 1; i < produtos.length; i++) {
    const produto = produtos[i];
    ins.insertAdjacentHTML('beforeend', `
      <div class="carousel-item" data-bs-interval="3000" data-bs-pause="hover">
        <a href="./detail.html" id="c${i}">
          <img src="${produto.image}" height="400px" width="600px" class="d-block w-100" alt="Imagem do anime overlord do carosel de imagens">
        </a>
      </div>
    `);

    ind.insertAdjacentHTML('beforeend', `
      <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="${i}" aria-label="Slide ${i + 1}"></button>
    `);
  }
  for (let i = 0; i < produtos.length; i++) {
    const linkElement = document.getElementById(`c${i}`);
    linkElement.addEventListener('click', (function(index) {
      return function() {
        var id = produtos[index].id;
        id-=1
        localStorage.setItem('d', id);
      };
    })(i));
  }

  document.getElementById('carossa').style.visibility = "visible";
}



function changeCard(produtosAPI) {
  const carCont = document.getElementById('CardsCont');
  carCont.innerHTML = '';

  const rowContainer = document.createElement('div');
  rowContainer.classList.add('row-container');
  carCont.appendChild(rowContainer);

  for (let i = 0; i < 9; i += 3) {
    const cardline = document.createElement('div');
    cardline.classList.add('row', 'mt-4');
    rowContainer.appendChild(cardline);

    for (let j = i; j < i + 3; j++) {
      if (j >= produtosAPI.length) {
        break;
      }

      const produto = produtosAPI[j+3];
      const cardIndex = j + 1;
      const stars = stCount(produto.rating.rate);
      const cardElement = document.createElement('div');
      cardElement.classList.add('col-4', 'card-item');
      cardElement.innerHTML = `
        <div class="card" id="Cards">
          <img src="${produto.image}" value="" class="card-img-top" alt="" id="imCa">
          <div class="card-body">
            <a href="./detail.html" id="b${cardIndex}">
              <h5 class="card-title" id="TiCr">${produto.title}</h5>
            </a>
            <p class="card-text">R$${produto.price}</p>
            <p class="estrelasCard">
              ${stars}
            </p>
          </div>
        </div>
      `;

      cardline.appendChild(cardElement);

      const linkElement = document.getElementById(`b${cardIndex}`);
      linkElement.addEventListener('click', function() {
        var id = produtosAPI[cardIndex - 1].id;
        id += 2;
        localStorage.setItem('d', id);
      });
    }
  }
}



function stCount(rate) {
  let stars = '';

  if (rate >= 1 && rate <= 10) {
    const fullStars = Math.floor(rate / 2);
    const halfStar = rate % 2 === 1;

    for (let i = 0; i < fullStars; i++) {
      stars += `<i class='fas fa-star'></i>`;
    }

    if (halfStar) {
      stars += `<i class='fa-regular fa-star-half-stroke'></i>`;
    }

    const remainingStars = 5 - Math.ceil(rate / 2);

    for (let i = 0; i < remainingStars; i++) {
      stars += `<i class='fa-regular fa-star'></i>`;
    }
  } else {
    stars = `<i class='fa-regular fa-star'></i>
             <i class='fa-regular fa-star'></i>
             <i class='fa-regular fa-star'></i>
             <i class='fa-regular fa-star'></i>
             <i class='fa-regular fa-star'></i>`;
  }

  return stars;
}