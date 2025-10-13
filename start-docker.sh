#!/bin/bash

echo "🐳 Iniciando E-Commerce Application com Docker..."

# Para containers existentes
echo "🔄 Parando containers existentes..."
docker stop backend-app frontend-app 2>/dev/null
docker rm backend-app frontend-app 2>/dev/null

# Build das imagens
echo "🔨 Building imagens Docker..."
docker build -t ecommerce-backend:local backend/
docker build -t ecommerce-frontend:local frontend/

# Inicia Backend
echo "🔧 Iniciando Backend container na porta 3001..."
docker run -d -p 3001:3001 --name backend-app ecommerce-backend:local

# Aguarda backend iniciar
sleep 5

# Testa se backend está rodando
if curl -s http://localhost:3001/api/products > /dev/null; then
    echo "✅ Backend rodando na porta 3001"
else
    echo "❌ Erro ao iniciar Backend"
    docker logs backend-app
    exit 1
fi

# Inicia Frontend
echo "🎨 Iniciando Frontend container na porta 8080..."
docker run -d -p 8080:80 --name frontend-app ecommerce-frontend:local

# Aguarda frontend iniciar
sleep 3

echo "✅ Aplicação iniciada com sucesso!"
echo ""
echo "🌐 Acesse: http://localhost:8080"
echo "🔑 Login: igor / 123"
echo "📊 API: http://localhost:3001/api/products"
echo ""
echo "�� Containers rodando:"
docker ps --filter "name=backend-app" --filter "name=frontend-app"
echo ""
echo "📝 Ver logs:"
echo "   Backend: docker logs backend-app"
echo "   Frontend: docker logs frontend-app"
echo "🛑 Para parar: ./stop-docker.sh"
