document.addEventListener('DOMContentLoaded', function () {
    var btnSalvar = document.querySelector('.btn-primary');
    var selectCuidado = document.getElementById('selectCuidado');
    var inputDescricao = document.getElementById('inputDescricao');

    btnSalvar.addEventListener('click', function () {
        salvarFormulario();
    });

    selectCuidado.addEventListener('change', function () {
        // Verifica se a opção selecionada é "Outro"
        if (selectCuidado.value === 'outro') {
            // Se sim, mostra o campo de descrição
            inputDescricao.style.display = 'block';
        } else {
            // Se não, oculta o campo de descrição
            inputDescricao.style.display = 'none';
        }
    });

    function salvarFormulario() {
        var chavePix = document.getElementById('inputPix').value;
        var tipoCuidado = document.getElementById('selectCuidado').value;
        var valorNecessario = document.getElementById('inputValor').value;
        var descricao = document.getElementById('inputDescricao').value;

        // Verifica se a chave Pix e o tipo de cuidado estão preenchidos
        if (chavePix === '' || tipoCuidado === '') {
            exibirMensagemErro('Preencha os campos obrigatórios.');
            return;
        }

        // Você pode adicionar validações adicionais se necessário

        console.log('Chave Pix:', chavePix);
        console.log('Tipo de Cuidado:', tipoCuidado);
        console.log('Valor Necessário:', valorNecessario);
        console.log('Descrição:', descricao);

        limparCampos();
        exibirMensagemSucesso('Formulário salvo com sucesso.');
    }

    function exibirMensagemErro(mensagem) {
        var msgElement = document.getElementById('msg');
        msgElement.innerHTML = '<div class="alert alert-danger" role="alert">' + mensagem + '</div>';
    }

    function exibirMensagemSucesso(mensagem) {
        var msgElement = document.getElementById('msg');
        msgElement.innerHTML = '<div class="alert alert-success" role="alert">' + mensagem + '</div>';
    }

    function limparCampos() {
        document.getElementById('inputPix').value = '';
        document.getElementById('selectCuidado').value = '';
        document.getElementById('inputValor').value = '';
        document.getElementById('inputDescricao').value = '';

        // Oculta o campo de descrição após limpar os campos (se necessário)
        inputDescricao.style.display = 'none';
    }
});