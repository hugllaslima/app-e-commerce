🚀 Pipeline CI/CD para E-commerce na AWS

Este projeto automatiza o build, teste e deploy de uma aplicação e-commerce com backend em Node.js e frontend em React, utilizando GitHub Actions e AWS ECS (Fargate).

🛍️ Finalidade

A aplicação é um site de e-commerce que permite:

🧭 Navegar por produtos

👤 Criar contas e fazer login

🛒 Adicionar itens ao carrinho e realizar pedidos

O pipeline CI/CD garante que qualquer mudança no código seja implantada rapidamente na AWS, mantendo a loja sempre atualizada e funcional.

⚙️ Stack Principal
Componente	Tecnologia
Backend	Node.js
Frontend	React + Tailwind CSS
Infraestrutura	AWS (ECR, ECS Fargate, VPC, IAM, Security Groups)
CI/CD	GitHub Actions
IaC	Terraform
Containers	Docker
🧩 Pré-requisitos

Conta no GitHub

Conta na AWS (com permissões para ECR e ECS)

Node.js v16+ e Docker instalados localmente

💻 Configuração Local

Clone e teste o backend:

git clone https://github.com/igorpaiva26/E-Commerce-Application-CI-CD-Pipeline.git
cd E-Commerce-Application-CI-CD-Pipeline/Backend
npm install
npm test


💡 Dica: há scripts locais automatizados para subir, parar e reiniciar os containers — facilitando os testes sem precisar digitar comandos manualmente.

🧱 Estrutura do Projeto
📦 E-Commerce-Application-CI-CD-Pipeline/
├── Backend/             # API Node.js (produtos, autenticação, pedidos)
├── Frontend/            # Interface React da loja
├── .github/workflows/   # Workflows do GitHub Actions
├── Dockerfile           # Configuração Docker (backend e frontend)
└── README.md

🧠 Exemplo de Código (Backend)
const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.status(200).json({ message: 'Welcome to the API!' });
});

module.exports = app;

if (require.main === module) {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Backend server is running on http://localhost:${PORT}`);
  });
}

🔁 Como Funciona o Pipeline

CI:

GitHub Actions executa testes e constrói as imagens Docker a cada push no branch main.

CD:

As imagens são enviadas ao AWS ECR e implantadas automaticamente no AWS ECS (Fargate).

O pipeline faz health checks — se algo falhar, o deploy é bloqueado.

🧭 Próximos Passos

Configurar secrets no GitHub (AWS e DockerHub)

Testar o frontend localmente

Configurar o cluster ECS na AWS

✨ Autor

Feito com 💻 e curiosidade por Igor Paiva

Aprendizado prático sobre CI/CD, infraestrutura como código e automação em nuvem.
