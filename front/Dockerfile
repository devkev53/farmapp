FROM node:18-alpine

RUN npm i -g pnpm

WORKDIR /app/front/

COPY package*.json /app/front/

RUN pnpm install

COPY . /app/front/

CMD ["pnpm", "run", "dev"]