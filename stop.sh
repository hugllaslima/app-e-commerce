#!/bin/bash

echo "🛑 Parando E-Commerce Application..."

# Para todos os processos
pkill -f "node server.js"
pkill -f "vite"

# Aguarda processos pararem
sleep 2

echo "✅ Todos os processos foram parados"

# Remove logs se existirem
if [ -f backend.log ]; then
    rm backend.log
    echo "🗑️  Log do backend removido"
fi

if [ -f frontend.log ]; then
    rm frontend.log
    echo "🗑️  Log do frontend removido"
fi

echo "🏁 Aplicação parada completamente"
