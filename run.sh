#!/bin/sh

echo "teste"

# ls -lhat

echo "---------------------"

# node src/index.ts

yarn build
yarn start
yarn dev

# yarn prisma migrate dev --name init
