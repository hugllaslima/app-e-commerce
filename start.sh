#!/bin/bash

echo "�� Iniciando E-Commerce Application..."

# Mata processos existentes
echo "🔄 Parando processos existentes..."
pkill -f "node server.js" 2>/dev/null
pkill -f "vite" 2>/dev/null
sleep 2

# Inicia Backend
echo "🔧 Iniciando Backend na porta 3001..."
cd Backend
npm start > ../backend.log 2>&1 &
BACKEND_PID=$!
cd ..

# Aguarda backend iniciar
sleep 3

# Testa se backend está rodando
if curl -s http://localhost:3001/api/products > /dev/null; then
    echo "✅ Backend rodando na porta 3001"
else
    echo "❌ Erro ao iniciar Backend"
    exit 1
fi

# Inicia Frontend
echo "🎨 Iniciando Frontend..."
cd Frontend
npm run dev > ../frontend.log 2>&1 &
FRONTEND_PID=$!
cd ..

# Aguarda frontend iniciar
sleep 5

echo "✅ Aplicação iniciada com sucesso!"
echo ""
echo "🌐 Acesse: http://localhost:5173"
echo "🔑 Login: igor / 123"
echo ""
echo "📋 PIDs salvos:"
echo "   Backend: $BACKEND_PID"
echo "   Frontend: $FRONTEND_PID"
echo ""
echo "📝 Logs em: backend.log e frontend.log"
echo "🛑 Para parar: ./stop.sh"
