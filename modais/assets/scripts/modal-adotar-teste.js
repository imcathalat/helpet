const urlUserData = "https://jsonserver-usuarios-helpet--imcathalat1.repl.co/users";

async function renderAdoptModal(userData) {
    // Criar o banner
    const modalBody = document.querySelector('.modal-body');
    const modalContent = document.createElement('div');
    modalContent.className = 'bg-light p-4 rounded border';

    const content = `
        <div class="d-flex">
            <p>Para adotar o pet entre em contato com <span class="userNameAdotar">${userData.nome}</span> através:</p>
        </div>
        <div>
            <span>
                <i class="fa-brands fa-whatsapp"></i>
            </span>
            <span id="telefoneAdotar" class="userPhone ms-3">
                ${userData.telefone}
            </span>
        </div>
        <div>
            <span>
                <i class="fa-regular fa-envelope"></i>
            </span>
            <span id="emailAdotar"  class="userEmail ms-3">
                ${userData.email}
            </span>
        </div>
    `;
    modalContent.innerHTML = content;
    console.log(modalContent);
    modalBody.appendChild(modalContent);
    console.log(modalBody);

}



async function fetchUserDataForAdoptModal(userId) {
    const url = `${urlUserData}/${userId}`;
    console.log(url);
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Erro ao buscar os dados: ', error);
    }
}

async function renderUserDataForModelAdopt() {
    const urlParams = new URLSearchParams(window.location.search);
    const userId = urlParams.get('id');

    const userData = await fetchUserDataForAdoptModal(userId);
    console.log(userData);
    renderAdoptModal(userData);
}

renderUserDataForModelAdopt();



