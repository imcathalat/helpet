const urlUser = "https://jsonserver-usuarios-helpet--imcathalat1.repl.co/users";
const urlPet = "https://jsonserver-cadastro-pet-2-helpet--imcathalat1.repl.co/pets";
const urlUserLogado = "https://jsonserver-status-user-logado--imcathalat1.repl.co/status-logado";


//Funções para carregar as informações do usuário
//-------------------------------------------------//

async function fetchUserInformation() {
  try {
    const response = await fetch(urlUserLogado);
    const data = await response.json();
    updateInfoProfile(data);
  } catch (error) {
    console.error('Erro ao buscar os dados: ', error);
  }
}


function updateInfoProfile(user) {

  if (user) {
    document.getElementById('name').textContent = user[0].nome;
    document.getElementById('userImage').src = user[0].perfil;
    document.getElementById('cidade').textContent = user[0].cidade;
    document.getElementById('estado').textContent = user[0].estado;
    document.getElementById('descricao').textContent = user[0].descricao;
    document.getElementById('icone-perfil').src = user[0].perfil;


  } else {
    alert('Produto não encontrado');
  }
}

//Funções para carregar os cards dos pets e modal de adotar 
//-------------------------------
// #######################################
//

// FUNÇÕES PARA DELETAR PET COMEÇAM AQUI

async function deletePet(petId) {

  try {
    const url = `https://jsonserver-cadastro-pet-2-helpet--imcathalat1.repl.co/pets/${petId}`; // Substitua pelo URL real do seu endpoint
    const options = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        // Adicione outros cabeçalhos conforme necessário
      },
    };

    const response = await fetch(url, options);

    if (!response.ok) {
      throw new Error(`Erro ao excluir o produto: ${response.status} ${response.statusText}`);
    }

    console.log('Produto excluído com sucesso');

    // Coloque aqui a lógica adicional após a exclusão bem-sucedida, se necessário

  } catch (error) {
    console.error('Erro durante a solicitação DELETE:', error.message);
  }
}

async function modalConfirmaDeletePet(petId) {
  var modalContentConfirmDeletePet = `
    <div class="modal fade modal-dialog-centered" id="confirmDelete" tabindex="-1" aria-labelledby="userModal" aria-hidden="true">
                     <div class="modal-dialog modal-dialog-centered">
                       <div class="modal-content">
                            <div class="modal-header">
                                <aside><img class="logo" src="logohelpet.jpeg" alt=""></aside>
                                <h5 class="modal-title" id="exampleModalLabel">Tem certeza?</h5>
                               <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body p-4">

                                <div class="row">
                                    <div id="msg" class="col-sm-10 offset-sm-1 ">
                                        <!--<div class="alert alert-warning">Contato não encontrado.</div>-->
                                    </div>
                                </div>
                            
                                <div class="container">
                                    <div class="bg-light p-4 rounded border">
                                      <h5>Tem certeza que deseja excluir esse pet?</h5
                                      <div>
                                        <input type="button" class="btn btn-danger" id="btnExcluir" value="Sim, Deletar">
                                        <input type="button" class="btn btn-outline-secondary" id="btnCancelarExclusao" value="Cancelar" data-bs-dismiss="modal">
                                      </div>
                                    </div>
                                    <div class="modal-footer d-flex align-items-center justify-content-start">
                                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                    </div>
                                </div>
                            </div>
                        </div>
`;

  document.getElementById('modalDeletePet').innerHTML = modalContentConfirmDeletePet;

  const cofirmExclusion = new bootstrap.Modal(document.getElementById(`confirmDelete`));
  cofirmExclusion.show();

  console.log("user id da ração q quero excluir: ", petId);

  btnExcluir = document.getElementById("btnExcluir");
  btnExcluir.addEventListener('click', async function () {
    await deletePet(petId);
    location.reload();
  });

}

async function getId(petzinId) {
  if (petzinId) {
    console.log(petzinId);
    modalConfirmaDeletePet(petzinId);
  } else {
    console.error('ID do produto não encontrado');
  }
}

// FUNÇÕES PARA DELETAR PET ACABAM AQUI

// FUNÇÕES PARA EDITAR PET

function displayMessage(mensagem) {
  msg = document.getElementById('msg');
  msg.innerHTML = '<div class="alert alert-warning">' + mensagem + '</div>';
}

function updatePetInfos(petEditado, idToUpdatePetInfo) {
  const apiUrl = `${urlPet}/${idToUpdatePetInfo}`; // Substitua com a URL correta da sua API

  console.log(apiUrl);

  fetch(apiUrl, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(petEditado)
  })
    .then(response => {
      if (response.ok) {
        displayMessage("Alteração feita com sucesso!");
        location.reload();
      } else {
        displayMessage("Erro ao alterar. Tente novamente.");
      }
    })
    .catch(error => {
      console.error('Erro:', error);
      displayMessage("Erro ao alterar. Tente novamente mais tarde.");
    });

  // Oculta a mensagem de aviso após alguns 5 segundos
  msg = document.getElementById('msg');

  msg.addEventListener("DOMSubtreeModified", function (e) {
    if (e.target.innerHTML == "") return;

    setTimeout(function () {
      alert = msg.getElementsByClassName("alert");
      alert[0].remove();
    }, 5000);
  })
}


async function showModalEditPet(data, userIdDoPetId) {
  const modalEditPetContent = `
  <div class="modal fade modal-dialog-centered" id="editPetInformationModal" tabindex="-1" aria-labelledby="userModal" aria-hidden="true">
                   <div class="modal-dialog modal-lg modal-dialog-centered">
                     <div class="modal-content">
                          <div class="modal-header d-flex justify-content-center align-items-center">
                          <h5 class="modal-title ml-3" id="exampleModalLabel">Editar pet</h5>
                          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" id="close"></button>
                      </div>
                          <div class="modal-body p-4">

                              <div class="row">
                                  <div id="msg" class="col-sm-10 offset-sm-1 ">
                                      <!--<div class="alert alert-warning">Contato não encontrado.</div>-->
                                  </div>
                              </div>
                              <div class="card mx-auto">
                              <h3 class="mx-auto">Edite as informações do seu bixinho</h3>
                              <div class="form-group row">
                              
                                <div class="col ms-4 text-center mb-2">
                                    <small class="">Sempre edite a localização (estado e cidade).</small>
                                </div>
                              
                              </div>
                             
                          
                              <div class="container">
                                  <div class="bg-light p-4 rounded border">
                                  <form id="editarPetForm" role="form">
                                  <div class="controls">
                                      <div class="row">
                                          <div class="col-md-10">
                                              <div class="form-group mt-1">
                                                  <label for="inputNome" class="form-label">Nome do bixinho</label>
                                                  <input class="form-control" type="text" aria-label="Nome do bixinho"
                                                      id="inputNome">
                                              </div>
                                          </div>
      
                                          <div class="col-md-2">
                                              <div class="form-group mt-1">
                                                  <label for="inputId" class="form-label">Id</label>
                                                  <input type="text" class="form-control" id="inputId" placeholder="ID" disabled>
                                              </div>
                                          </div>
      
                                          <div class="col-md-6">
                                              <div class="form-group mt-1">
                                                  <label for="selectEspecie" class="form-label">Espécie *</label>
                                                  <select id="selectEspecie" class="form-select">
                                                      <option value="" selected disabled></option>
                                                      <option value="cachorro">Cachorro</option>
                                                      <option value="gato">Gato</option>
                                                  </select>
                                              </div>
                                          </div>
                                          <div class="col-md-6">
                                              <div class="form-group mt-1">
                                                  <label for="selectEspecie" class="form-label">Sexo *</label>
                                                  <select id="selectSexo" class="form-select">
                                                      <option value="" selected disabled></option>
                                                      <option value="femea">Fêmea</option>
                                                      <option value="macho">Macho</option>
                                                  </select>
      
      
                                              </div>
                                          </div>
      
                                          <div class="col-md-6">
                                              <div class="form-group mt-1">
                                                  <label for="selectIdade" class="form-label">Idade *</label>
                                                  <select id="selectIdade" class="form-select">
                                                      <option value="" selected disabled></option>
                                                      <option value="filhote">Filhote</option>
                                                      <option value="adulto">Adulto</option>
                                                      <option value="idoso">Idoso</option>
                                                  </select>
                                              </div>
                                          </div>
                                          <div class="col-md-6">
                                              <div class="form-group mt-1">
                                                  <label for="selectPorte" class="form-label">Porte *</label>
                                                  <select id="selectPorte" class="form-select">
                                                      <option value="" selected disabled></option>
                                                      <option value="pequeno">Pequeno</option>
                                                      <option value="medio">Médio</option>
                                                      <option value="grande">Grande</option>
                                                  </select>
                                              </div>
                                          </div>
                                          <div class="col-md-6">
                                              <div class="form-group mt-1">
                                                  <label for="inputPeso" class="form-label">Peso *</label>
                                                  <input type="text" class="form-control" id="inputPeso">
                                              </div>
                                          </div>
                                          <div class="col-md-6">
                                              <div class="form-group mt-1">
                                                  <label for="inputRaca" class="form-label">Raça</label>
                                                  <input type="text" class="form-control" id="inputRaca">
                                              </div>
                                          </div>
      
                                          <div class="col-md-6">
                                              <div class="form-group mt-1">
                                                  <label for="inputEstado" class="form-label">Estado *</label>
                                                  <select id="selectEstado" class="form-select">
                                                      
                                                  </select>
                                              </div>
                                          </div>
                                          <div class="col-md-6">
                                              <div class="form-group mt-1">
                                                  <label for="inputCidade" class="form-label">Cidade *</label>
                                                  <select id="selectCidade" class="form-select">
                                                      
                                                  </select>
                                              </div>
                                          </div>

                                         <div class="row">
                                              <div class="form-group my-3">
                                                     <div class="col-md-12">
                                                     <label class="form-label">Foto da Ração: *</label>
                                                     <input type="url" class="form-control" placeholder="Insira URL da Imagem" id="inputUrlImagem">
                                                     <img width="200px" height="auto" id="displayImage" class="d-none">
                                                  </div>
                                              </div>
                                          </div>

                                          <div class="row">
                                              <div class="form-group my-3">
                                                  <div class="col-md-12">
                                                      <label for="textareaSobre" class="mb-2">Sobre o bixinho</label>
                                                      <textarea id="textareaDescricao" name="message" class="form-control"
                                                          placeholder="Descreva o pet aqui" rows="4"
                                                          required="required"
                                                          data-error="Please, leave us a message."></textarea>
                                                  </div>
                                              </div>
                                          </div>
      
                                              <div class="form-group row">
                                                  <div class="col">
                                                      <small>(*) Campos obrigatórios</small>
                                                  </div>
                                              </div>
                                      </div>
                                  </div>
                                  
                              </form>
                                      <div>
                                      <input type="button" class="btn" id="btnUpdateInfoPet" value="Alterar">
                                      </div>
                                  </div>
                                  </div>
                                  <div class="modal-footer d-flex align-items-center justify-content-start">
                                      <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                  </div>
                              </div>
                          </div>
                      </div>
`;

  document.getElementById('modalEditPet').innerHTML = modalEditPetContent;

  var modalEditPet = new bootstrap.Modal(document.getElementById(`editPetInformationModal`));
  modalEditPet.show();

  function capitalizeWord(word) {
    // Verifique se a palavra está em letras maiúsculas
    if (word === word.toUpperCase()) {
      // Transforma a palavra em letras minúsculas e depois capitaliza a primeira letra
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    } else {
      // Se a palavra não estiver toda em maiúsculas, retorne-a sem alterações
      return word;
    }
  }

  function getCidades(UF) {
    fetch(`https://brasilapi.com.br/api/ibge/municipios/v1/${UF}`)

      .then(response => response.json())
      .then(data => {
        let html = `<option value="" selected disabled></option>`;
        data.forEach(cidade => {
          html += `<option value="${capitalizeWord(cidade.nome)}">${capitalizeWord(cidade.nome)}</option>`;
        });
        document.getElementById('selectCidade').innerHTML = html;
      })

  }

  function getEstados() {
    fetch('https://brasilapi.com.br/api/ibge/uf/v1')

      .then(response => response.json())
      .then(data => {
        let html = `<option value="" selected disabled></option>`;
        data.forEach(UF => {
          html += `<option value="${UF.sigla}">${UF.nome}</option>`;
        });
        const estado = document.getElementById('selectEstado');
        estado.innerHTML = html;

        estado.addEventListener('change', function (e) {
          getCidades(e.target.value);
        });

      });
  }

  formEditPet = document.getElementById("editarPetForm");
  getEstados();


  btnUpdateInfoPet = document.getElementById("btnUpdateInfoPet");
  btnUpdateInfoPet.addEventListener('click', function () {

    if (!formEditPet.checkValidity()) {
      displayMessageCadPet("Preencha o formulário corretamente.");
      return;
  }
    // Obtem os valores dos campos do formulário
    let campoNome = document.getElementById('inputNome').value;
    let selectEspecie = document.getElementById('selectEspecie').value;
    let selectSexo = document.getElementById('selectSexo').value;
    let selectIdade = document.getElementById('selectIdade').value;
    let selectPorte = document.getElementById('selectPorte').value;
    let inputPeso = document.getElementById('inputPeso').value;
    let inputRaca = document.getElementById('inputRaca').value;
    let selectEstado = document.getElementById('selectEstado').value;
    let selectCidade = document.getElementById('selectCidade').value;
    let campoDescricao = document.getElementById('textareaDescricao').value;
    let campoImagem = document.getElementById('inputUrlImagem').value;

    const idToUpdatePetInfo = data.id;

    // Cria um objeto com os dados do contato
    let petEditado = {
      nome: campoNome,
      especie: selectEspecie,
      sexo: selectSexo,
      idade: selectIdade,
      porte: selectPorte,
      peso: inputPeso,
      Raca: inputRaca,
      estado: selectEstado,
      cidade: selectCidade,
      descricao: campoDescricao,
      image: campoImagem,
      userId: userIdDoPetId

    };

    updatePetInfos(petEditado, idToUpdatePetInfo);
  });
}



function selectInformationForEditPet(dataPet) {

  // Preenche os campos do formulário com os dados da linha selecionada na tabela
  document.getElementById('inputNome').value = dataPet.nome;
  document.getElementById('selectEspecie').value = dataPet.especie;
  document.getElementById('selectSexo').value = dataPet.sexo;
  document.getElementById('selectIdade').value = dataPet.idade;
  document.getElementById('selectPorte').value = dataPet.porte;
  document.getElementById('inputPeso').value = dataPet.peso;
  document.getElementById('inputRaca').value = dataPet.Raca;
  document.getElementById('selectEstado').value = dataPet.estado;
  document.getElementById('selectCidade').value = dataPet.cidade;
  document.getElementById('textareaDescricao').value = dataPet.descricao;
  document.getElementById('inputUrlImagem').value = dataPet.image;

}

async function fetchInfosPetEmQuestao(id, userIdDoPetId) {
  try {
    const response = await fetch(`${urlPet}/${id}`);
    const data = await response.json();
    showModalEditPet(data, userIdDoPetId);
    selectInformationForEditPet(data);
  } catch (error) {
    console.error('Erro ao buscar os dados: ', error);
  }
}

function renderCardPet(pet) {
  const cardDiv = document.createElement('div');
  cardDiv.className = 'col-sm-6 col-md-3 col-lg-3 p-2';

  cardDiv.innerHTML = `
        <div class="card h-100 d-flex card-pets-em-adocao">
          <img src="${pet.image}" class="card-img-top object-fit-cover" alt="" height="200px">
          <div class="card-body ">
            <h5 class="card-title">${pet.nome}</h5>
            <p class="card-text">${pet.cidade}, ${pet.estado}</p>
              <div class="container">
                <div class="row">
                  <div class="col-md-10 col-lg-10">
                    <button type="button" class="btn w-100 mb-2 mx-1 btn-adotar" id="openModalEditarPet">
                      Editar
                    </button>
                  </div>
                  <div class="col-md-2 col-lg-2">
                    <button type="button" class="btn position-relative" id="btnDeletePet"><i
                        class=" w-100 fa-solid fa-trash-can fa-lg trash btnDelete" id="${pet.id}" style="color: #000000;"></i>
                    </button>
                  </div>
                </div>
            </div>
          </div>
        </div>
    `;

  const id = `${pet.id}`;
  const userIdDoPetId = `${pet.userId}`;
  const btnDeletePet = cardDiv.querySelector('#btnDeletePet');
  const btnEditarPet = cardDiv.querySelector('#openModalEditarPet');

  btnDeletePet.addEventListener("click", function () {
    // Coloque aqui a lógica que você deseja executar ao clicar no botão de exclusão
    getId(id);
  });

  btnEditarPet.addEventListener("click", function () {
    // Coloque aqui a lógica que você deseja executar ao clicar no botão de exclusão
    fetchInfosPetEmQuestao(id, userIdDoPetId);
  });

  return cardDiv;
}



async function renderCardsOneByOne(data) {
  const cardContainer = document.getElementById('card-container');

  var contador = 0;
  for (let i = 0; i <= data.length; i++) {
    const card = renderCardPet(data[i]);
    cardContainer.appendChild(card); // aqui, a variavel cardContainer adiciona aquele html de card da função renderCard com as informações vindas do json no html do index
  }
  console.log(contador);
}

async function fetchPets(userId) {
  const url = `${urlPet}?userId=${userId}`;
  console.log(url);
  try {
    const response = await fetch(url);
    const data = await response.json();
    renderCardsOneByOne(data);

  } catch (error) {
    console.error('Erro ao buscar os dados: ', error);
  }
}

async function fetchUserInformation2() {
  try {
    const response = await fetch(urlUserLogado);
    const data = await response.json();
    const idUsuarioParaUserId = data[0].id;
    fetchPets(idUsuarioParaUserId);
  } catch (error) {
    console.error('Erro ao buscar os dados: ', error);
  }
}



//Funções para carregar os cards de ajudas cadastradas 
//-------------------------------
// #######################################
//

// CARDS DE AJUDA RAÇÃO
async function fetchCardDetails(idUsuario) {
  const url = `https://jsonserver-cadastro-ajudas-helpet--imcathalat1.repl.co/racao?userId=${idUsuario}`;
  console.log(url);
  const response = await fetch(url);
  const data = await response.json();
  console.log(data);
  renderRacoesArray(data);
}


function displayMessage(mensagem) {
  msg = document.getElementById('msg');
  msg.innerHTML = '<div class="alert alert-warning">' + mensagem + '</div>';
}

function updateRacao(racao, id ) {
  const apiUrl = `https://jsonserver-cadastro-ajudas-helpet--imcathalat1.repl.co/racao/${id}`; // Substitua com a URL correta da sua API

  console.log(apiUrl);

  fetch(apiUrl, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(racao)
  })
    .then(response => {
      if (response.ok) {
        displayMessage("Alteração feita com sucesso!");
        location.reload();
      } else {
        displayMessage("Erro ao alterar. Tente novamente.");
      }
    })
    .catch(error => {
      console.error('Erro:', error);
      displayMessage("Erro ao alterar. Tente novamente mais tarde.");
    });

  // Oculta a mensagem de aviso após alguns 5 segundos
  msg = document.getElementById('msg');

  msg.addEventListener("DOMSubtreeModified", function (e) {
    if (e.target.innerHTML == "") return;

    setTimeout(function () {
      alert = msg.getElementsByClassName("alert");
      alert[0].remove();
    }, 5000);
  })
}


async function showModalEditRacao(data, userIdRacao) {
  const modalEditRacaoContent = `
  <div class="modal fade modal-dialog-centered" id="editRacaoModal" tabindex="-1" aria-labelledby="userModal" aria-hidden="true">
                   <div class="modal-dialog modal-lg modal-dialog-centered">
                     <div class="modal-content">
                          <div class="modal-header d-flex justify-content-center align-items-center">
                          <h5 class="modal-title ml-3" id="exampleModalLabel">Editar valor de ajuda financeira</h5>
                          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" id="close"></button>
                      </div>
                          <div class="modal-body p-4">

                              <div class="row">
                                  <div id="msg" class="col-sm-10 offset-sm-1 ">
                                      <!--<div class="alert alert-warning">Contato não encontrado.</div>-->
                                  </div>
                              </div>
                              <div class="card mx-auto">
                              <h3 class="mx-auto">Edite as informações do seu bixinho</h3>
                              <div class="form-group row">
                              
                                <div class="col ms-4 text-center mb-2">
                                    <small class="">Sempre edite a localização (estado e cidade).</small>
                                </div>
                              
                              </div>
                             
                          
                              <div class="container">
                                  <div class="bg-light p-4 rounded border">
                                  <form id="formRacao" role="form">
                                            <div class="controls">
                                                <div class="row">
                                                    <div class="col-md-12">
                                                        <div class="form-group">
                                                            <label for="inputChavePix" class="form-label">Chave Pix</label>
                                                            <input class="form-control" type="text" aria-label="ChavePix" id="inputChavePix">
                                                        </div>
                                                    </div>
                                                </div>
            
                                                <div class="row">
                                                    <div class="col-md-4 mt-2">
                                                        <div class="form-group">
                                                            <label for="inputNomeDaRacao" class="form-label">Nome da Ração*</label>
                                                            <input type="text" class="form-control" id="inputNomeRacao" required>
                                                        </div>
                                                    </div>
                
                                                    <div class="col-md-3 mt-2">
                                                        <div class="form-group">
                                                            <label for="inputValorRacao" class="form-label">Valor da Ração*</label>
                                                            <input type="number" inputmode="numeric" class="form-control" id="inputValorRacao" required>
                                                        </div>
                                                    </div>
                
                                                    <div class="col-md-5 mt-1">
                                                        <div class="form-group mt-1 mt-1">
                                                            <label class="form-label">Foto da Ração: *</label>
                                                            <input type="url" class="form-control" placeholder="Insira URL da Imagem" id="inputUrlImagem">
                                                        </div>
                                                    </div>
                                                </div>
            
            
                                                <div class="form-group row">
                                                    <div class="col-sm-4 mb-3">
                                                        <small>(*) Campos obrigatórios</small>
                                                    </div>
                                                </div>
            
                                                <div class="mt-2">
                                                  <input type="button" class="btn btn-success" id="btnUpdateRacao" value="Alterar">
                                                </div>
                                            </div>
                                        </form>
                                      </div>
                                  </div>
                                  <div class="modal-footer d-flex align-items-center justify-content-start">
                                      <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                  </div>
                              </div>
                          </div>
                      </div>
`;

  document.getElementById('modalEditRacao').innerHTML = modalEditRacaoContent;

  var modalEditRacao = new bootstrap.Modal(document.getElementById(`editRacaoModal`));
  modalEditRacao.show();

  formEditRacao = document.getElementById("formRacao");


  const btnUpdateRacao = document.querySelector("#btnUpdateRacao");
  btnUpdateRacao.addEventListener('click', function () {

    if (!formEditRacao.checkValidity()) {
      displayMessage("Preencha o formulário corretamente.");
      return;
  }
     // Obtem os valores dos campos do formulário
      let inputChavePix = document.getElementById('inputChavePix').value;
      let inputNomeRacao = document.getElementById('inputNomeRacao').value;
      let inputValorRacao = document.getElementById('inputValorRacao').value;
      let inputUrlImagem = document.getElementById('inputUrlImagem').value;

     // Cria um objeto com os dados do contato
     let racao = {
         userId: userIdRacao,
         chavePix: inputChavePix,
          nome: inputNomeRacao,
          preco: inputValorRacao,
          image: inputUrlImagem 
     };

     const id = data.id;


    updateRacao(racao, id );
  });

}


function selectInformationForEditRacao(dataRacao) {

  // Preenche os campos do formulário com os dados da linha selecionada na tabela
  document.getElementById('inputChavePix').value = dataRacao.chavePix;
  document.getElementById('inputNomeRacao').value = dataRacao.nome;
  document.getElementById('inputValorRacao').value = dataRacao.preco;
  document.getElementById('inputUrlImagem').value = dataRacao.image;

}

async function fetchInfosRacao(idRacao, userIdRacao) {
  try {
    const response = await fetch(`https://jsonserver-cadastro-ajudas-helpet--imcathalat1.repl.co/racao/${idRacao}`);
    const data = await response.json();
    console.log(data);
    showModalEditRacao(data, userIdRacao);
    selectInformationForEditRacao(data);
  } catch (error) {
    console.error('Erro ao buscar os dados: ', error);
  }
}

function renderCardAjudaRacao(ajudaRacaoData) {

  const cardDiv = document.createElement('div');
  cardDiv.className = 'card card-pets-em-adocao mb-3 card-div';

  cardDiv.innerHTML = `
      <img
        src="${ajudaRacaoData.image}"
        class="card-img-top object-fit-cover" alt="..." height="300px">
      <div class="card-body">
        <h5 class="card-title">${ajudaRacaoData.nome}</h5>
        <h6 class="card-subtitle mb-2 text-muted">R$ ${ajudaRacaoData.preco}</h6>
        <div class="container">
                <div class="row">
                  <div class="col-md-10 col-lg-10">
                    <button type="button" class="btn w-100 mb-2 mx-1 btn-adotar" id="btnEditarRacao">
                      Editar
                    </button>
                  </div>
                  <div class="col-md-2 col-lg-2">
                    <button type="button" class="btn position-relative" id="btnDeleteRacao"><i
                        class=" w-100 fa-solid fa-trash-can fa-lg trash btnDelete" id="${ajudaRacaoData.userId}" style="color: #000000;"></i>
                    </button>
                  </div>
                </div>
            </div>
      </div>
  `;

  const idRacao = `${ajudaRacaoData.id}`;
  const userIdRacao = `${ajudaRacaoData.userId}`;

  const deleteButton = cardDiv.querySelector('#btnDeleteRacao');
  deleteButton.addEventListener("click", function () {
    // Coloque aqui a lógica que você deseja executar ao clicar no botão de exclusão
    modalConfirmaDelete(idRacao, userIdRacao);
  });

  const btnEditarRacao = cardDiv.querySelector('#btnEditarRacao');
  btnEditarRacao.addEventListener("click", function () {
    // Coloque aqui a lógica que você deseja executar ao clicar no botão de exclusão
    fetchInfosRacao(idRacao, userIdRacao);
  });

  return cardDiv;
}

async function renderRacoesArray(data) {
  const cardAjudaContainer = document.getElementById('racao');
  for (let i = 0; i <= data.length; i++) {
    const card = renderCardAjudaRacao(data[i]);
    cardAjudaContainer.appendChild(card); // aqui, a variavel cardContainer adiciona aquele html de card da função renderCard com as informações vindas do json no html do index
  }
}

// // async function deleteProduct(productId) {    

// //   try {
// //       const url = `https://json-server-e-commerce-diw--imcathalat1.repl.co/products/${productId}`; // Substitua pelo URL real do seu endpoint
// //       const options = {
// //           method: 'DELETE',
// //           headers: {
// //           'Content-Type': 'application/json',
// //           // Adicione outros cabeçalhos conforme necessário
// //           },
// //       };

// //       const response = await fetch(url, options);

// //       if (!response.ok) {
// //           throw new Error(`Erro ao excluir o produto: ${response.status} ${response.statusText}`);
// //       }

// //       console.log('Produto excluído com sucesso');
// //       window.location.href = "index.html";

// //       // Coloque aqui a lógica adicional após a exclusão bem-sucedida, se necessário

// //       } catch (error) {
// //       console.error('Erro durante a solicitação DELETE:', error.message);
// //       }
// // }

async function deleteRacao(idRacaoToDelete) {

  try {
    const url = `https://jsonserver-cadastro-ajudas-helpet--imcathalat1.repl.co/racao/${idRacaoToDelete}`; // Substitua pelo URL real do seu endpoint
    const options = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        // Adicione outros cabeçalhos conforme necessário
      },
    };

    const response = await fetch(url, options);

    console.log(`https://jsonserver-cadastro-ajudas-helpet--imcathalat1.repl.co/racao/${idRacaoToDelete}`);

    if (!response.ok) {
      throw new Error(`Erro ao excluir o produto: ${response.status} ${response.statusText}`);
    }

    console.log('Produto excluído com sucesso');

    // Coloque aqui a lógica adicional após a exclusão bem-sucedida, se necessário

  } catch (error) {
    console.error('Erro durante a solicitação DELETE:', error.message);
  }
}

async function updateCanAddRacao(idRacaoToDelete, userIdToUpdateCanAdd) {
  try {
    const response = await fetch(`https://jsonserver-status-user-logado--imcathalat1.repl.co/status-logado/${userIdToUpdateCanAdd}`, {
      method: 'PATCH', // Alteração do método para PATCH
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ canAddRacao: true }),
    });

    if (!response.ok) {
      throw new Error(`Erro ao atualizar usuário: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    console.log('Usuário atualizado com sucesso:', data);
    await deleteRacao(idRacaoToDelete);
    location.reload();
  } catch (error) {
    console.error('Erro ao atualizar usuário via API JSONServer:', error);
  }
}

async function modalConfirmaDelete(idRacaoToDelete, userIdToUpdateCanAdd) {
  var modalContent = `
    <div class="modal fade modal-dialog-centered" id="confirmDelete" tabindex="-1" aria-labelledby="userModal" aria-hidden="true">
                     <div class="modal-dialog modal-dialog-centered">
                       <div class="modal-content">
                            <div class="modal-header">
                                <aside><img class="logo" src="logohelpet.jpeg" alt=""></aside>
                                <h5 class="modal-title" id="exampleModalLabel">Tem certeza?</h5>
                               <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body p-4">

                                <div class="row">
                                    <div id="msg" class="col-sm-10 offset-sm-1 ">
                                        <!--<div class="alert alert-warning">Contato não encontrado.</div>-->
                                    </div>
                                </div>
                            
                                <div class="container">
                                    <div class="bg-light p-4 rounded border">
                                      <h5>Tem certeza que deseja excluir?</h5
                                      <div>
                                        <input type="button" class="btn btn-danger" id="btnExcluir" value="Sim, Deletar">
                                        <input type="button" class="btn btn-outline-secondary" id="btnCancelarExclusao" value="Cancelar" data-bs-dismiss="modal">
                                      </div>
                                    </div>
                                    <div class="modal-footer d-flex align-items-center justify-content-start">
                                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                    </div>
                                </div>
                            </div>
                        </div>
`;

  document.getElementById('modalRacaoExcluir').innerHTML = modalContent;

  const cofirmExclusion = new bootstrap.Modal(document.getElementById(`confirmDelete`));
  cofirmExclusion.show();

  console.log("user id da ração q quero excluir: ", userIdToUpdateCanAdd);
  console.log("id da ração q quero excluir: ", idRacaoToDelete);

  btnExcluir = document.getElementById("btnExcluir");
  btnExcluir.addEventListener('click', async function () {
    await updateCanAddRacao(idRacaoToDelete, userIdToUpdateCanAdd);
  });

}


/* FUNÇÕES PARA CARD AJUDA FINANCEIRA
/////////////////////////////////////*/
/*-------------------------------------------
-----------------------------------------
----------------------------------------------
---------------------------------------------*/

/* DELETAR AJUDA FINANCEIRA */

async function deleteFinanceiro(idAjudaFinanceiraToDelete) {

  try {
    const url = `https://jsonserver-cadastro-ajudas-helpet--imcathalat1.repl.co/financeiro/${idAjudaFinanceiraToDelete}`; // Substitua pelo URL real do seu endpoint
    const options = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        // Adicione outros cabeçalhos conforme necessário
      },
    };

    const response = await fetch(url, options);

    console.log(`https://jsonserver-cadastro-ajudas-helpet--imcathalat1.repl.co/financeiro/${idAjudaFinanceiraToDelete}`);

    if (!response.ok) {
      throw new Error(`Erro ao excluir o produto: ${response.status} ${response.statusText}`);
    }

    console.log('Produto excluído com sucesso');

    // Coloque aqui a lógica adicional após a exclusão bem-sucedida, se necessário

  } catch (error) {
    console.error('Erro durante a solicitação DELETE:', error.message);
  }
}

async function updateCanAddFinanceiro(idAjudaFinanceiraToDelete, userIdToUpdateCanAddFinanceiro) {
  try {
    const response = await fetch(`https://jsonserver-status-user-logado--imcathalat1.repl.co/status-logado/${userIdToUpdateCanAddFinanceiro}`, {
      method: 'PATCH', // Alteração do método para PATCH
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ canAddAjudaFinanceira: true }),
    });

    if (!response.ok) {
      throw new Error(`Erro ao atualizar usuário: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    console.log('Usuário atualizado com sucesso:', data);
    await deleteFinanceiro(idAjudaFinanceiraToDelete);
    location.reload();
  } catch (error) {
    console.error('Erro ao atualizar usuário via API JSONServer:', error);
  }
}

async function modalConfirmaDeleteFinanceiro(idAjudaFinanceiraToDelete, userIdToUpdateCanAddFinanceiro) {
  var modalContent = `
    <div class="modal fade modal-dialog-centered" id="confirmDeleteF" tabindex="-1" aria-labelledby="userModal" aria-hidden="true">
                     <div class="modal-dialog modal-dialog-centered">
                       <div class="modal-content">
                            <div class="modal-header">
                                <aside><img class="logo" src="logohelpet.jpeg" alt=""></aside>
                                <h5 class="modal-title" id="exampleModalLabel">Tem certeza?</h5>
                               <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body p-4">

                                <div class="row">
                                    <div id="msg" class="col-sm-10 offset-sm-1 ">
                                        <!--<div class="alert alert-warning">Contato não encontrado.</div>-->
                                    </div>
                                </div>
                            
                                <div class="container">
                                    <div class="bg-light p-4 rounded border">
                                      <h5>Tem certeza que deseja excluir?</h5
                                      <div>
                                        <input type="button" class="btn btn-danger" id="btnExcluirFinanceiro" value="Sim, Deletar">
                                        <input type="button" class="btn btn-outline-secondary" id="btnCancelarExclusao" value="Cancelar" data-bs-dismiss="modal">
                                      </div>
                                    </div>
                                    <div class="modal-footer d-flex align-items-center justify-content-start">
                                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                    </div>
                                </div>
                            </div>
                        </div>
`;

  document.getElementById('modalFinanceiroExcluir').innerHTML = modalContent;

  const confirmExclusion = new bootstrap.Modal(document.getElementById(`confirmDeleteF`));
  confirmExclusion.show();

  btnExcluir = document.getElementById("btnExcluirFinanceiro");
  btnExcluir.addEventListener('click', async function () {
    await updateCanAddFinanceiro(idAjudaFinanceiraToDelete, userIdToUpdateCanAddFinanceiro);
  });

}

/* FIM DO DELETAR AJUDA FINANCEIRA*/

function displayMessage(mensagem) {
  msg = document.getElementById('msg');
  msg.innerHTML = '<div class="alert alert-warning">' + mensagem + '</div>';
}

function updateFinanceiro(financeiroEdit, id ) {
  const apiUrl = `https://jsonserver-cadastro-ajudas-helpet--imcathalat1.repl.co/financeiro/${id}`; // Substitua com a URL correta da sua API

  console.log(apiUrl);

  fetch(apiUrl, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(financeiroEdit)
  })
    .then(response => {
      if (response.ok) {
        displayMessage("Alteração feita com sucesso!");
        location.reload();
      } else {
        displayMessage("Erro ao alterar. Tente novamente.");
      }
    })
    .catch(error => {
      console.error('Erro:', error);
      displayMessage("Erro ao alterar. Tente novamente mais tarde.");
    });

  // Oculta a mensagem de aviso após alguns 5 segundos
  msg = document.getElementById('msg');

  msg.addEventListener("DOMSubtreeModified", function (e) {
    if (e.target.innerHTML == "") return;

    setTimeout(function () {
      alert = msg.getElementsByClassName("alert");
      alert[0].remove();
    }, 5000);
  })
}


async function showModalEditFinanceiro(dataFinanceiro, userIdFinanceiro) {
  const modalEditPetContent = `
  <div class="modal fade modal-dialog-centered" id="editPetInformationModal" tabindex="-1" aria-labelledby="userModal" aria-hidden="true">
                   <div class="modal-dialog modal-lg modal-dialog-centered">
                     <div class="modal-content">
                          <div class="modal-header d-flex justify-content-center align-items-center">
                          <h5 class="modal-title ml-3" id="exampleModalLabel">Editar valor de ajuda financeira</h5>
                          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" id="close"></button>
                      </div>
                          <div class="modal-body p-4">

                              <div class="row">
                                  <div id="msg" class="col-sm-10 offset-sm-1 ">
                                      <!--<div class="alert alert-warning">Contato não encontrado.</div>-->
                                  </div>
                              </div>
                              <div class="card mx-auto">
                              <h3 class="mx-auto">Edite as informações do seu bixinho</h3>
                              <div class="form-group row">
                              
                                <div class="col ms-4 text-center mb-2">
                                    <small class="">Sempre edite a localização (estado e cidade).</small>
                                </div>
                              
                              </div>
                             
                          
                              <div class="container">
                                  <div class="bg-light p-4 rounded border">
                                  <form id="formAjudaFinanceira" role="form">
                                            <div class="controls">
                                                <div class="row">
                                                    <div class="col-md-12">
                                                        <div class="form-group">
                                                            <label for="inputChavePix" class="form-label">Chave Pix*</label>
                                                            <input class="form-control" type="text" aria-label="Chave Pix" id="inputChavePix" required>
                                                        </div>
                                                    </div>
                                                </div>
            
                                                <div class="row">
                                                    <div class="col">
                                                        <div class="form-group">
                                                            <label for="inputValorRacao" class="form-label">Valor da ajuda*</label>
                                                            <input type="number" inputmode="numeric" class="form-control" id="inputValorAjudaFinanceira" required>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div class="row">
                                                 <div class="form-group my-3">
                                                     <div class="col-md-12">
                                                         <label for="textareaSobre" class="mb-2">Sobre a ajuda financeira</label>
                                                         <textarea id="textareaDescricaoAjudaFinanceira" name="message" class="form-control"
                                                             placeholder="Descreva a necessidade financeira" rows="4"
                                                             required="required"
                                                             data-error="Please, leave us a message."></textarea>
                                                     </div>
                                                 </div>
                                             </div>
            
            
                                                <div class="form-group row">
                                                    <div class="col">
                                                        <small>(*) Campos obrigatórios</small>
                                                    </div>
                                                </div>
                                            </div>
                                        </form>
                                        <div class="mt-2">
                                          <input type="button" class="btn btn-success" id="btnUpdateInfoAjudaFinanceira" value="Alterar">
                                        </div>
                                      </div>
                                  </div>
                                  <div class="modal-footer d-flex align-items-center justify-content-start">
                                      <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                  </div>
                              </div>
                          </div>
                      </div>
`;

  document.getElementById('modalEditPet').innerHTML = modalEditPetContent;

  var modalEditPet = new bootstrap.Modal(document.getElementById(`editPetInformationModal`));
  modalEditPet.show();

  formEditAjudaFinanceira = document.getElementById("formAjudaFinanceira");


  const btnUpdateInfoFinanceira = document.querySelector("#btnUpdateInfoAjudaFinanceira");
  btnUpdateInfoFinanceira.addEventListener('click', function () {

    if (!formEditAjudaFinanceira.checkValidity()) {
      displayMessageCadPet("Preencha o formulário corretamente.");
      return;
  }
     // Obtem os valores dos campos do formulário
     let inputChavePix = document.getElementById('inputChavePix').value;
     let inputValorAjudaFinanceira = document.getElementById('inputValorAjudaFinanceira').value;
     let inputDescricaoAJudaFinanceira = document.getElementById('textareaDescricaoAjudaFinanceira').value;

     // Cria um objeto com os dados do contato
     let financeiroEdit = {
         userId: userIdFinanceiro,
         chavePix: inputChavePix,
         valor: inputValorAjudaFinanceira,
         descricao: inputDescricaoAJudaFinanceira 
     };

     const id = dataFinanceiro.id;


    updateFinanceiro(financeiroEdit, id );
  });

}


function selectInformationForEditFinanceiro(dataFinanceira) {

  // Preenche os campos do formulário com os dados da linha selecionada na tabela
  document.getElementById('inputChavePix').value = dataFinanceira.chavePix;
  document.getElementById('inputValorAjudaFinanceira').value = dataFinanceira.valor;
  document.getElementById('textareaDescricaoAjudaFinanceira').value = dataFinanceira.descricao;

}

async function fetchInfosFinanceiro(idAjudaFinanceira, userIdFinanceiro) {
  try {
    const response = await fetch(`https://jsonserver-cadastro-ajudas-helpet--imcathalat1.repl.co/financeiro/${idAjudaFinanceira}`);
    const data = await response.json();
    console.log(data);
    showModalEditFinanceiro(data, userIdFinanceiro);
    selectInformationForEditFinanceiro(data);
  } catch (error) {
    console.error('Erro ao buscar os dados: ', error);
  }
}

function renderCardAjudaFinanceira(ajudaFinanceiraData) {

  console.log("console em ajuda financeira dentro da função renderCardAJudaFinanceira: ", ajudaFinanceiraData);

  const cardAjudaContainer = document.getElementById('financeiro');
  
  const cardDiv = document.createElement('div');
  cardDiv.className = 'card card-ajuda-financeira';

  cardDiv.innerHTML = `
      <div class="card-body">
        <h5 class="card-title">Ajuda Financeira</h5>
        <h6 class="card-subtitle mb-2 text-muted">R$<span>${ajudaFinanceiraData.valor}</span></h6>
        <p class="card-text">${ajudaFinanceiraData.descricao}</p><div class="container">
        
        <div class="container">
          <div class="row">
            <div class="col-md-10 col-lg-10">
                <button type="button" class="btn w-100 mb-2 mx-1 btn-adotar" id="editarAjudaFinanceira">
                Editar
                </button>
            </div>
    
            <div class="col-md-2 col-lg-2">
              <button type="button" class="btn position-relative" id="btnDeleteAjudaFinanceira"><i
              class=" w-100 fa-solid fa-trash-can fa-lg trash btnDelete" id="${ajudaFinanceiraData.userId}" style="color: #000000;"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
  `;

  const idAjudaFinanceira = `${ajudaFinanceiraData.id}`;
  const userIdFinanceiro = `${ajudaFinanceiraData.userId}`;

  const deleteButtonFinanceiro = cardDiv.querySelector('#btnDeleteAjudaFinanceira');
  deleteButtonFinanceiro.addEventListener("click", function () {
    // Coloque aqui a lógica que você deseja executar ao clicar no botão de exclusão
    modalConfirmaDeleteFinanceiro(idAjudaFinanceira, userIdFinanceiro );
  });

  const btnEditarFinanceiro = cardDiv.querySelector('#editarAjudaFinanceira');
  btnEditarFinanceiro .addEventListener("click", function () {
    // Coloque aqui a lógica que você deseja executar ao clicar no botão de exclusão
    fetchInfosFinanceiro(idAjudaFinanceira, userIdFinanceiro);
  });
  cardAjudaContainer.appendChild(cardDiv);
}

async function fetchCardAJudaFinanceira(idUsuarioParaUserId){
  const url = `https://jsonserver-cadastro-ajudas-helpet--imcathalat1.repl.co/financeiro?userId=${idUsuarioParaUserId}`;
  console.log(url);
  const response = await fetch(url);
  const data = await response.json();
  console.log(data);
  console.log(data[0]);
  const ajudaFinanceiraData = data[0];
  renderCardAjudaFinanceira(ajudaFinanceiraData);
}

async function fetchUserInformation3() {
  try {
    const response = await fetch(urlUserLogado);
    const data = await response.json();
    const idUsuarioParaUserId = data[0].id;
    fetchCardDetails(idUsuarioParaUserId);
    fetchCardAJudaFinanceira(idUsuarioParaUserId);
  } catch (error) {
    console.error('Erro ao buscar os dados: ', error);
  }
}


//renderCardsAjudaAlimentacao();
fetchUserInformation();
fetchUserInformation2();
fetchUserInformation3();
