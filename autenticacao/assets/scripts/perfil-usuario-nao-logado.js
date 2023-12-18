async function fetchInfosUser(idUser) {
  try {
    const response = await fetch(`https://jsonserver-usuarios-helpet--imcathalat1.repl.co/users/${idUser}`);
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error('Erro ao buscar os dados: ', error);
  }
}

async function renderUserNotLogged(contPets) {
  const urlParams = new URLSearchParams(window.location.search);
  const idUser = urlParams.get('id');

  console.log(idUser);

  const dataCadUser = await fetchInfosUser(idUser);

  if (dataCadUser) {
    document.getElementById('name').textContent = dataCadUser.nome;
    document.getElementById('userImage').src = dataCadUser.perfil;
    document.getElementById('localizacao').textContent = dataCadUser.cidade;
    document.getElementById('descricao').textContent = dataCadUser.descricao;

  } else {
    alert('Produto não encontrado');
  }
}

//FUNÇÕES PARA MOSTRAR CARDS DE PET DO USUARIO EM QUESTÃO

async function showAdoptModal(data) {
  var modalContentContact = `
      <div class="modal fade" id="adoptUserModal" tabindex="-1" aria-labelledby="userModal" aria-hidden="true">
                       <div class="modal-dialog modal-dialog-centered">
                         <div class="modal-content">
                              <div class="modal-header">
                                  <aside><img class="logo" src="logohelpet.jpeg" alt=""></aside>
                                  <h5 class="modal-title" id="exampleModalLabel">Entrar em contato?</h5>
                                 <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" id="closeButton"></button>
                              </div>
                               <div class="modal-body p-4">
                                  <div class="bg-light p-4 rounded border">
                                      <div class="d-flex">
                                          <p>Para adotar o pet ou saber mais entre em contato com <span class="userName">${data.nome}</span> por:</p>
                                      </div>
                                      <div><span><i class="fa-brands fa-whatsapp"></i></span><span class="userPhone ms-3">${data.telefone}</span></div>
                                       <div><span><i class="fa-regular fa-envelope"></i></span><span class="userEmail ms-3">${data.email}</span></div>
                                  </div>
                               </div>
                              <div class="modal-footer d-flex align-items-center justify-content-start">
                                  <button type="button" class="btn btn-secondary" id="closeButton" data-bs-dismiss="modal">Close</button>
                              </div>
                           </div>
                       </div>
                  </div>
  `;

  document.getElementById('modalAdotar').innerHTML = modalContentContact;

  var modalContactForAdopt = new bootstrap.Modal(document.getElementById(`adoptUserModal`));
  modalContactForAdopt.show();

  const btnCloseModalAdopt = document.getElementById("closeButton");
  console.log(btnCloseModalAdopt);
  
  btnCloseModalAdopt.addEventListener("click", function(){
        console.log("button sair");
      location.reload();
    });
}

async function fetchUserInformationForAdopt(idUser) {
  try {
    const response = await fetch(`https://jsonserver-usuarios-helpet--imcathalat1.repl.co/users/${idUser}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Erro ao buscar os dados: ', error);
  }
}

async function renderUserInformationForAdopt() {
  const urlParams = new URLSearchParams(window.location.search);
  const idUser = urlParams.get('id');

  console.log(idUser);

  const data = await fetchUserInformationForAdopt(idUser);
  console.log(data);
  showAdoptModal(data);
}

async function renderCardPetOfSpecificUser(pet) {
  const cardDiv = document.createElement('div');
  cardDiv.className = 'col-sm-6 col-md-3 col-lg-3 justify-content-center p-2';

  cardDiv.innerHTML = `
          <div class="card h-100 card-pets-em-adocao">
            <img src="${pet.image}" class="card-img-top object-fit-cover" alt="" height="200px">
            <div class="card-body ">
              <h5 class="card-title">${pet.nome}</h5>
              <p class="card-text">${pet.cidade}, ${pet.estado}</p>
              <button type="button" class="btn w-100 mb-2 mx-1 btn-adotar" id="openModalAdotar/${pet.id}">
                Adotar
              </button>
  
            </div>
          </div>
      `;

  const buttonModalAdotar = document.getElementById('openModalAdotar/${pet.id}');
  console.log(buttonModalAdotar);
  //buttonModalAdotar.addEventListener("click", function () {
    //console.log("aqui!");
   // renderUserInformationForAdopt();
  //});
  return cardDiv;
}

async function renderCardPetsOneByOne(data) {
  const cardContainer = document.getElementById('card-container');
  var contador = 0;
  for (let i = 0; i < data.length; i++) {
    card = await renderCardPetOfSpecificUser(data[i]);
    // aqui, a variavel cardContainer adiciona aquele html de card da função renderCard com as informações vindas do json no html do index
    cardContainer.appendChild(card);
  }
  return contador;
  console.log(contador);
}

async function fetchPets(idUserPet) {

  const url = `https://jsonserver-cadastro-pet-2-helpet--imcathalat1.repl.co/pets?userId=${idUserPet}`;
  console.log(url);
  try {
    const response = await fetch(url);
    const data = await response.json();
    renderCardPetsOneByOne(data);

  } catch (error) {
    console.error('Erro ao buscar os dados: ', error);
  }
}

document.addEventListener("DOMContentLoaded", async function() {
  // Chame a função renderCardPetsOneByOne ou qualquer outra lógica aqui.
  const urlParams = new URLSearchParams(window.location.search);
  const idUserPet = urlParams.get('id');
  fetchPets(idUserPet);
  renderUserNotLogged();
});


//FUNÇÕES PARA MOSTRAR AS AJUDAS CADASTRADAS DO USUÁRIO

function renderCardAjudaFinanceira(infosFinanceiro) {
  const cardAjudaContainer = document.getElementById('financeiro');

  const cardDiv = document.createElement('div');
  cardDiv.className = 'card card-ajuda-financeira';

  cardDiv.innerHTML = `
        <div class="card-body">
          <h5 class="card-title">Ajuda Financeira</h5>
          <h6 class="card-subtitle mb-2 text-muted">R$<span>${infosFinanceiro.valor}</span></h6>
          <p class="card-text">${infosFinanceiro.descricao}</p><div class="container">
          <button type="button" class="btn w-100 mb-2 mx-1 btn-adotar" id="openModalAjudar">
              Ajudar
          </button>
        </div>
    `;

  cardAjudaContainer.appendChild(cardDiv);

}

async function fetchAjudaFinanceira(idUserAjuda) {
  const url = `https://jsonserver-cadastro-ajudas-helpet--imcathalat1.repl.co/financeiro?userId=${idUserAjuda}`;
  console.log(url);
  try {
    const response = await fetch(url);
    const data = await response.json();
    const infosFinanceiro = data[0];
    console.log(infosFinanceiro);
    renderCardAjudaFinanceira(infosFinanceiro);

  } catch (error) {
    console.error('Erro ao buscar os dados: ', error);
  }
}


function renderCardRacao(ajudaRacaoData) {
  const cardAjudaContainer = document.getElementById('racao');

  const cardDiv = document.createElement('div');
  cardDiv.className = 'card card-pets-em-adocao mb-3 card-div';

  cardDiv.innerHTML = `
        <img
          src="${ajudaRacaoData.image}"
          class="card-img-top object-fit-cover" alt="..." height="200px">
        <div class="card-body">
          <h5 class="card-title">${ajudaRacaoData.nome}</h5>
          <p class="card-text">R$ ${ajudaRacaoData.preco}</p>
          <p class="card-text">Chave Pix: ${ajudaRacaoData.chavePix}</p>
          <button type="button" class="btn w-100 mb-2 mx-1 btn-adotar" id="openModalAjudar">
              Ajudar
          </button>
        </div>
      
    `;

  cardAjudaContainer.appendChild(cardDiv);

}

async function fetchAjudaRacao(idUserAjuda) {
  const url = `https://jsonserver-cadastro-ajudas-helpet--imcathalat1.repl.co/racao?userId=${idUserAjuda}`;
  console.log(url);
  try {
    const response = await fetch(url);
    const data = await response.json();
    const infosRacao = data[0];
    renderCardRacao(infosRacao);

  } catch (error) {
    console.error('Erro ao buscar os dados: ', error);
  }
}


async function renderAjudaSpecificUser() {
  const urlParams = new URLSearchParams(window.location.search);
  const idUserAjuda = urlParams.get('id');

  console.log(idUserAjuda);

  fetchAjudaRacao(idUserAjuda);
  fetchAjudaFinanceira(idUserAjuda);

}



// renderUserNotLogged();
//fetchPets();
renderAjudaSpecificUser();