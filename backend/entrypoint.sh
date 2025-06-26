#!/bin/sh

echo "⏳ Aguardando o MySQL iniciar..."
timeout=30
while ! nc -z mysql 3306; do
  sleep 1
  timeout=$((timeout-1))
  if [ "$timeout" -le 0 ]; then
    echo "❌ Timeout ao esperar MySQL"
    exit 1
  fi
done

echo "✅ MySQL está no ar, iniciando backend..."
npm start
