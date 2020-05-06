FROM node:12-buster-slim

WORKDIR /home/node

COPY package* ./

RUN npm install

COPY index.js ./

CMD ["node", "index.js"]
