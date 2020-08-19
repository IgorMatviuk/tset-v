# ---- Базовый Node ----
FROM node:erbium AS base
# Создать директорию app
WORKDIR /app

# ---- Зависимости ----
FROM base AS dependencies  
# Используется символ подстановки для копирования как package.json, так и package-lock.json
WORKDIR /app
COPY package*.json /app/
COPY yarn.lock /app/
# Установить зависимости приложения, включая предназначенные для разработки ('devDependencies')
RUN yarn install

# ---- Скопировать файлы/билд ----
FROM dependencies AS build
WORKDIR /app
COPY . .
COPY --from=dependencies /app /app
RUN touch version
COPY .env.prod /app/.env
RUN echo -n "$(git rev-parse --short HEAD)" > version
RUN npm i -g pm2
# Собрать статические файлы react/vue/angular
RUN yarn build

# # этап production (production-stage)
# FROM nginx:stable-alpine as production-stage

# # install node with depth
# RUN apk add --update nodejs npm yarn
# RUN npm i -g pm2

# COPY --from=build /app/dist /usr/share/nginx/html
# COPY nginx.conf /etc/nginx/conf.d/default.conf
# EXPOSE 80
# CMD ["nginx", "-g", "daemon off;"]

CMD ["pm2-runtime", "--env=production", "ecosystem.config.json"]
