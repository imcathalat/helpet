const urlUser = "https://jsonserver-usuarios-helpet--imcathalat1.repl.co/users";

async function fetchProductDetails(id) {
    try {
        console.log(id)
        const response = await fetch(`https://jsonserver-cadastro-pet-2-helpet--imcathalat1.repl.co/pets?id=${id}`);
        const product = await response.json();
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

//FUNCAO PARA ATUALIZAR O CONETUDO HTMLCPM OS DETALHES DO PRODUTO

function updateProductDetails(product) {
    console.log(product)
    if (product) {
        
        document.getElementById('img').src = product.image;
        document.getElementById('nomePet').textContent = product.nome;
        document.getElementById('especie').textContent = product.especie;
        document.getElementById('raca').textContent = product.Raca;
        document.getElementById('sexo').textContent = product.sexo;
        document.getElementById('idade').textContent = product.idade;
        document.getElementById('peso').textContent = product.peso;
        document.getElementById('porte').textContent = product.porte;
        document.getElementById('localizacao').textContent = ` ${product.cidade}, ${product.estado}`;
        document.getElementById('sobre').textContent = product.descricao;

        //updateAdditionalImages(product.images);
    } else {
        alert('Produto nao encontrado');
    }
}



//funcao para inicializar a pagina e buscar detalhes do produto
async function renderDetails() {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');
    console.log(productId);
    

    const product = await fetchProductDetails(productId);
    console.log(product)
    updateProductDetails(product[0])

    const IdUser = product[0].userId;
    console.log(IdUser)
    const usuario = await fetchUsuario(IdUser);
    console.log(usuario)
    


}

renderDetails();





