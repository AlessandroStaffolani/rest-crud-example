FROM node:12


WORKDIR /usr/src/server

COPY package.json ./

RUN yarn install

COPY . .

EXPOSE 5000

CMD ["node", "server.js"]


