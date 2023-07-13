function OpenCad(){
    OpenBox()
    OpenCad2()
}

function OpenLog(){
    OpenBox()
    OpenLog2()
}
function OpenBox() {
    var lccElement = document.getElementById('LCC');
    lccElement.classList.toggle("active");
    window.scrollTo({ top: 0 });
  
    setTimeout(function() {
      var htmlElement = document.querySelector("html");
      var bodyElement = document.querySelector("body");
  
      if (lccElement.classList.contains("active")) {
        htmlElement.style.overflow = "hidden";
        bodyElement.style.overflow = "hidden";
      } else {
        htmlElement.style.overflow = "";
        bodyElement.style.overflow = "";
      }
    }, 2000);
  }


function OpenCad2(){
    document.getElementById('LC').innerHTML=`
    <img src="/Otaku proj/Biblioteca otaku/imagens/close.png" id="cl" alt="Fechar login ou cadastro" onclick="OpenBox()">
    <div>
    <p class="LCT">Cadastro</p>

    <a action="" class="FLC">
        <div class="INM">
        Nome completo:
        <input type="text" id="INM">
        </div>
        <div class="ITL">
        Telefone:
        <input type="tel" id="ITL">
        </div>
        <div class="IEM">
        Email:
        <input type="email" id="IEM">
        </div>
        <div  class="IPS">
        Senha:
        <input type="password" id="IPS">
        </div>
        <button type="submit" onclick="CADSAV()">Cadastrar</button>
    </a>
</div>`
}

function OpenLog2(){
    document.getElementById('LC').innerHTML=`
    <img src="/Otaku proj/Biblioteca otaku/imagens/close.png" id="cl" alt="Fechar login ou cadastro" onclick="OpenBox()">
    <div>
    <p class="LCT">Login</p>

    <a action="" class="FLC">
        <div class="IEML">
        Email:
        <input type="email" id="IEML">
        </div>
        <div  class="IPSL">
        Senha:
        <input type="password" id="IPSL">
        </div>
        <button type="submit" onclick="LOG()">Login</button>
    </a>
</div>`
}

const storedUserList = localStorage.getItem('userList');
const userList = storedUserList ? JSON.parse(storedUserList) : [];

function CADSAV() {
  const Name = document.getElementById('INM').value;
  const Tel = document.getElementById('ITL').value;
  const Email = document.getElementById('IEM').value;
  const Password = document.getElementById('IPS').value;

  if (!Name || !Tel || !Email || !Password) {
    displayErrorMessage("Por favor, preencha todos os campos");
    return;
  }

  const userInfo = {
    name: Name,
    telephone: Tel,
    email: Email,
    password: Password
  };

  const isDuplicate = userList.some(user => (
    user.name === Name &&
    user.email === Email
  ));

  if (isDuplicate) {
    displayErrorMessage("Usuario já cadastrado");
    return;
  }

  userList.push(userInfo);
  localStorage.setItem('userList', JSON.stringify(userList));
  console.log(userList);

  OpenBox();
}

var userName = '';
var Login = false;

function LOG() {
  const Email = document.getElementById('IEML').value;
  const Password = document.getElementById('IPSL').value;

  if (!Email || !Password) {
    displayErrorMessage("Por favor, preencha todos os campos");
    return;
  }

  const user = userList.find(user => (
    user.password === Password &&
    user.email === Email
  ));

  if (!user) {
    displayErrorMessage("Login inválido");
    return;
  }

  userName = user.name;
  Login = true;
  console.log(userName);
  OpenBox();
}

function displayErrorMessage(message) {
  const LogCad = document.getElementById('LC');
  if (!LogCad) {
    console.error("LogCadCont element not found");
    return;
  }
  const c2= document.getElementById('ErM')
  if(c2){
    c2.textContent = message
  }
  else{
    const errorMessage = document.createElement('p');
  errorMessage.id = 'ErM'
  errorMessage.classList.add('error-message');
  errorMessage.textContent = message;
  LogCad.appendChild(errorMessage);
  }
}

  
/* Depois tenho que adicionar um login de ADM para poder limpar a lista */
/* const userIndexToDelete = 0;
if (userIndexToDelete >= 0 && userIndexToDelete < userList.length) {
  userList.splice(userIndexToDelete, 1);
}
localStorage.setItem('userList', JSON.stringify(userList));
console.log(userList); *//* Limpador de lista */