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
  const response = await fetch('./base.json');
    base = await response.json();
      let it = await base.itens
      it = it[itemID]
      return it
}

async function fetchItemPrices(itemIDs) {
  try {
    const response = await fetch('./base.json');
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