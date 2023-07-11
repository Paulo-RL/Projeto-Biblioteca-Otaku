function pes() {
    localStorage.setItem('p', document.getElementById('impPT').value);
  }
  
  function trocarPagina() {
    window.location.href = "/Otaku proj/Biblioteca otaku/pesquisa/Search.html";
  }
  
  
  function filtro() {
    var fi = document.getElementById('f1').value
    var fc = document.getElementById('f2').value
          lerAPI(fi, fc); 
    }
    async function lerAPI(filtro = "",filtro2 = "") {
      const response = await fetch('/Otaku proj/Biblioteca otaku/base.json');
      const base = await response.json();
      let produtosAPI = base.itens;
    
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
    }
  async function loadCard(){
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
  }
  
  
  
  function changeCard(produtosAPI) {
    console.log(produtosAPI)
    const carCont = document.getElementById('CardsCont');
    carCont.innerHTML = '';
  
    const rowContainer = document.createElement('div');
    rowContainer.classList.add('row-container', 'ajuste2');
    carCont.appendChild(rowContainer);
  
    for (let i = 0; i < produtosAPI.length; i += 4) {
      const cardline = document.createElement('div');
      cardline.classList.add('row', 'mt-4');
      cardline.classList.add('ajuste');
      rowContainer.appendChild(cardline);
  
      for (let j = i; j < i + 4; j++) {
        if (j >= produtosAPI.length) {
          break;
        }
  
        const produto = produtosAPI[j];
        const cardIndex = j + 1;
        const stars = stCount(produto.rating.rate);
  
        const cardElement = document.createElement('div');
        cardElement.classList.add('col-4', 'card-item');
        cardElement.innerHTML = `
          <div class="card" id="Cards">
            <img src="${produto.image}" value="" class="card-img-top" alt="" id="imCa">
            <div class="card-body">
              <a href="/Otaku proj/Biblioteca otaku/detalhes/detail.html" id="b${cardIndex}">
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