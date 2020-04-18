FROM node:12

EXPOSE 5000

COPY . .

CMD ["node", "server.js"]


