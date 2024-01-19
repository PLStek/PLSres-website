# syntax=docker/dockerfile:1

FROM node:20-alpine AS build
WORKDIR /app
COPY . .
RUN npm install -g @angular/cli
RUN npm install --silent
RUN ng build --configuration production

FROM nginx:alpine
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=build /app/dist/plsres /usr/share/nginx/html

EXPOSE 80 
