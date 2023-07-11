function IniciarCarin(remover = "") {
  const existingItems = localStorage.getItem('DE');
  const preItems = localStorage.getItem('SA')
  let cartItems = [];
  let remItems = [];
  var newItemID;
  if (existingItems) {
    cartItems = JSON.parse(existingItems);
    remItems = JSON.parse(preItems)
  }

  if (remover) {
    const indexToRemove = cartItems.findIndex(item => item === remover);
    if (indexToRemove !== -1) {
      cartItems.splice(indexToRemove, 1);
      remItems.splice(indexToRemove, 1);
    }
  }
  else{
  newItemID = localStorage.getItem('CA'); 
  if (newItemID) {
    cartItems.push(newItemID);
  }
}
  const cartItemsJSON = JSON.stringify(cartItems);
  const preItemsJSON = JSON.stringify(remItems)

  localStorage.setItem('DE', cartItemsJSON);
  localStorage.setItem('SA', preItemsJSON);
  console.log(cartItems)
}

localStorage.removeItem('DE');

function removerItem(itemID) {
  IniciarCarin(itemID);
  prenCar();
}

async function fetchItemDetails(itemID) {
  itemID -=1
  const response = await fetch('/Otaku proj/Biblioteca otaku/base.json');
    base = await response.json();
      let it = await base.itens
      it = it[itemID]
      return it
}

async function fetchItemPrices(itemIDs) {
  try {
    const response = await fetch('/Otaku proj/Biblioteca otaku/base.json');
    const base = await response.json();
    const prices = itemIDs.map(itemID => {
      const item = base.itens[itemID - 1];
      return item.price;
    });
    return prices;
  } catch (error) {
    console.error('Error fetching item prices:', error);
    return [];
  }
}
function togCar(){
  document.getElementById('CC').classList.toggle("active")
}

function pageLoad() {
  let savedItems = JSON.parse(localStorage.getItem('LO')) || [];
  if (savedItems.length === 0) {
    savedItems = JSON.parse(localStorage.getItem('SA')) || [];
    localStorage.setItem('DE', JSON.stringify(savedItems));
    prenCar();
  } else {
    localStorage.setItem('DE', JSON.stringify(savedItems));
    prenCar();
    localStorage.setItem('SA', JSON.stringify(savedItems));
  }
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