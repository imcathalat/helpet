

document.getElementById('openModalCadAjudaBtn').addEventListener('click', function () {
    var modalContent = `
        <div class="modal fade modal-dialog-centered" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg modal-dialog-centered"> 
                <div class="modal-content">
                    <div class="modal-header d-flex justify-content-center align-items-center">
                        <img class="logohelpet" src="assets/img-modal/logo-helpet-modal-ajuda.png"  alt="">
                        <h5 class="modal-title ml-3" id="exampleModalLabel">Como os seus pets precisam de ajuda?</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>

                    <div class="modal-body text-center">
                        <div class="card-group">
                            <div class="card">
                                <div class="card-body">
                                    <img src="assets/img-modal/icone1.PNG" class="card-img-top custom-img" alt="">
                                    <a class="btn btn-primary btn-sm align-self-end" id="btnVet" href="../../../ajudas/vets.html" role="button">Cuidados Veterinários</a>
                                </div>
                            </div>
                            <div class="card">
                                <div class="card-body">
                                    <img src="assets/img-modal/icone2.PNG" style="height: 200px;" class="card-img-top custom-img" alt="">
                                    <button type="button" class="btn btn-primary btn-sm align-self-end" id="btnFinanceiro" role="button">Ajuda Financeira</button>
                                </div>
                            </div>
                            <div class="card">
                                <div class="card-body">
                                    <img src="assets/img-modal/icone3.PNG" class="card-img-top custom-img" alt="">
                                    <button type="button" class="btn btn-primary btn-sm align-self-end" id="btnAlimentacao" role="button">Ajuda na Alimentação</button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                    </div>
                </div>
            </div>
        </div>
    `;

    document.getElementById('modalCadAjuda').innerHTML = modalContent;

    var myModal = new bootstrap.Modal(document.getElementById('exampleModal'));
    myModal.show();

    btnAlimentacao = document.getElementById("btnAlimentacao");
    btnAlimentacao.addEventListener('click', function (){

        modalCadastroRacao();
    });

    btnFinanceiro = document.getElementById("btnFinanceiro");
    btnFinanceiro.addEventListener("click", function(){
        modalCadastroFinanceiro();
    })
});

/* CADASTRO DE RACAO
----------------------*/

async function modalCadastroRacao() {
    var cadastroRacaoContent = `
    <div class="modal fade modal-dialog-centered" id="cadastroRacaoModal" tabindex="-1" aria-labelledby="userModal" aria-hidden="true">
                     <div class="modal-dialog modal-lg modal-dialog-centered modal-custom-height">
                       <div class="modal-content">
                            <div class="modal-header d-flex justify-content-center align-items-center">
                                <img class="logohelpet" src="assets/img-modal/logo-helpet-modal-ajuda.png"  alt="">
                                <h5 class="modal-title ml-3" id="exampleModalLabel">Como os seus pets precisam de ajuda?</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" id="closeHeaderModal"></button>
                            </div>
                            <div class="modal-body p-4">

                            <div class="row">
                                <div id="msg" class="col-sm-10 offset-sm-1 ">
                                    <!--<div class="alert alert-warning">Contato não encontrado.</div>-->
                                </div>
                            </div>

                            <div id="message" class="text-danger" style="height: 250px;">
                            </div>

                                <div class="container" id="divForm">
                                    <div class="bg-light p-4 rounded border">
                                        <form id="formRacao" role="form">
                                            <div class="controls">
                                                <div class="row">
                                                    <div class="col-md-10">
                                                        <div class="form-group">
                                                            <label for="inputChavePix" class="form-label">Chave Pix</label>
                                                            <input class="form-control" type="text" aria-label="Nome do bixinho" id="inputChavePix">
                                                        </div>
                                                    </div>
            
                                                    <div class="col-md-2">
                                                        <div class="form-group">
                                                            <label for="inputId" class="form-label">Id</label>
                                                            <input type="text" class="form-control" id="inputId" placeholder="ID" disabled>
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
                                                            <img width="200px" height="auto" id="displayImage" class="d-none">
                                                        </div>
                                                    </div>
                                                </div>
            
            
                                                <div class="form-group row">
                                                    <div class="col-sm-4 mb-3">
                                                        <small>(*) Campos obrigatórios</small>
                                                    </div>
                                                </div>
            
                                                <div class="col-12">
                                                    <input type="button" class="btn " id="btnInsert" value="Salvar">
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>

                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" id="cancelModal">Cancelar</button>
                            </div>
                        </div>
    `;

    document.getElementById('modalCadastroRacao').innerHTML = cadastroRacaoContent;

    var modalCadastroRacao = new bootstrap.Modal(document.getElementById(`cadastroRacaoModal`));
    modalCadastroRacao.show();

    function displayMessage(mensagem) {
        msg = document.getElementById('msg');
        msg.innerHTML = '<div class="alert alert-warning">' + mensagem + '</div>';
    }

    function desabilitarCanAddRacao(idUsuarioParaUserId){

        fetch(`https://jsonserver-status-user-logado--imcathalat1.repl.co/status-logado/${idUsuarioParaUserId}`, {
            method: 'PATCH',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({ canAddRacao: false })
        })
            .then(response => {
            if (response.ok) {
                console.log('Adição desativada com sucesso!');
                location.reload();
            } else {
                console.log('Erro ao desativar adição. Tente novamente.');
            }
            })
        .catch(error => {
            console.error('Erro:', error);
            console.log('Erro ao ativar canAddRacao. Tente novamente mais tarde.');
        });
    }

    function createAjudaRacao(ajuda, idUsuarioParaUserId) {
        fetch("https://jsonserver-cadastro-ajudas-helpet--imcathalat1.repl.co/racao", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(ajuda),
        })
            .then(response => response.json())
            .then(data => {
                displayMessage("Contato inserido com sucesso");
                formRacao.reset();
                desabilitarCanAddRacao(idUsuarioParaUserId);
            })
            .catch(error => {
                console.error('Erro ao inserir contato via API JSONServer:', error);
                displayMessage("Erro ao inserir contato");
            });
    }

    function decisionAboutModal(statusCanAddRacao, idUsuarioLogado){

        const messageElement = document.getElementById('message');
        var divForm = document.getElementById("divForm");
        const buttonElement = document.getElementById('btnInsert');


            if (statusCanAddRacao !== undefined) {

                if (!statusCanAddRacao) {

                divForm.style.display = "none";
                const alerta = document.createElement('h3');
                alerta.textContent = 'Você já possui uma ração cadastrada.';
                messageElement.appendChild(alerta); 
                buttonElement.disabled = true;
                } else {
                    /*se canAddRacao for true, o addEventListener do Salvar acontece*/
                
                    messageElement.style.display = "none";
                    btnInsert.addEventListener("click", function() {
                
                        // Verifica se o formulário está preenchido corretamente
                        if (!formRacao.checkValidity()) {
                            displayMessage("Preencha o formulário corretamente.");
                            return;
                        }
                
                        // Obtem os valores dos campos do formulário
                        let inputChavePix = document.getElementById('inputChavePix').value;
                        let inputNomeRacao = document.getElementById('inputNomeRacao').value;
                        let inputValorRacao = document.getElementById('inputValorRacao').value;
                        let inputUrlImagem = document.getElementById('inputUrlImagem').value;
                
                        // Cria um objeto com os dados do contato
                        let ajuda = {
                            userId: idUsuarioLogado,
                            chavePix: inputChavePix,
                            nome: inputNomeRacao,
                            preco: inputValorRacao,
                            image: inputUrlImagem,
                        };

                        

                
                        // Cria o contato no banco de dados
                        createAjudaRacao(ajuda, idUsuarioLogado);
                    
                    });
                }
            } else {
                messageElement.textContent = 'Erro ao carregar informações do usuário.';
            }
        
    }

    async function fetchUserInformation4(){
        try {
            const response = await fetch(`${urlUserLogado}`);
            const data = await response.json();
            const idUsuarioLogado = data[0].id;
            const statusCanAddRacao = data[0].canAddRacao;

            console.log(idUsuarioLogado);
            console.log(statusCanAddRacao);

            decisionAboutModal(statusCanAddRacao, idUsuarioLogado);
          } catch (error) {
            console.error('Erro ao buscar os dados: ', error);
          }
    }

     
    fetchUserInformation4();

    btnCloseModal1 = document.getElementById("closeHeaderModal");
    btnCloseModal1.addEventListener("click", function(){
        location.reload();
    });

    btnInsert = document.getElementById("btnInsert");

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
   

/* FIM CADASTRO DE RACAO
----------------------*/

/*-----------------------------------------------------------------------------------------
-------------------------------------------------------------------------------------------
-------------------------------------------------------------------------------------------
-------------------------------------------------------------------------------------------
-------------------------------------------------------------------------------------------*/

/*CADASTRO FINANCEIRO
----------------------*/

async function modalCadastroFinanceiro() {
    var cadastroFinanceiroContent = `
    <div class="modal fade modal-dialog-centered" id="cadastroFinanceiroModal" tabindex="-1" aria-labelledby="userModal" aria-hidden="true">
                     <div class="modal-dialog modal-lg modal-dialog-centered modal-custom-height">
                       <div class="modal-content">
                            <div class="modal-header d-flex justify-content-center align-items-center">
                                <img class="logohelpet" src="assets/img-modal/logo-helpet-modal-ajuda.png"  alt="">
                                <h5 class="modal-title ml-3" id="exampleModalLabel">Como os seus pets precisam de ajuda?</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" id="closeHeaderModal"></button>
                            </div>
                            <div class="modal-body p-4">

                            <div class="row">
                                <div id="msg" class="col-sm-10 offset-sm-1 ">
                                    <!--<div class="alert alert-warning">Contato não encontrado.</div>-->
                                </div>
                            </div>

                            <div id="message" class="text-danger" style="height: 250px;">
                            </div>

                                <div class="container" id="divForm">
                                    <div class="bg-light p-4 rounded border">
                                        <form id="formAjudaFinanceira" role="form">
                                            <div class="controls">
                                                <div class="row">
                                                    <div class="col-md-12">
                                                        <div class="form-group">
                                                            <label for="inputChavePix" class="form-label">Chave Pix*</label>
                                                            <input class="form-control" type="text" aria-label="Nome do bixinho" id="inputChavePix" required>
                                                        </div>
                                                    </div>
                                                </div>
            
                                                <div class="row">
                                                    <div class="col">
                                                        <div class="form-group">
                                                            <label for="inputValorRacao" class="form-label">Valor da Ração*</label>
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
                                                    <div class="col-sm-4 mb-3">
                                                        <small>(*) Campos obrigatórios</small>
                                                    </div>
                                                </div>
            
                                                <div class="col-12">
                                                    <input type="button" class="btn btn-success" id="btnInsertValue" value="Salvar">
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>

                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" id="cancelModal">Cancelar</button>
                            </div>
                        </div>
    `;

    document.getElementById('modalCadastroRacao').innerHTML = cadastroFinanceiroContent;

    var modalCadastroFinanceiro = new bootstrap.Modal(document.getElementById(`cadastroFinanceiroModal`));
    modalCadastroFinanceiro.show();

    function displayMessage(mensagem) {
        msg = document.getElementById('msg');
        msg.innerHTML = '<div class="alert alert-warning">' + mensagem + '</div>';
    }

    function desabilitarCanAddFinanceiro(idUsuarioParaUserId){

        fetch(`https://jsonserver-status-user-logado--imcathalat1.repl.co/status-logado/${idUsuarioParaUserId}`, {
            method: 'PATCH',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({ canAddAjudaFinanceira: false })
        })
            .then(response => {
            if (response.ok) {
                console.log('Adição desativada com sucesso!');
                location.reload();
            } else {
                console.log('Erro ao desativar adição. Tente novamente.');
            }
            })
        .catch(error => {
            console.error('Erro:', error);
            console.log('Erro ao ativar canAddRacao. Tente novamente mais tarde.');
        });
    }

    function createAjudaFinanceira(financeiro, idUsuarioParaUserId) {
        fetch("https://jsonserver-cadastro-ajudas-helpet--imcathalat1.repl.co/financeiro", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(financeiro),
        })
            .then(response => response.json())
            .then(data => {
                console.log("entrou aqui no then de ajuda financeira");
                displayMessage("Ajuda Financeira registrada com sucesso");
                formAjudaFinanceira.reset();
                desabilitarCanAddFinanceiro(idUsuarioParaUserId);
            })
            .catch(error => {
                console.error('Erro ao inserir contato via API JSONServer:', error);
                displayMessage("Erro ao registrar ajuda financeira ");
            });
    }

    function decisionAboutAjudaFinanceira(statusCanAddRAjudaFinanceira, idUsuarioLogado){

        const messageElement = document.getElementById('message');
        var divForm = document.getElementById("divForm");
        const buttonElement = document.getElementById('btnInsertValue');


            if (statusCanAddRAjudaFinanceira !== undefined) {

                if (!statusCanAddRAjudaFinanceira) {

                divForm.style.display = "none";
                const alerta = document.createElement('h3');
                alerta.textContent = 'Você já possui uma necessidade financeira cadastrada.';
                messageElement.appendChild(alerta); 
                buttonElement.disabled = true;
                } else {
                    /*se canAddRacao for true, o addEventListener do Salvar acontece*/
                
                    messageElement.style.display = "none";
                    btnInsert.addEventListener("click", function() {
                
                        // Verifica se o formulário está preenchido corretamente
                        if (!formAjudaFinanceira.checkValidity()) {
                            displayMessage("Preencha o formulário corretamente.");
                            return;
                        }
                        
                
                        // Obtem os valores dos campos do formulário
                        let inputChavePix = document.getElementById('inputChavePix').value;
                        let inputValorAjudaFinanceira = document.getElementById('inputValorAjudaFinanceira').value;
                        let inputDescricaoAJudaFinanceira = document.getElementById('textareaDescricaoAjudaFinanceira').value;
                
                        // Cria um objeto com os dados do contato
                        let financeiro = {
                            userId: idUsuarioLogado,
                            chavePix: inputChavePix,
                            valor: inputValorAjudaFinanceira,
                            descricao: inputDescricaoAJudaFinanceira 
                        };

                        

                
                        // Cria o contato no banco de dados
                        createAjudaFinanceira(financeiro, idUsuarioLogado);
                    
                    });
                }
            } else {
                messageElement.textContent = 'Erro ao carregar informações do usuário.';
            }
        
    }

    async function fetchFinanceiroAndUser(){
        try {
            const response = await fetch(`${urlUserLogado}`);
            const data = await response.json();
            const idUsuarioLogado = data[0].id;
            const statusCanAddRAjudaFinanceira = data[0].canAddAjudaFinanceira;

            console.log(idUsuarioLogado);
            console.log(statusCanAddRAjudaFinanceira);

            decisionAboutAjudaFinanceira(statusCanAddRAjudaFinanceira, idUsuarioLogado);
          } catch (error) {
            console.error('Erro ao buscar os dados: ', error);
          }
    }

     
    fetchFinanceiroAndUser();

    btnCloseModal1 = document.getElementById("closeHeaderModal");
    btnCloseModal1.addEventListener("click", function(){
        location.reload();
    });

    btnInsert = document.getElementById("btnInsertValue");

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