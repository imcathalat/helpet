const API_URL = "https://jsonserver-cadastro-pet-2-helpet--imcathalat1.repl.co/pets";
const cardContainer = document.getElementById("cardContainer");
const speciesFilter = document.getElementById("specie");
const sexFilter = document.getElementById("sexo");
const ageFilter = document.getElementById("idade");
const sizeFilter = document.getElementById("porte");
const applyFilterBtn = document.getElementById("applyFilter");

let data = [];

applyFilterBtn.addEventListener("click", applyFilter);

async function fetchData() {
    try {
        const response = await fetch(API_URL);
        data = await response.json();
        console.log(data)
        showInHtml(data);
    } catch (error) {
        console.error("Erro ao obter dados da API:", error);
    }
}

function applyFilter() {
    fetchData();
}

function filterBySpecies(pet) {
    return speciesFilter.value === "null" || pet.especie === speciesFilter.value;
}

function filterBySize(pet) {
    return sizeFilter.value === "null" || pet.porte === sizeFilter.value;
}

function filterBySex(pet) {
    return sexFilter.value === "null" || pet.sexo === sexFilter.value;
}

function filterByAge(pet) {
    return ageFilter.value === "null" || pet.idade === ageFilter.value;
}

function showInHtml(data) {
    cardContainer.innerHTML = "";
    data.forEach(pet => {
        if (
            filterBySpecies(pet) &&
            filterBySize(pet) &&
            filterBySex(pet) &&
            filterByAge(pet)
        ) {
            console.log(pet.id)
            const card = createCard(pet);
            cardContainer.appendChild(card);
        }
    });
}

function createCard(pet) {
    const card = document.createElement("div");
    card.className = " col-lg-3 col-md-3 col-sm-12 mb-3 ";
    card.innerHTML = `
    <div class="card h-100 d-flex">
        <img src="${pet.image}" class="card-img-top object-fit-cover" alt="" height="200px">
        <div class="card-body ">
            <h5 class="card-title">${pet.nome}</h5>
            <p class="card-text">${pet.cidade}, ${pet.estado}<p/>
            <a href="./perfilPet-logado.html?id=${pet.id}" class="cart-button btn w-100 btn-adotar">
                <button type="button" class="btn p-0" id="openModalAdotar">
                    Adotar
                </button>
            </a>
        </div>
    </div>
    `;
    return card;
}

fetchData(); // Inicializa os dados ao carregar a página