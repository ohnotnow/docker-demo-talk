FROM node:lts

WORKDIR /home/node

COPY package* ./

RUN npm install

COPY index.js ./

CMD ["node", "index.js"]


