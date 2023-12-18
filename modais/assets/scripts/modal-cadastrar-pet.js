buttonModalCadastrarPet = document.getElementById('openModalCadastrarPet');
async function showCadPetModal() {
    var modalContent = `
    <div class="modal fade" id="cadPetModal" tabindex="-1" aria-labelledby="userModal" aria-hidden="true">
                     <div class="modal-dialog modal-dialog-centered modal-lg">
                       <div class="modal-content">
                            <div class="modal-header d-flex justify-content-center align-items-center">
                                <h5 class="modal-title ml-3" id="exampleModalLabel">Cadastre um bixinho</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" id="close"></button>
                            </div>
                             <div class="modal-body p-4">

                            <div class="row">
                                <div id="msg" class="col-sm-10 offset-sm-1 ">
                                    <!--<div class="alert alert-warning">Contato não encontrado.</div>-->
                                </div>
                            </div>


                             <div class="card mx-auto">
                             <h1 class="mx-auto">Cadastre um peludo para adoção</h1>
                             <hr>
                             <div class="container">
                                 <form id="cadastroPetForm" role="form">
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
                                                        <label class="form-label">Foto do Pet: *</label>
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
                                                     <div class="col-sm-4 mb-3">
                                                         <small>(*) Campos obrigatórios</small>
                                                     </div>
                                                 </div>
                                             <div class="col-12">
                                                 <input type="button" class="btn" id="btnInsert" value="Salvar">
                                             </div>
                                         </div>
                                     </div>
                                     
                                 </form>
                             </div>
                             <!--ate aq-->
                         </div>
                    </div>
                            <div class="modal-footer d-flex align-items-center justify-content-start">
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" id="close">Close</button>
                            </div>
                         </div>
                     </div>
                </div>
`;

    document.getElementById('modalCadastrarPet').innerHTML = modalContent;


    var modalCadastrarPet = new bootstrap.Modal(document.getElementById(`cadPetModal`));
    modalCadastrarPet.show();

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

    function getEstados (){
        fetch('https://brasilapi.com.br/api/ibge/uf/v1')
    
        .then(response => response.json())
            .then(data => {
                let html = `<option value="" selected disabled></option>`;
                data.forEach(UF => {
                    html += `<option value="${UF.sigla}">${UF.nome}</option>`;
                });
                const estado = document.getElementById('selectEstado'); 
                estado.innerHTML = html;
                
                estado.addEventListener('change', function(e){
                    getCidades(e.target.value);
                });
    
            });   
    }

    formPet = document.getElementById("cadastroPetForm");
    getEstados();
    

    function displayMessageCadPet(mensagem) {
        msg = document.getElementById('msg');
        msg.innerHTML = '<div class="alert alert-warning">' + mensagem + '</div>';
    }
    

    async function createPet(pet) {
        try {
            const response = await fetch("https://jsonserver-cadastro-pet-2-helpet--imcathalat1.repl.co/pets", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(pet),
            });
    
            if (!response.ok) {
                throw new Error(`Erro ao inserir pet: ${response.status} ${response.statusText}`);
            }
    
            const data = await response.json();
            displayMessageCadPet("Pet inserido com sucesso");
            formPet.reset();
            location.reload();
        } catch (error) {
            console.error('Erro ao inserir pet via API JSONServer:', error);
            displayMessageCadPet("Erro ao inserir pet");
        }
    }
    

    async function fetchUserInformation6(){
        try {
            const response = await fetch(`${urlUserLogado}`);
            const data = await response.json();
            const idUserToCreatePet = data[0].id;
             
            return idUserToCreatePet;
          } catch (error) {
            console.error('Erro ao buscar os dados: ', error);
          }
    }

    async function getValuesToCreatePet(){
        const idUsuario = await fetchUserInformation6();

        console.log(idUsuario);
    
        // Verifica se o formulário está preenchido corretamente
        if (!formPet.checkValidity()) {
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
    
        
        // Cria um objeto com os dados do contato
        let pet = {
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
            userId: idUsuario
            
        };
    
        // Cria o contato no banco de dados
        createPet(pet);
    }
    
    
    
    // Adiciona funções para tratar os eventos 
    btnInsert = document.getElementById("btnInsert");
     btnInsert.addEventListener('click', function () {
            getValuesToCreatePet();
    
       
    });

    btnCloseModal1 = document.getElementById("closeHeaderModal");
    btnCloseModal1.addEventListener("click", function(){
        location.reload();
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


buttonModalCadastrarPet.addEventListener("click", function () {
    showCadPetModal()
});



