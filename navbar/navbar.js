function renderNavbar(data){

    const navbar = document.getElementById('navbar');
    const navbarComponent = document.createElement('div');
    navbarComponent.className = 'container';
    console.log(data.id);
    console.log(data.perfil);

    navbarComponent.innerHTML = `
            <a class="navbar-brand" href="../geral/home-logado.html">
                <img class="nav-img" src="assets/img-navbar/logo-helpet.png" width="100">
            </a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse " id="navbarSupportedContent">
                <ul class="navbar-nav ms-auto mb-2 mb-lg-0 me-3">
                    <li class="nav-item ">
                        <a class="nav-link" href="../geral/filtro-pets-logado.html">Quero Adotar</a>
                    </li>
                    <li class="nav-item ">
                        <a class="nav-link" href="#">Quero Ajudar</a>
                    </li>
                </ul>
                <div class="d-flex justify-content-around">
                    <a href="../autenticacao/perfil-usuario-logado.html?=${data.id}">
                        <img id="icone-perfil" src="${data.perfil}" width="50px" height="50px" class="rounded-circle ">
                    </a>
                </div>
            </div>
    `;
    console.log("entrou!")
    return navbar.appendChild(navbarComponent);
}



async function fetchUserLogado() {
    try {
      const response = await fetch(`https://jsonserver-status-user-logado--imcathalat1.repl.co/status-logado`);
      const data = await response.json();
      console.log(data);
      renderNavbar(data[0]);
    } catch (error) {
      console.error('Erro ao buscar os dados: ', error);
    }
  }

fetchUserLogado();

