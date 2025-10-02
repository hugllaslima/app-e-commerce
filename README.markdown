# Pipeline CI/CD para E-commerce

Este projeto automatiza o build, teste e deploy de uma loja online com backend em Node.js e frontend em React, usando GitHub Actions e AWS.

## Finalidade

A aplicação é um site de e-commerce que permite:

- Navegar por produtos
- Criar contas e fazer login
- Adicionar itens ao carrinho e realizar pedidos

O pipeline CI/CD garante que mudanças no código sejam implantadas rapidamente no AWS ECS, mantendo a loja sempre atualizada.

## Pré-requisitos

- Conta no GitHub
- Conta na AWS (permissões para ECR e ECS)
- Node.js v16+ e Docker instalados localmente

## Configuração Local

Clone e teste o backend:

```bash
git clone https://github.com/igorpaiva26/E-Commerce-Application-CI-CD-Pipeline.git
cd E-Commerce-Application-CI-CD-Pipeline
cd Backend
npm install
npm test
```

## Estrutura do Projeto

- `Backend/`: API Node.js (produtos, autenticação, pedidos)
- `Frontend/`: Interface React da loja
- `.github/workflows/`: Workflows do GitHub Actions
- `Dockerfile`: Configurações Docker (Backend e Frontend)

## Exemplo de Código (Backend)

```javascript
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
```

## Como Funciona o Pipeline

- **CI**: GitHub Actions executa testes e constrói imagens Docker a cada push no `main`
- **CD**: Imagens são enviadas ao AWS ECR e implantadas no AWS ECS

## Próximos Passos

- Configurar secrets no GitHub (AWS e DockerHub)
- Testar o frontend localmente
- Configurar cluster ECS na AWS