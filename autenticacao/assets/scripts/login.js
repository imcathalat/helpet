//const container = document.getElementById('container');
//const registerBtn = document.getElementById('register');
//const loginBtn = document.getElementById('login');
//const registerBtn = document.getElementById('register');


// Lógica para o formulário de login


async function createLoginStatus(usuario) {
  try {
    const response = await fetch("https://jsonserver-status-user-logado--imcathalat1.repl.co/status-logado", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(usuario),
    });

    const data = await response.json();
    console.log("Contato inserido com sucesso");
    window.location.href = `perfil-usuario-logado.html?id=${data.id}`;
  } catch (error) {
    console.error('Erro ao inserir contato via API JSONServer:', error);
    console.log("Erro ao inserir contato");
  }
}


document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
  
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
  
    // Lógica para chamar a API e verificar as credenciais
    // Substitua esta lógica com chamadas reais para a API
    // Supondo que a resposta da API seja um JSON com uma lista de usuários
    const apiUrl = 'https://jsonserver-usuarios-helpet--imcathalat1.repl.co/users'; 
    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        const user = data.find(user => user.username === username && user.senha === password);
        if (user) {
          let usuario = {
            id: user.id,
            nome: user.nome,
            email: user.email,
            telefone: user.telefone,
            cidade: user.cidade,
            estado: user.estado,
            username: user.username,
            senha: user.senha,
            descricao: user.descricao,
            perfil:user.perfil,
            canAddRacao: user.canAddRacao,
            canAddAjudaVeterinaria: user.canAddAjudaVeterinaria,
            canAddAjudaFinanceira: user.canAddAjudaFinanceira
        };
        console.log(usuario);
        createLoginStatus(usuario);
  
        } else {
          alert('Credenciais inválidas. Tente novamente.');
        }
      })
      .catch(error => {
        console.error('Erro:', error);
        alert('Erro ao processar o login. Tente novamente mais tarde.');
      });
  });
  