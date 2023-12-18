
async function showModalEntrarEmContato(data) {
  var modalContentContact = `
    <div class="modal fade" id="contactUserModal" tabindex="-1" aria-labelledby="userModal" aria-hidden="true">
                     <div class="modal-dialog modal-dialog-centered">
                       <div class="modal-content">
                            <div class="modal-header">
                                <aside><img class="logo" src="logohelpet.jpeg" alt=""></aside>
                                <h5 class="modal-title" id="exampleModalLabel">Entrar em contato?</h5>
                               <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                             <div class="modal-body p-4">
                                <div class="bg-light p-4 rounded border">
                                    <div class="d-flex">
                                        <p>Para adotar o pet ou saber mais entre em contato com <span class="userName">${data.nome}</span> por:</p>
                                    </div>
                                    <div><span><i class="fa-brands fa-whatsapp"></i></span><span class="userPhone ms-3">${data.telefone}</span></div>
                                     <div><span><i class="fa-regular fa-envelope"></i></span><span class="userEmail ms-3">${data.email}</span></div>
                                </div>
                             </div>
                            <div class="modal-footer d-flex align-items-center justify-content-start">
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            </div>
                         </div>
                     </div>
                </div>
`;

  document.getElementById('modalEntrarEmContato').innerHTML = modalContentContact;

  var modalContact = new bootstrap.Modal(document.getElementById(`contactUserModal`));
  modalContact.show();
}

async function fetchProtectorData(userIdDoPet){
  try {
    const response = await fetch(`https://jsonserver-usuarios-helpet--imcathalat1.repl.co/users/${userIdDoPet}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Erro ao buscar os dados: ', error);
  }
}

async function fetchAnimal(idAnimal) {
  try {
    const response = await fetch(`https://jsonserver-cadastro-pet-2-helpet--imcathalat1.repl.co/pets/${idAnimal}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Erro ao buscar os dados: ', error);
  }
}

async function renderUserInformationForContact(){
  const urlParams = new URLSearchParams(window.location.search);
  const idAnimal = urlParams.get('id');

  console.log(idAnimal);

  const data = await fetchAnimal(idAnimal);
  const userIdDoPet = data.userId;
  const ProtectorData = await fetchProtectorData(userIdDoPet);
  console.log(data);
  showModalEntrarEmContato(ProtectorData);
}



buttonModalContact = document.getElementById('modalPerfilPetAdotar');
buttonModalContact.addEventListener("click", function () {
  renderUserInformationForContact();
});




