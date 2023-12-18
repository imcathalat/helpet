buttonModalAddReview = document.getElementById('openModalReview');
async function showAddReviewModal() {
    var modalContent = `
    <div class="modal fade" id="addReviewModal" tabindex="-1" aria-labelledby="userModal" aria-hidden="true">
                     <div class="modal-dialog modal-dialog-centered modal-lg">
                       <div class="modal-content">
                            <div class="modal-header d-flex justify-content-center align-items-center">
                                <h5 class="modal-title ml-3" id="exampleModalLabel">Faça uma avaliação</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                             <div class="modal-body p-4">

                             <div class="container my-5 form-wrapper col-md-8">
                                <div class="row">
                                    <div id="msg" class="col-sm-10 offset-sm-1 ">
                                        <!--<div class="alert alert-warning">Contato não encontrado.</div>-->
                                    </div>
                                    </div>
                                 <form id="cadastroAvaliacaoForm" role="form">
                                     <!-- CATEGORIAS -->
                                     <div class="mb-3 aviso rating-box mt-4 d-flex">
                                         <img class="" height="80px" src="./assets/img/retriever-dourado.png">
                                         <div class="ms-1 me-1">
                                             <header class="header text-center">COMO FOI SUA EXPERIÊNCIA?</header>
                                             <p class="text-center">seu feedback é muito importante para construirmos um ambiente melhor!</p>
                                         </div>
                                         <img height="80px" src="./assets/img/gato.png">
                                         <!--<div class="stars">
                                         <i class="fa-solid fa-star" id="estrela"></i>
                                         <i class="fa-solid fa-star" id="estrela"></i>
                                         <i class="fa-solid fa-star" id="estrela"></i>
                                         <i class="fa-solid fa-star" id="estrela"></i>
                                         <i class="fa-solid fa-star" id="estrela"></i>
                                      </div>-->
                                     </div>
                                     <div class="row d-flex">
                                         <div class="mb-3 col-md-9 col-sm-8">
                                             <label for="selectAvaliacao" class="form-label">O que você deseja avaliar? *</label>
                                             <select id="selectAvaliacao" class="form-select" required>
                                                 <option value="" selected disabled></option>
                                                 <option value="Contribuição de ajuda">Contribuição de ajuda</option>
                                                 <option value="Adoção">Adoção</option>
                                                 <option value="Site">Site</option>
                                             </select>
                                         </div>
                                         <div class="col-md-3 mb-3 col-sm-4">
                                             <div class="form-group mt-1">
                                                 <label for="inputId" class="form-label">Id</label>
                                                 <input type="text" class="form-control" id="inputId" placeholder="ID" disabled>
                                             </div>
                                         </div>
                                     </div>
                     
                     
                     
                                     <textarea id="textareaComentario" class="col-md-12 col-sm-12 col-12" name="opinion" cols="30" rows="5"
                                         data-error="Please, leave us a message."
                                         placeholder="Conte-nos um pouquinho sobre ... *" required="required"></textarea>
                                     <div class="form-group">
                                         <div class="col-sm-4 mb-3">
                                             <small>(*) Campos obrigatórios</small>
                                         </div>
                                     </div>
                                     <div class="form-group row mt-3">
                                         <div class="col-sm-12 buttons">
                                             <input type="button" class="btn btn-info" id="btnInsert" value="Inserir">
                                             
                                             <input type="button" class="btn btn-danger" id="btnDelete" value="Excluir">
                                           
                     
                                         </div>
                                     </div>
                     
                                 </form>
                     
                     
                     
                                 <div class="row mt-3 col-md-12 m-0">
                                     <div class="col-sm-12 col-md-12">
                                         <table id="grid-avaliacao" class="table table-striped">
                                             <thead>
                                                 <tr>
                                                     <th scope="col">#</th>
                                                     <th scope="col">Comentários</th>
                                                     <th scope="col">Tipo de Avaliação</th>
                                                 </tr>
                                             </thead>
                                             <tbody id="tableInfos">
                                                 <tr>

                                                 </tr>
                                             </tbody>
                                         </table>
                                     </div>
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

    document.getElementById('modalReview').innerHTML = modalContent;


    var modalReview = new bootstrap.Modal(document.getElementById(`addReviewModal`));
    modalReview.show();

    formAvaliacao = document.getElementById("cadastroAvaliacaoForm");

    function displayMessageCadPet(mensagem) {
        msg = document.getElementById('msg');
        msg.innerHTML = '<div class="alert alert-warning">' + mensagem + '</div>';
    }

    function readAvaliacao(idUsuario, processaDados) {
        fetch(`https://avaliacao.leticiafigueir5.repl.co/avaliacao?userId=${idUsuario}`)
            .then(response => response.json())
            .then(data => {
                retornoDados = data;
                processaDados(data); 
                //fazParams(data);
            })
            .catch(error => {
                console.error('Erro ao ler avaliação via API JSONServer:', error);
                displayMessage("Erro ao ler avaliação");
            });
       
    }
    
    function deleteAvaliacao(id, refreshFunction) {
        fetch(`https://avaliacao.leticiafigueir5.repl.co/avaliacao/${id}`, {
            method: 'DELETE',
        })
            .then(response => response.json())
            .then(data => {
                displayMessage("Avaliação removida com sucesso");
                if (refreshFunction)
                    refreshFunction();
            })
            .catch(error => {
                console.error('Erro ao remover avaliação via API JSONServer:', error);
                displayMessage("Erro ao remover avaliação");
            });
    }


    function exibeAvaliacao(idUsuario) {
        tableAvaliacao = document.getElementById("tableInfos");

        // Remove todas as linhas do corpo da tabela
        tableAvaliacao.innerHTML = "";

        readAvaliacao(idUsuario, dados => {
            // Popula a tabela com os registros do banco de dados
            for (i = 0; i < dados.length; i++) {
                let avaliacao = dados[i];
                tableAvaliacao.innerHTML += `<tr><td scope="row">${avaliacao.id}</td>
                                    <td>${avaliacao.comentario}</td>
                                    
                                    <td>${avaliacao.categoria}</td>
                                </tr>`;
            }
        })
    }
    
    function createAvaliacao(avaliacao, refreshFunction) {
        fetch("https://avaliacao.leticiafigueir5.repl.co/avaliacao", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(avaliacao),
        })
            .then(response => response.json())
            .then(data => {
                displayMessageCadPet("Contato inserido com sucesso");
                formAvaliacao.reset();
                if (refreshFunction)
                refreshFunction();
            })
            .catch(error => {
                console.error('Erro ao inserir contato via API JSONServer:', error);
                displayMessageCadPet("Erro ao inserir contato");
            });
    }



    // Adiciona funções para tratar os eventos 
    btnInsert = document.getElementById("btnInsert");
    btnInsert.addEventListener('click', function () {

        const queryParams = new URLSearchParams(window.location.search);
        const userId = queryParams.get('id');
        console.log(userId)

        const idUsuario = Number(userId);
        console.log(userId)

        // Verifica se o formulário está preenchido corretamente
        if (!formAvaliacao.checkValidity()) {
            displayMessageCadPet("Preencha o formulário corretamente.");
            return;
        }

        // Obtem os valores dos campos do formulário
        let campoComentario = document.getElementById('textareaComentario').value;
        let selectAvaliacao = document.getElementById('selectAvaliacao').value;

        // Cria um objeto com os dados do contato
        let avaliacao = {
            comentario: campoComentario,
            categoria: selectAvaliacao,
            userId: idUsuario

        };

        // Cria o contato no banco de dados
        createAvaliacao(avaliacao, exibeAvaliacao(idUsuario));

        // Limpa o formulario
        formAvaliacao.reset()

    });

    // Trata o click do botão Excluir
    btnDelete = document.getElementById('btnDelete');
    btnDelete.addEventListener('click', function () {
        let campoId = document.getElementById('inputId').value;
        if (campoId == "") {
            displayMessage("Selecione uma avaliacao a ser excluída.");
            return;
        }

        // Exclui o contato no banco de dados
        deleteAvaliacao(parseInt(campoId), exibeAvaliacao);

        // Limpa o formulario
        formAvaliacao.reset()
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


    // Preenche o formulário quando o usuario clicar em uma linha da tabela 
    gridAvaliacao = document.getElementById("grid-avaliacao");
    gridAvaliacao.addEventListener('click', function (e) {
        console.log(e.target);
        if (e.target.tagName == "TD") {

            // Obtem as colunas da linha selecionada na tabela
            let linhaAvaliacao = e.target.parentNode;
            colunas = linhaAvaliacao
                .querySelectorAll("td");

            const avaliacao = retornoDados.find(filtroAvaliacao => filtroAvaliacao.id == colunas[0].innerText)
            console.log(avaliacao);

            // Preenche os campos do formulário com os dados da linha selecionada na tabela
            document.getElementById('inputId').value = avaliacao.id;
            document.getElementById('textareaComentario').value = avaliacao.comentario;
            document.getElementById('selectAvaliacao').value = avaliacao.categoria;

        }
    });

    const queryParams = new URLSearchParams(window.location.search);
    const userId = queryParams.get('id');
    exibeAvaliacao(userId);


}



buttonModalAddReview.addEventListener("click", function () {
    showAddReviewModal()
});
