FROM node:18-alpine

RUN npm i -g pnpm

WORKDIR /app/front/

COPY package*.json /app/front/

RUN pnpm install

COPY . /app/front/

EXPOSE 5173

CMD ["pnpm", "run", "preview"]
# CMD ["pnpm", "run", "dev"]
# CMD ["pnpm", "run", "build"]