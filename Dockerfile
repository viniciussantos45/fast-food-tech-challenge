FROM node:20.12.2-alpine AS builder
WORKDIR /app
COPY prisma ./prisma/
COPY package.json .
RUN yarn install --ignore-optional
COPY . .
# COPY run.sh .
# RUN chmod +x run.sh
RUN yarn global add typescript
RUN yarn add @prisma/client
# RUN tsc -v --pretty
RUN yarn build
# RUN yarn tsc
# FROM node:20.12.2-alpine
# WORKDIR /app
# COPY --from=builder /app/node_modules .
# COPY --from=builder /app/dist .
EXPOSE 3000
CMD ["node", "src/index.ts"]
# CMD ["node", "dist/index.js"]