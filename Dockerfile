# С помощью директивы AS можно дать образу имя
FROM node:19.7-alpine AS builder

WORKDIR /app

COPY package*.json ./

# Устанавливаем зависимости
RUN npm ci

# Копируем исходный код и собираем приложение
COPY . ./

RUN npm run build



FROM node:19.7-alpine as production

WORKDIR /app

RUN npm install pm2 -g

# С помощью параметера --from указываем, что копировать нужно из образа builder
# Копируем package.json и package-lock.json (потребуются для установки зависимостей)

COPY --from=builder /app/package*.json ./

# Устанавливаем только зависимости, необходимые в продакшене
# --omit=dev означает пропустить dev-зависимости
RUN npm ci --omit=dev 

# Копируем директорию со сборкой приложения
COPY --from=builder /app/dist ./

EXPOSE 4000

# Указываем команду для запуска приложения
CMD ["pm2-runtime", "ecosystem.config.js"]