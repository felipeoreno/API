<?php
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
    // GET recebe/pega informações
    // POST envia informações
    // PUT edita informações: "update"
    // DELETE deleta informações
    // OPTIONS é a relação de métodos disponíveis para uso
    header('Access-Control-Allow-Headers: Content-Type');

    if($_SERVER['REQUEST_METHOD'] === 'OPTIONS'){
        exit;
    } else{

    }

    include 'conexao.php';

    // Rota para obter TODOS os livros
    if($_SERVER['REQUEST_METHOD'] === 'GET'){
        // é criado o comando de SELECT para consultar o banco, que é armazenado dentro da instância $stmt de $conn
        $stmt = $conn->prepare("SELECT * FROM livros");
        // o comando dentro do prepare() é executado
        $stmt->execute();

        // os dados recebidos do banco são atribuídos por meio do PDO à variável $livros
        $livros = $stmt->fetchAll(PDO::FETCH_ASSOC);
        // os dados da variável $livros são transformados em um JSON válido
        echo(json_encode($livros));
    }

    // rota para criar livros
    if($_SERVER['REQUEST_METHOD'] === 'POST'){
        $titulo = $_POST['titulo'];
        $autor = $_POST['autor'];
        $ano_publicacao = $_POST['ano_publicacao'];

        $stmt = $conn->prepare("INSERT INTO livros (titulo, autor, ano_publicacao) VALUES (:titulo, :autor, :ano_publicacao)");
        $stmt->bindParam(':titulo', $titulo);
        $stmt->bindParam(':autor', $autor);
        $stmt->bindParam(':ano_publicacao', $ano_publicacao);

        if($stmt->execute()){
            echo("Livro criado com sucesso!");
        } else{
            echo("Erro ao criar livro!");
        }
    }
?>