apiUrl = "https://jsonserver-usuarios-helpet--imcathalat1.repl.co/users"


let retornoDados = null;

function displayMessage(mensagem) {
    msg = document.getElementById('msg');
    msg.innerHTML = '<div class="alert alert-warning">' + mensagem + '</div>';
}

//FUNCAO QUE FAZ O POST NA API
function creatUser(pet, refreshFunction) {
    fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(pet),
    })
        .then(response => response.json())
        .then(data => {
            displayMessage("Contato inserido com sucesso");
            window.location.href = '../login.html';
        })
        .catch(error => {
            console.error('Erro ao inserir contato via API JSONServer:', error);
            displayMessage("Erro ao inserir contato");
        });
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



//document.getElementById('cadastroPetForm').addEventListener('submit', e => { e.preventDefault(); });




function init() {
    // Define uma variável para o formulário de contato
    formUser = document.getElementById("cadastroUser");
    getEstados();

    // Adiciona funções para tratar os eventos 
    btnInsert = document.getElementById("btnInsert");
    btnInsert.addEventListener('click', function () {
        // Verifica se o formulário está preenchido corretamente
        if (!formUser.checkValidity()) {
            displayMessage("Preencha o formulário corretamente.");
            return;
        }

        // Obtem os valores dos campos do formulário
        let campoNome = document.getElementById('inputNome').value;
        let inputEmail = document.getElementById('inputEmail').value;
        let inputTelefone = document.getElementById('inputTelefone').value;
        let selectEstado = document.getElementById('selectEstado').value;
        let selectCidade = document.getElementById('selectCidade').value;
        let inputUser = document.getElementById('inputUser').value;
        let inputSenha = document.getElementById('inputSenha').value;
        let campoDescricao = document.getElementById('textareaDescricao').value;
        let campoImagem = document.getElementById('inputUrlImagem').value;

        // Cria um objeto com os dados do contato
        let users = {
            nome: campoNome,
            email: inputEmail,
            telefone: inputTelefone,
            estado: selectEstado,
            cidade: selectCidade,
            descricao: campoDescricao,
            username: inputUser,
            senha: inputSenha,
            descricao: campoDescricao,
            perfil: campoImagem,
            canAddRacao: true,
            canAddAjudaVeterinaria: true,
            canAddAjudaFinanceira: true

        };

        // Cria o contato no banco de dados
        creatUser(users, );

        // Limpa o formulario
        formUser.reset()
    });

}