FROM node:24-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build:showcase
FROM nginx:stable-alpine
COPY --from=build /app/showcase-dist /usr/share/nginx/html
EXPOSE 80
