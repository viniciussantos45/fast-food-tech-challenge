FROM node:20.12.2-alpine AS builder

WORKDIR /app

COPY package.json .

RUN yarn

COPY . .

RUN sed -i 's/\r$//' run.sh && chmod +x run.sh

EXPOSE 3000

RUN npx prisma generate

RUN yarn build

CMD ["./run.sh"]
