async function detail() {
        var Proid = (localStorage.getItem('d'));
        console.log(Proid)
        let prod = await fetch('./base.json');
        prod = await prod.json()
        prod= prod.itens
        console.log(prod)
        change(prod[Proid])
    }
    function change(prod){
    var count=prod['rating']['count']
    var descri=prod['description']
    var img=prod['image']
    var pri=prod['price']
    var ti=prod['title']
    var clas=prod['rating']['rate']

    const stars2= stCount(clas)
    document.getElementById('Est').innerHTML=`${stars2}`
    var gend=prod['gender']
    var yea=prod['year']
    var Aut=prod['brandName']
    console.log(gend, yea, Aut)
    document.getElementById("count").textContent=`Votos ${count}`
    document.getElementById("gen").textContent=`Generos: ${gend}`
    document.getElementById("ye").textContent=`Ano de lançamento: ${yea}`
    document.getElementById("brand").textContent=`Autor: ${Aut}`
    document.getElementById("descr").textContent=descri
    document.getElementById("im").src=img
    document.getElementById("titl").textContent=ti
    document.getElementById("preco").textContent=`R$${pri}`
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
      function pes4() {
        localStorage.setItem('p', document.getElementById('detP').value);
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
      
        MCI(itens);
      }
      
      