const apiUrl = 'https://jsonserver--imcathalat1.repl.co/pets'; 

let retornoDados = null;

function displayMessage(mensagem) {
    msg = document.getElementById('msg');
    msg.innerHTML = '<div class="alert alert-warning">' + mensagem + '</div>';
}

function readPet(processaDados) {
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            retornoDados = data;
            processaDados(data);
        })
        .catch(error => {
            console.error('Erro ao ler contatos via API JSONServer:', error);
            displayMessage("Erro ao ler contatos");
        });
}

function createPet(pet, refreshFunction) {
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
            if (refreshFunction)
                refreshFunction();
        })
        .catch(error => {
            console.error('Erro ao inserir contato via API JSONServer:', error);
            displayMessage("Erro ao inserir contato");
        });
}

function updatePet(id, contato, refreshFunction) {
    fetch(`${apiUrl}/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(contato),
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

function deletePet(id, refreshFunction) {
    fetch(`${apiUrl}/${id}`, {
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



document.getElementById('cadastroPetForm').addEventListener('submit', e => { e.preventDefault(); });
