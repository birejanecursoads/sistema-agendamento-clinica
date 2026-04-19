# Projeto 03 — Sistema de Agendamento

## Descrição

Este projeto consiste no desenvolvimento de uma aplicação completa para agendamento de consultas e exames de uma clínica de saúde, utilizando **frontend** e **backend** em JavaScript.

No backend foi utilizado **Node.js com Express**, responsável por disponibilizar as rotas da aplicação, ler os dados dos profissionais e armazenar os agendamentos em arquivos JSON locais. Essa abordagem atende ao requisito de armazenamento local.

No frontend foram utilizados **HTML, CSS e JavaScript**, permitindo que o usuário selecione a especialidade, escolha o profissional, visualize as datas disponíveis e realize um agendamento informando nome e CPF.

Além disso, o sistema possui uma funcionalidade de consulta por CPF, que permite localizar os agendamentos já realizados e também cancelar um agendamento existente.

Os dados dos profissionais ficam armazenados em um arquivo JSON com nome, especialidade e datas disponíveis. Já os agendamentos realizados são gravados em outro arquivo JSON, simulando um pequeno banco de dados local.

Essa solução demonstra integração entre interface e servidor, manipulação de dados, rotas HTTP, leitura e escrita em arquivos locais, sendo adequada para a disciplina de Desenvolvimento Web.

---

## Como executar

### 1. Criar o projeto

```bash
mkdir sistema-agendamento-clinica
cd sistema-agendamento-clinica
```

### 2. Inicializar Node.js

```bash
npm init -y
```

### 3. Instalar o Express

```bash
npm install express
```

### 4. Criar os arquivos

Crie toda a estrutura do projeto:

* pasta `dados`
* pasta `public`
* arquivo `server.js`
* arquivo `package.json`
* arquivo `dados/profissionais.json`
* arquivo `dados/agendamentos.json`
* arquivo `public/index.html`
* arquivo `public/style.css`
* arquivo `public/script.js`

### 5. Rodar o projeto

```bash
node server.js
```

Abra no navegador:

```text
http://localhost:3000
```

---

## Funcionalidades

* Escolha da especialidade
* Escolha do profissional
* Exibição das datas disponíveis
* Agendamento com nome e CPF
* Consulta por CPF
* Cancelamento de agendamento
* Armazenamento local em JSON

---

## Tecnologias Utilizadas

* Node.js
* Express
* JavaScript
* HTML5
* CSS3
* JSON

---

## Autor

Desenvolvido para a disciplina de **Desenvolvimento Web**.
