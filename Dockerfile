# Setup
FROM node:20.12.2 AS builder

WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install

COPY . .
RUN yarn build

# Production
FROM node:20.12.2-alpine AS production

WORKDIR /app

COPY --from=builder /app/package.json /app/yarn.lock ./
COPY --from=builder /app/dist dist/
COPY --from=builder /app/prisma .
COPY --from=builder /app/run.sh .

RUN export NODE_ENV=production
RUN sed -i 's/\r$//' run.sh && chmod +x run.sh

RUN yarn global add prisma
RUN yarn install --production

EXPOSE 3000

CMD ["./run.sh"]
