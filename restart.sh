#!/bin/bash

echo "🔄 Reiniciando E-Commerce Application..."

# Para tudo
./stop.sh

echo ""
echo "⏳ Aguardando 3 segundos..."
sleep 3

# Inicia tudo
./start.sh
