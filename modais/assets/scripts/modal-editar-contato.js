buttonModalContact = document.getElementById('openModalContact');
console.log(buttonModalContact);
async function showModalEditContact(userData) {
    var modalContent = `
    <div class="modal fade modal-dialog-centered" id="modalEditarContato" tabindex="-1" aria-labelledby="userModal${userData.id}" aria-hidden="true">
                     <div class="modal-dialog modal-dialog-centered">
                       <div class="modal-content">
                            <div class="modal-header">
                                <aside><img class="logo" src="logohelpet.jpeg" alt=""></aside>
                                <h5 class="modal-title" id="exampleModalLabel">Entrar em contato?</h5>
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
                                        <form id="userEditContact" role="form">
                                            <div class="controls">
                                                <div class="row">
                                                    <div class="form-group mt-1">
                                                        <label for="inputEmail" class="form-label">E-mail</label>
                                                        <input class="form-control" type="email" aria-label="Email" id="inputEmail">
                                                    </div>
                    
                                                    <div class="form-group mt-1">
                                                        <label for="inputPhone" class="form-label">Telefone</label>
                                                        <input class="form-control" type="tel" id="inputPhone" name="phone" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" required/>
                                                        <small>Format: (33)99899-9999</small>
                                                    </div>
                                                    <div class="form-group row mt-2">
                                                        <label class="col-12 p-2">Descrição</label>
                                                        <textarea name="descricao" id="inputDescription" class="w-100" style="min-height: 31px; height: 100px;"></textarea>
                                                    </div>
                                                    <div class="form-group row mt-2">
                                                    <small>(*) Campos obrigatórios</small>
                                                    </div>
                                                </div>
                                            </div>
                                        </form>
                                        <div>
                                        <input type="button" class="btn" id="btnUpdate" value="Alterar">
                                        </div>
                                    </div>
                                    <div class="modal-footer d-flex align-items-center justify-content-start">
                                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                    </div>
                                </div>
                            </div>
                        </div>
`;

    document.getElementById('modalContato').innerHTML = modalContent;

    var modalEditContact = new bootstrap.Modal(document.getElementById(`modalEditarContato`));
    modalEditContact.show();


    btnUpdate = document.getElementById("btnUpdate");
    btnUpdate.addEventListener('click', function () {
        // Obtem os valores dos campos do formulário
        let campoEmail = document.getElementById('inputEmail').value;
        let campoPhone = document.getElementById('inputPhone').value;
        let campoDescricao = document.getElementById('inputDescription').value;

        const idToUpdate = userData.id;

        let contato = {
            email: campoEmail,
            telefone: campoPhone,
            descricao: campoDescricao
        };

        updateUserContact(contato, idToUpdate);
    });
}

function displayMessage(mensagem) {
    msg = document.getElementById('msg');
    msg.innerHTML = '<div class="alert alert-warning">' + mensagem + '</div>';
}


function selectInformationForEdit(userData) {

    // Preenche os campos do formulário com os dados da linha selecionada na tabela
    document.getElementById('inputEmail').value = userData.email;
    document.getElementById('inputPhone').value = userData.telefone;
    document.getElementById('inputDescription').value = userData.descricao;

}


async function fetchUserInformation6() {
    try {
      const response = await fetch(`${urlUserLogado}`);
      const data = await response.json();
      console.log(data);
      showModalEditContact(data[0]);
      selectInformationForEdit(data[0]);
    } catch (error) {
      console.error('Erro ao buscar os dados: ', error);
    }
  }

buttonModalContact.addEventListener("click", function () {
    console.log("entrou");
    fetchUserInformation6();
});


function updateUserContact(contato, idToUpdate) {
    const apiUrl = `${urlUserLogado}/${idToUpdate}`; // Substitua com a URL correta da sua API

    console.log(apiUrl);

    fetch(apiUrl, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(contato)
    })
        .then(response => {
            if (response.ok) {
                displayMessage("Alteração feita com sucesso!");
                userEditContact.reset();
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




