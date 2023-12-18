function renderNavbar(){

    const navbar = document.getElementById('navbar');
    const navbarComponent = document.createElement('div');
    navbarComponent.className = 'container';

    navbarComponent.innerHTML = `
            <a class="navbar-brand" href="../index.html">
                <img class="nav-img" src="assets/img-navbar/logo-helpet.png" width="100">
            </a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse " id="navbarSupportedContent">
                <ul class="navbar-nav ms-auto mb-2 mb-lg-0 me-3">
                    <li class="nav-item ">
                        <a class="nav-link" href="../geral/filtro-pets.html">Quero Adotar</a>
                    </li>
                    <li class="nav-item ">
                        <a class="nav-link" href="#">Quero Ajudar</a>
                    </li>
                </ul>
                <div class="d-flex justify-content-around">
                    <a href="../autenticacao/login.html">
                        <button type="button" class="btn me-3 btn-login text-dark w-40">Login</button>
                    </a>
                    <a href="../autenticacao/cadastroUsuario.html">
                        <button type="button" class="btn btn-login text-dark w-40">Cadastre-se</button>
                    </a>
                </div>
            </div>
    `;
    console.log("entrou!")
    return navbar.appendChild(navbarComponent);
}

renderNavbar();