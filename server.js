const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3000;

const caminhoProfissionais = path.join(__dirname, "dados", "profissionais.json");
const caminhoAgendamentos = path.join(__dirname, "dados", "agendamentos.json");

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

function lerArquivo(caminho) {
  try {
    const dados = fs.readFileSync(caminho, "utf-8");
    return JSON.parse(dados);
  } catch (erro) {
    console.error("Erro ao ler arquivo:", erro.message);
    return [];
  }
}

function salvarArquivo(caminho, dados) {
  fs.writeFileSync(caminho, JSON.stringify(dados, null, 2), "utf-8");
}

app.get("/api", (req, res) => {
  res.json({ mensagem: "API do Sistema de Agendamento da Clínica" });
});

app.get("/api/profissionais", (req, res) => {
  const profissionais = lerArquivo(caminhoProfissionais);
  res.json(profissionais);
});

app.get("/api/especialidades", (req, res) => {
  const profissionais = lerArquivo(caminhoProfissionais);
  const especialidades = [...new Set(profissionais.map((p) => p.especialidade))];
  res.json(especialidades);
});

app.get("/api/profissionais/especialidade/:especialidade", (req, res) => {
  const profissionais = lerArquivo(caminhoProfissionais);
  const especialidade = req.params.especialidade.toLowerCase();

  const resultado = profissionais.filter(
    (p) => p.especialidade.toLowerCase() === especialidade
  );

  res.json(resultado);
});

app.post("/api/agendamentos", (req, res) => {
  const { nome, cpf, profissionalId, data } = req.body;

  if (!nome || !cpf || !profissionalId || !data) {
    return res.status(400).json({
      mensagem: "Preencha nome, CPF, profissional e data."
    });
  }

  const profissionais = lerArquivo(caminhoProfissionais);
  const agendamentos = lerArquivo(caminhoAgendamentos);

  const profissional = profissionais.find((p) => p.id === Number(profissionalId));

  if (!profissional) {
    return res.status(404).json({
      mensagem: "Profissional não encontrado."
    });
  }

  if (!profissional.datasDisponiveis.includes(data)) {
    return res.status(400).json({
      mensagem: "Data não disponível para este profissional."
    });
  }

  const conflito = agendamentos.find(
    (a) => a.profissionalId === Number(profissionalId) && a.data === data
  );

  if (conflito) {
    return res.status(400).json({
      mensagem: "Esta data já foi agendada para este profissional."
    });
  }

  const novoAgendamento = {
    id: agendamentos.length > 0 ? agendamentos[agendamentos.length - 1].id + 1 : 1,
    nome,
    cpf,
    profissionalId: Number(profissionalId),
    profissionalNome: profissional.nome,
    especialidade: profissional.especialidade,
    data
  };

  agendamentos.push(novoAgendamento);
  salvarArquivo(caminhoAgendamentos, agendamentos);

  res.status(201).json({
    mensagem: "Agendamento realizado com sucesso.",
    agendamento: novoAgendamento
  });
});

app.get("/api/agendamentos/:cpf", (req, res) => {
  const cpf = req.params.cpf;
  const agendamentos = lerArquivo(caminhoAgendamentos);

  const resultado = agendamentos.filter((a) => a.cpf === cpf);

  if (resultado.length === 0) {
    return res.status(404).json({
      mensagem: "Nenhum agendamento encontrado para este CPF."
    });
  }

  res.json(resultado);
});

app.delete("/api/agendamentos/:id", (req, res) => {
  const id = Number(req.params.id);
  const agendamentos = lerArquivo(caminhoAgendamentos);

  const indice = agendamentos.findIndex((a) => a.id === id);

  if (indice === -1) {
    return res.status(404).json({
      mensagem: "Agendamento não encontrado."
    });
  }

  const removido = agendamentos.splice(indice, 1);
  salvarArquivo(caminhoAgendamentos, agendamentos);

  res.json({
    mensagem: "Agendamento cancelado com sucesso.",
    agendamento: removido[0]
  });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});