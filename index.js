//importa a biblioteca express
const express = require('express');
//intancia a biblioteca express na const app
const app = express();
//inicializando o express com json
app.use(express.json());
//Criando uma lista de objeto de clients
let clients = [
    {id:1, nome:"kaio"}
]
//criando a rota get para consultar os usuarios
app.get("/clients", (req, res) =>{
    //retornando através da res um json com os clients
    res.json(clients);
})
//criando a rota de post para criar um novo usuario
app.post("/clients", (req, res) =>{
    //criando uma const chamada newClient onde adicionamos +1 no id e pegamos o nome do body para adicionar
    const newClient ={
        id: clients.length + 1,
        nome: req.body.nome
    }
    //usa o metodo push para adicioanar o newClient na lista clients
    clients.push(newClient);
    res.status(201).json(newClient);
})
//criando a rota put para atualizar os dados do client
app.put("/clients/:id", (req, res) => {
    // criamos uma const id para converter o ID do req para um numero inteiro
    const id = parseInt(req.params.id);
    // criamos uma const clientIndex para listar o id do cliente da lista clients com metodo findIndex que compara c .id == id que venho da req
    const clientIndex = clients.findIndex(c => c.id === id);
    //Pegamos o client com a index e atualizamos com as req enviadas do body
    clients[clientIndex].nome = req.body.nome;
    //retorna a mensagem de sucesso
    res.json({ message: "Usuário atualizado com sucesso!"});

})
//criamos o metodo delete para apagar um usuario
app.delete("/clients/:id", (req, res) => {
    // criamos uma const id para converter o ID do req para um numero inteiro
    const id = parseInt(req.params.id);
    //filtramos o id dentro da lista com metodo filter e tiramos da lista
    clients = clients.filter(c => c.id !== id);
    res.json({ message: "Usuário removido com sucesso!" });
});

//definimos a porta que o servidor vai rodar quando iniciarmos com "npm start"
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
