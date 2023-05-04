FROM node

WORKDIR /app/front/

COPY package*.json /app/front/

RUN npm i -g pnpm
RUN npm install -g npm@7
RUN npx npm@6 install
RUN pnpm install

COPY . /app/front/

CMD ["npm", "run", "dev"]