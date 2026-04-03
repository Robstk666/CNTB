#!/bin/bash

# Perehod v papku s proektom
cd "$(dirname "$0")"

echo "[OEA LAUNCHER] Проверка окружения..."

# Проверка Node.js
if ! command -v node &> /dev/null
then
    echo "[ERROR] Node.js не найден! Пожалуйста, установите Node.js."
    exit
fi

# Проверка node_modules
if [ ! -d "node_modules" ]; then
    echo "[OEA LAUNCHER] Установка зависимостей..."
    npm install
fi

# Проверка dist
if [ ! -d "dist" ]; then
    echo "[OEA LAUNCHER] Сборка проекта..."
    npm run build
fi

echo "[OEA LAUNCHER] Запуск сервера..."
echo "[OEA LAUNCHER] Проект будет доступен по адресу: http://localhost:4173"

# Открытие браузера
open http://localhost:4173

# Запуск
npm run preview -- --host
