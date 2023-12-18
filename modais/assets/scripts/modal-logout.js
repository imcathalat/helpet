buttonModalLogout = document.getElementById('openModalConfirmLogout');
async function showModalConfirmLogout() {
    var modalContent = `

                <div class="modal fade modal-dialog-centered" id="confirmDelete" tabindex="-1" aria-labelledby="userModal" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered">
                        <div class="modal-content">
                            <div class="modal-header">
                            <aside><img class="logo" src="logohelpet.jpeg" alt=""></aside>
                            <h5 class="modal-title" id="exampleModalLabel">Já esta indo?</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body p-4">

                        <div class="container">
                            <div class="bg-light p-4 rounded border">
                                <h5>Tem certeza que deseja sair da página?</h5
                                <div>
                                <input type="button" class="btn btn-danger" id="btnExcluir" value="Sim">
                                <input type="button" class="btn btn-outline-success" id="btnCancelarExclusao" value="Cancelar" data-bs-dismiss="modal">
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

    var modalContact = new bootstrap.Modal(document.getElementById(`confirmDelete`));
    modalContact.show();

    async function deleteLoginStatus(idUserToUpdateValues) {    

        try {
            const url = `https://jsonserver-status-user-logado--imcathalat1.repl.co/status-logado/${idUserToUpdateValues}`; // Substitua pelo URL real do seu endpoint
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
            window.location.href = '../index.html';
        
            // Coloque aqui a lógica adicional após a exclusão bem-sucedida, se necessário
        
            } catch (error) {
            console.error('Erro durante a solicitação DELETE:', error.message);
            }
    }

    async function updateUserValues(userToGo, idUserToUpdateValues) {
        try {
            const response = await fetch(`https://jsonserver-usuarios-helpet--imcathalat1.repl.co/users/${idUserToUpdateValues}`, {
                method: 'PATCH', // Alteração do método para PATCH
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userToGo),
            });
    
            if (!response.ok) {
                throw new Error(`Erro ao atualizar usuário: ${response.status} ${response.statusText}`);
            }
    
            const data = await response.json();
            console.log('Usuário atualizado com sucesso:', data);
            await deleteLoginStatus(idUserToUpdateValues);
        } catch (error) {
            console.error('Erro ao atualizar usuário via API JSONServer:', error);
        }
    }
    

      
      

    btnExcluir = document.getElementById("btnExcluir");
    btnExcluir.addEventListener('click', function () {
        // Obtem os valores da api de usuario logado no momento

        fetch(`${urlUserLogado}`)
        .then(response => response.json())
        .then(data => {

            const idUserToUpdateValues = Number(data[0].id);
            console.log(idUserToUpdateValues);

            let userToGo = {
                id: data[0].id,
                nome: data[0].nome,
                email: data[0].email,
                telefone: data[0].telefone,
                cidade: data[0].cidade,
                estado: data[0].estado,
                username: data[0].username,
                senha: data[0].senha,
                descricao: data[0].descricao,
                perfil:data[0].perfil,
                canAddRacao: data[0].canAddRacao,
                canAddAjudaVeterinaria: data[0].canAddAjudaVeterinaria,
                canAddAjudaFinanceira: data[0].canAddAjudaFinanceira
            };

            console.log('Usuário a ser excluído:', userToGo);

            updateUserValues(userToGo, idUserToUpdateValues)
        
        });
});
}







// function selectInformationForEdit(userData) {

//     // Preenche os campos do formulário com os dados da linha selecionada na tabela
//     document.getElementById('inputEmail').value = userData.email;
//     document.getElementById('inputPhone').value = userData.telefone;
//     document.getElementById('inputDescription').value = userData.descricao;

// }


// async function fetchUserInformation6() {
//     try {
//       const response = await fetch(urlUserLogado);
//       const data = await response.json();
//       showModal(data);
//       selectInformationForEdit(data);
//     } catch (error) {
//       console.error('Erro ao buscar os dados: ', error);
//     }
//   }

  buttonModalLogout.addEventListener("click", function () {
    showModalConfirmLogout();
});







