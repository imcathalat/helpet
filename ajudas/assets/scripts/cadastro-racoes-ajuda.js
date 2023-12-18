const apiUrl = 'https://cadastro-ajuda--imcathalat1.repl.co/ajudas-cadastradas'; 

let retornoDados = null;

function displayMessage(mensagem) {
    msg = document.getElementById('msg');
    msg.innerHTML = '<div class="alert alert-warning">' + mensagem + '</div>';
}

function readAjuda(processaDados) {
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            retornoDados = data;
            console.log(data);
            processaDados(data);
        })
        .catch(error => {
            console.error('Erro ao ler contatos via API JSONServer:', error);
            displayMessage("Erro ao ler contatos");
        });
}

function createAjuda(ajuda, refreshFunction) {
    fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(ajuda),
    })
        .then(response => response.json())
        .then(data => {
            displayMessage("Contato inserido com sucesso");
            if (refreshFunction)
                refreshFunction();
        })
        .catch(error => {
            console.error('Erro ao inserir contato via API JSONServer:', error);
            displayMessage("Erro ao inserir contato");
        });
}

function updateAjuda(idAjuda, ajuda, refreshFunction) {
    fetch(`${apiUrl}/${idAjuda}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(ajuda),
    })
        .then(response => response.json())
        .then(data => {
            displayMessage("Contato alterado com sucesso");
            if (refreshFunction)
                refreshFunction();
        })
        .catch(error => {
            console.error('Erro ao atualizar contato via API JSONServer:', error);
            displayMessage("Erro ao atualizar contato");
        });
}

function deleteAjuda(idAjuda, refreshFunction) {
    fetch(`${apiUrl}/${idAjuda}`, {
        method: 'DELETE',
    })
        .then(response => response.json())
        .then(data => {
            displayMessage("Contato removido com sucesso");
            if (refreshFunction)
                refreshFunction();
        })
        .catch(error => {
            console.error('Erro ao remover contato via API JSONServer:', error);
            displayMessage("Erro ao remover contato");
        });
}




document.getElementById('cadastroPetForm').addEventListener('submit', e => { e.preventDefault(); });
