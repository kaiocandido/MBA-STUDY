const express = require('express');

const app = express();
app.use(express.json());

let clients = [
    { id: 1, nome: "kaio" }
];

app.get("/clients", (req, res) => {
    res.json(clients);
});

app.post("/clients", (req, res) => {
    try {
        const { nome } = req.body;
        if (!nome) {
            return res.status(400).json({ error: "Campo 'nome' é obrigatório." });
        }

        const newClient = {
            id: clients.length + 1,
            nome
        };

        clients.push(newClient);
        res.status(201).json(newClient);
    } catch (error) {
        res.status(500).json({ error: "Erro interno no servidor." });
    }
});

app.put("/clients/:id", (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const clientIndex = clients.findIndex(c => c.id === id);

        if (clientIndex === -1) {
            return res.status(404).json({ error: "Cliente não encontrado." });
        }

        const { nome } = req.body;
        if (!nome) {
            return res.status(400).json({ error: "Campo 'nome' é obrigatório." });
        }

        clients[clientIndex].nome = nome;
        res.json({ message: "Usuário atualizado com sucesso!" });
    } catch (error) {
        res.status(500).json({ error: "Erro interno no servidor." });
    }
});

app.delete("/clients/:id", (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const clientExists = clients.some(c => c.id === id);

        if (!clientExists) {
            return res.status(404).json({ error: "Cliente não encontrado." });
        }

        clients = clients.filter(c => c.id !== id);
        res.json({ message: "Usuário removido com sucesso!" });
    } catch (error) {
        res.status(500).json({ error: "Erro interno no servidor." });
    }
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
