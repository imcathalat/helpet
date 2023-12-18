const urlReview = `https://avaliacao.leticiafigueir5.repl.co/avaliacao`;
const urlUser = "https://jsonserver-usuarios-helpet--imcathalat1.repl.co/users";


async function fetchAvaliacao() {
    try {
        const response = await fetch(urlReview);
        const product = await response.json();
        console.log(product)
        return product;
    } catch (error) {
        console.error('Erro ao buscar os dados: ', error);
    }
}

async function fetchPets() {
    try {
        const response = await fetch(`https://jsonserver-cadastro-pet-2-helpet--imcathalat1.repl.co/pets`);
        const product = await response.json();;
        return product;
    } catch (error) {
        console.error('Erro ao buscar os dados: ', error);
    }
}

async function fetchUsuario(userId){
    try {
        const response = await fetch(`${urlUser}?id=${userId}`);
        const product = await response.json();
        return product;
    } catch (error) {
        console.error('Erro ao buscar os dados: ', error);
    }
}

function renderCard(pet, i) {
    const cardDivv = document.createElement("div");
    cardDivv.className = "col-md-3 col-lg-3 col-sm-6 mb-5";    

    cardDivv.innerHTML = `
    <div class="card h-100 d-flex card-pets-em-adocao">
        <img src="${pet.image}" class="card-img-top object-fit-cover" alt="" height="200px">
        <div class="card-body ">
            <h5 class="card-title">${pet.nome}</h5>
            <p class="card-text">${pet.cidade}, ${pet.estado}<p/>
            <a href="geral/perfilPet.html?id=${pet.id}" class="cart-button btn w-100 btn-adotar">
                <button type="button" class="btn p-0" id="openModalAdotar">
                    Adotar
                </button>
            </a>
        </div>
    </div>
`;

    return cardDivv;

}

async function renderAvaliacao(avaliacao, user){
    const  cardDiv = document.createElement("div");
    cardDiv.className = "carousel-item";

    cardDiv.innerHTML= `
    <div class="cards-wrapper d-flex ">
                    <div class="card card-rate m-0 p-2 flex-wrap d-flex flex-sm-column flex-sm-row flex-md-row flex-lg-row align-items-center justify-content-center" style="width: 18rem;" >
                        <div class="img-nome">
                            <img class="card-img-top img-perfil-rate object-fit-cover" src="${user[0].perfil}" alt="" height="200px" >
                            <h4></h4>
                        </div>
                        
                        <div class="card-body card-body-rate ms-3">
                            <h5 class="card-title text-center">${avaliacao.categoria}</h5>
                            <p class="card-text text-center">${avaliacao.comentario}</p>
                        </div>
                    </div>
                </div>
    `;

    return cardDiv;
}

//inseri os cards de avaliacao corretatmente
function insertAfter(newNode, existingNode) {
    existingNode.parentNode.insertBefore(newNode, existingNode.nextSibling);
}


async function renderPagePets(){
    const pets = await fetchPets();

    const cardContainer = document.getElementById('cardPet-container');

    // Render pet cards
    for (let i = 0; i < 8; i++) {
        const card = renderCard(pets[i], i);
        cardContainer.appendChild(card);
    }
}

async function renderPageReviews(){
    const avaliacoes = await fetchAvaliacao();

    const cardAvaliacao = document.getElementById('carousel-inner');

    // Render review cards
    for (let i = 0; i < avaliacoes.length; i++) {
        const userId = avaliacoes[i].userId;
        const usuario = await fetchUsuario(userId);

        const review = await renderAvaliacao(avaliacoes[i], usuario);
        console.log(review)
        insertAfter(review, cardAvaliacao.lastElementChild);
    }

}

renderPageReviews();
renderPagePets();

