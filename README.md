Pipeline CI/CD para Aplicação de E-commerce
Este projeto implementa um pipeline CI/CD para uma aplicação de e-commerce, composta por um backend em Node.js e um frontend em React. O objetivo é automatizar o build, teste e deploy de uma loja online, garantindo que mudanças no código (como novos produtos ou correções no carrinho) sejam implantadas rapidamente na AWS.
Finalidade
A aplicação é um site de e-commerce funcional que permite:

Navegar por produtos.
Criar contas e fazer login.
Adicionar itens ao carrinho e realizar pedidos.

O pipeline usa GitHub Actions para construir e testar a aplicação, criar imagens Docker e implantá-las no AWS ECS, mantendo a loja online sempre atualizada.
Pré-requisitos

Conta no GitHub com acesso ao repositório.
Conta na AWS com permissões para ECR e ECS.
Node.js v16 ou superior e Docker instalados localmente.

Configuração Local
Clone o repositório e teste o backend:
git clone https://github.com/igorpaiva26/E-Commerce-Application-CI-CD-Pipeline.git
cd E-Commerce-Application-CI-CD-Pipeline
cd Backend
npm install
npm test

Estrutura do Projeto

Backend/: API Node.js para produtos, autenticação e pedidos.
Frontend/: Interface React para a loja online.
.github/workflows/: Workflows do GitHub Actions para CI/CD.
Dockerfile (Backend e Frontend): Configurações para imagens Docker.

Exemplo de Código (Backend)
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

Como o Pipeline Funciona

CI: GitHub Actions executa testes e constrói imagens Docker a cada push no branch main.
CD: Imagens são enviadas ao AWS ECR e implantadas no AWS ECS, atualizando a loja online automaticamente.

Próximos Passos

Configurar secrets no GitHub para AWS e DockerHub.
Testar frontend localmente.
Configurar cluster ECS na AWS para deploy.
