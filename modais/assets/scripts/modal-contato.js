
function closeButton(){
  const btnCloseModalAdopt = document.getElementById("closeButton");
  console.log(btnCloseModalAdopt);
}

async function showModalContato(data) {
  var modalContentContact = `
    <div class="modal fade" id="contactUserModal" tabindex="-1" aria-labelledby="userModal" aria-hidden="true">
                     <div class="modal-dialog modal-dialog-centered">
                       <div class="modal-content">
                            <div class="modal-header">
                                <aside><img class="logo" src="logohelpet.jpeg" alt=""></aside>
                                <h5 class="modal-title" id="exampleModalLabel">Entrar em contato?</h5>
                               <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" id="closeButton"></button>
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
                                <button type="button" class="btn btn-secondary" id="closeButton" data-bs-dismiss="modal">Close</button>
                            </div>
                         </div>
                     </div>
                </div>
`;

  document.getElementById('modalContato').innerHTML = modalContentContact;

  var modalContact = new bootstrap.Modal(document.getElementById(`contactUserModal`));
  modalContact.show();

  closeButton();
}



async function fetchUserInformation5(idUser) {
  try {
    const response = await fetch(`https://jsonserver-usuarios-helpet--imcathalat1.repl.co/users/${idUser}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Erro ao buscar os dados: ', error);
  }
}

async function renderUserInformationForContact(){
  const urlParams = new URLSearchParams(window.location.search);
  const idUser = urlParams.get('id');

  console.log(idUser);

  const data = await fetchUserInformation5(idUser);
  console.log(data);
  showModalContato(data);
}



buttonModalContact = document.getElementById('openModalContact');
buttonModalContact.addEventListener("click", function () {
  renderUserInformationForContact();
});






