FROM node:20.12.2-alpine AS builder
WORKDIR /app

COPY package.json .

RUN yarn install --ignore-optional

COPY . .

RUN yarn global add typescript

EXPOSE 3000

RUN yarn build
