const form = document.querySelector('#livrosForm');
const tituloInput = document.querySelector('#tituloInput');
const autorInput = document.querySelector('#autorInput');
const anoPubInput = document.querySelector('#anoPubInput');
const tableBody = document.querySelector('#livrosTable');
const URL = 'http://localhost:8080/apiPHP/Livros.php';

function carregarLivros(){
    fetch(URL, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        mode: 'cors'
    })
        .then(response => response.json())
        .then(livros => {
            tableBody.innerHTML = ''

            for(let i = 0; i <= livros.length; i++){
                const tr = document.createElement('tr');
                const livro = livros[i];
                tr.innerHTML = `
                    <td>${livro.id}</td>
                    <td>${livro.titulo}</td>
                    <td>${livro.autor}</td>
                    <td>${livro.ano_publicacao}</td>
                    <td>
                        <button data-id="${livro.id}" class="btn btn-secondary s" onclick="atualizarLivro(${livro.id})">Editar</button>
                        <button class="btn btn-secondary s" onclick="excluirLivro(${livro.id})">Excluir</button>
                    </td>
                `
                tableBody.appendChild(tr);
            }
        })
}


function adicionarLivros(event){
    event.preventDefault;

    const titulo = tituloInput.value;
    const autor = autorInput.value;
    const ano_publicacao = anoPubInput.value;

    fetch(URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: `titulo=${encodeURIComponent(titulo)}&autor=${encodeURIComponent(autor)}&ano_publicacao=${encodeURIComponent(ano_publicacao)}`
    })
        .then(response => {
            if(response.ok){
                carregarLivros();
                tituloInput.value = '';
                autorInput.value = '';
                anoPubInput.value = '';
            } else{
                console.error('Erro ao adicionar Livro');
                alert('Erro ao adicionar Livro');
            }
        })
}

function atualizarLivro(id){
    const novoTitulo = prompt("Digite o novo título");
    const novoAutor = prompt("Digite o novo autor");
    const novoAno = prompt("Digite o novo ano");

    if(novoTitulo && novoAno && novoAutor){
        fetch(`${URL}?id=${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: `titulo=${encodeURIComponent(novoTitulo)}&autor=${encodeURIComponent(novoAutor)}&ano_publicacao=${encodeURIComponent(novoAno)}`
        })
            .then(response => {
                if(response.ok){
                    carregarLivros();
                    alert('Livro atualizado com sucesso!');
                } else{
                    console.error('Erro ao atualizar livro');
                    alert('Erro ao atualizar livro');
                }
            })
    }
}

function excluirLivro(id){
    if(confirm('Deseja excluir esse livro?')){
        fetch(`${URL}?id=${id}`, {
            method: 'DELETE'
        })
            .then(response => {
                if(response.ok) {
                    carregarLivros();
                } else{
                    console.error('Erro ao excluir Livro');
                    alert('Erro ao excluir Livro');
                }
            })
    }
}

form.addEventListener('submit', adicionarLivros);

carregarLivros(); 