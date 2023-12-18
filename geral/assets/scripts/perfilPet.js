const urlUser = "https://jsonserver-usuarios-helpet--imcathalat1.repl.co/users";

async function fetchProductDetails(id) {
    try {
        const response = await fetch(`https://jsonserver-cadastro-pet-2-helpet--imcathalat1.repl.co/pets?id=${id}`);
        const product = await response.json();
        return product;
    } catch (error) {
        console.error('Erro ao buscar os dados: ', error);
    }
}


async function fetchUsuario(IdUser){
    try {
        const response = await fetch(`${urlUser}?id=${IdUser}`);
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

async function renderUsuario(user){
    const div = document.createElement("div");
    console.log(user.id)

    div. innerHTML = `
    <i class="fa-solid fa-user"><a href="../autenticacao/perfil-usuario-nao-logado.html?id=${user.id}"> Dono: ${user.nome}</a></i>`

    return div;
}

//inseri os cards de avaliacao corretatmente
function insertAfter(newNode, existingNode) {
    existingNode.parentNode.insertBefore(newNode, existingNode.nextSibling);
}


//funcao para inicializar a pagina e buscar detalhes do produto
async function renderDetails() {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');
    console.log(productId)
    

    const product = await fetchProductDetails(productId);
    console.log(product)
    updateProductDetails(product[0])

    const IdUser = product[0].userId
    console.log(IdUser)
    const usuario = await fetchUsuario(IdUser);
    console.log(usuario)
    
    const divImagem = document.getElementById('div-localizacao')
    const linkUsuario = await renderUsuario(usuario[0]);
    insertAfter(linkUsuario, divImagem.lastElementChild);


}

renderDetails();





