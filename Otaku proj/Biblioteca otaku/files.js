function pes() {
  localStorage.setItem('p', document.getElementById('impPT').value);
}

function trocarPagina() {
  window.location.href = "./Search.html";
}


function filtro() {
  var fi = document.getElementById('f1').value
  var fc = document.getElementById('f2').value
        lerAPI(fi, fc); 
  }
  async function lerAPI(filtro = "",filtro2 = "") {
    const response = await fetch('./base.json');
    const base = await response.json();
    let produtosAPI = base.itens;
    let carrossa = base.carr;
  
    if (filtro && filtro2) {
      produtosAPI = produtosAPI.filter(product => {
        const { gender, displayCategories } = product;
        const desiredGender = filtro;
        const desiredCategory = filtro2; 
        return (
          (gender && gender.includes(desiredGender)) &&
          (displayCategories && displayCategories === desiredCategory)
        );
      });
    }
    else if (filtro && !filtro2) {
      produtosAPI = produtosAPI.filter(product => {
        const { gender} = product;
        const desiredGender = filtro; 
        return (
          (gender && gender.includes(desiredGender))
        );
      });
    }
    else if (!filtro && filtro2) {
      produtosAPI = produtosAPI.filter(product => {
        const { displayCategories } = product;
        const desiredCategory = filtro2; 
        return (
          (displayCategories && displayCategories === desiredCategory)
        );
      });
    }
    changeCard(produtosAPI);
    changeCar(carrossa);
  }
  async function lerAPI2(){
    const response = await fetch('./base.json');
    base = await response.json();
      let produtosAPI = await base.itens
          changeMP(produtosAPI)
  }
async function loadCard(){
        document.getElementById(`carossa`).style.visibility="hidden";
        var fb = document.getElementById(`fb`)
        fb.style.visibility="hidden"
        var ft = document.getElementById(`fl`)
        ft.style.visibility="hidden"
        const fil= document.getElementById('filters')
        fil.innerHTML=''
        var load= true
        if(load==true){
          ft.style.visibility="visible"
        fil.innerHTML=`<select class="form-select mb-2 form-select-sm" aria-label="Default select example" id="f1" onfocus='this.size=7;' onblur='this.size=1;'onchange='this.size=1; this.blur();'>
        <option selected value="">Genero</option>
        <option value="Action">Ação</option>
        <option value="Martial arts">Artes Marciais</option>
        <option value="Adventure">Aventura</option>
        <option value="Comedy">Comédia</option>
        <option value="Detective">Detetive</option>
        <option value="ecchi">Ecchi</option>
        <option value="Fantasy">Fantasia</option>
        <option value="Dark Fantasy">Fantasia Sombria</option>
        <option value="science fiction">Ficção Científica</option>
        <option value="Harem">Harem</option>
        <option value="Isekai">Isekai</option>
        <option value="Mature">Maturo</option>
        <option value="mystery">Mistério</option>
        <option value="Romance">Romance</option>
        <option value="Seinen">Seinen</option>
        <option value="Shounen">Shounen</option>
        <option value="Slice of Life">Slice of Life</option>
        <option value="Supernatural">Sobrenatural</option>
        <option value="Superhero">Super-herói</option>
        <option value="Tragedy">Tragédia</option>
        <option value="Xuanhuan">Xuanhuan</option>
    </select>    
    <select class="form-select mb-2 form-select-sm" aria-label="Default select example" id="f2" onfocus='this.size=5;' onblur='this.size=1;'onchange='this.size=1; this.blur();'>
        <option selected value="">Categoria</option>
        <option value="Manga">Manga</option>
        <option value="Manhwa">Manhwa</option>
        <option value="LightNovel">Light Novel</option>
        <option value="WebNovel">Web Novel</option>
    </select>`
          fb.style.visibility="visible"
        }
    lerAPI()
    lerAPI2()
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
  console.log(produtosAPI)
  const carCont = document.getElementById('CardsCont');
  carCont.innerHTML = '';

  const rowContainer = document.createElement('div');
  rowContainer.classList.add('row-container', 'ajuste2');
  carCont.appendChild(rowContainer);

  const maxCards = 12; 
  const filteredProducts = produtosAPI.slice(0, maxCards);

  for (let i = 0; i < maxCards; i += 3) {
    const cardline = document.createElement('div');
    cardline.classList.add('row', 'mt-4');
    cardline.classList.add('ajuste');
    rowContainer.appendChild(cardline);

    for (let j = i; j < i + 3; j++) {
      if (j >= filteredProducts.length) {
        break;
      }

      const produto = filteredProducts[j];
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
        var id = produto.id;
        id -= 1;
        localStorage.setItem('d', id);
      });
    }
  }

  if (filteredProducts.length === 1) {
    rowContainer.classList.add('single-card');
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