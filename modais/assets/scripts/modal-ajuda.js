document.getElementById('openModalBtn').addEventListener('click', function () {
    var modalContent = `
        <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg"> 
                <div class="modal-content">
                    <div class="modal-header d-flex justify-content-center align-items-center">
                        <img class="logohelpet" src="../img-modal/logo-helpet-modal-ajuda.png"  alt="">
                        <h5 class="modal-title ml-3" id="exampleModalLabel">Como você deseja ajudar?</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>

                    <div class="modal-body text-center">
                        <div class="card-group">
                            <div class="card">
                                <div class="card-body">
                                    <img src="../img-modal/icone1.PNG" class="card-img-top custom-img" alt="">
                                    <a class="btn btn-primary btn-sm" href="../../../ajudas/vets.html" role="button">Cuidados Veterinários</a>
                                </div>
                            </div>
                            <div class="card">
                                <div class="card-body">
                                    <img src="../img-modal/icone2.PNG" class="card-img-top custom-img" alt="">
                                    <a class="btn btn-primary btn-sm" href="../../../ajudas/cadastro-financeiro.html" role="button">Ajuda Financeira</a>
                                </div>
                            </div>
                            <div class="card">
                                <div class="card-body">
                                    <img src="img-modal/icone3.PNG" class="card-img-top custom-img" alt="">
                                    <a class="btn btn-primary btn-sm" href="../../../ajudas/cadastro-racoes-ajuda.html" role="button">Ajuda na Alimentação</a>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                    </div>
                </div>
            </div>
        </div>
    `;

    document.getElementById('modalContent').innerHTML = modalContent;

    var myModal = new bootstrap.Modal(document.getElementById('exampleModal'));
    myModal.show();
});